<?php

Class ManageEvent{

    protected static function createInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $logs = new Events($db);
        return $logs;
    }

    public static function getEventList(){
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

        $eve = self::createInstance();
        $count = $eve->countAllRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $eve->selectAllEvent($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function addNewEvent(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");

        $user = self::createInstance();

        $error = '';
        $error .= Validate::defineError(!isset($data['event_name']),$error,'event_name');
        $error .= Validate::defineError(!isset($data['email']),$error,'email');
        $error .= Validate::defineError(!isset($data['phone']),$error,'phone');
        $error .= Validate::defineError(!isset($data['requestor']),$error,'requestor');
        $error .= Validate::defineError(!isset($data['request_date']),$error,'request_date');
        $error .= Validate::defineError(!isset($data['stat']),$error,'stat');
        
        Validate::errorvalue($error);
        $result = $user->insertEvent($data);
        if($result){
            exit(Response::send(201,'Request Submitted'));
        }

    }
}