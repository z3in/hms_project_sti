<?php 

Class User {

    protected static function createInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $user = new UserAccess($db);
        return $user;
    }

    public static function userLogin(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");

        $error = '';
        $error .= Validate::defineError(!isset($data['username']),$error,'username');
        $error .= Validate::defineError(!isset($data['password']),$error,'password');
        
        Validate::errorvalue($error);

        $user = self::createInstance();
        $user->setCredentials($data['username'],$data['password']);
        $result = $user->getAllData();
        $count = $result->rowCount();
        if($count == 0) {
            exit(Response::success(200,'test only.'));
        }
    }

    public static function userList(){
        $data = Validate::JSONdata();
        Validate::defineMethod("GET");

        $error = '';
        $error .= Validate::defineError(!isset($data['status']),$error,'status');
        
        Validate::errorvalue($error);

        $user = self::createInstance();
        $result = $data['status'] ? $user->getAllActiveData() : $user->getAllData();
        $count = $result->rowCount();
        if($count > 0) {
            $response =  array();
            $response['count'] = $count;
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::success(200,'Showing Result'));
        }
        exit(Response::success(200,'No Result Found.'));
    }

    public static function addUser(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");

        $user = self::createInstance();

        $error = '';
        $error .= Validate::defineError(!isset($data['id']),$error,'username');
        $error .= Validate::defineError(!isset($data['email']),$error,'password');
        $error .= Validate::defineError(!isset($data['pword']),$error,'password');
        $error .= Validate::defineError(!isset($data['role']),$error,'password');
        $error .= Validate::defineError(!isset($data['status']),$error,'password');
        
        Validate::errorvalue($error);
    }
    
}