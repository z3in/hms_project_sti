<?php

Class ErrorValueException extends Exception{

    public function errorMessage() {
        //error message
        $errorMsg = 'Error on line '.$this->getLine().' in '.$this->getFile() . '. ' . $this->getMessage();
        return $errorMsg;
    }

}