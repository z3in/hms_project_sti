requestJson.get('app/user/role/list?limit=100',{method:"GET"})
.then(data => {
    if(data.response === "OK"){
        const container = document.querySelector("#inputPosition");
        const requestcontent = data.result.data.map(item =>{
            return `<option value="${item.id}">${item.position}</option>`
        })
        container.innerHTML = `<option value="" selected>Choose...</option>`
        requestcontent.forEach(el=>{
            container.innerHTML += el
        })
    }
})

$(document).ready(function() {
    $("#btnCreateUserSubmit").click((event)=>{
        event.preventDefault();
        var email = $("#inputEmail").val()
        var password = $("#inputPassword").val()
        var confpassword = $("#inputConfirmPassword").val()
        if(password !== confpassword){
            alert("Password Did not match")
        }
    })
})