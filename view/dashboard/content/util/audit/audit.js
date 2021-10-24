requestJson.get('app/system/audit/all?limit=10')
.then(data => {
    if(data.response === "OK"){
        const container = document.querySelector("#data-container");
        if(container){
            if(data.result.hasOwnProperty("list")){
                const requestcontent = data.result.list.map(item =>{
                    return `<tr>
                                <td>${item.id}</td>
                                <td>${item.fullname}</td>
                                <td>${item.action}</td>
                                <td>${item.module}</td>
                                <td>${item.timestamp}</td>
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