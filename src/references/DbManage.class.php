<?php

class DbManage{

    public static function makeBackup(){
        $conn = new Database();
        $conn->connect('hms_hipnautic');
        $conn->backup();
    }

}