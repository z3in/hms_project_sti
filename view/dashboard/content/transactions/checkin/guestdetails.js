$(document).ready(()=>{
    $("#checkin").text(new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkin'))))
    $("#checkout").text(new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkout'))))
    $("#nights").text(convertMiliseconds(Math.abs(new Date(getParameterByName('checkout')) - new Date(getParameterByName('checkin'))),'d'))
    $("#guestnum").text(getParameterByName('person'))
    $("#roomtype").text(getParameterByName('roomname'))

    $("#guestdetails_form").submit((event)=>{
        if($("#inputGender").val() == ""){
            $("#inputGender").focus()
            return alert('Please select Gender')
        }
        let prev_data = window.location.hash.split('?')[1]
        let personal = `&first=${$("#inputFirstName").val()}&last=${$("#inputLastName").val()}&middle=${$("#inputMiddleName").val()}&gender=${$("#inputGender option:selected" ).text()}`
        let contact = `&phone=${$("#inputPhoneNumber").val()}&email=${$("#inputEmail").val()}`
        let address = `&address=${$("#inputStreetAddress").val()}&city=${$("#inputCity").val()}&zipcode=${$("#inputZipCode").val()}`
        let data = prev_data + personal + contact + address
        window.location.href=`dashboard?url=billinfo&${data}`
        event.preventDefault();
    })
})


