<?php

/*audit*/
Router::route('/app/system/audit/all', function(){
    Audit::getLog(); 
});


/* DB management */

Router::route('/app/system/backup', function(){
Dbmanage::makeBackup();
});


Router::route('/app/system/backup/list', function(){
    Dbmanage::getBackupList();
});
