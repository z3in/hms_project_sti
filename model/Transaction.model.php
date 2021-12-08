<?php

class Transaction extends Helpers{

    private $year,$month;

    public function setDateSearch($month,$year){
        $this->year = $year;
        $this->month = $month;

    }

    public function insertTransaction($id,$data){
            $sql = "INSERT INTO transactions(booking_id,`date`,room_id,room_charge,card_info,currency,payment_ref,total_amount,street_add,city_add,zip_add,discount_id,discount_total)
                                VALUES
                                (:booking_id,:created,:room_id,:room_charge,:card_info,:currency,:payment_ref,:total_amount,:street_add,:city_add,:zip_add,:discount_id,:discount_total)";

                    $stmt = $this->conn->prepare($sql);
                    $params = [
                        "booking_id" => $id,
                        "created" => TimeAndDate::timestamp(),
                        "room_id" => $data['roomid'],
                        "room_charge" => $data['roomrate'],
                        "card_info" => $data['card_lastnum'],
                        "total_amount" => $data['amount'],
                        "currency" => $data['currency'],
                        "payment_ref" => $data['payment_ref'],
                        "street_add" => $data['bill_street_add'],
                        "city_add" => $data['bill_city_add'],
                        "zip_add" => $data['bill_zip_add'],
                        "discount_id" => $data['discount_id'],
                        "discount_total" => $data['discount_total']
                    ];
                    if($stmt->execute($params)){
                        return $this->conn->lastInsertId();
                    }
                    return false;
    }

    public function countAllRow(){

        $sql = "SELECT COUNT(*) FROM billing_list";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
        
    }

    public function selectAllTransactions($offset,$rowsperpage){
        $sql = "SELECT * FROM billing_list LIMIT ?, ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function countAllSearchedDate(){

        $sql = "SELECT COUNT(*) FROM billing_list WHERE billing_list.`date` like ?";
        $stmt = $this->conn->prepare($sql);
        $date = $this->year . '-' . $this->month . '%';
        $stmt->bindParam(1, $date,PDO::PARAM_STR);
        $stmt->execute();
        return $stmt;
        
    }

    public function selectDateSearch($offset,$rowsperpage){

        $sql = "SELECT * FROM billing_list WHERE billing_list.`date` like ? LIMIT ?, ?";
        $stmt = $this->conn->prepare($sql);
        $date = $this->year . '-' . $this->month . '%';
        $stmt->bindParam(1, $date);
        $stmt->bindParam(2, $offset, PDO::PARAM_INT);
        $stmt->bindParam(3, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }
}