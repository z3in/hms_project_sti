class Inventory{
    items = Array()

addItems(item = {}){
    this.items.push(item);
}

reducequantity(id){
    var current = this.items.find(x => x.id == id)
    
    if(current.quantity == 1){
        return this.removeitem(current.id)
    }
    this.items.find(x => x.id === current.id ).quantity--;
}

addquantity(id){
    this.items.find(x => x.id == id).quantity++
}

removeitem(id){
    this.items = this.items.filter(function(ele){
        return ele.id != id
    })
}

}


var url = new URL(document.location.href)
var id = url.searchParams.get("id")
var $status;
var $Inventory = new Inventory()
var $adtl_guest,$adtl_kids,$room_id;

function updateTotal(){
    if($Inventory.items.length > 0){
        additional = $Inventory.items.reduce((current_sum, a) => current_sum + (a.quantity * parseInt(a.cost)),0)
        $("#additional_charge_display").text(`PHP ${parseFloat(additional).toFixed(2)}`)
    }
}

function decrease_service_count(el){
    let value = parseInt($(`#quantity_service_${el}`).text())
    if(value === 1 || value == 1 || value == "1" || value === "1"){
        if(!confirm("Are you sure you want to remove this service/facility ?")){
            return
        }
        $(`#service_list_${el}`).remove()
        $(`#additional_service_list_data_${el}`).remove()
    }
    $(`#quantity_service_${el}`).text(--value)
    let total = value * parseInt($(`#option_service_${el}`).data("cost"))
    $(`#amount_service_${el}`).text(`Php ${parseFloat(total).toFixed(2)}`)
    $Inventory.reducequantity(el)
    updateTotal()
}

function increase_service_count(el){
    let value = parseInt($(`#quantity_service_${el}`).text())
    
    $(`#quantity_service_${el}`).text(++value)
    let total = value * parseInt($(`#option_service_${el}`).data("cost"))
    $(`#amount_service_${el}`).text(`Php ${parseFloat(total).toFixed(2)}`)
    $Inventory.addquantity(el)
    updateTotal()
}

$(document).ready(()=>{
const getReservation = () =>{
requestJson.get(`app/reservation/get?id=${id}`)
.then(data => {
    if(data.response === "OK"){
        const { ref_id,check_in,check_out,date_from,date_to,fullname,email,nights,street_add,zip_add,city_add,phone,status_name,room_id } = data.booking 
        document.querySelector(".page-title").innerHTML = `Reservation # ${ref_id}`
        document.querySelector("#label_checkin").innerHTML = check_in !== null && check_in !== '' ? new Intl.DateTimeFormat('en', { dateStyle:"medium", timeStyle:"medium" }).format(new Date(check_in)) : "";
        document.querySelector("#label_checkout").innerHTML =  check_out !== null && check_out !== '' ? new Intl.DateTimeFormat('en', {  dateStyle:"medium", timeStyle:"medium" }).format(new Date(check_out)) : "";
        document.querySelector("#label_name").innerHTML = fullname
        document.querySelector("#label_email").innerHTML = email
        document.querySelector("#label_night").innerHTML = nights
        document.querySelector("#label_address").innerHTML =`${street_add} ,${city_add} ${zip_add}`
        document.querySelector("#label_phone").innerHTML =  phone
        document.querySelector("#res_status").innerHTML = status_name;
        document.querySelector("#res_date").innerHTML = `${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(date_from))} to  ${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(date_to))}`;

        document.querySelector("#btn_viewbill").href = `dashboard?url=viewbill&id=${id}`
        var btn_check = document.querySelector("#btn_check")
        if(status_name === "RESERVED"){
            btn_check.innerHTML = `<i class="fas fa-check"></i> Check In`
        }
        if(status_name === "CHECK-IN" || status_name === "CHECK-OUT"){
            btn_check.innerHTML = `<i class="fas fa-arrow-alt-circle-left"></i> Check Out`
        }
        if(status_name === "CANCELLED"){
            btn_check.style="display:none;"
            $("#btn_cancel").hide()
            $("#additional_service_box").hide()
        }
        if(status_name === "CHECK-OUT"){
            $("#btn_cancel").hide()
            $("#additional_service_box").hide()
        }
        $room_id = room_id
        $status = status_name
    }
})
}

const getRoom = () =>{

    requestJson.get(`app/room?limit=1000`)
    .then(data => {
        if(data.result.hasOwnProperty("list")){
            
            let room = data.result.list.filter(x => x.id == $room_id)
            if(room.length === 1){
                $adtl_kids = room[0].adtl_kid
                $adtl_guest = room[0].adtl_adult
            }
        }
    })
}

function addService(){
    var picker = $("#services_picker").val();
    if(picker === ""){
        return alert("Please select a services/facility.")
    }
    let check = $Inventory.items.find(item => item.id === picker);
    if(check){
        return alert("services/facility has already been added")
    }
    
    $("#service_append").append(`<li class="list-group-item d-flex justify-content-between align-items-center" id="service_list_${picker}">
        <div style="width:60%">${$(`#option_service_${picker}`).data("sname")} <span class="badge badge-dark badge-pill" id="quantity_service_${picker}">1</span></div>
        <div style="width:25%;text-align:right">
            <button class="btn btn-warning" style="width:40px;" onclick="decrease_service_count('${picker}')">-</button>
            <button class="btn btn-warning" style="width:40px;" onclick="increase_service_count('${picker}')">+</button>
            
        </div>
        <div style="width:15%;text-align:center"><span id="amount_service_${picker}">Php ${parseFloat($(`#option_service_${picker}`).data("cost")).toFixed(2)}</span>
        </div>
    </li>`)
    
    $Inventory.addItems({id:picker,quantity:1,cost:$(`#option_service_${picker}`).data("cost")})
    updateTotal()
}

$("#services_button").click(addService)

const status_list = [
    {id:1,status:"RESERVED",next_status:{ id: 2,status:"OCCUPIED"}},
    {id:2,status:"CHECK-IN",next_status:{id:5,status:"CHECK-OUT"}},
    {id:3,status:"AVAILABLE",next_status:{id:3,status:"AVAILABLE"}},
    {id:4,status:"CANCELLED",next_status:{id:4,status:"CANCELLED"}},
    {id:5,status:"CHECK-OUT",next_status:{id:5,status:"CHECK-OUT"}},
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

$("#btn_add_service").click(function(){

    let data = {
        ad_service : $Inventory.items,
        booking_id : id,
        payment_status : "PENDING",
        userid : getCookie("sessionid")
    }
    fetch('app/additonal_service/add',{method:"POST",body:JSON.stringify(data)})
    .then(data => data.json())
    .then(data => {
        if(!confirm("Are you sure you want to add service to the reservation ?")){
            return
        }
        if(data.hasOwnProperty("message")){
            alert(data.message)
            $Inventory.items = [{}]
            $("#service_append").html("")
            $("#additional_charge_display").text("PHP 0.00")
        }
    })
})

async function services(){
    await getRoom()
    fetch('app/services?limit=100')
        .then(data => data.json())
        .then(data => {
            if(data.response === "OK"){
            $("#services_picker").html("")
            $("#services_picker").append("<option value=''>Search Additional Service Here</option>")
            $("#services_picker").append(`<option value='ADD_GUEST' data-cost="${$adtl_guest}" id='option_service_ADD_GUEST' data-sname='Additional Guest'>Additional Guest</option>`)
            $("#services_picker").append(`<option value='ADD_KIDS'  data-cost="${$adtl_kids}" id='option_service_ADD_KIDS' data-sname='Additional Child/Children'>Additional Child/Children</option>`)
            $("#services_picker").append(function(){
                return data.result.hasOwnProperty("list") ? data.result.list.map(item => `<option value="${item.id}" id="option_service_${item.id}" data-sname="${item.service_name}" data-cost="${item.service_cost}" data-tokens="${item.service_name}">${item.service_name}</option>`) : ``
            })
            
            $('.selectpicker').selectpicker('refresh')
            }
        })
    }

$('.selectpicker').selectpicker();
getReservation()

services()
$('.selectpicker').selectpicker('refresh')


})