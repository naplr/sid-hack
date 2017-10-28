import config from './config'

function _stringifyParams(params) {
  if (!params) {
      return ''
  }

  const keys = Object.keys(params)
  if (keys.length === 0) {
      return ''
  }

  const q = keys.reduce((acc, key) => {
      acc += `&${key}=${params[key]}`
      return acc
  }, '')

  return q.substring(1)
}

export function getRequest(urlPath, params={}) {
    const queryString = _stringifyParams(params)

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

export function translatePageStatus(status) {
  const s = Number(status)
  switch(s) {
    case 0:
      return 'Potential'
    case 1:
      return 'Interested'
    case 2: 
      return 'Engaged'
    case 4:
      return 'Paid'
    case 8:
    default:
      return 'Deleted'
  }
}