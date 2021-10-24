<?php

use Xendit\Xendit;
require '../vendor/autoload.php';

class Booking{

    public static function Payment(){
        Xendit::setApiKey('xnd_production_mlHEd9rj5MQgGnfRpHhKr9dkyIRsNQkLasYRu2VgYiyI1u2OOIvfzQMOq9FNhUV');


        $data = json_decode(file_get_contents('php://input'), true);

        $params = [
            'token_id' => $data['id'],
            'external_id' => 'ref_' . strtotime("now"), // removed auth_id and debug - changed 3-13-2021
            'amount' => $data['amount'],
            'authentication_id' => $data['auth_id'],
            'card_cvn' => $data['cvn'], 
            'capture' => false,
            'currency' => 'PHP'
        ];

        $captureParams = ['amount' => $data['amount']]; // added - debug - changed 3-13-2021

        $createCharge = \Xendit\Cards::create($params);
        $id = $createCharge['id'];//addititonal code
        $getCharge = \Xendit\Cards::retrieve($id);//addititonal code

        $captureCharge = \Xendit\Cards::capture($id, $captureParams);//addititonal code

        $result = [
            "pending" => $createCharge,
            "captured" => $captureCharge//addititonal code
        ];

        print_r(json_encode($result));
    }
}
