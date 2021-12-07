<?php

class Reports{

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

    public static function IncomeReport(){
        
    }

    public static function DailyAudit(){
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
        $booking->setDateSearch($_GET['date']);
        $count = $booking->countAllSearchedDate()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $booking->selectDateSearch($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }
}