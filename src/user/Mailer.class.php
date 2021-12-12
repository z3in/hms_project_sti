<?php
include('vendor/autoload.php');

class Mailer{

    private static $email = "hipnauticresort@gmail.com";
	private static $password = "Hipnautic1234_";


    public static function emailsend($email,$vkey){
		// Create the Transport
        try{
		$transport = (new Swift_SmtpTransport("smtp.googlemail.com", 465, "ssl"))
            ->setUsername(self::$email)
            ->setPassword(self::$password)
		;

		$mailer = new Swift_Mailer($transport);

		// Create a message
		$message = (new Swift_Message("User Verification"))
            ->setFrom([self::$email => "Hip Nautic Beach Resort"])
            ->setTo([$email])
            ->setBody($vkey);

        return $mailer->send($message);
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
	}
}