$(document).ready(()=>{
    let $nights = convertMiliseconds(Math.abs(new Date(getParameterByName('checkout')) - new Date(getParameterByName('checkin'))),'d')
    $("#checkin").text(new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkin'))))
    $("#checkout").text(new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkout'))))
    $("#nights").text($nights)
    $("#guestnum").text(getParameterByName('person'))
    $("#roomtype").text(getParameterByName('roomname'))
    $("#guestname").text(`${getParameterByName('last')}, ${getParameterByName('first')} ${getParameterByName('middle')}`)
    $("#phonenum").text(getParameterByName('phone'))
    $("#emailadd").text(getParameterByName('email'))


    var $totalReservation = parseFloat(getParameterByName('roomrate') * $nights).toFixed(2)

    $("#displayRate").text(`PHP ${parseFloat(getParameterByName('roomrate')).toFixed(2)}`)
    $("#displayNights").text($nights)
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


    const card = new Card();
    var $payment_source,$discount_id = 0,$discount_value = 0;


    $("#billinginfo_form").submit(async function(event){
    event.preventDefault()
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
      params['status'] = 1
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
        console.log(data)
        if(data.response === "OK"){
          if(data.hasOwnProperty("result")){
              const { validity,promo_code,discount_rate,discount_limit } = data.result
              $discount_id = data.response.id
              expiration = new Date(validity)
              if(expiration < new Date()){
                alert('Coupon Expired')
              }
              if(expiration > new Date()){
                alert('Coupon Applied')
                $("#discount_code").text(`${promo_code} (${discount_rate})`)
                $("#input_discount").val("")
                var percent_value = (parseFloat(discount_rate) / 100) * (getParameterByName('roomrate') * $nights)
                if(discount_limit != "0" || discount_limit != "N/A"){
                  $("#discount_note").text(`Maximum discount is ${discount_limit}`)

                  if(percent_value > parseInt(discount_limit)){
                    percent_value = parseInt(discount_limit)
                  }
                }
                $discount_value = percent_value
                $("#discount_rate").text(parseFloat(percent_value).toFixed(2))
                var $totalReservation = parseFloat((getParameterByName('roomrate') * $nights) - (percent_value)).toFixed(2)
                $("#displayTotal").text(`PHP ${$totalReservation}`)
              }


          }
        }
      })
      
    })
})


