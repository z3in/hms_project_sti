window.onload = (event) =>{

    const btn_signin = document.querySelector("#btn_signin")
    const input_email = document.querySelector("#email_input")
    const input_pass = document.querySelector("#password_input")
    btn_signin.addEventListener("click",(event)=> authenticateUser(event,input_email.value, input_pass.value))
    
}

const authenticateUser = (event,user,pass) => {
    event.preventDefault()
    requestJson.post('../../app/user/login',JSON.stringify({username:user,password:pass}))
    .then(data=>{
        if(data.response === "OK"){
            document.cookie = `sessionid=${data.user.id};path=/`
            window.location = "../../dashboard";
        }
        return alert(data.message)
    })
    
}
