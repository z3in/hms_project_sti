<?php

Router::route('/app/room/available', function(){
    Reservation::availableRooms();
});

Router::route('/app/reservation/save', function(){
    Reservation::saveReservation();
});

Router::route('/app/reservation', function(){
    Reservation::listAllBookings();
});

Router::route('/app/reservation/search', function(){
    Reservation::searchReservation();
});

Router::route('/app/reservation/get', function(){
    Reservation::viewReservation();
});

Router::route('/app/reservation/update_status',function(){
    Reservation::changeStatus();
});