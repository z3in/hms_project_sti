var old_container;
window.onload = (event) =>{
    const main = document.querySelector("main")
     getContent(getURLHash())
     .then((body) => main.innerHTML = body ? body:null)

     window.onhashchange = function(){getContent(getURLHash()).then(body=> body ? transitionEffect(main,body):null)}
     document.querySelectorAll(".main-menu").forEach(item => item.addEventListener("click",()=>toggleSubMenu(item.dataset.nav)))
}

const transitionEffect = (container,content) => {
    container.style = "visibility:none"
    container.innerHTML = content
    container.style = "visibility:visible"
}
const toggleSubMenu = (nav) =>{
    document.querySelectorAll(".top-level li").forEach(item => item.classList.remove("selected"))
    document.querySelector(`.top-level li[data-nav=${nav}]`).classList.add("selected");
    document.querySelectorAll(".submenu").forEach(item => {
        item.classList.remove("show")
        item.classList.add("hidden")
    })
    let selectednav = document.querySelector(`ul[data-nav='sub-${nav}']`)
    selectednav.classList.remove("hidden");
    selectednav.classList.add("show");
}

const getContent = (hash) =>{
    // document.querySelectorAll(".top-level li").forEach(item => item.classList.remove("selected"))
    document.querySelectorAll(".top-level li ul li a").forEach(item => item.classList.remove("highlight-font"))
    subMenuEffect(hash);
    let request = requestPage(getContentBaseOnURL(hash))
    return request;
}
const getContentBaseOnURL = (url) =>{
    let pageContents = {
        dashboard: "view/dashboard/content/dashboard/dashboard.html",
        usermaintenance: "view/dashboard/content/util/user_maintenance/usermaintenance.html",
        audit: "view/dashboard/content/util/audit/audit.html",
    }
    let endpoint = (url.substring(1) in pageContents) ? pageContents[`${url.substring(1)}`] : pageContents.dashboard;
    return endpoint;
}
const subMenuEffect = (hash) =>{
    let ref = document.querySelector(`a[href='${hash}']`);
    if(ref){
    ref.parentNode.parentNode.parentNode.dataset.withsub ? ref.classList.add("highlight-font") : null;
    }
}

const requestPage = async (endpoint) => {
    const result = await fetch(endpoint)
                .then(data=>data.text())
    return result
}

const getURLHash = () =>{
    var hash = window.location.hash
    return hash
}