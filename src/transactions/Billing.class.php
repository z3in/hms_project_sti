<?php

class Billing{

    protected static function createTransactionInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $room = new Transaction($db);
        return $room;
    }

    protected static function createAdditionalServiceInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $room = new AdditionalService($db);
        return $room;
    }

    public static function showBillingList(){
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

        $bill = self::createTransactionInstance();
        $count = $bill->countAllRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $bill->selectAllTransactions($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function getBill(){
        $data = Validate::JSONdata();
        Validate::defineMethod("GET");

        $error = '';
        $error .= Validate::defineError(!isset($data['id']) && !isset($_GET['id']),$error,'id');
        
        Validate::errorvalue($error);

        $bill = self::createTransactionInstance();
        $result = $bill->selectSingleBill($_GET['id']);
        $count = $result->rowCount();
        if($count){
            $row = $result->fetch(PDO::FETCH_ASSOC);
            extract($row);
            exit(Response::send(200,'Billing Found','billing',$row));
        }
    }

    public static function searchBill(){
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

        $bill = self::createTransactionInstance();
        $bill->setSearch($_GET['search']);
        $count = $bill->countAllSearchedRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $bill->selectSearchAllBilling($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function getAllAdditionalService(){
        Validate::defineMethod("GET");

        $error = '';
        $error .= Validate::defineError(!isset($_GET['id']),$error,'id');
        
        Validate::errorvalue($error);

        $bill = self::createAdditionalServiceInstance();
        $result = $bill->getadditionalServices($_GET['id']);
        $count = $result->rowCount();
        if($count > 0){
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
            exit(Response::send(200,'Showing Result','result',$response));
        } 
        exit(Response::send(200,'No Result Found'));
    }
}