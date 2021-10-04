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
            exit(Response::send(400,$error));
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
    public static function send($code,$message,$data_name = 'data',$data = null){
        $suc_msg = array(
            'response' => self::getHttpStatusCode($code),
            'message' => $message,
            'timestamp' => TimeAndDate::timestamp(),
            $data_name => $data
        );
        $filtered_res = array_filter($suc_msg);
        print_r(json_encode(self::utf8ize($filtered_res)));
        http_response_code($code);
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

    public static function getHttpStatusCode($code){
        $http_status_codes = array(100 => "Continue", 101 => "Switching Protocols", 102 => "Processing", 200 => "OK", 201 => "Created", 202 => "Accepted", 203 => "Non-Authoritative Information", 204 => "No Content", 205 => "Reset Content", 206 => "Partial Content", 207 => "Multi-Status", 300 => "Multiple Choices", 301 => "Moved Permanently", 302 => "Found", 303 => "See Other", 304 => "Not Modified", 305 => "Use Proxy", 306 => "(Unused)", 307 => "Temporary Redirect", 308 => "Permanent Redirect", 400 => "Bad Request", 401 => "Unauthorized", 402 => "Payment Required", 403 => "Forbidden", 404 => "Not Found", 405 => "Method Not Allowed", 406 => "Not Acceptable", 407 => "Proxy Authentication Required", 408 => "Request Timeout", 409 => "Conflict", 410 => "Gone", 411 => "Length Required", 412 => "Precondition Failed", 413 => "Request Entity Too Large", 414 => "Request-URI Too Long", 415 => "Unsupported Media Type", 416 => "Requested Range Not Satisfiable", 417 => "Expectation Failed", 418 => "I'm a teapot", 419 => "Authentication Timeout", 420 => "Enhance Your Calm", 422 => "Unprocessable Entity", 423 => "Locked", 424 => "Failed Dependency", 424 => "Method Failure", 425 => "Unordered Collection", 426 => "Upgrade Required", 428 => "Precondition Required", 429 => "Too Many Requests", 431 => "Request Header Fields Too Large", 444 => "No Response", 449 => "Retry With", 450 => "Blocked by Windows Parental Controls", 451 => "Unavailable For Legal Reasons", 494 => "Request Header Too Large", 495 => "Cert Error", 496 => "No Cert", 497 => "HTTP to HTTPS", 499 => "Client Closed Request", 500 => "Internal Server Error", 501 => "Not Implemented", 502 => "Bad Gateway", 503 => "Service Unavailable", 504 => "Gateway Timeout", 505 => "HTTP Version Not Supported", 506 => "Variant Also Negotiates", 507 => "Insufficient Storage", 508 => "Loop Detected", 509 => "Bandwidth Limit Exceeded", 510 => "Not Extended", 511 => "Network Authentication Required", 598 => "Network read timeout error", 599 => "Network connect timeout error");
        return $http_status_codes[$code];
    }
}

class TimeAndDate{

    public static function timestamp(){
        date_default_timezone_set('Asia/Manila');
        $date = date("Y-m-d H:i:s");
        return $date;
    }
}