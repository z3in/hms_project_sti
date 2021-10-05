<?php


Class Helpers{

    protected $conn;

    public function __construct($conn){
        $this->conn = $conn;
    }

    public function __get($property) {
        if (property_exists($this, $property)) {
            return $this->$property;
        }
    }
    
    public function __set($property, $value) {
        if (property_exists($this, $property)) {
            $this->$property = $value;
        }

        return $this;
    }

    public function timestamp(){
        date_default_timezone_set('Asia/Manila');
        $date = date("Y-m-d H:i:s");
        return $date;
    }

}