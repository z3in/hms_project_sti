<?php 

Class User {

    protected static function createInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $user = new UserAccess($db);
        return $user;
    }

    public static function UserLogin(){
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
            $response =  array();
            exit(Response::success('test only.',null,'data',$response));
        }
    }
}