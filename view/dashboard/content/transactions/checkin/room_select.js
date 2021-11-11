$(document).ready(()=>{
    var $checkin = new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkin')))
    var $checkout = new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(getParameterByName('checkout')))
    $("#checkin").text($checkin)
    $("#checkout").text($checkout)
    $("#nights").text(convertMiliseconds(Math.abs(new Date(getParameterByName('checkout')) - new Date(getParameterByName('checkin'))),'d'))
    $("#guestnum").text(getParameterByName('person'))
    $("#roomtype").text(getParameterByName('roomname'))

    fetch(`app/room/available?checkin=${getParameterByName('checkin')}&checkout=${getParameterByName('checkin')}&type=${getParameterByName('roomtype')}&limit=100`)
    .then(data => data.json())
    .then(data => {
        if(data.response){
            let container = document.querySelector("#room_container")
            
            if(data.result.hasOwnProperty("list")){
                if(data.result.list.length < 1){
                    return container.innerHTML = `<div style="width:100%;text-align:center;">No Available room for reservation dates : ${$checkin} to ${$checkout}</div>`
                }
                const requestcontent = data.result.list.map(item =>{ 
                                        return `
                                                <div class="card p-2" style="max-width:300px;">
                                                <img class="card-img-top" src="${item.photo}" alt="${item.category}">
                                                <div class="card-body">
                                                    <h5 class="card-title">ROOM : ${item.room_number}</h5>
                                                    <p class="card-text mb-0"><span style="font-weight:500;width:120px;display:inline-block">Rate </span>: Php ${item.room_rate}.</p>
                                                    <p class="card-text mb-0"><span style="font-weight:500;width:120px;display:inline-block">Occupancy </span>: ${item.room_occupancy}</p>
                                                    <p class="card-text mb-0"><span style="font-weight:500;width:120px;display:inline-block">Room Type </span>: ${item.category}.</p>
                                                    <p class="card-text mb-2"><span style="font-weight:500;width:120px;display:inline-block">Description </span>:  ${item.room_description}</p>
                                                    <button onclick="gotoLink(${item.id},${item.room_rate})" class="btn btn-warning mt-4">Select this Room</button>
                                                </div>
                                                </div>
                                                `
                })
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                return
            }
        }
            
    })
    
})

const gotoLink = (id,rate) =>{
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.set('url', 'guestinfo');
    searchParams.append('roomid', id);
    searchParams.append('roomrate', rate);
    window.location.href = `dashboard?${searchParams}`
}


