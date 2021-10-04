<?php

Class Logs extends Helpers{

    private $userid;
    private $action;
    private $module;

    /*getters and setters*/

    public function setUserid($userid){
        $this->userid = $userid;
    }

    public function setAction($action){
        $this->action = $action;
    }

    public function setModule($module){
        $this->module = $module;
    }

    public function getUserid(){
        return $this->userid;
    }

    public function getAction(){
        return $this->action;
    }

    public function getModule(){
        return $this->module;
    }


    /*class methods */

    public function insertLog(){
        $sql = "INSERT INTO logs(`userid`,`action`,`module`)VALUES(:userid,:act,:module)";

        $stmt = $this->conn->prepare($sql);
        $data = [
            "userid" => $this->getUserid(),
            "act" => $this->getAction(),
            "module" => $this->getModule()
        ];
        $stmt->execute($data);
    }

    public function countAllRow(){

        $sql = "SELECT COUNT(*) FROM logs";

        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
        
    }

    public function selectALlLog($offset,$rowsperpage){
        $sql = "SELECT * FROM logs LIMIT ?, ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

}