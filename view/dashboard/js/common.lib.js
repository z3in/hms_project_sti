function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const requestPage = async (endpoint,options = {},returntype = "json") => {

    const result = returntype === "json" ? await fetch(endpoint,options).then(data=>data.json()) : await fetch(endpoint,options).then(data=>data.text())
    return result
}


class HttpRequestPage{

    returnData

    constructor(returntype = null){
        this.returnData = !returntype ? "json" : returntype;
    }

    async get(endpoint,options = {}){
        const result = this.fetchResult(endpoint,options)
        return result
    }

    async fetchResult(endpoint,options){
        return this.returnData === "json" ? 
        await fetch(endpoint,options).then(data=>data.json()) 
        : await fetch(endpoint,options).then(data=>data.eval(`${this.returnData}()`))
    }
}

const requestJson = new HttpRequestPage("json")