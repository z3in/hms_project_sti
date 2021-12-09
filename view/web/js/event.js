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

$(document).ready(()=>{
    getDiscountList()
    
})

$("#btn_date_checkout").click(()=>$("#input_date_checkout").focus())
$("#input_date_checkout").datepicker()
$("#btn_date_checkin").click(()=>$("#input_date_checkin").focus())
$("#input_date_checkin").datepicker()