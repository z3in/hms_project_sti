<?php


Class PositionManagement{

    protected static function createInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $user = new UserRole($db);
        return $user;
    }


    public static function getPositions(){
        $data = Validate::JSONdata();
        Validate::defineMethod("GET");

        $user = self::createInstance();

        $result = $user->getAllPosition();
        $count = $result->rowCount();

        if($count > 0) {
            $response =  array();
            $response['count'] = $count;
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::send(200,'Showing Result',null,'data',$response));
        }
        exit(Response::send(200,'No Result Found.'));
    }

    public static function addPosition(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");

        $error = '';
        $error .= Validate::defineError(!isset($data['position']),$error,'position');
        $error .= Validate::defineError(!isset($data['type']),$error,'type');
        $error .= Validate::defineError(!isset($data['status']),$error,'status');
        $error .= Validate::defineError(!isset($data['userid']),$error,'userid');
        
        Validate::errorvalue($error);

        $user = self::createInstance();

        $user->setPosition($data['position']);
        $user->setType($data['type']);
        $user->setStatus($data['status']);
        $user->setUser($data['userid']);

        $result = $user->insertPosition();

        $response = Array();
        $response['id'] = $user->getPosition();
        $response['type'] = $user->getType();
        $response['status'] = $user->getStatus();

        if($result){
            Audit::createLog($user->getUser(),'User Management Module','created a new position : ' . $user->getPosition());
            exit(Response::send(201,'Entry Saved','submitted_data',$response));
        }
        exit(Response::send(500,'Opps, Something went wrong! Please Try again.'));
    }
}