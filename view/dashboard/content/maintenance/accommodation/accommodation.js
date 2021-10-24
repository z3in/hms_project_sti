$(document).ready(()=>{

    

    const getRooms = () =>{
    
        requestJson.get(`app/room?limit=100`)
        .then(data=>{
            if(data.response === "OK"){
                if(data.result.hasOwnProperty("list")){
                    const container = document.querySelector("#room-container");
                    container.innerHTML = "";
                    const requestcontent = data.result.list.map(item =>{
                        return `<tr id="row_${item.id}">
                                    <td>${item.room_number}</td>
                                    <td><img src="${item.photo}" alt="${item.category}" style="width:100px;height:100px;object-fit: cover;" /></td>
                                    <td>${item.room_type}</td>
                                    <td>${item.status_name.toLowerCase()}</td>
                                    <td><button class="btn btn-sm btn-info"><i class="fas fa-user-edit"></i> modify</button></td>
                                </tr>
                                `
                    })
        
                    requestcontent.forEach(el=>{
                        container.innerHTML += el
                    })
                    return 
                }
                container.innerHTML = `<tr><td colspan="5" style="text-align:center">No Result Found</td></tr>`
            }
        })
    }

    getRooms()
})
