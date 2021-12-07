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
                                                    <td><button class="btn btn-sm btn-warning">VIEW</button></td>
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
    
})