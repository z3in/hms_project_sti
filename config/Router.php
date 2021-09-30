<?php

class Router{

    public static $routes = array();

    public static function route($action,$callback){
        
        $action = trim($action, '/');
        
        self::$routes[$action] = $callback;
    }

    public static function dispatch($action){
        
        $action = trim($action, '/');

        $callback = self::$routes[$action];
        
        echo call_user_func($callback);
    }
}

