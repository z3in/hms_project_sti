var url = new URL(document.location.href);
var id = url.searchParams.get("id");
var $status;

const getReservation = () =>{
requestJson.get(`app/reservation/get?id=${id}`)
.then(data => {
    if(data.response === "OK"){
        const { ref_id,date_from,date_to,fullname,email,nights,street_add,zip_add,city_add,phone,status_name } = data.booking 
        document.querySelector(".page-title").innerHTML = `Reservation # ${ref_id}`
        document.querySelector("#label_checkin").innerHTML = new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(date_from))
        document.querySelector("#label_checkout").innerHTML =  new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(date_to))
        document.querySelector("#label_name").innerHTML = fullname
        document.querySelector("#label_email").innerHTML = email
        document.querySelector("#label_night").innerHTML = nights
        document.querySelector("#label_address").innerHTML =`${street_add} ,${city_add} ${zip_add}`
        document.querySelector("#label_phone").innerHTML =  phone
        document.querySelector("#res_status").innerHTML = status_name;

        var btn_check = document.querySelector("#btn_check")
        if(status_name === "RESERVED"){
            btn_check.innerHTML = `<i class="fas fa-check"></i> Check In`
        }
        if(status_name === "OCCUPIED" || status_name === "COMPLETED"){
            btn_check.innerHTML = `<i class="fas fa-arrow-alt-circle-left"></i> Check Out`
        }
        if(status_name === "CANCELLED"){
            btn_check.style="display:none;"
            $("#btn_cancel").hide()
        }
        if(status_name === "COMPLETED"){
            $("#btn_cancel").hide()
        }

        $status = status_name
    }
})
}

const status_list = [
    {id:1,status:"RESERVED",next_status:{ id: 2,status:"OCCUPIED"}},
    {id:2,status:"OCCUPIED",next_status:{id:5,status:"COMPLETED"}},
    {id:3,status:"AVAILABLE",next_status:{id:3,status:"AVAILABLE"}},
    {id:4,status:"CANCELLED",next_status:{id:4,status:"CANCELLED"}},
    {id:5,status:"COMPLETED",next_status:{id:5,status:"COMPLETED"}},
];

$("#btn_check").click(function(){
    if(!confirm(`Are you sure you want to ${$status === "RESERVED" ? `check-in guest?` : `check-out guest?`}`)){
        return
    }
    var stat = status_list.filter(item => item.status === $status)
    var user = getCookie('sessionid')
    requestJson.post(`app/reservation/update_status`,JSON.stringify({id:id,status:stat[0].next_status.id,status_name:stat[0].next_status.status,user_id:user}))
    .then(data => {
        if(data.hasOwnProperty("message")){
            alert(data.message)
            getReservation()
        }
    })
})

$("#btn_cancel").click(function(){
    if(!confirm(`Are you sure you want to cancel this reservation ?`)){
        return
    }
    
    var stat = status_list.filter(item => item.status === "CANCELLED")
    requestJson.post(`app/reservation/update_status`,JSON.stringify({id:id,status:stat[0].next_status.id,status_name:stat[0].next_status.status,user_id:getCookie('sessionid')}))
    .then(data => {
        if(data.hasOwnProperty("message")){
            alert(data.message)
            getReservation()
        }
    })
})

getReservation()