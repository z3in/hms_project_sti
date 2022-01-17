<?php

class Booking extends Helpers{

    private $id,
            $from,
            $to,
            $type,
            $search,
            $date,
            $date_start,
            $date_end;

    public function set_id($id){
        $this->id = $id;
    }
    public function setBooking($type,$from,$to){
        $this->type = $type;
        $this->from = date('Y-m-d',strtotime($from));
        $this->to = date('Y-m-d',strtotime($to));
    }
    
    public function setSearch($search){
        $this->search = $search;
    }
    public function setDateSearch($date){
        $this->date = date('Y-m-d',strtotime($date)) . '%';
    }

    public function setMonthSearch($ds,$de){
        $this->date_start = $ds;
        $this->date_end = $de;
    }

    public function countAvailableRooms(){
        $sql = "SELECT * FROM `rooms` a LEFT JOIN `room_types` c ON a.`room_type` = c.id
                    WHERE (a.`status` = 3 
                    AND a.`room_type` =:room AND a.`id` NOT IN
                        (
                        SELECT b.`room_id` FROM `booking` b
                            WHERE (b.`date_from` >:date_from 
                            AND b.`date_to` <:date_to 
                            AND b.`status` = 3)
                        ))";
        $stmt = $this->conn->prepare($sql);
        $data = [
            "date_from" => $this->from,
            "date_to" => $this->to,
            "room" => $this->type
        ];
        $stmt->execute($data);
        return $stmt;
    }

    public function selectAvailableRooms($offset,$rowsperpage){
        $sql = "SELECT a.id,a.room_number,a.room_type,a.room_occupancy,a.status,a.room_rate,a.adtl_adult,a.adtl_kid,
            a.policy,c.room_description,c.category,c.bed,c.photo FROM `rooms` a LEFT JOIN `room_types` c ON a.`room_type` = c.id
                    WHERE (a.`status` = 3 
                    AND a.`room_type` =? AND a.`id` NOT IN
                        (
                        SELECT b.`room_id` FROM `booking` b
                            WHERE b.`date_from` <= ? 
                            AND b.`date_to` >= ? 
                            AND b.`status` = 1
                        )) LIMIT ?,?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $this->type);
        $stmt->bindParam(2, $this->from);
        $stmt->bindParam(3, $this->to);
        $stmt->bindParam(4, $offset, PDO::PARAM_INT);
        $stmt->bindParam(5, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function insertBooking($data){
        $sql = "INSERT INTO booking(
                                    reservation_type,room_id,date_from,date_to,
                                    nights,guests,fname,lname,mname,`status`,phone,
                                    email,gender,street_add,city_add,zip_add,
                                    payment_method,ref_id,userid
                                    )
                                    VALUES(
                                    :reservation_type,:room_id,:date_from,:date_to,
                                    :nights,:guests,:fname,:lname,:mname,:stat,:phone,
                                    :email,:gender,:street_add,:city_add,:zip_add,
                                    :payment_method,:ref_id,:userid
                                    )";

        $stmt = $this->conn->prepare($sql);
        $params = [
            "reservation_type" => $data['reservation_type'],
            "room_id" => $data['roomid'],
            "date_from" => date('Y-m-d',strtotime($data['checkin'])),
            "date_to" => date('Y-m-d',strtotime($data['checkout'])),
            "nights" => $data['nights'],
            "guests" => $data['person'],
            "fname" => $data['first'],
            "lname" => $data['last'],
            "mname" => $data['middle'],
            "stat" => $data['status'],
            "phone" => $data['phone'],
            "email" => $data['email'],
            "gender" => $data['gender'],
            "street_add" => $data['address'],
            "city_add" => $data['city'],
            "zip_add" => $data['zipcode'],
            "payment_method" => $data['card_brand'],
            "ref_id" => $data['ref_num'],
            "userid" => $data['user_id']
        ];
        if($stmt->execute($params)){
            return $this->conn->lastInsertId();
        }
        return false;
    }

    public function countAllRow(){

        $sql = "SELECT COUNT(*) FROM booking";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        return $stmt;
        
    }

    public function selectAllBooking($offset,$rowsperpage){
        $sql = "SELECT * FROM booking_list LIMIT ?, ?";

        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $offset, PDO::PARAM_INT);
        $stmt->bindParam(2, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function countAllSearchedRow(){
        $sql = "SELECT COUNT(*) FROM booking_list WHERE ref_id like ? or fullname like ?";
        $stmt = $this->conn->prepare($sql);
        $data = '%'. $this->search . '%';
        $stmt->bindParam(1, $data);
        $stmt->bindParam(2,$data);
        $stmt->execute();
        return $stmt;
    }

    public function selectSearchAllBooking($offset,$rowsperpage){
        $sql = "SELECT * FROM booking_list WHERE ref_id like ? or fullname like ? LIMIT ?, ?";

        $stmt = $this->conn->prepare($sql);
        $data = '%'. $this->search . '%';
        $stmt->bindParam(1, $data);
        $stmt->bindParam(2, $data);
        $stmt->bindParam(3, $offset, PDO::PARAM_INT);
        $stmt->bindParam(4, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function countAllSearchedDate(){
        $sql = "SELECT COUNT(*) FROM booking_list WHERE `date_from` >= ? AND `date_to` <= ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $this->date_start);
        $stmt->bindParam(2, $this->date_end);
        $stmt->execute();
        return $stmt;
    }
    
    public function selectDateSearch($offset,$rowsperpage){
        $sql = "SELECT * FROM booking_list WHERE `date_from` >= ? AND `date_to` <= ? LIMIT ?, ?";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(1, $this->date_start);
        $stmt->bindParam(2, $this->date_end);
        $stmt->bindParam(3, $offset, PDO::PARAM_INT);
        $stmt->bindParam(4, $rowsperpage, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt;
    }

    public function selectSingleReservation($id){
        $this->id = $id;
        $sql = "SELECT * FROM booking_list where `id` = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam("id", $this->id);
        $stmt->execute();
        return $stmt;
    }

    public function updateStatus($stat){
           $sql = "UPDATE booking set `status` = :stat";
        if($stat == 2){
             $sql .= " ,check_in = :check";
        }
        if($stat == 5){
            $sql .= " ,check_out = :check";
        }
        $sql .= " WHERE id = :id";
        $stmt = $this->conn->prepare($sql);
        if($stat == 5 || $stat == 2){
            $date = TimeAndDate::timestamp();
            $stmt->bindParam("check", $date);
        }
        $stmt->bindParam("stat", $stat);
        $stmt->bindParam("id", $this->id);
        $stmt->execute();
        return $stmt;
    }
}