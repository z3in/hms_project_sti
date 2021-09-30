<?php

Class View {
    public static function dashboardDisplay(){
        $path = ROOT . DS . 'view'. DS . 'dashboard '. DS . 'index.html';
        include($path);
    }

    public static function dashboardLogin(){
        $path = ROOT . DS . 'view'. DS . 'dashboard '. DS . 'secure' . DS . 'login.html';
        include($path);
    }

    public static function webClientDisplay(){
        $path = ROOT . DS . 'view'. DS . 'web ' . DS . 'index.html';
        include($path);
    }

    public static function get404(){
        $path = ROOT . DS . '404.html';
        include($path);
    }
}
