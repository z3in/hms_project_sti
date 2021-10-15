<?php
Router::route('/dashboard', function(){
    View::dashboardDisplay();
});

Router::route('/dashboard/secure/login', function(){
    View::dashboardLogin();
});

Router::route('/', function(){
    View::webClientDisplay();
});