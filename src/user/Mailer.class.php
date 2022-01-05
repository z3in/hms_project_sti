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
            ->setContentType("text/html")
            ->setFrom([self::$email => "Hip Nautic Beach Resort"])
            ->setTo([$email])
            ->setBody("<h2>" . $vkey . "</h2>
               <h4>Do not share this to anybody</h4>");

        ob_end_clean();
        return $mailer->send($message);
        }
        catch(Exception $e){
            echo $e->getMessage();
        }
	}

    public static function contactSend(){
        $data = Validate::JSONdata();
        Validate::defineMethod("POST");
        try{
            $transport = (new Swift_SmtpTransport("smtp.googlemail.com", 465, "ssl"))
                ->setUsername(self::$email)
                ->setPassword(self::$password)
            ;
    
            $mailer = new Swift_Mailer($transport);
    
            // Create a message
            $message = (new Swift_Message("Contact Us Message"))
                ->setContentType("text/html")
                ->setFrom([self::$email => "Web Client Contact Us"])
                ->setTo([self::$email])
                ->setBody("
                    <h4>Messsage from website</h4>
                    <small>client information</small>
                    <p>Name : " . $data['name'] . "</p>
                    <p>Email : " . $data['email'] . "</p>
                    <p>Subject : " . $data['subject'] . "</p>
                    <p>Message : " . $data['message'] . "</p>
                ");
    
            $mailer->send($message);
            ob_end_clean();
                if($mailer){
                    exit(Response::send(200,'Message Sent! We will reply on your email as soon as we can.'));
                }
            }
            catch(Exception $e){
                echo $e->getMessage();
            }
            exit(Response::send(500,'Something went wrong! Please Refresh the page and try again.'));
    }

    public static function sendReceipt($email,$name,$reference_number,$res_date,$date){
        try{
            $transport = (new Swift_SmtpTransport("smtp.googlemail.com", 465, "ssl"))
                ->setUsername(self::$email)
                ->setPassword(self::$password)
            ;
    
            $mailer = new Swift_Mailer($transport);
    
            // Create a message
            $message = (new Swift_Message("Your Booking Confirmation Number with Hipnautic Beach Resort"))
                ->setContentType("text/html")
                ->setFrom([self::$email => "Hip Nautic Beach Resort"])
                ->setTo([$email])
                ->setBody("
                    <h4>Reservation Details</h4>
                    <small>date submitted : " . $date . "</small>
                    <p>Reservation For : " . $name . "</p>
                    <p>Reservation Date : " . $res_date . "
                    <p>Reference Number : " . $reference_number . "</p>
                ");
    
            $mailer->send($message);
            ob_end_clean();
               return $mailer->send($message);
            }
        catch(Exception $e){
            echo $e->getMessage();
        }
    }
}