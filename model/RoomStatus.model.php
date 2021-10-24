<?php

Class RoomStatus extends Helpers{

    public function insertRoomType($data){
        $sql = "INSERT INTO room_types(category,room_description,bed,photo)VALUES(:category,:room_description,:bed,:photo)";
        
        $stmt = $this->conn->prepare($sql);
        if($stmt->execute($data)){
            return $this->conn->lastInsertId();
        }
        return false;
    }


    public function selectStatus(){

        $sql = "SELECT * FROM `room_Status`";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
    }
}