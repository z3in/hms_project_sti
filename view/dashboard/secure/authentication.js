window.onload = (event) =>{

    const btn_signin = document.querySelector("#btn_signin")
    const btn_verify = document.querySelector("#btn_verify")
    const input_email = document.querySelector("#email_input")
    const input_pass = document.querySelector("#password_input")
    const verify_input = document.querySelector("#verify_input")
    btn_signin.addEventListener("click",(event)=> authenticateUser(event,input_email.value, input_pass.value))
    btn_verify.addEventListener("click",(event)=> authenticate2FA(event,verify_input.value))
    
}

var $verify_digit = 0,$userid;

const authenticate2FA = (event,input) => {
    event.preventDefault()
    if(input == $verify_digit){
        document.cookie = `sessionid=${$userid};path=/`
        window.location = "../../dashboard";
        $verify_digit = 0
        return
    }
    if(input != $verify_digit){
        alert("Verification code did not match!");
    }
}

const authenticateUser = (event,user,pass) => {
    event.preventDefault()
    var btn = document.querySelector("#btn_signin")
    btn.innerHTML = '<i class="fa fa-circle-o-notch fa-spin" id="spinny_loading"></i> SIGNING IN'
    btn.style.cssText = "pointer-events:none"
    requestJson.post('../../app/user/login',JSON.stringify({username:user,password:pass}))
    .then(data=>{
        if(data.response === "OK"){
            $(".form-verification").show()
            $("#form-signin").hide()
            $verify_digit = data.user.key;
            $userid = data.user.id
        }
        btn.innerHTML = 'SIGN IN'
        btn.style.cssText = "pointer-events:all"
        return alert(data.message)
    })
    
}
