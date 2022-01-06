<?php

class Reservation{

    protected static function createBookingInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $room = new Booking($db);
        return $room;
    }

    protected static function createTransactionInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $room = new Transaction($db);
        return $room;
    }

    public static function availableRooms(){
        Validate::defineMethod("GET");

        $error = '';
        $error .= Validate::defineError(!isset($_GET['checkin']),$error,'checkin');
        $error .= Validate::defineError(!isset($_GET['checkout']),$error,'checkout');
        $error .= Validate::defineError(!isset($_GET['type']),$error,'type');
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

        $room =  self::createBookingInstance();
        $room->setBooking($_GET['type'],$_GET['checkin'],$_GET['checkout']);
        $count = $room->countAvailableRooms()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $room->selectAvailableRooms($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::send(200,'Showing Result','result',$response));
        }
        exit(Response::send(200,'No Result Found.'));
    }

    public static function saveReservation(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");

        $error = '';
        $error .= Validate::defineError(!isset($data['reservation_type']),$error,'reservation_type');
        $error .= Validate::defineError(!isset($data['checkin']),$error,'checkin');
        $error .= Validate::defineError(!isset($data['checkout']),$error,'checkout');
        $error .= Validate::defineError(!isset($data['person']),$error,'person');
        $error .= Validate::defineError(!isset($data['roomtype']),$error,'roomtype');
        $error .= Validate::defineError(!isset($data['roomname']),$error,'roomname');
        $error .= Validate::defineError(!isset($data['roomid']),$error,'roomid');
        $error .= Validate::defineError(!isset($data['roomrate']),$error,'roomrate');
        $error .= Validate::defineError(!isset($data['first']),$error,'first');
        $error .= Validate::defineError(!isset($data['last']),$error,'last');
        $error .= Validate::defineError(!isset($data['middle']),$error,'middle');
        $error .= Validate::defineError(!isset($data['gender']),$error,'gender');
        $error .= Validate::defineError(!isset($data['phone']),$error,'phone');
        $error .= Validate::defineError(!isset($data['email']),$error,'email');
        $error .= Validate::defineError(!isset($data['address']),$error,'address');
        $error .= Validate::defineError(!isset($data['city']),$error,'city');
        $error .= Validate::defineError(!isset($data['zipcode']),$error,'zipcode');
        $error .= Validate::defineError(!isset($data['card_lastnum']),$error,'zipcode');
        $error .= Validate::defineError(!isset($data['ref_num']),$error,'zipcode');
        $error .= Validate::defineError(!isset($data['amount']),$error,'zipcode');
        $error .= Validate::defineError(!isset($data['currency']),$error,'zipcode');
        $error .= Validate::defineError(!isset($data['card_brand']),$error,'zipcode');
        $error .= Validate::defineError(!isset($data['user_id']),$error,'user_id');

        Validate::errorvalue($error);

        $room = self::createBookingInstance();
        $result = $room->insertBooking($data);
        if($result){
            Audit::createLog($data['user_id'],'Booking Module','created a new reservation, id : ' . $result);

            $trans = self::createTransactionInstance();
            $res = $trans->insertTransaction($result,$data);
            if($res){
                    $name = $data['last'] . ", " . $data['first'] . ' ' . $data['middle'];
                    $res_date = $data['checkin'] . " to " . $data['checkout'];
                    Mailer::sendReceipt($data['email'],$name,$data['ref_num'],$res_date,TimeAndDate::timestamp());
                    Audit::createLog($data['user_id'],'Transaction Module','created a new transaction, id : ' . $res);
                    exit(Response::send(201,'Transaction Completed!'));
            }
        }
    }

    public static function listAllBookings(){
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

        $booking = self::createBookingInstance();
        $count = $booking->countAllRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $booking->selectAllBooking($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function searchReservation(){
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

        $booking = self::createBookingInstance();
        $booking->setSearch($_GET['search']);
        $count = $booking->countAllSearchedRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $booking->selectSearchAllBooking($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function viewReservation(){
        Validate::defineMethod("GET");

        $error = '';
        $error .= Validate::defineError(!isset($data['id']) && !isset($_GET['id']),$error,'id');
        
        Validate::errorvalue($error);
        
        $booking = self::createBookingInstance();
        $result = $booking->selectSingleReservation($_GET['id']);
        $count = $result->rowCount();
        if($count > 0) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            extract($row);
            exit(Response::send(200,'Booking Found','booking',$row));
        }
    }

    public static function changeStatus(){
        Validate::defineMethod("POST");
        $data = Validate::JSONdata();

        $error = '';
        $error .= Validate::defineError(!isset($data['id']),$error,'id');
        $error .= Validate::defineError(!isset($data['status']),$error,'status');
        $error .= Validate::defineError(!isset($data['status_name']),$error,'status_name');
        $error .= Validate::defineError(!isset($data['user_id']),$error,'user_id');
        
        Validate::errorvalue($error);
        $booking = self::createBookingInstance();
        $booking->set_id($data['id']);
        $res = $booking->updateStatus($data['status']);
        if($res){
            Audit::createLog($data['user_id'],'Transaction Module','status changed to : ' . $data['status_name']);
            exit(Response::send(201,'Transaction Completed!'));
        }
        exit(Response::send(500,'Something went Wrong.Please try Refreshing!'));
    }
}