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

var $Inventory = new Inventory()
var $totalReservation
var $subtotal
var $totaldiscount = 0

function updateTotalRes(val = null){
  let additional = 0
  $totalReservation = 0;
  if(val){
    if($Inventory.items.length > 0){
      additional = $Inventory.items.reduce((current_sum, a) => current_sum + (a.quantity * parseInt(a.cost)),0)
      let new_sum = parseInt($subtotal) + additional
      $("#subTotal").text(`PHP ${parseFloat(new_sum).toFixed(2)}`)
    }
  }
  let temp_total = parseInt($subtotal) + parseInt(additional)
  $totalReservation = temp_total
  $totalReservation = parseInt($totalReservation) - parseInt($totaldiscount)
  $("#displayTotal").text(`PHP ${$totalReservation < 0 ? parseFloat(0.00).toFixed(2) : parseFloat($totalReservation).toFixed(2)}`)
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
  $(`#additional_service_quantity_${el}`).text(value)
  let total = value * parseInt($(`#option_service_${el}`).data("cost"))
  $(`#additional_service_amount_${el}`).text(`Php ${parseFloat(total).toFixed(2)}`)
  $Inventory.reducequantity(el)
  updateTotalRes(1)
}

function increase_service_count(el){
  let value = parseInt($(`#quantity_service_${el}`).text())
  
  $(`#quantity_service_${el}`).text(++value)
  $(`#additional_service_quantity_${el}`).text(value)
  let total = value * parseInt($(`#option_service_${el}`).data("cost"))
  $(`#additional_service_amount_${el}`).text(`Php ${parseFloat(total).toFixed(2)}`)
  $Inventory.addquantity(el)
  updateTotalRes(1)
}
$(document).ready(()=>{
    $('.selectpicker').selectpicker();
    services()
    
    let $nights = convertMiliseconds(Math.abs(new Date(getParameterByName('checkout')) - new Date(getParameterByName('checkin'))),'d')
    $("#checkin").text(new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkin'))))
    $("#checkout").text(new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkout'))))
    $("#nights").text($nights)
    $("#guestnum").text(getParameterByName('person'))
    $("#roomtype").text(getParameterByName('roomname'))
    $("#guestname").text(`${getParameterByName('last')}, ${getParameterByName('first')} ${getParameterByName('middle')}`)
    $("#phonenum").text(getParameterByName('phone'))
    $("#emailadd").text(getParameterByName('email'))


    $subtotal = parseFloat(getParameterByName('roomrate') * $nights).toFixed(2)
    $totalReservation = $subtotal
    $("#subTotal").text(`PHP ${$subtotal}`)
    $("#displayRate").text(`PHP ${parseFloat(getParameterByName('roomrate')).toFixed(2)}`)
    $("#displayNights").text(`${$nights} ${$nights > 1 ? "Nights": "Night"}`)
    $("#displayTotal").text(`PHP ${$totalReservation}`)

    $("#sameAddress").click(()=>{
      if($("#sameAddress").is(':checked')){
        $("#inputStreetAddress").val(getParameterByName('address'));
        $("#inputCity").val(getParameterByName('city'));
        $("#inputZipCode").val(getParameterByName('zipcode'));
        $("#inputStreetAddress").prop( "disabled", true );
        $("#inputCity").prop( "disabled", true );
        $("#inputZipCode").prop( "disabled", true );
      }else{
        $("#inputStreetAddress").val("");
        $("#inputCity").val("");
        $("#inputZipCode").val("");
        $("#inputStreetAddress").prop( "disabled", false );
        $("#inputCity").prop( "disabled", false );
        $("#inputZipCode").prop( "disabled", false );
      }
      
    })
    $("#services_button").click(addService)

    

    function addService(){
      var picker = $("#services_picker").val();
      let check = $Inventory.items.find(item => item.id === picker);
        if(check){
          return alert("services/facility has already been added")
        }
        
        $("#additional_service_list").append(`<p class="d-flex flex-row justify-content-between" id="additional_service_list_data_${picker}"><span>${$(`#option_service_${picker}`).data("sname")} (Php ${ parseFloat($(`#option_service_${picker}`).data("cost")).toFixed(2)}) x <span id="additional_service_quantity_${picker}">1</span></span><span id="additional_service_amount_${picker}">Php ${ parseFloat($(`#option_service_${picker}`).data("cost")).toFixed(2)}</span></p>`)
          $("#service_append").append(`<li class="list-group-item d-flex justify-content-between align-items-center" id="service_list_${picker}">
          <div style="width:70%">${$(`#option_service_${picker}`).data("sname")}</div>
          <div>
            <button class="btn btn-warning" style="width:40px;" onclick="decrease_service_count('${picker}')">-</button>
            <button class="btn btn-warning" style="width:40px;" onclick="increase_service_count('${picker}')">+</button>
            <span class="badge badge-dark badge-pill" id="quantity_service_${picker}">1</span>
          </div>
          
        </li>`)
        
        $Inventory.addItems({id:picker,quantity:1,cost:$(`#option_service_${picker}`).data("cost")})
        updateTotalRes(1)
    }

   

    function services(){
      fetch('app/services?limit=100')
        .then(data => data.json())
        .then(data => {
          if(data.response === "OK"){
            $("#services_picker").html("")
            $("#services_picker").append("<option value=''>Search Additional Service Here</option>")
            $("#services_picker").append(`<option value='ADD_GUEST' data-cost="${parseFloat(getParameterByName('adtl_adult')).toFixed(2)}" id='option_service_ADD_GUEST' data-sname='Additional Guest'>Additional Guest</option>`)
            $("#services_picker").append(`<option value='ADD_KIDS'  data-cost="${parseFloat(getParameterByName('adtl_kid')).toFixed(2)}" id='option_service_ADD_KIDS' data-sname='Additional Child/Children'>Additional Child/Children</option>`)
            $("#services_picker").append(function(){
              return data.result.hasOwnProperty("list") ? data.result.list.map(item => `<option value="${item.id}" id="option_service_${item.id}" data-sname="${item.service_name}" data-cost="${item.service_cost}" data-tokens="${item.service_name}">${item.service_name}</option>`) : ``
            })
           
            $('.selectpicker').selectpicker('refresh')
          }
      })
    }

    
    const card = new Card();
    var $payment_source,$discount_id = 0,$discount_value = 0, cash=0;

    $("#btn_SumbitPaymentCash").click(function(){ 
      if(!confirm('Check-in guest ?')){
          return
      }
      let params = {};
      var cash_amount = $("#inputCash").val()
      if(parseFloat($totalReservation).toFixed(2) > parseFloat(cash_amount).toFixed(2)){
        return alert('Invalid Amount! Amount cannot be less than the total charge.')
      }
      new URL(document.location).searchParams.forEach(function (val, key) {
        params[key] = val
      });
      params['card_lastnum'] = 0000
      params['reservation_type'] = "frontdesk"
      params['payment_ref'] = generateUUID()
      params['amount'] = $totalReservation
      params['currency'] = "PHP"
      params['card_brand'] = "N/A"
      params['user_id'] = getCookie('sessionid')
      params['status'] = 2
      params['nights'] = $nights
      params['ref_num'] = generateUUID()
      params['bill_street_add'] =  $("#inputStreetAddress").val()
      params['bill_city_add'] =  $("#inputCity").val()
      params['bill_zip_add'] =  $("#inputZipCode").val()
      params['discount_id'] = $discount_id
      params['discount_total'] = $discount_value
      fetch('app/reservation/save', {method : "POST",body : JSON.stringify(params)})
      .then(data => data.json())
      .then(data => {
        if(data.response){
          if(data.hasOwnProperty("message")){
            alert(data.message + `  REF#: ${params['ref_num']}`)
            window.location.href="dashboard?url=booking"
          }
        }
      })
    });

    $("#billinginfo_form").submit(async function(event){
    
    event.preventDefault()
    if(!confirm('Check-in guest ?')){
      return
    }
    // card.amount = 10000;
    card.currency = "PHP";
    // card.card_num = "4120000000000007";
    // card.exp_month = 04;
    // card.exp_year = 2022;
    // card.cvc = "123"

    card.card_num = $("#inputCardNumber").val()
    card.exp_month = $("#inputExpMonth").val();
    card.exp_year = $("#inputExpYear").val();
    card.cvc = $("#inputSecurity").val()
    card.amount = $totalReservation < 10000 ? 10000 : parseInt($totalReservation);
    
    const pKey = "sk_test_TZwovKaLAX3enGqj5VLm1M9m";
    
    const paymentID = await createPaymentIntent(pKey);
    const client_id = paymentID.data.attributes.client_key;
    const paymentMethod = await createPaymentMethod(pKey);
    const pm_id = paymentMethod.data.id;
    /*********CHANGES *********************/
    const response = await sendCardInfo(pKey,client_id,pm_id);
    var paymentIntent = response.data;
    verifyRequest(paymentIntent); // last step check if payment succeeded
    /************************************ */

    /********************************************************************ADDITIONAL ***********************************************/
    //pag nireturn ulit yung messege from window form
    window.addEventListener(
      'message',
      async (ev) => {
        if (ev.data === '3DS-authentication-complete') {
          // 3D Secure authentication is complete. You can requery the payment intent again to check the status.
          
          var paymentIntentId = client_id.split('_client')[0];
          await requestURL(`https://api.paymongo.com/v1/payment_intents/${paymentIntentId}?client_key=${client_id}`,
            {
              headers: {
                // Base64 encoded public PayMongo API key.
                Authorization: `Basic ${window.btoa(pKey)}`
              }
            }
          ).then(function(response) {
            var paymentIntent = response.data;
            verifyRequest(paymentIntent)
          })
        }
        
      },
      false
    );
    /*******************************************************************************************************************/

    })


    /*first process on obtaining paymentID*/
    async function createPaymentIntent(key,pword = null){

    let headers = createHeaders(key);
    var raw = card.getIntentAttributes();
    let data = createRequestOption("POST",raw,headers);
    const id = await requestURL("https://api.paymongo.com/v1/payment_intents",data);
    return await id; //contains json with client key;
    }

    /*card info will be stored here*/
    async function createPaymentMethod(key){

    let headers = createHeaders(key);
    let raw = card.getPMAttributes();
    let data = createRequestOption("POST",raw,headers);
    const pm = await requestURL("https://api.paymongo.com/v1/payment_methods",data);
    return await pm;

    }

    async function getSource(id){
      
      let headers = createHeaders("sk_test_TZwovKaLAX3enGqj5VLm1M9m");
      let data = createRequestOption("GET",null,headers);
      const pm = await requestURL("https://api.paymongo.com/v1/sources/" + id,data);
      return await pm;
    }

    /*attach payment method and payment intent id */
    async function sendCardInfo(pkey,client_id,pm_id){
        var paymentIntentId = client_id.split('_client')[0];
        let raw = {
            data:{
            attributes :{
                client_key :client_id,
                payment_method : pm_id,
                }
            }
        }
        let data = createRequestOption("POST",raw,createHeaders(pkey));
        const res = await requestURL(`https://api.paymongo.com/v1/payment_intents/${paymentIntentId}/attach`,data)
        return await res;
    }
    function saveDetails(pay){
      
      let params = {};
      var card_lastnum = pay.attributes.payments[0].attributes.source.last4
      var card_brand = pay.attributes.payments[0].attributes.source.brand
      var ref = pay.id
      new URL(document.location).searchParams.forEach(function (val, key) {
          params[key] = val
      });
      params['card_lastnum'] = card_lastnum
      params['reservation_type'] = "frontdesk"
      params['payment_ref'] = ref
      params['amount'] = $totalReservation
      params['currency'] = pay.attributes.currency
      params['card_brand'] = card_brand
      params['user_id'] = getCookie('sessionid')
      params['status'] = 2
      params['nights'] = $nights
      params['ref_num'] = generateUUID()
      params['bill_street_add'] =  $("#inputStreetAddress").val()
      params['bill_city_add'] =  $("#inputCity").val()
      params['bill_zip_add'] =  $("#inputZipCode").val()
      params['discount_id'] = $discount_id
      params['discount_total'] = $discount_value
      fetch('app/reservation/save', {method : "POST",body : JSON.stringify(params)})
      .then(data => data.json())
      .then(data => {
        if(data.response){
          if(data.hasOwnProperty("message")){
            alert(data.message + `  REF#: ${params['ref_num']}`)
            window.location.href="dashboard?url=booking"
          }
        }
      })
    }
    /*********CHANGES *********************/
    function verifyRequest(paymentIntent){
        
        if (paymentIntent.attributes.status === 'awaiting_next_action') {
            // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
            
            window.open(paymentIntent.attributes.next_action.redirect.url,'sample-inline-frame'); // display authentication link for user to enter password
            var redirect_url = new URL(paymentIntent.attributes.next_action.redirect.url);
            $payment_source = new URLSearchParams(redirect_url.search).get('id');
            document.querySelector('#three-ds-container').setAttribute("style","display:block"); 
        } else if (paymentIntent.attributes.status === 'succeeded') {
            // You already received your customer's payment. You can show a success message from this condition.
            document.querySelector('#three-ds-container').setAttribute("style","display:none"); 
            saveDetails(paymentIntent)
        } else if(paymentIntent.attributes.status === 'awaiting_payment_method') {
            // The PaymentIntent encountered a processing error. You can refer to paymentIntent.attributes.last_payment_error to check the error and render the appropriate error message.
            getSource($payment_source)
            .then(data =>{
              if(data.data.attributes.status === "failed"){
                document.querySelector('#three-ds-container').setAttribute("style","display:none");
                alert("Payment Failed! Please try again later or use a different card.")
              }
            })
        }  else if (paymentIntent.attributes.status === 'processing'){
            // You need to requery the PaymentIntent after a second or two. This is a transitory status and should resolve to `succeeded` or `awaiting_payment_method` quickly.
        }else if (paymentIntent.attributes.status === 'failed'){
            alert("Payment failed!")
        }
    }
    /**************************************/
    function generateUUID() { // Public Domain/MIT
      var d = new Date().getTime();//Timestamp
      var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
      return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16;//random number between 0 and 16
          if(d > 0){//Use timestamp until depleted
              r = (d + r)%16 | 0;
              d = Math.floor(d/16);
          } else {//Use microseconds since page-load if supported
              r = (d2 + r)%16 | 0;
              d2 = Math.floor(d2/16);
          }
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }

    $("#btn_discount").click(function(){
      raw ={
        promo_code : $("#input_discount").val()
      }
      fetch('app/discount/find',{method:"POST",body:JSON.stringify(raw)})
      .then(data => data.json())
      .then(data =>{ 
        if(data.response === "OK"){
          if(data.hasOwnProperty("result")){
              const { validity,promo_code,discount_rate,discount_limit } = data.result
              $discount_id = data.result.id
              expiration = new Date(validity)
              if(expiration < new Date()){
                alert('Coupon Expired')
              }
              if(expiration > new Date()){
                alert('Coupon Applied')
                $("#discount_code").text(`CODE : ${promo_code}`)
                $("#input_discount").val("")
                // var percent_value = (parseFloat(discount_rate) / 100) * (getParameterByName('roomrate') * $nights)
                // $("#discount_note").text(`No Maximum discount.`)
                // if(discount_limit != 0){
                //   $("#discount_note").text(`Maximum discount is ${discount_limit}`)
                //   if(percent_value > parseInt(discount_limit)){
                //     percent_value = parseInt(discount_limit)
                //   }
                // }
                $discount_value = discount_rate
                $("#discount_rate").text(parseFloat(discount_rate).toFixed(2))
                // $totalReservation = parseFloat((getParameterByName('roomrate') * $nights) - (percent_value)).toFixed(2)
                $totaldiscount = parseFloat(discount_rate).toFixed(2)
                updateTotalRes()
              }
             return
          }
          alert(data.message)
        }
      })
      
    })
})


