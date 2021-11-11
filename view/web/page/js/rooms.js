
$(document).ready(() =>{
    requestJson.get(`../../../app/room/available?checkin=${getParameterByName('checkin')}&checkout=${getParameterByName('checkin')}&type=${getParameterByName('roomtype')}&limit=1`)
    .then(data => {
        if(data.response){
            let container = document.querySelector("#room_list")
            
            if(data.hasOwnProperty("result")){
                if(data.result.list.length < 1){
                    alert(`All ${getParameterByName('roomname')} room type has been booked, Please choose another room or another date. Thank you!`)
                    return window.location.href = '../../../'
                }
                const arrayUniqueByKey = [...new Map(data.result.list.map(item =>
                    [item['category'], item])).values()];
                const requestcontent = arrayUniqueByKey.map(item =>{ 
                                        return `
                                                <div class="col-lg-6 p-0" style="box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;">
                                                    <div class="room-wrap d-md-flex">
                                                        <a href="#" class="img" style="background-image: url(../../../${item.photo});"></a>
                                                       
                                                        <div class="half left-arrow d-flex align-items-center">
                                                        
                                                            <div class="text p-4 p-xl-5 text-center">
                                                            
                                                                <p class="mb-0"><span class="price mr-1">PHP${item.room_rate}</span> <span class="per">per night</span></p>
                                                                <h3 class="mb-3">${item.category}</h3>
                                                                <p><small style="color:#000">${item.room_description}</small></p>
                                                                <p><small style="color:#000">Occupancy : ${item.room_occupancy}</small></p>
                                                                <p class="btn btn-secondary" style="color:#dfdfdf">Selected Room</p>
                                                                <!--<p class="pt-1"><a href="#" onclick="gotoLink(${item.id},${item.room_rate}})" class="btn-custom px-3 py-2">Select Room <span class="icon-long-arrow-right"></span></a></p>-->
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <input type="hidden" id="inputRoomRate" value="${item.room_rate}" />
                                                <input type="hidden" id="inputRoomID" value="${item.id}" />
                                                `
                })
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                return
            }
            if(!data.hasOwnProperty("result")){
                alert(`No Rooms Available for Room Type : ${getParameterByName('roomname')}`)
                return window.location.href ="../../../"
            }
        }

    })

    $("#btnGuestDetails").click((event)=>{
        event.preventDefault();
    
        let searchParams = new URLSearchParams(window.location.search);
        let prev_data = searchParams.toString()
        if($("#inputGender").val() == ""){
            $("#inputGender").focus()
            return alert('Please select Gender')
        }
        let room = `&roomrate=${$("#inputRoomRate").val()}&roomid=${$("#inputRoomID").val()}`
        let personal = `&first=${$("#inputFirstName").val()}&last=${$("#inputLastName").val()}&middle=${$("#inputMiddleName").val()}&gender=${$("#inputGender option:selected" ).text()}`
        let contact = `&phone=${$("#inputPhoneNumber").val()}&email=${$("#inputEmail").val()}`
        let address = `&address=${$("#inputStreetAddress").val()}&city=${$("#inputCity").val()}&zipcode=${$("#inputZipCode").val()}`
        let data = prev_data + room + personal + contact + address
        window.location.href=`./payment.html?${data}`
       
    })
})
