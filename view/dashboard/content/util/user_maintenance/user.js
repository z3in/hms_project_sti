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
                                <td>${item.fname} ${item.mname} ${item.lname}</td>
                                <td>${item.email}</td>
                                <td>${item.position_name}</td>
                                <td>${item.status ? "active" : "inactive"}</td>
                                <td>${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(item.date_created))}</td>
                                <td>${item.created_by_name}</td>
                                <td><button class="btn btn-sm btn-info" onclick="editUser(${item.id})"><i class="fas fa-user-edit"></i>edit </button></td>
                            </tr>`
                })

                requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
            }
        }
    }
})

const editUser = (id) =>{
    window.location.href = `dashboard?url=createuser&edit=1&id=${id}`
}