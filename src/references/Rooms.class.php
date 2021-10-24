<?php

class Rooms{

    private static function RoomTypes(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $room = new RoomTypes($db);
        return $room;
    }

    private static function RoomStatus(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $room = new RoomStatus($db);
        return $room;
    }

    private static function Room(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $room = new Room($db);
        return $room;
    }

    public static function createRoomCategory(){
        Validate::defineMethod("POST");

        $error = '';
        $error .= Validate::defineError(!isset($_GET['id']),$error,'id');
        $error .= Validate::defineError(!isset($_POST['category']),$error,'category');
        $error .= Validate::defineError(!isset($_POST['room_description']),$error,'room_description');
        $error .= Validate::defineError(!isset($_POST['bed']),$error,'bed');
        $error .= Validate::defineError(!isset($_FILES['photo']),$error,'photo');
        
        Validate::errorvalue($error);
        $values = [];
        $values = array_merge($values,$_POST);
        $path = $_FILES['photo']['name'];
        $ext = pathinfo($path, PATHINFO_EXTENSION);
        $values['photo'] = FileUsage::generateFilename('uploads/',$ext);
        $room = self::RoomTypes();
        if(!move_uploaded_file($_FILES["photo"]["tmp_name"],$values['photo'])){
            exit(Response::send(422,'Unable to upload File. Please Try Again Later!'));
        }
        $result = $room->insertRoomType($values);
        if($result){
            Audit::createLog($_GET['id'],'Room Management Module','created a new room category, id : ' . $result);
            exit(Response::send(201,'Room Category Created'));
        }
    }

    public static function getRoomCategory(){
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
        

        $room = self::RoomTypes();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $count = $room->countAllRow()->fetchColumn();
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $page_info->setUrl('app/room/category/list');
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result =$room->selectRooms($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0) {
            $response['list']= Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::send(200,'Showing Result','result',$response));
        }
        exit(Response::send(200,'No Result Found.'));
    }

    public static function getRoomStatus(){
        Validate::defineMethod("GET");
        $room = self::RoomStatus();
        $result  =  $room->selectStatus();
        $count = $result->rowCount();
        $response = Array();
        if($count > 0) {
            $response['list']= Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::send(200,'Showing Result','result',$response));
        }
        exit(Response::send(200,'No Result Found.'));
    }

    public static function createNewRoom(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");

        $error = '';
        $error .= Validate::defineError(!isset($data['id']),$error,'sessionid');
        $error .= Validate::defineError(!isset($data['room_number']),$error,'room_number');
        $error .= Validate::defineError(!isset($data['room_type']),$error,'room_type');
        $error .= Validate::defineError(!isset($data['room_occupancy']),$error,'room_occupancy');
        $error .= Validate::defineError(!isset($data['stats']),$error,'stats');
        $error .= Validate::defineError(!isset($data['room_rate']),$error,'room_rate');
        $error .= Validate::defineError(!isset($data['adtl_adult']),$error,'adtl_adult');
        $error .= Validate::defineError(!isset($data['adtl_kid']),$error,'adtl_kid');
        $error .= Validate::defineError(!isset($data['pol']),$error,'pol');
        Validate::errorvalue($error);

        $room = self::Room();
        $result = $room->insertRoom($data);
        if($result){
            Audit::createLog($data['id'],'Room Management Module','Added a new room, room number : ' . $data['room_number']);
            exit(Response::send(201,'Room Category Created'));
        }
    }

    public static function viewRooms(){
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
        $room = self::Room();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $count = $room->countAllRoom()->fetchColumn();
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $page_info->setUrl('app/room/');
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result =$room->viewRooms($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0) {
            $response['list']= Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::send(200,'Showing Result','result',$response));
        }
        exit(Response::send(200,'No Result Found.'));
    }

    public static function getMaxOccupancy(){
        Validate::defineMethod("GET");
        $room = self::Room();
        $result  =  $room->maxOccupancy()->fetchColumn();
        if($result > 0) {
            exit(Response::send(200,'Showing Result','result',$result));
        }
        exit(Response::send(200,'No Result Found.'));
    }
}