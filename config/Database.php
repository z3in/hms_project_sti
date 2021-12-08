<?php

class Database{

        private $_host = 'http://3.15.209.24'; // change credentials here servername
        private $_username = 'remote'; // change credentials here username
        private $_db_name = null; // DO NOT CHANGE THIS
        private $_password = 'TUBoYWJhaGFiYW5nUEA1NXcwcmQxdDAh';// change credentials here password
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

        public function backup(){
        
            $backup_file = $this->_db_name . "_" . date("Y-m-d-H-i-s") . '.gz';
            $path_backup = "backup/" . $backup_file;
            $command = "mysqldump --opt -h " . $this->_host . " -u " . $this->_username . " -p ". $this->_password  . " " . $this->_db_name . " | gzip > " . $path_backup;
            if(function_exists('shell_exec')) {
                exec("C:\\\\xampp\mysql\binmysqldump.exe --opt -h " .$this->_host." -u " .  $this->_username . " -p ".$this->_password." ".$this->_db_name ." > ".$path_backup, $output, $return);
            }
            if($return !== 0){
                return ["backup_name" => $backup_file, "ref_path" => $path_backup ];
            }
            if(system($command)){
                return ["backup_name" => $backup_file, "ref_path" => $path_backup ];
            }
            return false;
        }

}