<?php

Class UserAccess extends Helpers{

    protected $_id;
    protected $_user;
    protected $_pass;

    public function setCredentials($user,$pass){
        $this->_user = $user;
        $this->_pass = $pass;
    }

    public function getAllData(){

        $sql = "SELECT * FROM `user_access`";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
    }

    public function selectRowByUsername($user){
        $sql = "SELECT * FROM `user_access` WHERE email=:email";

        $data = [
                "email" => isset($user) ? $user : $this->_user
        ];
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
        return $stmt;
    }

    public function selectRowByID($user){
        $sql = "SELECT * FROM `user_access` WHERE id=:id";

        $data = [
                "id" => isset($user) ? $user : $this->_id
        ];
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
        return $stmt;
    }

    public function getAllActiveData($offset,$rowsperpage){

        $sql = "SELECT u.id,u.fname,u.lname,u.mname,u.position_name,u.userid,u.status,u.role,u.created_by,u.email,u.date_created,CONCAT(e.fname, ' ',e.lname) as created_by_name FROM `user_access` u LEFT JOIN employee e on e.userid = u.created_by WHERE u.`status`= ? LIMIT ?,?";
        $status = 1;
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $status);
        $stmt->bindParam(2, $offset, PDO::PARAM_INT);
        $stmt->bindParam(3, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function countAllRow($stat){
        $sql = "SELECT COUNT(*) FROM `user` WHERE `status`=:stat";

        $data = [
            "stat" => $stat
        ];
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
        return $stmt;
    }
    
    public function insertUser($input){

        $sql = "INSERT INTO `user`(email,pword,`role`,`status`,created_by)VALUES(:email,:pword,:pos,:stats,:created_by)";

        $data = [
            "email" => $input['email'],
            "pword" => password_hash($input['pword'], PASSWORD_DEFAULT),
            "pos" => $input['role'],
            "stats" => $input['status'],
            "created_by" => $input['id']
        ];
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
        $this->insertEmployee($this->conn->lastInsertId(),$input);
        return $this->conn->lastInsertId();
    }

    public function insertEmployee($id,$input){
        $sql = "INSERT INTO `employee`(fname,lname,mname,`status`,position,userid)VALUES(:fname,:lname,:mname,:stats,:pos,:user)";
        $data = [
            "fname" => $input['fname'],
            "lname" => $input['lname'],
            "mname" => $input['mname'],
            "stats" => $input['status'],
            "pos" => $input['role'],
            "user" => $id
        ];
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
    }

    public function updateLogin($id,$key){
        $sql = "UPDATE `user` set `vkey` = :vkey where id=:id";
        $data = [
            "id" => $id,
            "vkey" => $key
        ];
        $stmt = $this->conn->prepare($sql);
        $stmt->execute($data);
    }
}