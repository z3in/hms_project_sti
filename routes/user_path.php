<?php

/* USER CLASS PATH */

Router::route('/app/user/login', function(){
    User::userLogin();
});

Router::route('/app/user/list', function(){
    User::userList();
});