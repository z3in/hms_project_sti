

const selector = (name) =>{
    return document.querySelector(name)
}

$("#btn_validity").click(()=>$("#input_validity").focus())
$("#input_validity").datepicker()

const fetchList = () =>{
    fetch('app/discount?limit=100')
    .then(data => data.json())
    .then(data => {
    if(data.response === "OK"){
        const container = selector("#discount-container");
        container.innerHTML = "";
        if(data.result.hasOwnProperty("list")){
        const requestcontent = data.result.list.map(item =>{
            return `<tr>
                        <td>${item.promo_code}</td>
                        <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.validity))}</td>
                        <td>${new Date(item.validity) < new Date() ? "expired" : "active"}</td>
                        <td>${item.discount_rate}</td>
                        <td>${parseFloat(item.discount_limit).toFixed(2)}</td>
                        <td>${new Intl.DateTimeFormat('en', { month:'long', day:'numeric',year: 'numeric' }).format(new Date(item.date_created))}</td>
                        <td><button class="btn btn-secondary" onclick="editRow(${item.id},'${item.promo_code}','${reorder_array_fordate(item.validity.split("-"))}','${item.discount_rate}',${item.discount_limit})"> EDIT</button> <button class="btn btn-danger"> DELETE</button></td>
                    </tr>`
        })
        const countActive = data.result.list.filter(x => new Date(x.validity) > new Date()).length
        selector("#total_active").innerHTML = countActive;
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

const reorder_array_fordate = (arr) =>{
    let temp;
    if(arr.length > 2){
    temp = arr[1];
    temp += `/${arr[2]}`
    temp += `/${arr[0]}`
    }
    return temp;
}


var $table_id = 0;
const editRow = (id,promo,validity,disc_rate,disc_limit) =>{
    var checkbox = document.querySelector("#modal1");
    checkbox.checked = !checkbox.checked
    selector("#input_discount_code").value = promo
    selector("#input_validity").value = validity
    selector("#input_discount_rate").value = disc_rate
    selector("#input_discount_limit").value = disc_limit
    $table_id = id;
}


const saveTable = (formData) =>{
fetch('app/discount/add', {method: "POST",body:JSON.stringify(formData)})
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
    selector("#input_discount_code").value = ""
    selector("#input_validity").value = ""
    selector("#input_discount_rate").value = ""
    selector("#input_discount_limit").value = ""
}

fetchList()

document.querySelector("#btnEscape").addEventListener("click",() => $table_id = 0)
document.querySelector("#btnAddNew").addEventListener("click",() => clearFields())
document.querySelector("#btnNewSubmit").addEventListener("click",(event)=>{
    getCookie("session,id")
data = {
    promo_code:selector("#input_discount_code").value,
    validity:selector("#input_validity").value,
    discount_rate:selector("#input_discount_rate").value,
    discount_limit:selector("#input_discount_limit").value,
    created_by:getCookie("sessionid")
}
!$table_id ? saveTable(data) : updateTable(data);
event.preventDefault()
})