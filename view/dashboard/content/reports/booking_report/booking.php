<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .card{
            background-color: none!important;
        }
        .top-container h1{
            margin-top:1em;
        }
        table tr:nth-child(even){
            background:rgba(240, 240, 240, 0.521);
        }
        .content-feature .card-body{
            justify-content: center;
            align-items: center;
        }
        .content-feature .card h3{
            font-size: 50px;
            text-decoration: none;
            color:#b69100cc;
            float: left;
            margin-right:.5em;
            padding-left:.25em;
        }
        .content-feature .card span{
            font-size: 1.5rem;
            text-decoration: none;
            color:inherit;
        }
        .content-feature .card p{
            text-decoration: none;
            color:inherit;
            display: flex;
            flex-direction: column;
            min-width: 200px;
        }
        .content-feature .card{
            border-radius: 10px;
            color:#222;
            margin:0 1em;
        }
        .content-feature .card-body{
            width:100%;
        }
        .content-feature .card small{
            color:#9f9f9f;
        }
        .content-feature .card .card-body {
            display:flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-between;
        }
    </style>
    <title>Document</title>
</head>
<body>

        <div class="top-container">
            <h1 style="color:#fff;">Booking Report</h1>
        </div>
        
        <div class="container-main">
            <div class="content-feature">
                <div class="card col2">
                    <div class="card-body">
                        <div>
                        <h3 id="res_count">0</h3>
                        <p><span>Reservations count</span><small>Search a date and click generate report to view list</small></p>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text input-group-sm" id="">Dates</span>
                              </div>
                            <input type="date" class="form-control" id="date_start"/>
                            <input type="date" class="form-control" id="date_end"/>
                            <div class="input-group-append">
                                <button style="color:#fff" class="btn btn-secondary" id="search_report">Generate Report</button>
                            </div>
                          </div>
                    </div>
                </div>
                
                <div class="card col">
                    <div class="card-body">
                        <p><span>Export Report</span><small>file will be downloadable as "PDF" and can then be imported into spreadsheet application.</small></p>
                        <div class="form-group mb-0 w-100" aria-label="user management">
                            <form method="POST">
                                <button type="submit" name="create_pdf" class="btn btn-block btn-warning" id="report_download"><i class="fas fa-download"></i> Download Report</button>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="card">
                <div class="card-body">
                <div class="row">
                    <div class="col">
                        <h5 class="card-title">Showing search result</h5>
                    </div>
                    <p style="float:right">
                            <label>Filter result : </label>
                            <select id="reservation_filter" class="form-select" aria-label="">
                            <option selected value="">Select from option</option>
                            <option value="CHECK-IN">Check-In</option>
                            <option value="CHECK-OUT">Check-Out</option>
                            <option value="RESERVED">Reserved</option>
                            <option value="CANCELLED">CANCELLED</option>
                        </select></p>
                </div>
                        <table class="table">
                            <thead>
                            <tr>
                                <th scope="col">Booking ID</th>
                                <th scope="col">Status</th>
                                <th scope="col">Check-In</th>
                                <th scope="col">Check-Out</th>
                                <th scope="col">Guest</th>
                                <th scope="col">Price</th>
                                <th scope="col">Created</th>
                            </tr>
                            </thead>
                            <tbody id="data-container">
                            </tbody>
                        </table>    
                    
                </div>
            </div>
        </div>
        <script type="text/javascript" src="view/dashboard/content/reports/booking_report/booking.js"></script>
</body>
</html>