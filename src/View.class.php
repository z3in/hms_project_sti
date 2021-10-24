<?php

Class View {
    public static function dashboardDisplay(){
        $path = ROOT . DS . 'view'. DS . 'dashboard'. DS . 'index.php';
        require_once($path);
    }

    public static function dashboardLogin(){
        $path = ROOT . DS . 'view'. DS . 'dashboard'. DS . 'secure' . DS . 'login.html';
        require_once($path);
    }

    public static function webClientDisplay(){
        $path = ROOT . DS . 'view'. DS . 'web' . DS . 'index.html';
        require_once($path);
    }

    public static function get404(){
        $path = ROOT . DS . '404.php';
        require_once($path);
    }
}
