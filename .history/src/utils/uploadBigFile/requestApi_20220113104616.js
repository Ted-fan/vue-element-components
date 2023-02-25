export const requestApi = (option) => {
    if (option.isJson && JSON.stringify(option.data) !== {}) {
        return service({
            method: option.method,
            url: `${option.url}`,
            data: option.data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else if (option.isJson && JSON.stringify(option.data) === {}) {
        return service({
            method: option.method,
            url: `${option.url}`,
            data: option.data,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else if (!option.isJson && JSON.stringify(option.data) !== {}) {
        return service({
            method: option.method,
            url: `${option.url}`,
            params: option.data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
    } else if (!option.isJson && JSON.stringify(option.data) === {}) {
        return service({
            method: option.method,
            url: `${option.url}`
        })
    }
}