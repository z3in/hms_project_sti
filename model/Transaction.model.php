<?php

class Transaction extends Helpers{

    private $id,$year,$month,$search,$date_start,$date_end;

    public function setMonthSearch($ds,$de){
        $this->date_start = $ds;
        $this->date_end = $de;
    }
    public function setSearch($search){
        $this->search = $search;
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

        $sql = "SELECT COUNT(*) FROM billing_list WHERE `date_from` >= ? AND `date_to` <= ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $this->date_start);
        $stmt->bindParam(2, $this->date_end);
        $stmt->execute();
        return $stmt;
        
    }

    public function selectDateSearch($offset,$rowsperpage){
        $sql = "SELECT * FROM billing_list WHERE `date_from` >= ? AND `date_to` <= ? LIMIT ?, ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $this->date_start);
        $stmt->bindParam(2, $this->date_end);
        $stmt->bindParam(3, $offset, PDO::PARAM_INT);
        $stmt->bindParam(4, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function countAllSearchedRow(){
        $sql = "SELECT COUNT(*) FROM billing_list WHERE payment_ref like ? or concat(fname, ' ',mname, ' ',lname) like ?";
        $stmt = $this->conn->prepare($sql);
        $data = '%'. $this->search . '%';
        $stmt->bindParam(1, $data);
        $stmt->bindParam(2,$data);
        $stmt->execute();
        return $stmt;
    }

    public function selectSearchAllBilling($offset,$rowsperpage){
        $sql = "SELECT * FROM billing_list WHERE payment_ref like ? or concat(fname, ' ',mname, ' ',lname) like ? LIMIT ?, ?";

        $stmt = $this->conn->prepare($sql);
        $data = '%'. $this->search . '%';
        $stmt->bindParam(1, $data);
        $stmt->bindParam(2, $data);
        $stmt->bindParam(3, $offset, PDO::PARAM_INT);
        $stmt->bindParam(4, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }


    public function selectSingleBill($id){
        $this->id = $id;
        $sql = "SELECT * FROM billing_list where `id` = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam("id", $this->id);
        $stmt->execute();
        return $stmt;
    }
}