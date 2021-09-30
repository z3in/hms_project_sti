<?php

Class UserAccess {
    protected $conn;

    protected $_id;
    protected $_user;
    protected $_pass;

    public function __construct($conn){
        $this->conn = $conn;
    }

    public function getID(){
        return $this->_id;
    }
    public function setID($id){
        $this->_id = $id;
    }

    public function setCredentials($user,$pass){
        $this->_user = $user;
        $this->pass = $pass;
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
}