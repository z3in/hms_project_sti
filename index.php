<?php

include_once './config/Autoloader.php';   //load class components in to link
include_once './lib/Encryptor.lib.php';   //encryptor of sensitive data
include_once './lib/Common.lib.php';   //helpers functions
include_once './routes/controller.php';  //get request routes for devs

    $action = isset($_SERVER['PATH_INFO']) ? $_SERVER['PATH_INFO'] : "/"; //get path and pass it to routes to determine action
    Router::dispatch($action); //execute action and function