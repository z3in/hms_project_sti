$(document).ready(()=>{
    var url = new URL(document.location.href);
    var type = url.searchParams.get("type");
    fetch(`app/reservation?limit=100`)
    .then(data => data.json())
    .then(data => {
        if(data.response){
            let container = document.querySelector("#booking_container")
            container.innerHTML = ""
            if(data.result.hasOwnProperty("list")){
                var rawdata = data.result.list
                if(type){
                    if(type === "online"){
                        rawdata = rawdata.filter(x => x.reservation_type !== "frontdesk")
                    }
                    if(type === "walkin"){
                        rawdata = rawdata.filter(x => x.reservation_type !== "online")
                    }
                }
                var requestcontent = rawdata.filter(item => item.status_name !== "CANCELLED").map(item =>{ 
                                        return `
                                                <tr>
                                                    <td style="width:100px;max-width:150px;overflow: hidden;text-overflow: ellipsis;">${item.ref_id}</td>
                                                    <td>${item.fullname}</td>
                                                    <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))} to ${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                                    <td>${item.status_name}</td>
                                                    <td><button class="btn btn-sm btn-warning" onclick="view_res(${item.id})" data-nonnav="true">VIEW</button></td>
                                                </tr>
                                                `
                })
                $("#reservation_count").text(requestcontent.length)
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                return
            }
            container.innerHTML = `<tr><td colspan="5" style="width:100%;text-align:center;">No Result Found</td></tr>`
        }
            
    })
    
    $("#btn_search").click(function(){
        var search = $("#input_res_search").val()
        return searchData(search)
    })

    $("#reservation_filter").change(function(){
     if($(this).val() === ""){
         return
     }
    fetch(`app/reservation?limit=100`)
    .then(data => data.json())
    .then(data => {
        if(data.response){
            let container = document.querySelector("#booking_container")
            container.innerHTML = ""
            if(data.result.hasOwnProperty("list")){
                var rawdata = data.result.list
                if(type){
                    if(type === "online"){
                        rawdata = rawdata.filter(x => x.reservation_type !== "frontdesk")
                    }
                    if(type === "walkin"){
                        rawdata = rawdata.filter(x => x.reservation_type !== "online")
                    }
                }
                var requestcontent = rawdata.filter(item => item.status_name !== "CANCELLED").filter(x => x.status_name == $(this).val()).map(item =>{ 
                                        return `
                                                <tr>
                                                    <td style="width:100px;max-width:150px;overflow: hidden;text-overflow: ellipsis;">${item.ref_id}</td>
                                                    <td>${item.fullname}</td>
                                                    <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))} to ${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                                    <td>${item.status_name}</td>
                                                    <td><button class="btn btn-sm btn-warning" onclick="view_res(${item.id})" data-nonnav="true">VIEW</button></td>
                                                </tr>
                                                `
                })
                $("#reservation_count").text(requestcontent.length)
                if(requestcontent.length < 1){
                    container.innerHTML = `<tr><td colspan="5" style="width:100%;text-align:center;">No Result Found</td></tr>`
                }
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                return
            }
            container.innerHTML = `<tr><td colspan="5" style="width:100%;text-align:center;">No Result Found</td></tr>`
        }
            
    })
    })

})

const view_res = (id) => window.location.href = `dashboard?url=reservation&id=${id}`

const searchData = (key) =>{
    requestJson.get(`app/reservation/search?limit=100&search=${key}`)
    .then(data => {
        if(data.response){
            let container = document.querySelector("#booking_container")
            container.innerHTML = ""
            if(data.result.hasOwnProperty("list")){
                var rawdata = data.result.list
                if(type){
                    if(type === "online"){
                        rawdata = rawdata.filter(x => x.reservation_type !== "frontdesk")
                    }
                    if(type === "walkin"){
                        rawdata = rawdata.filter(x => x.reservation_type !== "online")
                    }
                }
                const requestcontent = rawdata.filter(item => item.status_name !== "CANCELLED").map(item =>{ 
                                        return `
                                                <tr>
                                                    <td style="width:100px;max-width:150px;overflow: hidden;text-overflow: ellipsis;">${item.ref_id}</td>
                                                    <td>${item.fullname}</td>
                                                    <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))} to ${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                                    <td>${item.status_name}</td>
                                                    <td><button class="btn btn-sm btn-warning" onclick="view_res(${item.id})" data-nonnav="true">VIEW</button></td>
                                                </tr>
                                                `
                })

                $("#reservation_count").text(requestcontent.length)
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                return
            }
            container.innerHTML = `<tr><td colspan="5" style="width:100%;text-align:center;">No Result Found</td></tr>`
        }
            
    })
}

