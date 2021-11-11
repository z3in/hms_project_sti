<?php
Router::route('/app/billing/', function(){
    Billing::showBillingList();
});
