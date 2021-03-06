requestJson.get('app/user/role/list?limit=100')
.then(data => {
    if(data.response === "OK"){
        const container = document.querySelector("#inputPosition");
        if(container){
            const requestcontent = data.result.list.map(item =>{
                return `<option value="${item.id}">${item.position} (Access : ${item.priv})</option>`
            })
            container.innerHTML = `<option value="" selected>Choose...</option>`
            requestcontent.forEach(el=>{
                container.innerHTML += el
            })
        }
    }
})

$(document).ready(function() {
    const params = (new URL(document.location)).searchParams
    const edit = params.get('edit')
    if(edit){
        let id = params.get('id')
        requestJson.get(`app/user/list?edit=1&id=${id}`)
        .then(data => {
            if(data.response === "OK"){
                if(data.hasOwnProperty('result')){
                    $(".page-title").text('Edit User')
                    let { email,fname,lname,mname,position } = data.result
                    $("#inputEmail").val(email)
                    $("#inputPosition").val(position)
                    $("#inputFirstName").val(fname)
                    $("#inputLastName").val(lname)
                    $("#inputMiddleName").val(mname)
                }
            }
        })
    }
    $("#btnCreateUserSubmit").click((event)=>{
        event.preventDefault();
        var email = $("#inputEmail").val()
        var password = $("#inputPassword").val()
        var confpassword = $("#inputConfirmPassword").val()
        var position = $("#inputPosition").val()
        var fname = $("#inputFirstName").val()
        var lname = $("#inputLastName").val()
        var mname = $("#inputMiddleName").val()
        if(password !== confpassword){
            alert("Password Did not match")
        }
        data = {
            email : email,
            pword : password,
            role : position,
            id: getCookie('sessionid'),
            status : 1,
            fname : fname,
            lname : lname,
            mname : mname
        }
        requestJson.post('app/user/add',JSON.stringify(data))
        .then(data => {
            if(data.response === "Created"){
                $("#inputEmail").val("")
                $("#inputPassword").val("")
                $("#inputConfirmPassword").val("")
                $("#inputPosition").val("")
                $("#inputFirstName").val("")
                $("#inputLastName").val("")
                $("#inputMiddleName").val("")
                return alert(data.message);
            }
        })
    })
})