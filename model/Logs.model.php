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

    

}