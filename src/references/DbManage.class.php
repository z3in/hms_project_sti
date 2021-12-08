<?php

class DbManage{

    private static function createInstanceBackup(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $back = new Backup($db);
        return $back;
    }

    public static function makeBackup(){
        Validate::defineMethod("GET");

        $conn = new Database();
        $conn->connect('hms_hipnautic');
        $result = $conn->backup();
        if($result){
            $backup = self::createInstanceBackup();
            $result['userid'] = $_GET['userid'];
            $insertID = $backup->insertBackup($result);
            Audit::createLog($_GET['userid'],'Discount Module','created a new Backup, id : ' . $insertID);
            exit(Response::send(200,'Backup Successful'));
        }
        exit(Response::send(500,'Backup failed'));
    }

    public static function getBackupList(){
        $data = Validate::JSONdata();
        Validate::defineMethod("GET");

        $error = '';
        $error .= Validate::defineError(!isset($data['limit']) && !isset($_GET['limit']),$error,'limit');
        
        Validate::errorvalue($error);

        try{
            if(isset($data['limit'])){
                if(!is_int($data['limit'])){
                    throw new ErrorValueException('`limit` parameter cannot be ' . gettype($data['limit']));
                }
            }
            if(isset($_GET['limit'])){
                if(!is_numeric($_GET['limit'])){
                    throw new ErrorValueException('`limit` parameter cannot be ' . gettype($_GET['limit']));
                }
            }
        }catch(ErrorValueException $e){
            exit(Response::send(422,$e->errorMessage()));
        }

        $backup = self::createInstanceBackup();
        $count = $backup->countAllRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $page_info->setUrl('app/system/backup');
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $backup->selectALlBackup($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0) {
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

}