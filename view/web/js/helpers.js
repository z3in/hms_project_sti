/*helpers*/
async function requestURL(url,requestOptions){
    const action = await fetch(url,requestOptions)
    .then(response=> response.json())
    .then(data => data);
    return action;
}

function createHeaders(key){
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Basic ${btoa(key)}`);
    myHeaders.append("Content-Type", "application/json");
    return myHeaders;
}

function createRequestOption(method,data = null,header = null){
    var requestOptions = {
        method: method
    }
    if(data !== null)
    requestOptions = {
        method: method,
        redirect: "follow",
        body : JSON.stringify(data)
    };

    requestOptions['headers'] = header !== null ? header : null;
    
    let requestOpt = removeEmpty(requestOptions);

    return requestOpt;
}

function removeEmpty(obj) {
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
