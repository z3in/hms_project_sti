window.onload = (event) =>{

    const btn_signin = document.querySelector("#btn_signin")
    const input_email = document.querySelector("#email_input")
    const input_pass = document.querySelector("#password_input")
    btn_signin.addEventListener("click",()=> authenticateUser(input_email.value, input_pass.value))
}

const authenticateUser = (user,pass) => {
    document.cookie = `sessionid=${user + pass};path=/`
    window.location = "../../dashboard";
}
