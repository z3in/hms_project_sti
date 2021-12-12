const getRoomCategory = () =>{
    
    requestJson.get(`app/room/category/list?limit=100`)
    .then(data=>{
        if(data.response === "OK"){
            if(data.result.hasOwnProperty("list")){

                $.each(data.result.list, function (i, item) {
                    if(item.category === "Full Resort Reservation"){
                        return
                    }
                    $("#inputRoomType").append($('<option>', { 
                        value: item.id,
                        text : capitalizeFirstLetter(item.category) 
                    }));
                });

                return
            }
            

            
        }
    })
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

const getMaxOccupancy = () =>{
    requestJson.get('app/room/maxperson')
    .then(data =>{
        if(data.response === "OK"){
            if(data.hasOwnProperty("result")){
                $("#inputGuestCount").find('option').remove()
                let options = range(1,parseInt(data.result))
                $.each(options, function (i, item) {
                    $("#inputGuestCount").append($('<option>', { 
                        value: item,
                        text : `${item} Adult` 
                    }));
                });
            }
        }
    })
}


function checkReservation(){
    var data = `checkin=${$('#datecheck_in').val()}&checkout=${$('#datecheck_out').val()}&person=${$("#inputGuestCount").val()}&roomtype=${$("#inputRoomType").val()}&roomname=${$("#inputRoomType option:selected" ).text()}`
    window.location.href = "view/web/page/rooms.html?" + data
}

$(document).ready(()=>{
    getRoomCategory()
    getMaxOccupancy()
})

