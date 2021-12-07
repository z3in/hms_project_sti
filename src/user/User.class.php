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
        $result = $user->selectRowByUsername($data['username']);
        $count = $result->rowCount();
        if($count > 0) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            extract($row);
            if(password_verify($data['password'],$pword)){
                Audit::createLog($id,'Authentication','user login : ' . $fname .' ' . $mname . ' ' . $lname);
                exit(Response::send(200,'Logged in.','user',$row));
            }
            exit(Response::send(401,'Unauthorized.'));
        }
        exit(Response::send(401,'No User Found.'));
    }

    public static function userList(){
        $data = Validate::JSONdata();
        Validate::defineMethod("GET");
        
        if(isset($_GET['edit']) || isset($data['edit'])){
            return self::viewUser();
        }

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
        

        $user = self::createInstance();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $status  = isset($_GET['status']) ? $_GET['status'] : 1;
        $count = $user->countAllRow($status)->fetchColumn();
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $page_info->setUrl('app/user/role/list');
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $status ? $user->getAllActiveData($page_info->getOffset(),$page_info->getRowsPerPage()) : $user->getAllData();
        if($count > 0) {
            $response['list']= Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::send(200,'Showing Result','result',$response));
        }
        exit(Response::send(200,'No Result Found.'));
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
        $result = $user->insertUser($data);
        if($result){
            Audit::createLog($data['id'],'User Management Module','created a new access and employee : ' . $result);
            exit(Response::send(201,'Account Created'));
        }

    }

    public static function viewUser(){
        
        $error = '';
        $error .= Validate::defineError(!isset($data['id']) && !isset($_GET['id']),$error,'id');

        Validate::errorvalue($error);
        $user = self::createInstance();
        $result = $user->selectRowByID($_GET['id']);
        $count = $result->rowCount();
        if($count > 0) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            exit(Response::send(200,'Showing Result','result',$row));
        }
        exit(Response::send(200,'No Result Found.'));
    }
    
}