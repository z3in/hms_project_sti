<?php


class Validate{

    public static function validateStr($post){
        if(isset($post)){
            $clean = self::clean($post);
            return filter_var($clean, FILTER_SANITIZE_STRING);
        }else{
            return null;
        }
    }
    public static function clean($str){
        $str = preg_replace('/[^A-Za-z0-9\-]/', '',$str);
        return preg_replace('/-+/','-', $str);
    }
    public static function validateNum($num){
        if(isset($num)){
            return filter_var($num,FILTER_SANITIZE_NUMBER_INT);
        }else{
            return null;
        }
    }
    public static function defineError($params,$error,$param_name){
        if($params){
            return $message = $error == ""? "`" . $param_name . "` parameter not set" : ",`" . $param_name ."` parameter not set";
        }
        return '';
    }
    public static function defineMethod($method){
        
        if($_SERVER["REQUEST_METHOD"] != $method){
            exit(Response::resError(405,'Invalid Method. Please use '. $method. ' Method'));
        }
    }
    
    public static function errorValue($error){
        if($error != ''){
            exit(Response::resError(400,$error));
        }
    }
    public static function parsePUT($_PUT){
        
         foreach ($_PUT as $key => $value){
             unset($_PUT[$key]);
     
             $_PUT[str_replace('amp;','',$key)] = $value;
         }
         $_REQUEST = array_merge($_REQUEST,$_PUT);
    }
    public static function parseDELETE($_DELETE){
        
        foreach ($_DELETE as $key => $value){
            unset($_DELETE[$key]);
    
            $_DELETE[str_replace('amp;','',$key)] = $value;
        }
        $_REQUEST = array_merge($_REQUEST,$_DELETE);
   }

   public static function JSONdata(){
        $data = json_decode(file_get_contents('php://input'), true);
        return $data;
   }
}

class Response{
    // class used for generating json responses
    public static function resError($code,$message){
        $error_msg = array(
            'message' => $message 
        );

        print_r(json_encode($error_msg));
        http_response_code($code);
    }
    public static function success($message,$token = null,$data_name = 'data',$data = null){
        $suc_msg = array(
            'response' => 1,
            'message' => $message,
            'api_token'=> $token,
            $data_name => $data
        );
        $filtered_res = array_filter($suc_msg);
        print_r(json_encode(self::utf8ize($filtered_res)));
        http_response_code(200);
    }

    public static function utf8ize($mixed){
        if (is_array($mixed)) {
            foreach ($mixed as $key => $value) {
                $mixed[$key] = self::utf8ize($value);
            }
        } elseif (is_string($mixed)) {
            return mb_convert_encoding($mixed, "UTF-8", "UTF-8");
        }
        return $mixed;
    }
}
