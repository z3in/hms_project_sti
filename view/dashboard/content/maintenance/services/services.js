

const selector = (name) =>{
    return document.querySelector(name)
}

$("#btn_validity").click(()=>$("#input_validity").focus())
$("#input_validity").datepicker()

const fetchList = () =>{
    fetch('app/services?limit=100')
    .then(data => data.json())
    .then(data => {
    if(data.response === "OK"){
        const container = selector("#service-container");
        container.innerHTML = "";
        if(data.result.hasOwnProperty("list")){
        const requestcontent = data.result.list.map(item =>{
            return `<tr>
                        <td>${item.service_name}</td>
                        <td>Php ${parseFloat(item.service_cost).toFixed(2)}</td>
                        <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_created))}</td>
                        <td><button class="btn btn-secondary" onclick="editRow(${item.id},'${item.service_name}','${item.service_cost}')"> EDIT</button> <button class="btn btn-danger"> DELETE</button></td>
                    </tr>`
        })
        selector("#total_active").innerHTML = requestcontent.length;
        requestcontent.forEach(el=>{
            container.innerHTML += el
        })
        }
        if(!data.result.hasOwnProperty("list")){
            container.innerHTML = `<tr><td colspan="5" style="text-align:center">No result found</td></tr>`
        }
    }
})
}


var $table_id = 0;
const editRow = (id,service,cost) =>{
    var checkbox = document.querySelector("#modal1");
    checkbox.checked = !checkbox.checked
    selector("#input_service").value = service
    selector("#input_cost").value = parseFloat(cost).toFixed(2)
    $table_id = id;
}


const saveTable = (formData) =>{
fetch('app/services/add', {method: "POST",body:JSON.stringify(formData)})
    .then(data => data.json())
    .then(data => {
    if(data.response === "Created"){
        clearFields()
        fetchList()
        return alert(data.message)
        }
    })
}

const updateTable = (formData) => {
formData[id] = $table_id;
fetch('includes/app/tables_inventory.php?request=update_table', {method: "POST",body:JSON.stringify(formData)})
    .then(data => data.json())
    .then(data => {
    if(data.response === "Created"){
        clearFields()
        fetchList()
        $table_id = 0;
        return alert(data.message)
    }
})
}

const clearFields = () =>{
    selector("#input_service").value = ""
    selector("#input_cost").value = ""
}

fetchList()

document.querySelector("#btnEscape").addEventListener("click",() => $table_id = 0)
document.querySelector("#btnAddNew").addEventListener("click",() => clearFields())
document.querySelector("#btnNewSubmit").addEventListener("click",(event)=>{
    event.preventDefault()
    data = {
        servicename:selector("#input_service").value,
        service_cost:selector("#input_cost").value,
        stats:1,
        created_by:getCookie("sessionid")
    }
    !$table_id ? saveTable(data) : updateTable(data);
})

$("input[data-type='currency']").on({
    keyup: function() {
    formatCurrency($(this));
    },
    blur: function() { 
    formatCurrency($(this), "blur");
    }
});