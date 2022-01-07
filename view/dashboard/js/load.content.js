var old_container;
window.onload = (event) =>{
    subMenuEffect(getParameterByName('url'))
    document.querySelectorAll(".main-menu").forEach(item => item.addEventListener("click",()=>toggleSubMenu(item.dataset.nav)))
}

const toggleSubMenu = (nav) =>{
    document.querySelectorAll(".top-level li").forEach(item => item.classList.remove("selected"))
    document.querySelector(`.top-level li[data-nav=${nav}]`).classList.add("selected")
    document.querySelectorAll(".submenu").forEach(item => {
        item.classList.remove("show")
        item.classList.add("hidden")
    })
    let selectednav = document.querySelector(`ul[data-nav='sub-${nav}']`)
    if(selectednav){
    selectednav.classList.remove("hidden");
    selectednav.classList.add("show");
    }
}

const subMenuEffect = (hash) =>{
    document.querySelectorAll(".top-level li").forEach(item => item.classList.remove("selected"))
    document.querySelectorAll(".top-level li ul li a").forEach(item => item.classList.remove("highlight-font"))
    let ref = document.querySelector(`a[data-url='${hash}']`);
    if(ref){
        if(ref.dataset.nonnav){
            checkNonNav(hash)
            return;
        }
    ref.parentNode.parentNode.parentNode.dataset.withsub ? ref.classList.add("highlight-font") : ref.parentNode.classList.add("selected");
    ref.parentNode.parentNode.parentNode.classList.add("selected");
        if(ref.parentNode.parentNode.parentNode.dataset.withsub){
            ref.parentNode.parentNode.classList.add("show") 
            ref.parentNode.parentNode.classList.remove("hidden") 
        }
    }
    if(!ref){
        checkNonNav(hash)
    }
}

const checkNonNav = (hash) => {
    let nonNavs = {
        createuser: "usermaintenance",
        manageposition: "usermaintenance",
        createposition: "usermaintenance",
        accommodation_category: "accommodation",
        accommodation_features : "accommodation",
        accommodation_room: "accommodation",
        guestinfo:"checkin",
        billinfo:"checkin",
        reservation:"reservation_online",
        bill_res:"billing"
    }
    subMenuEffect((hash in nonNavs) ? nonNavs[`${hash}`] : "dashboard")
}