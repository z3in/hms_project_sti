<!DOCTYPE html>
<html lang="en">
<head>
    
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,700,700i" rel="stylesheet">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.0/themes/base/jquery-ui.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://kit.fontawesome.com/7262583124.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.13.0/jquery-ui.js"></script>
    <script src="view/dashboard/js/common.lib.js" type="text/javascript"></script>
    <script src="view/dashboard/js/validate.security.js"></script>
    <script src="view/dashboard/js/load.content.js"></script>
    <script type="text/javascript" src="view/dashboard/js/card.js"></script>
    <script type="text/javascript" src="view/dashboard/js/helpers.js"></script>
    <title>Hip Nautic Beach Resort</title>
    <style>
        body {
            font-family: "Poppins", Arial, sans-serif;
            box-sizing: border-box;
            padding:0;
            margin:0;
        }
        .container-fluid{
            padding:0;
            margin:0;
            height:100vh;
            background-color: #e1e1e1;
        }
        .flex{
            display:flex;
        }
        .flex-row{
            flex-direction: row!important;
        }
        header{
            max-width:250px;
            height:100vh;
            width:100%;
            border-right:1px solid #EAEAEA;
            box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
            position: fixed;
            background-color:#fff;
        }
        header nav ul{
            list-style: none;
            padding:0 1em;
        }
        header nav ul.top-level{
            margin-top:100px;
        }
        header nav ul li a {
            text-decoration: none;
            color:#9f9f9f;
            transition: .25s ease-in-out;
            padding: .75em 1em;
            display: flex;
            align-items: center;
        }
        header nav ul li a:hover {
            color:#222222;
            text-decoration: none;
            font-weight: 700;
        }
        header nav ul li a span{
            margin-left:1em;
            font-size:1rem;
        }
        header nav ul li.selected a.main-link{
            font-weight: 700;
            background-color:#e9ecef;
            border-radius: 10px;
            
        }
        
        header nav ul.top-level li.main-menu.selected a{
            color:#222222;
        }
        header nav ul.top-level li.main-menu ul{
            margin-top:.5em;
            padding:0 1em;
            opacity: 0;
            transition: all 0.5s ease 0s;
        }
        header nav ul.top-level li.main-menu.selected ul li a{
            color:#9f9f9f;
        }
        header nav ul.top-level li.main-menu ul li a span{
            font-size: 1rem;
            display: block;
        }

        main{
            background-color:#e1e1e1;
            width:100%;
            padding-bottom:1em;
            display:flex;
            flex-direction: column;
            justify-content: center;
            margin-left:250px;
            height: 100%;
        }
        main .container-main{
            width:100%;
            height:100%;
            padding:0em 2em;
        }
        main .top-container{
            background-color: #fff;
            margin-bottom:2em;
            height:250px;
            background: linear-gradient(180deg, #07163E 0%, #0E1A39 52.08%, #696A6B 100%);
            padding:1em 2em;
        }
        .signout{
            position:absolute;
            bottom:25px;
            left:55px;
        }
        .signout p a span {
            margin-left:.5em;
        }
        .signout p a {
            background-color:#222222;
            color:#e9ecef;
            padding:.5em 1.5em;
            border-radius: 5px;
        }
        .logo{
            margin-top:2em;
            width:70%;
            height:150px;
            background-color: #b69100cc;
            
        }
        .logo h5{
            font-weight: 700;
            font-size: 20px;
            margin-left:1em;
            margin-top:1em;
            padding-right:2em;
            text-transform: uppercase;
            color:#fff;
            display: block;
            transform: translateY(20%);
            cursor: pointer;
        }
        .highlight-font{
            color:#222222!important;
            font-weight: 700;
        }
        .show {
            display:block!important;
            visibility: visible!important;
            opacity: 1!important;
        }
        .hidden{
            display: none;
            visibility: hidden;
            opacity: 0;
        }
        a:not([href]):not([tabindex]){
            color: #9f9f9f;
            cursor: pointer;
        }
        header nav ul.top-level li.main-menu.selected ul li a:hover{
            color:#222222;
        }

        .content-feature{
            margin-top:-125px;
            width: 100%;
            display: flex;
            margin-bottom:1em;
        }
        .content-feature .card{
            height: auto!important;
        }
        .col3{
            max-width:40%;
            width:auto;
            min-width:250px;
        }
        .col2{
            max-width:50%;
            min-width:200px;
            width:auto;
        }
        
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="flex flex-row">
            <header>
            <div class="logo">
                <h5>HIPNAUTIC BEACH RESORT</h5>
            </div>
            <nav>
                <ul class="top-level">
                    <li class="main-menu selected" data-nav="dashboard"><a class="main-link" href="dashboard"  data-url="dashboard"><i class="fas fa-hotel"></i><span>Dashboard</span></a></li>
                    <li class="main-menu withsub" data-nav="transactions" data-withsub=true><a class="main-link"><i class="fas fa-money-check-alt"></i><span>Transactions</span></a>
                        <ul class="submenu hidden" data-nav="sub-transactions">
                            <li><a href="dashboard?url=booking" data-url="booking"><span>Booking</span></a></li>
                            <li><a href="dashboard?url=billing" data-url="billing"><span>Billing</span></a></li>
                            <li><a href="dashboard?url=checkin" data-url="checkin"><span>Check-In</span></a></li>
                            <li><a href="dashboard?url=checkout" data-url="checkout"><span>Check-Out</span></a></li>
                        </ul>
                    </li>
                    <li class="main-menu withsub" data-nav="maintenance" data-withsub=true><a class="main-link"><i class="fas fa-cogs"></i><span>Maintenance</span></a>
                        <ul class="submenu hidden" data-nav="sub-maintenance">
                            <li><a href="dashboard?url=accommodation" data-url="accommodation"><span>Accomodation</span></a></li>
                            <li><a href="dashboard?url=facilities" data-url="facilities"><span>Facilities and Services</span></a></li>
                            <li><a href="dashboard?url=events" data-url="events"><span>Events</span></a></li>
                            <li><a href="dashboard?url=gallery" data-url="gallery"><span>Gallery</span></a></li>
                        </ul>
                    </li>
                    <li class="main-menu withsub" data-nav="utilities" data-withsub=true><a class="main-link"><i class="fas fa-tools"></i><span>Utilities</span></a>
                        <ul class="submenu hidden" data-nav="sub-utilities">
                            <li><a href="dashboard?url=usermaintenance" data-url="usermaintenance"><span>User Maintenance</span></a></li>
                            <li><a href="dashboard?url=backup" data-url="backup"><span>Back up and Restore</span></a></li>
                            <li><a href="dashboard?url=audit" data-url="audit"><span>Audit Trail</span></a></li>
                        </ul>
                    </li>
                    <li class="main-menu withsub" data-nav="reports" data-withsub=true><a class="main-link"><i class="fas fa-file-alt"></i><span>Reports</span></a>
                        <ul class="submenu hidden" data-nav="sub-reports">
                            <li><a href="dashboard?url=incomereport" data-url="incomereport"><span>Income Reports</span></a></li>
                            <li><a href="dashboard?url=dailyaudit" data-url="dailyaudit"><span>Daily Audit</span></a></li>
                            <li><a href="dashboard?url=bookingreport"  data-url="bookingreport"><span>Booking Report</span></a></li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div class="signout">
                <p><a href="#"><i class="fas fa-power-off"></i><span>sign out</span></a></p>
            </div>
            </header>
            <main>
                <?php 
                $url = isset($_REQUEST['url']) ? $_REQUEST['url'] : "" ;
                switch($url){
                    case 'booking' : 
                        return include 'content/transactions/booking/booking.html';
                    case 'billing' : 
                        return include 'content/transactions/billing/billing.html'; 
                    case 'checkin' :
                        return include 'content/transactions/checkin/checkin.html';
                    case 'guestinfo' :
                        return include 'content/transactions/checkin/guestdetails.html';
                    case 'billinfo' :
                        return include 'content/transactions/checkin/billinfo.html';
                    case 'accommodation' :
                        return include 'content/maintenance/accommodation/accommodation.html';
                    case 'accommodation_category' :
                        return include 'content/maintenance/accommodation/category/category.html';
                    case 'accommodation_room' :
                        return include 'content/maintenance/accommodation/room/room.html';
                    case 'usermaintenance' :
                        return include 'content/util/user_maintenance/usermaintenance.html';
                    case 'createuser' :
                        return include 'content/util/user_maintenance/createuser.html';
                    case 'manageposition' :
                        return include 'content/util/user_maintenance/manageposition/manageposition.html';
                    case 'audit' :
                        return include 'content/util/audit/audit.html';
                    case 'backup' :
                        return include 'content/util/backupandrestore/backup.html';
                    default :
                        return include 'content/dashboard/dashboard.html';
                }
                ?>
            </main>
        </div>
    </div>
    
   
</body>
</html>