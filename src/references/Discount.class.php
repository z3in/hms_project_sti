<?php


Class Discount{

    protected static function createInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $user = new PromoCodes($db);
        return $user;
    }


    public static function getDiscountList(){
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

        $dis = self::createInstance();
        $count = $dis->countAllRow()->fetchColumn();
        $response = Array();
        $page_number = isset($_GET['page_number']) ? $_GET['page_number'] : (isset($data['page_number']) ? $data['page_number'] : null); 
        $page_info = new Pagination(isset($data['limit']) ? $data['limit'] : $_GET['limit'],$count,$page_number);
        $page_info->setUrl('app/user/role/list');
        $response['page_info'] = $page_info->getPaginatedInfo();
        $result = $dis->selectAllDiscount($page_info->getOffset(),$page_info->getRowsPerPage());
        if($count > 0) {
            $response['list'] = Array();
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                array_push($response['list'],$row);
            }
        }
        exit(Response::send(200,'Showing Result','result',$response));
    }

    public static function addDiscount(){
        Validate::defineMethod("POST");
        $data = Validate::JSONdata();

        $error = '';
        $error .= Validate::defineError(!isset($data['promo_code']),$error,'promo_code');
        $error .= Validate::defineError(!isset($data['validity']),$error,'validity');
        $error .= Validate::defineError(!isset($data['discount_rate']),$error,'discount_rate');
        $error .= Validate::defineError(!isset($data['discount_limit']),$error,'discount_limit');
        $error .= Validate::defineError(!isset($data['created_by']),$error,'created_by');
        
        Validate::errorvalue($error);
        $discount = self::createInstance();

        $result = $discount->insertDiscount($data);
        if($result){
            Audit::createLog($data['created_by'],'Discount Module','created a new Discount, id : ' . $result);
            exit(Response::send(201,'Discount Added!'));
        }
        exit(Response::send(500,'Opps, Something went wrong! Please Try again.'));
    }

    public static function getDiscount(){
        Validate::defineMethod("POST");
        $data = Validate::JSONdata();

        $error = '';
        $error .= Validate::defineError(!isset($data['promo_code']),$error,'promo_code');

        Validate::errorvalue($error);
        $discount = self::createInstance();
        $result = $discount->getDiscount($data);
        $count = $result->rowCount();
        if($count > 0) {
            $row = $result->fetch(PDO::FETCH_ASSOC);
            exit(Response::send(200,'Showing Result','result',$row));
        }
        if($count < 1){
            exit(Response::send(200,'No Result Found'));
        }
        exit(Response::send(500,'Opps, Something went wrong! Please Try again.'));
    }
}