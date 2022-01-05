<?php

class Services extends Helpers{

    public function countAllRow(){
        $sql = "SELECT COUNT(*) FROM `services`";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
     }
  
     public function selectAllServices($offset,$rowsperpage){
  
        $sql = "SELECT * FROM `services` LIMIT ?,?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function insertServices($data){
        $sql = "INSERT INTO promo_codes(`promo_code`,`validity`,`discount_rate`,`created_by`)VALUES(:promo_code,:validity,:discount_rate,:created_by)";
        $stmt = $this->conn->prepare($sql);
        $data['validity'] = date('Y-m-d',strtotime($data['validity']));
        if($stmt->execute($data)){
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function getServices($data){
        $sql = "SELECT * FROM `services` WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
        return $stmt;
    }
}