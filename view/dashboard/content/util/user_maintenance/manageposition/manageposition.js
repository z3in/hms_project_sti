requestJson.get('app/user/role/list?limit=10')
.then(data => {
    if(data.response === "OK"){
        const container = document.querySelector("#data-container");
        const count = document.querySelector("#list-count");
        if(container){
            if(data.result.hasOwnProperty("list")){
                list_count.innerHTML = data.result.page_info.total_rows
                const requestcontent = data.result.list.map(item =>{
                    return `<tr>
                                <td>${item.id}</td>
                                <td>${item.position}</td>
                                <td>${item.priv}</td>
                                <td>${item.status}</td>
                                <td>${item.date_created}</td>
                                <td>${item.created_by}</td>
                                <td></td>
                            </tr>`
                })

                return requestcontent.forEach(el=>{
                    container.innerHTML += el
                })
            }
            container.innerHTML = `<tr><td colspan="5" style="text-align:center">No Result Found</td></tr>`
        }
    }
})
