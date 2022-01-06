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

        $pos = self::createInstance();
        $count = $pos->countAllRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $page_info->setUrl('app/user/role/list');
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $pos->getAllPosition($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0) {
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
           
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function addPosition(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");

        $error = '';
        $error .= Validate::defineError(!isset($data['position']),$error,'position');
        $error .= Validate::defineError(!isset($data['priv']),$error,'priv');
        $error .= Validate::defineError(!isset($data['status']),$error,'status');
        $error .= Validate::defineError(!isset($data['userid']),$error,'userid');
        
        Validate::errorvalue($error);

        $user = self::createInstance();

        $user->setPosition($data['position']);
        $user->setType($data['priv']);
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