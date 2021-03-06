var $room_id = 0,$category = "";

const createBooking = (id,cat) =>{
    $room_id = id;
    $category = cat;
}

const getRoomList = () =>{
    
    fetch(`../../app/room?limit=100`)
    .then(data=>data.json())
    .then(data=>{
        if(data.response === "OK"){
            if(data.result.hasOwnProperty("list")){
                $("#room_list").html("");
                $.each([...new Map(data.result.list.map(item => [item['room_type'], item])).values()], function (i, item) {
                    if(item.room_type === "Full Resort Reservation"){
                        return
                    }
                    
                    $("#room_list").append(`<div class="col-lg-6">
    				    <div class="room-wrap d-md-flex">
                            <a class="img" style="background-image: url( ../../${item.photo});"></a>
                                <div class="half left-arrow d-flex align-items-center">
                                    <div class="text p-4 p-xl-5 text-center">
                                        
                                        <h3 class="mb-3"><a href="#">${item.room_type}</a></h3>
                                        <h4 style="display: inline-block;
                                        color: #000000;
                                        border: 2px solid rgba(0, 0, 0, 0.1);padding:.25em 1em">Php ${parseFloat(item.room_rate).toFixed(2)}</h4>
                                        <p style="color:#000;">${item.room_description}</p>
                                        <label for="modal1" class="btn btn-black" onclick="createBooking('${item.room_type_id}','${item.room_type}')">Book  Now</label>
                                    </div>
                                </div>
                         </div>
    			        </div>`);
                });
                
                return
            }
            

            
        }
    })
}

getRoomList()

$("#btn_date_checkout").click(()=>$("#input_date_checkout").focus())
$("#input_date_checkout").datepicker()
$("#btn_date_checkin").click(()=>$("#input_date_checkin").focus())
$("#input_date_checkin").datepicker()

$("#modalform").submit((event)=>{
    if($("#input_date_checkin").val() === "" || $("#input_date_checkout").val() === ""){
        alert("Please Select Dates for your Reservation")
        return;
    }
    event.preventDefault()
    fetch(`../../app/room/available?checkin=${$("#input_date_checkin").val()}&checkout=${$("#input_date_checkout").val()}&type=${$room_id}&limit=1`)
    .then(data => data.json())
    .then(data => {
        if(data.response){
            if(data.hasOwnProperty("result")){
                if(data.result.hasOwnProperty("list")){
                    if(data.result.list.length < 1){
                        alert(`All ${$category} room type has been booked, another date. Thank you!`)
                        return;
                    }
                    if(data.result.list.length > 0){
                        var data = `checkin=${$('#input_date_checkin').val()}&checkout=${$('#input_date_checkout').val()}&person=${$("#inputGuestCount").val()}&kids=${$("#inputKidsCount").val()}&roomtype=${$room_id}&roomname=${$category}`
                        return window.location.href = "../../view/web/page/terms.html?" + data
                    }
                }
            }
            alert(`All ${$category} room type has been booked, another date. Thank you!`)
            return;
        }
    })
    
})