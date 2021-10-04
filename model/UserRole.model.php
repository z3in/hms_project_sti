<?php

Class UserRole extends Helpers{

    private $position;
    private $type;
    private $status;
    private $userid;

    /* getters & setters */
    public function getPosition(){
        return $this->position;
    }
    
    public function setPosition($pos){
        $this->position = $pos;
    }

    public function getType(){
        return $this->type;
    }

    public function setType($type){
        $this->type = $type;
    }

    public function setUser($user){
        $this->userid = $user;
    }
    public function getUser(){
        return $this->userid;
    }

    public function setStatus($stats){
        try{
            if(!is_int($stats)){
                throw new ErrorValueException('`status` parameter cannot be ' . gettype($stats));
            }
            if(($stats > 1) or ($stats < 0)){
                throw new ErrorValueException('`status` parameter value can only be 1 or 0.It cannot be ' . $stats);
            }
        }catch(ErrorValueException $e){
            exit(Response::send(422,$e->errorMessage()));
            
        }
        $this->status = $stats;
    }

    public function getStatus(){
        return $this->status;
    }


    /* class methods */
    public function getAllPosition(){
        $sql = "SELECT * FROM user_role";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        return $stmt;
    }

    public function insertPosition(){
        $sql = "INSERT INTO user_role(`position`,`type`,`status`,`created_by`)VALUES(:pos,:typ,:stats,:user)";

        $stmt = $this->conn->prepare($sql);

        $data = [
            "pos" => $this->getPosition(),
            "typ" => $this->getType(),
            "stats" => $this->getStatus(),
            "user" => $this->getUser()
        ];

        if($stmt->execute($data)){
            return true;
        }
        return false;
    }

}