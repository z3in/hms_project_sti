<?php

/* USER ROLES */

Router::route('/app/user/add/role', function(){
    PositionManagement::addPosition();
});

Router::route('/app/user/role/list', function(){
   PositionManagement::getPositions(); 
});