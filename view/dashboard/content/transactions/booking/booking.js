$(document).ready(()=>{
    const getCheckindate = () =>  $( "#datecheck_in" ).datepicker()
    const getCheckoutdate = () =>  $( "#datecheck_out" ).datepicker()

    getCheckindate()
    getCheckoutdate()

    
    $("#btn_checkin").click(()=>$( "#datecheck_in" ).focus())
    $("#btn_checkout").click(()=>$( "#datecheck_out" ).focus())
});
    
