const getDiscountList = () =>{
    
    fetch(`../../app/discount?limit=100`)
    .then(data=>data.json())
    .then(data=>{
        if(data.response === "OK"){
            if(data.result.hasOwnProperty("list")){
                $.each(data.result.list, function (i, item) {
                    $("#discount_list").append(`<li>
                    <div class="card" style="width: 100%">
                        <div class="card-body">
                            <h3 class="card-title">${item.promo_code}</h3>
                            <h4>Discount Rate : ${item.discount_rate}</h4>
                            <small class="card-text"> valid untily ${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(item.validity))}.</small>
                        </div>
                        </div>
                    </li>`);
                });
                
                return
            }
            

            
        }
    })
}

$(document).ready(()=>{
    getDiscountList()
    
})

$("#btn_date_checkout").click(()=>$("#input_date_checkout").focus())
$("#input_date_checkout").datepicker()
$("#btn_date_checkin").click(()=>$("#input_date_checkin").focus())
$("#input_date_checkin").datepicker()
$("#btn_request_date").click(()=>$("#input_request_date").focus())
$("#input_request_date").datepicker()

$("#modalform").submit((event)=>{
    
    event.preventDefault()
    if($("#input_date_checkin").val() === "" || $("#input_date_checkout").val() === ""){
        alert("Please Select Dates for your Reservation")
        return;
    }
    fetch(`../../../app/room/available?checkin=${$("#input_date_checkin").val()}&checkout=${$("#input_date_checkout").val()}&type=${1}&limit=1`)
    .then(data => data.json())
    .then(data => {
        if(data.response){
            if(data.hasOwnProperty("result")){
                if(data.result.list.length < 1){
                    alert(`All ${getParameterByName('roomname')} room type has been booked, another date. Thank you!`)
                }
            }
        }
    })
    var data = `checkin=${$('#input_date_checkin').val()}&checkout=${$('#input_date_checkout').val()}&person=${$("#inputGuestCount").val()}&roomtype=${1}&roomname=${"Full Resort Reservation"}`
    window.location.href = "../../view/web/page/rooms.html?" + data
})


$("#visit_form").submit((event)=>{
    event.preventDefault();
    var raw = {
        event_name : "occular visitation",
        requestor : $("#inputName").val(),
        request_date : $("#input_request_date").val(),
        stat : 1,
        phone :  $("#inputPhoneNumber").val(),
        email : $("#inputEmail").val(),
    }
    fetch(`../../app/event/request`,{method:"POST",body:JSON.stringify(raw)})
    .then(data => data.json())
    .then(data => {
        if(data.response === "Created"){
        $("#inputName").val() = "",
        $("#input_request_date").val() = ""
        $("#inputPhoneNumber").val() =""
        $("#inputEmail").val() =""
        }
        alert(data.message);
    })
})