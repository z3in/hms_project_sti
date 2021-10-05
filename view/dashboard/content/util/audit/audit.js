requestJson.get('app/system/audit/all?limit=10',{method:"GET"})
.then(data => {
    if(data.response === "OK"){
        const container = document.querySelector("#data-container");
        const requestcontent = data.result.data.map(item =>{
            return `<tr>
                        <td>${item.id}</td>
                        <td>${item.userid}</td>
                        <td>${item.action}</td>
                        <td>${item.module}</td>
                        <td>${item.timestamp}</td>
                    </tr>`
        })

        requestcontent.forEach(el=>{
            container.innerHTML += el
        })
    }
})