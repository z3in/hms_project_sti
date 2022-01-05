<?php

class Events extends Helpers{

     public function insertEvent($data){
        $sql = "INSERT INTO events(
                                    event_name,requestor,request_date,email,phone,`status`
                                    )
                                    VALUES(
                                    :event_name,:requestor,:request_date,:email,:phone,:stat
                                    )";

        $stmt = $this->conn->prepare($sql);
        $data['request_date'] =  date('Y-m-d',strtotime($data['request_date']));
        if($stmt->execute($data)){
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function countAllRow(){

        $sql = "SELECT COUNT(*) FROM events";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
        
    }


    public function selectAllEvent($offset,$rowsperpage){
        $sql = "SELECT * FROM events LIMIT ?, ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }
}