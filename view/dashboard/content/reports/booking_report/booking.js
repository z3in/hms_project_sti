$(document).ready( function() {
    // const monthControl = document.querySelector('#date_select');
    // var date= new Date()
    // var month=("0" + (date.getMonth() + 1)).slice(-2)
    // var year=date.getFullYear()
    // monthControl.value = `${year}-${month}`
    // getReport()
    $("#search_report").click(getReport)
    $("#report_download").click(downloadAuditCSV);
});

async function downloadAuditCSV() {
    // var dateSelect = document.querySelector("#date_select");
    // if(dateSelect.value==""){
    //     return alert('Select a Month and Year')
    // }
    // const date = dateSelect.value.split("-");
    requestJson.get(`app/reports/booking_report?limit=1000&date_start=${$("#date_start").val()}&date_end=${$("#date_end").val()}`)
    // requestJson.get(`./report.php`)
    .then(data=>{
        if(data.response === "OK"){
            if(data.result.hasOwnProperty("list")){
            var csvContent = CSV(data.result.list);
            var blob = new Blob([csvContent],{type: 'text/tsv;charset=utf-8;'});
            var url = URL.createObjectURL(blob);

            var dl = document.createElement("a");
            document.body.appendChild(dl); // This line makes it work in Firefox.
            dl.setAttribute("href", url); // pass the node
            dl.setAttribute("download", `daily_audit_booking_${$("#date_start").val()}.csv`);
            dl.click();
            }
            if(!data.result.hasOwnProperty("list")){
                alert("No report on the selected date.")
            }
        }
    });
}

function getReport(){
    var dateSelect = document.querySelector("#date_select");
    // const date = dateSelect.value.split("-");
    requestJson.get(`app/reports/booking_report?limit=1000&date_start=${$("#date_start").val()}&date_end=${$("#date_end").val()}`)
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
                                    <td>${item.status_name}</td>
                                    <td>${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(item.date_from))}</td>
                                    <td>${new Intl.DateTimeFormat('en', { month:'short', day:'numeric',year: 'numeric' }).format(new Date(item.date_to))}</td>
                                    <td>${item.fullname}</td>
                                    <td>${item.total_amount}</td>
                                    <td>${item.employee_name}</td>
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
