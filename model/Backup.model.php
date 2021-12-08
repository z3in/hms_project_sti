<?php

class Backup extends Helpers{

    public function insertBackup($data){
        $sql = "INSERT INTO backup(`backup_name`,`path`,`type`,`userid`)VALUES(:backup_name,:ref_path,:file_type,:userid)";
        $stmt = $this->conn->prepare($sql);
        $data['file_type'] = "backup";
        $stmt->execute($data);
        if($stmt->execute($data)){
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function countAllRow(){

        $sql = "SELECT COUNT(*) FROM backup";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
        
    }

    public function selectALlBackup($offset,$rowsperpage){
        $sql = "SELECT * from backup LIMIT ?, ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }
}