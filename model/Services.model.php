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
        $sql = "INSERT INTO services(`service_name`,`service_cost`,`status`,`date_created`)VALUES(:servicename,:service_cost,:stats,:date_created)";
        $data['date_created'] = TimeAndDate::timestamp();
        unset($data['created_by']);
        $stmt = $this->conn->prepare($sql);
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