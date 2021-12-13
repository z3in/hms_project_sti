
$(document).ready(()=>{
    const getEventList = () =>{
    
        requestJson.get(`app/event/list?limit=100`)
        .then(data=>{
            if(data.response === "OK"){
                const container = document.querySelector("#event-container");
                if(container){
                    if(data.result.hasOwnProperty("list")){
                    
                        container.innerHTML = "";
                        const requestcontent = data.result.list.map(item =>{
                            return `<tr>
                                        <td>${item.id}</td>
                                        <td>${item.requestor}</td>
                                        <td>${item.request_date}</td>
                                        <td>${item.phone}</td>
                                        <td>${item.email}</td>
                                        <td><button class="btn btn-sm btn-warning"><i class="fas fa-check"></i> approve</button></td>
                                    </tr>`
                        })
            
                        requestcontent.forEach(el=>{
                            container.innerHTML += el
                        })
                        return 
                    }
                    container.innerHTML = `<tr><td colspan="5" style="text-align:center">No Result Found</td></tr>`
                }
            }
        })
    }
    getEventList()
})

