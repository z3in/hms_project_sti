$("#btn_backup").click(()=> {
    if(confirm("Do you want to create a new backup file ?")){
        startBackup()
    }
    
})

$("document").ready(()=>{
    getBackupList()
})

const startBackup = () =>{
    var userID = getCookie("sessionid");
    requestJson.get(`app/system/backup?userid=${userID}`)
    .then(data =>{
        if(data.hasOwnProperty("message")){
            alert(data.message)
        }
    })
}

const getBackupList = () =>{
    requestJson.get(`app/system/backup/list?limit=1000`)
    .then(data =>{
        if(data.response === "OK"){
            const container = document.querySelector("#data-container")
            const backupCount = document.querySelector("#backup_count")
            const backupdate = document.querySelector("#backupdate")
            if(container){
                if(data.result.hasOwnProperty("list")){
                    backupCount.innerText = convertMiliseconds(Math. floor(new Date() - new Date(Math.max(...data.result.list.map(e => new Date(e.date_created))))),"d")
                    backupdate.innerHTML = new Intl.DateTimeFormat('en', { month:"short", day:"numeric",year:"numeric" }).format(new Date(Math.max(...data.result.list.map(e => new Date(e.date_created)))))
                    const requestcontent = data.result.list.sort((a,b)=> a.id - b.id || new Date(a.date_created) - new Date(b.date_created)).map(item =>{
                        return `<tr>
                                    <td>${item.id}</td>
                                    <td>${new Intl.DateTimeFormat('en', { dateStyle: 'full', timeStyle: 'short' }).format(new Date(item.date_created))}</td>
                                    <td>${item.backup_name}</td>
                                    <td>${item.type}</td>
                                    <td>${item.userid}</td>
                                    <td><button class="btn btn-block btn-warning ${item.type === "restore" ? "hidden":null}">Restore</button></td>
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