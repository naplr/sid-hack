import config from './config'

export function getRequest(urlPath, params={}) {
    const queryString = JSON.stringify(params)

    return new Promise((resolve, reject) => {
        fetch(`${config.baseApiUrl}${urlPath}?${queryString}`, { 
            method: 'GET',
        })
            .then(res => {
                resolve(res.json())
            })
            .catch(r => {
                console.error(r.message)
            })
    })
}

export function postRequest(urlPath, data) {
    const headers = new Headers({
        'Content-Type': 'application/json'
    })

    return new Promise((resolve, reject) => {
        fetch(`${config.baseApiUrl}${urlPath}`, { 
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            mode: 'cors'
        })
            .then(res => {
                resolve(res.json())
            })
            .catch(r => {
                console.error(r.message)
            })
    })
}