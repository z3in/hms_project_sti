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