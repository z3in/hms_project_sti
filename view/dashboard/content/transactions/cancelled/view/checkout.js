var url = new URL(document.location.href);
var id = url.searchParams.get("id");
requestJson.get(`app/reservation.get?id=${id}`)
.then(data => {
    if(data.response === "OK"){
        const { ref_id } = data.booking 
        document.querySelector(".page-title").innerHTML = ref_id
    }
})