$(document).ready(()=>{

    function getSelectRoomType(){
        requestJson.get(`app/room/category/list?limit=100`)
        .then(data=>{
            if(data.response === "OK"){
                const container = document.querySelector("#inputRoomType");
                if(container){
                    const requestcontent = data.result.list.map(item =>{
                        return `<option value="${item.id}">${item.category}</option>`
                    })
                    container.innerHTML = `<option value="" selected>Choose Room Type...</option>`
                    requestcontent.forEach(el=>{
                        container.innerHTML += el
                    })
                }
            }
        })
    }
    
    function getSelectRoomStatus(){
        requestJson.get(`app/room/status`)
        .then(data=>{
            if(data.response === "OK"){
                const container = document.querySelector("#inputRoomStatus");
                if(container){
                const requestcontent = data.result.list.map(item =>{
                    return `<option value="${item.id}">${item.status_name}</option>`
                })
                container.innerHTML = `<option value="" selected>Choose Room Status...</option>`
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                }
            }
        })
    }

    $("#room_details").submit(function(event) {
        body = JSON.stringify({
            id : getCookie('sessionid'),
            room_number : $("#inputRoomNumber").val(),
            room_type : $("#inputRoomType").val(),
            room_occupancy : $("#inputOccupancy").val(),
            stats : $('#inputRoomStatus').val(),
            pol: $('#inputPolicy').val(),
            room_rate : $('#inputTypeRate').val().replace(",",""),
            adtl_adult : $('#inputAdtlAdult').val().replace(",",""),
            adtl_kid : $('#inputAdtlChild').val().replace(",","")
        })
        requestJson.post(`app/room/new`,body)
        .then(data => {
            if(data.response === "Created"){
                getSelectRoomType()
                getSelectRoomStatus()
                $("#inputRoomNumber").val("")
                $("#inputRoomType").val("")
                $("#inputOccupancy").val("")
                $('#inputRoomStatus').val("")
                $('#inputPolicy').val("")
                $('#inputTypeRate').val("")
                $('#inputAdtlAdult').val("")
                $('#inputAdtlChild').val("")
                alert(data.message)
            }
        })
        event.preventDefault()
    })
    
    $("input[data-type='currency']").on({
        keyup: function() {
        formatCurrency($(this));
        },
        blur: function() { 
        formatCurrency($(this), "blur");
        }
    });
    

    getSelectRoomType()
    getSelectRoomStatus()
})




