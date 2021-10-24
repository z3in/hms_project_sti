class Card{
   amount = 0;
   payment_method_allowed = ["card"];
   payment_method_options = {"card": { "request_three_d_secure": "any"}}
   currency;
   type;
   card_num;
   exp_month = 0;
   exp_year = 0;
   cvc;

   constructor(currency = "PHP",type = "card") {
       this.currency = currency;
       this.type = type;
   }

   getIntentAttributes(){
       let data = {
           "data": {
                "attributes" : {
                   "amount": this.amount,
                   "payment_method_allowed": this.payment_method_allowed,
                   "payment_method_options": this.payment_method_options,
                   "currency" : this.currency
                }
           }
       }
       return data;
   }

   getPMAttributes(){
       let data = {
        "data": {
            "attributes" : {
                type: this.type,
                details : {
                    card_number : this.card_num,
                    exp_month: parseInt(this.exp_month),
                    exp_year : parseInt(this.exp_year),
                    cvc: this.cvc
                }
            }
        }
       }
       return data;

   }
}