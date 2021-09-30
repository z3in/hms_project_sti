<?php


Class Encryptor{
    
    public static function encryptToBase64($string){
        $encrypted_string = base64_encode($string);
        return $encrypted_string;
    }

    public static function decryptToBase64($string){
        $decrypted_string = base64_decode($string);
        return $decrypted_string;
    }
}