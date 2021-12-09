<?php

/* used for classes not to be included in each module when used instead invoke class and file will load automatically */

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__DIR__));

spl_autoload_register(function($className){
    $path_config = ROOT . DS . 'config' . DS . $className . '.php';
    $path_control = ROOT . DS . 'control' . DS . $className . '.control.php';
    $path_lib = ROOT . DS . 'lib' . DS . $className . '.lib.php';
    $path_model = ROOT . DS . 'model' . DS . $className . '.model.php';
    $path_model_ref = ROOT . DS . 'model' . DS . 'ref' . DS . $className . '.model.php';
    $path_src = ROOT . DS . 'src' . DS . $className . '.class.php';
    $path_src_user = ROOT . DS . 'src' . DS . 'user'. DS . $className . '.class.php';
    $path_src_ref = ROOT . DS . 'src' . DS . 'references'. DS . $className . '.class.php';
    $path_src_trans = ROOT . DS . 'src' . DS . 'transactions'. DS . $className . '.class.php';
    $path_src_reports = ROOT . DS . 'src' . DS . 'reports'. DS . $className . '.class.php';

    if(file_exists($path_config)){
        require_once($path_config);
    }else if(file_exists($path_control)){
        require_once($path_control);
    }else if(file_exists($path_model)){
        require_once($path_model);
    }else if(file_exists($path_model_ref)){
        require_once($path_model_ref);
    }else if(file_exists($path_src)){
        require_once($path_src);
    }else if(file_exists($path_src_user)){
        require_once($path_src_user);
    }else if(file_exists($path_src_ref)){
        require_once($path_src_ref);
    }else if(file_exists($path_lib)){
            require_once($path_lib);
    }else if(file_exists($path_src_trans)){
        require_once($path_src_trans);
    }else if(file_exists($path_src_reports)){
        require_once($path_src_reports);
    }else{
        echo '404 Page not Found';
    }

});