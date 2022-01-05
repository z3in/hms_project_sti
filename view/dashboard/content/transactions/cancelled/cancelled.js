$(document).ready(()=>{
    fetch(`app/reservation?limit=100`)
    .then(data => data.json())
    .then(data => {
        if(data.response){
            let container = document.querySelector("#booking_container")
            
            if(data.result.hasOwnProperty("list")){
                const requestcontent = data.result.list.filter(s=> s.status_name === "CANCELLED").map(item =>{ 
                                        return `
                                                <tr>
                                                    <td style="width:100px;max-width:150px;overflow: hidden;text-overflow: ellipsis;">${item.ref_id}</td>
                                                    <td>${item.fullname}</td>
                                                    <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))} to ${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                                    <td>${item.status_name}</td>
                                                    <td><button class="btn btn-sm btn-warning" onclick="view_res(${item.id})" data-nonnav="true">VIEW</button> </td>
                                                </tr>
                                                `
                })
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                if(requestcontent.length < 1){
                    container.innerHTML = `<div style="width:100%;text-align:center;">No Result Found</div>`
                }
                return
            }
            container.innerHTML = `<div style="width:100%;text-align:center;">No Result Found</div>`
        }
            
    })
    
    $("#btn_search").click(function(){
        var search = $("#input_res_search").val()
        return searchData(search)
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
                const requestcontent = data.result.list.map(item =>{ 
                                        return `
                                                <tr>
                                                    <td style="width:100px;max-width:150px;overflow: hidden;text-overflow: ellipsis;">${item.ref_id}</td>
                                                    <td>${item.fullname}</td>
                                                    <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))} to ${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                                    <td>${item.status_name}</td>
                                                    <td><button class="btn btn-sm btn-warning" onclick="view_res(${item.id})" data-nonnav="true">VIEW</button> &nbsp;<button class="btn btn-sm btn-danger">CANCEL</button></td>
                                                </tr>
                                                `
                })
                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
                return
            }
            container.innerHTML = `<div style="width:100%;text-align:center;">No Result Found</div>`
        }
            
    })
}

