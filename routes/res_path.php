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