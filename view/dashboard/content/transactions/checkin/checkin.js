

$(document).ready(()=>{

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

    const getRoomCategory = () =>{
    
        requestJson.get(`app/room/category/list?limit=100`)
        .then(data=>{
            if(data.response === "OK"){
                if(data.result.hasOwnProperty("list")){

                    $.each(data.result.list, function (i, item) {
                        $("#inputRoomType").append($('<option>', { 
                            value: item.id,
                            text : item.category 
                        }));
                    });

                    return
                }
                

                
            }
        })
    }
    
    getMaxOccupancy()
    getRoomCategory()
    

    $("#btn_checkin").click(()=>$("#datecheck_in").focus())
    $("#btn_checkout").click(()=>$("#datecheck_out").focus())
    
    $("#checkin_form").submit((event)=>{
        if($("#inputRoomType").val() === ""){
            return alert("Please select Room Type");
        }
        var data = `checkin=${$('#datecheck_in').val()}&checkout=${$('#datecheck_out').val()}&person=${$("#inputGuestCount").val()}&roomtype=${$("#inputRoomType").val()}&roomname=${$("#inputRoomType option:selected" ).text()}`
        window.location.href=`dashboard?url=room_select&${data}`
        event.preventDefault();
    })

});
    
