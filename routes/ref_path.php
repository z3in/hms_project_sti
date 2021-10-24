<?php

/* USER ROLES */

Router::route('/app/user/add/role', function(){
    PositionManagement::addPosition();
});

Router::route('/app/user/role/list', function(){
   PositionManagement::getPositions(); 
});

/* ROOMS */
Router::route('/app/rooms/category/add', function(){
   Rooms::createRoomCategory(); 
});

Router::route('/app/room/category/list', function(){
   Rooms::getRoomCategory(); 
});

Router::route('/app/room/status', function(){
Rooms::getRoomStatus(); 
});


Router::route('/app/room/new', function(){
   Rooms::createNewRoom(); 
});

Router::route('/app/room', function(){
   Rooms::viewRooms(); 
});

Router::route('/app/room/maxperson', function(){
   Rooms::getMaxOccupancy();
});

Router::route('/app/debug', function(){
   
   $password = '$2y$10$qOAPAitOtM5.SQwlM9Hd4uITUOzUCu.UQcNKYVZ8FFCL/VJeh8Obq';

   if(password_verify('password',$password)){
      return print_r('true');
   }
   return print_r('false');
});
