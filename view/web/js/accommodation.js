var $room_id = 0,$category = "";

const createBooking = (id,cat) =>{
    $room_id = id;
    $category = cat;
}

const getRoomList = () =>{
    
    fetch(`../../app/room/category/list?limit=100`)
    .then(data=>data.json())
    .then(data=>{
        if(data.response === "OK"){
            if(data.result.hasOwnProperty("list")){
                $.each(data.result.list, function (i, item) {
                    if(item.category === "Full Resort Reservation"){
                        return
                    }
                    $("#room_list").html("");
                    $("#room_list").append(`<div class="col-lg-6">
    				    <div class="room-wrap d-md-flex">
                            <a href="#" class="img" style="background-image: url( ../../${item.photo});"></a>
                                <div class="half left-arrow d-flex align-items-center">
                                    <div class="text p-4 p-xl-5 text-center">
                                        <p class="star mb-0"><span class="ion-ios-star"></span><span class="ion-ios-star"></span><span class="ion-ios-star"></span><span class="ion-ios-star"></span><span class="ion-ios-star"></span></p>
                                        
                                        <h3 class="mb-3"><a href="#">${item.category}</a></h3>
                                        <p style="color:#000">${item.room_description}</p>
                                        <label for="modal1" class="btn btn-black" onclick="createBooking('${item.id}','${item.category}')">Book  Now</label>
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
                        alert(`All ${getParameterByName('roomname')} room type has been booked, another date. Thank you!`)
                        return;
                    }
                    if(data.result.list.length > 1){
                        var data = `checkin=${$('#input_date_checkin').val()}&checkout=${$('#input_date_checkout').val()}&person=${$("#inputGuestCount").val()}&roomtype=${$room_id}&roomname=${$category}`
                        window.location.href = "../../view/web/page/rooms.html?" + data
                    }
                }
            }
        }
    })
    
})