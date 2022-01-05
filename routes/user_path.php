<?php

/* USER CLASS PATH */

Router::route('/app/user/login', function(){
    User::userLogin();
});

Router::route('/app/user/list', function(){
    User::userList();
});

Router::route('/app/user/add', function(){
    User::addUser();
});

Router::route('/app/user', function(){
    User::viewUser();
});



Router::route('/app/contact/send', function(){
    Mailer::contactSend();
});
Router::route('/app/event/request', function(){
    ManageEvent::addNewEvent();
});

Router::route('/app/event/list', function(){
    ManageEvent::getEventList();
});


