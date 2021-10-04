<?php

Class Audit{

    protected static function createInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $logs = new Logs($db);
        return $logs;
    }

    public static function createLog($id,$action,$module){
        $logs = self::createInstance();
        $logs->setUserid($id);
        $logs->setAction($action);
        $logs->setModule($module);

        $logs->insertLog();
    }

    public static function getLog(){
        $data = Validate::JSONdata();
        Validate::defineMethod("GET");

        $error = '';
        $error .= Validate::defineError(!isset($data['limit']),$error,'limit');
        
        Validate::errorvalue($error);

        try{
            if(!is_int($data['limit'])){
                throw new ErrorValueException('`limit` parameter cannot be ' . gettype($stats));
            }
        }catch(ErrorValueException $e){
            exit(Response::send(422,$e->errorMessage()));
        }

        $logs = self::createInstance();
        $count = $logs->countAllRow()->fetchColumn();
        $response = Array();
        $page_info = new Pagination($data['limit'],$count);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $logs->selectALlLog($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['data'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['data'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }
}