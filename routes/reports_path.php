<?php


Router::route('/app/reports/daily_audit', function(){
    Reports::DailyAudit();
});

Router::route('/app/reports/income_report', function(){
    Reports::IncomeReport();
});

Router::route('/app/reports/booking_report', function(){
    Reports::BookingReport();
});

Router::route('/app/reports/booking_report/pdf', function(){
    Reports::createPdfBookingReport();
});
