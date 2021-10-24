
$(document).ready(()=>{
    const getRoomCategory = () =>{
    
        requestJson.get(`app/room/category/list?limit=100`)
        .then(data=>{
            if(data.response === "OK"){
                const container = document.querySelector("#roomcategory-container");
                if(container){
                    if(data.result.hasOwnProperty("list")){
                    
                        container.innerHTML = "";
                        const requestcontent = data.result.list.map(item =>{
                            return `<tr>
                                        <td>${item.id}</td>
                                        <td><img src="${item.photo}" alt="${item.category}" style="width:100px;height:100px;object-fit: cover;" /></td>
                                        <td>${item.category}</td>
                                        <td>${item.bed}</td>
                                        <td>${item.room_description}</td>
                                        <td><button class="btn btn-sm btn-info"><i class="fas fa-user-edit"></i> modify</button></td>
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
    
    $("#category").submit(function(event) {
        var formData = new FormData()
        const files = document.getElementById('inputFileUpload');
        formData.append("category", $("#inputTypeName").val())
        formData.append("room_description", $("#inputRoomDescription").val())
        formData.append("bed", $("#inputBedNo").val())
        formData.append("photo", files.files[0]);
        requestJson.post(`app/rooms/category/add?id=${getCookie('sessionid')}`,formData)
        .then(data => {
            if(data.response === "Created"){
                getRoomCategory()
                $("#inputTypeName").val("")
                $("#inputRoomDescription").val("")
                $("#inputBedNo").val("")
                $('#inputFileUpload').val("")
                alert(data.message)
            }
        })
        event.preventDefault()
    })
    
    getRoomCategory()
})

