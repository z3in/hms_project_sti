<?php

class Database{

        private $_host = 'localhost'; // change credentials here servername
        private $_username = 'root'; // change credentials here username
        private $_db_name = null; // DO NOT CHANGE THIS
        private $_password = '';// change credentials here password
        private $_port = 3306; // change port here/
        private $_conn;

        public function connect($db){
            $this->_conn = null;
            $this->_db_name = $db;
            try{
                $this->_conn = new PDO('mysql:host='. $this->_host . ';port='. $this->_port . ';dbname=' .  $this->_db_name,$this->_username,$this->_password);
                $this->_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch(PDOException $e)
            {
                printf('error: %s.\n', $e);
                return false;
            }
            return $this->_conn;
        }

}