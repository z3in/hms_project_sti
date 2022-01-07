<?php

class AdditionalService extends Helpers{

    public function countAllRow(){
        $sql = "SELECT COUNT(*) FROM `additional_service`";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
     }
  
     public function selectAlladditionalServices($offset,$rowsperpage){
  
        $sql = "SELECT * FROM `additional_service` LIMIT ?,?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function insertadditionalServices($data){
        $sql = "INSERT INTO additional_service(`booking_id`,`date_created`,`service_id`,`service_cost`,`service_quantity`,`userid`,`payment_status`)VALUES(:booking_id,:date_created,:service_id,:service_cost,:service_quantity,:userid,:payment_status)";
        $stmt = $this->conn->prepare($sql);
        if($stmt->execute($data)){
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function getadditionalServices($id){
        $sql = "SELECT a.booking_id,a.date_created,a.id,a.payment_status,a.service_id,a.service_cost,a.service_quantity,b.service_name FROM `additional_service` a LEFT JOIN services b ON a.service_id  = b.id  WHERE a.booking_id = ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt;
    }
}