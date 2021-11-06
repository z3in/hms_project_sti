<?php

class Transaction extends Helpers{

    public function insertTransaction($id,$data){
            $sql = "INSERT INTO transactions(booking_id,`date`,room_id,room_charge,card_info,currency,payment_ref,total_amount,street_add,city_add,zip_add)
                                VALUES
                                (:booking_id,:created,:room_id,:room_charge,:card_info,:currency,:payment_ref,:total_amount,:street_add,:city_add,:zip_add)";

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
                        "zip_add" => $data['bill_zip_add']
                    ];
                    if($stmt->execute($params)){
                        return $this->conn->lastInsertId();
                    }
                    return false;
    }
}