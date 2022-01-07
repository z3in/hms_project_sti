var url = new URL(document.location.href);
var id = url.searchParams.get("id");
var $status;
$(document).ready(()=>{
    getReservation()
})

const getAdditional = (id) =>{
    requestJson.get(`app/bill/additional?id=${id}`)
    .then(data =>{
        if(data.result.hasOwnProperty("list")){
            $("#additional_container").html("")
            data.result.list.map(item =>{
                $("#additional_container").append(`<p> ${item.service_name ? item.service_name : item.service_id == "ADD_GUEST" ? "Additional Guest" : "Additional Child/Children"} x ${item.service_quantity} (${parseFloat(item.total_cost).toFixed(2)})<span style="float:right">Php ${parseFloat(item.total_cost * item.service_quantity).toFixed(2)}</span></p>`)
            })

            var total = data.result.list.reduce((curr, a) => curr + parseInt(a.total_cost) * parseInt(a.service_quantity),0)
            console.log(total)
            $("#additional_total").text(`PHP ${parseFloat(total).toFixed(2)}`)
        }
        
        
    })
}

const getReservation = () =>{
requestJson.get(`app/bill/get?id=${id}`)
.then(data => {
    if(data.response === "OK"){
        const { booking_id,payment_ref,date_from,date_to,fname,lname,mname,room_charge,nights,discount_total,total_amount,payment_method,date } = data.billing 
        document.querySelector(".page-title").innerHTML = `Billing # ${payment_ref}`
        document.querySelector("#label_name").innerHTML = `${fname} ${mname} ${lname}`
        document.querySelector("#label_charge").innerHTML = `PHP ${parseFloat(room_charge).toFixed(2)}`
        document.querySelector("#label_discount").innerHTML = `PHP ${parseFloat(discount_total).toFixed(2)}`
        document.querySelector("#label_total").innerHTML = `PHP ${parseFloat(total_amount).toFixed(2)}`
        document.querySelector("#payment_method").innerHTML = payment_method
        document.querySelector("#label_date").innerHTML = new Intl.DateTimeFormat('en', { dateStyle:"medium"}).format(new Date(date))
        document.querySelector("#label_nights").innerHTML = `${nights} ${nights > 1 ? "Nights" : "Night" } (${new Intl.DateTimeFormat('en', { dateStyle:"medium"}).format(new Date(date_from))} to ${new Intl.DateTimeFormat('en', { dateStyle:"medium"}).format(new Date(date_to))})`
        
        getAdditional(booking_id)
        // $status = status_name
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