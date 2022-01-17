<?php
include('vendor/autoload.php');

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

        $trans = self::createTransactionInstance();
        $trans->setMonthSearch($_GET['date_start'],$_GET['date_end']);
        $count = $trans->countAllSearchedDate()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $page_info->setUrl('app/reports/income_report');
        $result = $trans->selectDateSearch($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
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
        $booking->setMonthSearch($_GET['date_start'],$_GET['date_end']);
        $count = $booking->countAllSearchedDate()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $page_info->setUrl('app/reports/daily_audit');
        $result = $booking->selectDateSearch($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function BookingReport(){
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
        $booking->setMonthSearch($_GET['date_start'],$_GET['date_end']);
        $count = $booking->countAllSearchedDate()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $page_info->setUrl('app/reports/booking_report');
        $result = $booking->selectDateSearch($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function createPdfBookingReport(){
        
    }
}