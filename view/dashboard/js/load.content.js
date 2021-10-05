var old_container;
window.onload = (event) =>{
    const main = document.querySelector("main")
    getContent(getURLHash())
    .then((body) => body ? transitionEffect(main,body):null)
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

const pageContents = () =>{
    return  {
        dashboard: {url:"view/dashboard/content/dashboard/dashboard.html",script:null},
        usermaintenance: {url:"view/dashboard/content/util/user_maintenance/usermaintenance.html",script:null},
        audit: {url:"view/dashboard/content/util/audit/audit.html",script:"view/dashboard/content/util/audit/audit.js"},
        createuser: {url:"view/dashboard/content/util/user_maintenance/createuser.html",script:"view/dashboard/content/util/user_maintenance/createuser.js"},
        manageposition: {url:"view/dashboard/content/util/user_maintenance/manageposition/manageposition.html",script:"view/dashboard/content/util/user_maintenance/manageposition/manageposition.js"},
        backup: {url:"view/dashboard/content/util/backupandrestore/backup.html",script:null}
    }
}

const getContent = (hash) =>{
    document.querySelectorAll(".top-level li").forEach(item => item.classList.remove("selected"))
    document.querySelectorAll(".top-level li ul li a").forEach(item => item.classList.remove("highlight-font"))
    subMenuEffect(hash);
    let request = requestPage(`${getContentBaseOnURL(hash)}`,{},"text")
    return request;
}

const getContentBaseOnURL = (url) =>{
    let pageContent = pageContents()
    let page = url.substring(1)
    let endpoint = (page in pageContent) ? pageContent[`${page}`].url : pageContent.dashboard;
    if(pageContent[`${page}`].script){
    getScript((page in pageContent) ? pageContent[`${page}`].script : null)
    }
    return endpoint;
}

const getScript = (path) =>{
        if(path === null){
            return
        }
        let p = document.getElementById("script-adapter")
        if(p){
            p.remove()
            script = document.createElement("script");
            script.type = 'text/javascript'
            script.id = "script-adapter"
            script.src = path
        }
        document.body.appendChild(script)
}

const subMenuEffect = (hash) =>{
    let ref = document.querySelector(`a[href='${hash}']`);
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
        createuser: "#usermaintenance",
        manageposition: "#usermaintenance"
    }
    subMenuEffect((hash.substring(1) in nonNavs) ? nonNavs[`${hash.substring(1)}`] : "#dashboard")
}

const getURLHash = () =>{
    var hash = window.location.hash
    return hash === "" ? "#dashboard":hash
     
}