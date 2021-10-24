const card = new Card();

$("#btn_SumbitPayment").click(async function(event){
  console.log('test')
    //set values ikaw nalang mag edit or mag attach neto sa respective fields nila hahaha
    card.amount = 10000;
    card.currency = "PHP";
    card.card_num = "4120000000000007";
    card.exp_month = 04;
    card.exp_year = 2022;
    card.cvc = "123"
    
    const pKey = "pk_test_TYs2xUXJKmesKSDUR9eDsZhz";
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
          const res = await requestURL(`https://api.paymongo.com/v1/payment_intents/${paymentIntentId}?client_key=${client_id}`,
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
    event.preventDefault()
},false)


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
/*********CHANGES *********************/
function verifyRequest(paymentIntent){
    
    if (paymentIntent.attributes.status === 'awaiting_next_action') {
        // Render your modal for 3D Secure Authentication since next_action has a value. You can access the next action via paymentIntent.attributes.next_action.
        window.open(paymentIntent.attributes.next_action.redirect.url,'sample-inline-frame'); // display authentication link for user to enter password
        document.querySelector('#three-ds-container').setAttribute("style","display:block"); 
      } else if (paymentIntent.attributes.status === 'succeeded') {
        // You already received your customer's payment. You can show a success message from this condition.
        document.querySelector('#three-ds-container').setAttribute("style","display:none"); 
        alert("Success")
      } else if(paymentIntent.attributes.status === 'awaiting_payment_method') {
        // The PaymentIntent encountered a processing error. You can refer to paymentIntent.attributes.last_payment_error to check the error and render the appropriate error message.
      }  else if (paymentIntent.attributes.status === 'processing'){
        // You need to requery the PaymentIntent after a second or two. This is a transitory status and should resolve to `succeeded` or `awaiting_payment_method` quickly.
      }else if (paymentIntent.attributes.status === 'failed'){
        document.querySelector('#three-ds-container').setAttribute("style","display:none"); 
        alert("Payment Failed")
      // You need to requery the PaymentIntent after a second or two. This is a transitory status and should resolve to `succeeded` or `awaiting_payment_method` quickly.
      } 
}
/**************************************/
