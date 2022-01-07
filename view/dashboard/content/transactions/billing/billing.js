const view_bill = (id) => window.location.href = `dashboard?url=bill_res&id=${id}`

$(document).ready(()=>{
    fetch(`app/billing?limit=100`)
    .then(data => data.json())
    .then(data => {
        if(data.response){
            let container = document.querySelector("#billing_container")
            
            if(data.result.hasOwnProperty("list")){
                const requestcontent = data.result.list.map(item =>{ 
                                        return `
                                                <tr>
                                                    <td style="width:100px;max-width:150px;overflow: hidden;text-overflow: ellipsis;">${item.ref_id}</td>
                                                    <td>${item.lname}, ${item.fname} ${item.mname}</td>
                                                    <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))} to ${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                                    <td>${item.currency} ${parseFloat(item.total_amount).toFixed(2)}</td>
                                                    <td>${item.status_name}</td>
                                                    <td><button class="btn btn-sm btn-warning" onclick="view_bill(${item.id})">VIEW</button></td>
                                                </tr>
                                                `
                })
                $("#bill_list").text(requestcontent.length)
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
    
    

    $("#reservation_filter").change(function(){
        if($(this).val() === ""){
            return
        }
    fetch(`app/billing?limit=100`)
    .then(data => data.json())
    .then(data => {
            if(data.response){
                let container = document.querySelector("#billing_container")
                container.innerHTML = ""
                if(data.result.hasOwnProperty("list")){
                    var rawdata = data.result.list
                    var requestcontent = rawdata.filter(x => x.status_name == $(this).val()).map(item =>{ 
                                            return `
                                                        <tr>
                                                        <td style="width:100px;max-width:150px;overflow: hidden;text-overflow: ellipsis;">${item.ref_id}</td>
                                                        <td>${item.lname}, ${item.fname} ${item.mname}</td>
                                                        <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))} to ${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                                        <td>${item.currency} ${parseFloat(item.total_amount).toFixed(2)}</td>
                                                        <td>${item.status_name}</td>
                                                        <td><button class="btn btn-sm btn-warning" onclick="view_bill(${item.id})">VIEW</button></td>
                                                    </tr>
                                                    `
                    })
                    $("#bill_list").text(requestcontent.length)
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