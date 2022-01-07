<?php
Router::route('/app/billing/', function(){
    Billing::showBillingList();
});


Router::route('/app/bill/get',function(){
    Billing::getBill();
});

Router::route('/app/bill/search',function(){
    Billing::searchBill();
});

Router::route('/app/bill/additional',function(){
    Billing::getAllAdditionalService();
});