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
                            <small class="card-text"> valid untily ${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(item.validity))}(maximum discount ${item.discount_limit}).</small>
                        </div>
                        </div>
                    </li>`);
                });
                
                return
            }
            

            
        }
    })
}

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}


function checkReservation(){
    var data = `checkin=${$('#datecheck_in').val()}&checkout=${$('#datecheck_out').val()}&person=${$("#inputGuestCount").val()}&roomtype=${$("#inputRoomType").val()}&roomname=${$("#inputRoomType option:selected" ).text()}`
    window.location.href = "view/web/page/rooms.html?" + data
}

$(document).ready(()=>{
    getDiscountList()
})

