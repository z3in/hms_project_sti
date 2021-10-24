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