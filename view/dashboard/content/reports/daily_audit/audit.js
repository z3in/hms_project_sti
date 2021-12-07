$(document).ready( function() {
    document.getElementById('date_select').value = new Date().toISOString().slice(0, 10);
    getReport()
    $("#search_report").click(getReport)
    $("#report_download").click(downloadAuditCSV);
});

async function downloadAuditCSV() {
    requestJson.get(`app/reports/daily_audit?limit=100&date=${$("#date_select").val()}`)
    .then(data=>{
        if(data.response === "OK"){
            if(data.result.hasOwnProperty("list")){
            var csvContent = CSV(data.result.list);
            var blob = new Blob([csvContent],{type: 'text/tsv;charset=utf-8;'});
            var url = URL.createObjectURL(blob);

            var dl = document.createElement("a");
            document.body.appendChild(dl); // This line makes it work in Firefox.
            dl.setAttribute("href", url); // pass the node
            dl.setAttribute("download", `daily_audit_report_${$("#date_select").val()}.csv`);
            dl.click();
            }
            if(!data.result.hasOwnProperty("list")){
                alert("No report on the selected date.")
            }
        }
    });
}

function getReport(){
    requestJson.get(`app/reports/daily_audit?limit=100&date=${$("#date_select").val()}`)
    .then(data => {
        if(data.response === "OK"){
            const container = document.querySelector("#data-container");
            if(container){
                container.innerHTML ="";
                if(data.result.hasOwnProperty("list")){
                    $("#res_count").text(data.result.list.length)
                    const requestcontent = data.result.list.sort((a,b)=> a.id - b.id || new Date(a.timestamp) - new Date(b.timestamp)).map(item =>{
                        return `<tr>
                                    <td>${item.ref_id}</td>
                                    <td>${item.fullname}</td>
                                    <td>${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))}</td>
                                    <td>${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                    <td>${item.employee_name}</td>
                                    <td>${item.total_amount}</td>
                                    <td>${item.status_name}</td>
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
