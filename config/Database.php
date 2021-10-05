<?php

class Database{

        private $_host = 'localhost'; // change credentials here servername
        private $_username = 'remote'; // change credentials here username
        private $_db_name = null; // DO NOT CHANGE THIS
        private $_password = 'VFVCb1lXSmhhR0ZpWVc1blVFQTFOWGN3Y21ReGREQWg=';// change credentials here password
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

            $filename = ROOT . DS . 'backup';
            if (!file_exists($filename)) {
                mkdir($filename, 0777);
            }
            $remove = array(":"," ");
            $file = str_replace($remove, "",TimeAndDate::timestamp()) . '.sql.gz';
            $mysqlExportPath  = ROOT . DS . "backup" . DS . 'backup' . $file;

            $command = 'mysqldump -h ' .$this->_host .' -u ' .$this->_username .' -p ' .$this->_password . ' ' . $this->_db_name .'| gzip > ' .$mysqlExportPath;
            shell_exec($command);

            header("Content-type: application/octet-stream");
            header("Content-Disposition: attachment; filename=\"$filename\"");

            passthru("cat {ROOT}{$file}");
            // switch($worked){
            //     case 0:
            //         return 'The database ' . $this->_db_name .' was successfully stored in the following path '. getcwd() .'/' .$mysqlExportPath;
            //     case 1:
            //         return 'An error occurred when exporting ' . $this->_db_name . getcwd() . '/' .$mysqlExportPath;
            //     case 2:
            //         return 'An export error has occurred, please check the following information [MySQL Database Name:' . $this->_db_name .' MySQL User Name:' .  $this->_username .' MySQL Password: NOTSHOWN MySQL Host Name:' . $this->_hostname;
            // }
            
        }

}