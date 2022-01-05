<?php
 $root = explode("/",$_SERVER['REQUEST_URI']);
 $filtered_root  = array_filter($root,"strlen");
 $server_path =  array_shift($filtered_root);

if (isset($_COOKIE['sessionid'])) {
    unset($_COOKIE['sessionid']); 
    setcookie('sessionid', null, -1, '/');
}
if (isset($_COOKIE['id'])) {
    unset($_COOKIE['id']); 
    setcookie('id', null, -1, '/');
}
if (isset($_COOKIE['temp'])) {
    unset($_COOKIE['temp']); 
    setcookie('temp', null, -1, '/');
}
header("location: ../../../dashboard"); 
exit();
?>