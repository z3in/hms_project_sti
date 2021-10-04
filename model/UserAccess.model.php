<?php

Class UserAccess extends Helpers{

    protected $_id;
    protected $_user;
    protected $_pass;

    public function setCredentials($user,$pass){
        $this->_user = $user;
        $this->_pass = $pass;
    }

    public function getAllData($user = null){

        $sql = "SELECT * FROM `user`";

        $data = [];
        if(!is_null($user) || !is_null($this->_id)){
            $sql .= " WHERE email=:email";

            $data = [
                "email" => isset($user) ? $user : $this->_id
            ];
        }

        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
        return $stmt;
    }

    public function getAllActiveData($user = null){

        $sql = "SELECT * FROM `user` where `status`=:stat";

        $data = [
            "stat" => 1
        ];
        if(!is_null($user) || !is_null($this->_id)){
            $sql .= " AND email=:email";

            $data = [
                "email" => isset($user) ? $user : $this->_id
            ];
        }

        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
        return $stmt;
    }

    public function insertNewUser(){
        
    }
}