<?php

Class Room extends Helpers{

    public function insertRoom($data){
        $sql = "INSERT INTO rooms(room_number,room_type,room_occupancy,`status`,room_rate,adtl_adult,adtl_kid,`policy`)
                VALUES(:room_number,:room_type,:room_occupancy,:stats,:room_rate,:adtl_adult,:adtl_kid,:pol)";
        
        $stmt = $this->conn->prepare($sql);
        unset($data['id']);
        if($stmt->execute($data)){
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function countAllRoom(){
        $sql = "SELECT COUNT(*) FROM `all_rooms`";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    public function viewRooms($offset,$rowsperpage){

        $sql = "SELECT * FROM `all_rooms` LIMIT ?,?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function maxOccupancy(){
        $sql = "SELECT room_occupancy FROM `all_rooms` order by room_occupancy desc limit 0,1";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
}