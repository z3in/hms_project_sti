<?php

Class Audit{

    protected static function createInstance(){
        $conn = new Database();
        $db = $conn->connect('hms_hipnautic');
        $logs = new Logs($db);
        return $logs;
    }

    public static function createLog($id,$action,$module){
        $logs = self::createInstance();
        $logs->setUserid($id);
        $logs->setAction($action);
        $logs->setModule($module);

        $logs->insertLog();
    }
}