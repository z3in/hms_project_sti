<?php

Class RoomTypes extends Helpers{

   public function insertRoomType($data){
       $sql = "INSERT INTO room_types(category,room_description,bed,photo)VALUES(:category,:room_description,:bed,:photo)";
      
       $stmt = $this->conn->prepare($sql);
       if($stmt->execute($data)){
         return $this->conn->lastInsertId();
       }
       return false;
   }

   public function countAllRow(){
      $sql = "SELECT COUNT(*) FROM `room_types`";
      $stmt = $this->conn->prepare($sql);
      $stmt->execute();
      return $stmt;
   }

   public function selectRooms($offset,$rowsperpage){

      $sql = "SELECT * FROM `room_types` LIMIT ?,?";
      $stmt = $this->conn->prepare($sql);
      $stmt->bindParam(1, $offset, PDO::PARAM_INT);
      $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
      $stmt->execute();
      return $stmt;
  }
}