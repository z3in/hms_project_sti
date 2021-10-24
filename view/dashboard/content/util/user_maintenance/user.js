requestJson.get('app/user/list?limit=100')
.then(data => {
    if(data.response === "OK"){
        const container = document.querySelector("#userdata-container");
        const count = document.querySelector("#user-count");
        if(count){
            count.innerHTML = data.result.page_info.total_rows
        }
        if(container){
            if(data.result.hasOwnProperty("list")){
                const requestcontent = data.result.list.map(item =>{
                    return `<tr>
                                <td>${item.id}</td>
                                <td>${item.email}</td>
                                <td>${item.position}</td>
                                <td>${item.status ? "active" : "inactive"}</td>
                                <td>${item.date_created}</td>
                                <td>${item.created_by}</td>
                                <td><button class="btn btn-sm btn-info"><i class="fas fa-user-edit"></i>edit </button></td>
                            </tr>`
                })

                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
            }
        }
    }
})
