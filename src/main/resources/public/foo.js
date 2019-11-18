
const start = URL => {

    const client = (url, method = 'GET', data = null) => {
        const request = {
            method: method,             // *GET, POST, PUT, DELETE, etc.
            mode: 'same-origin',      // no-cors, *cors, same-origin
            cache: 'no-cache',         // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin',      // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json', // 'application/x-www-form-urlencoded'
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
        };
        if (null != data) {
            request.body = JSON.stringify(data)
        }
        return fetch(url, request)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(resp);
                }
                return resp.json()
            })
            .catch(error => console.error(error))
    };

    client(URL)
        .then(json => document.writeln(JSON.stringify(json)));

    client(URL + '/1', 'PUT', {"firstName": "Dierk", "imageUrl": null, "lastName": "Koenigxx"})
        .then(json => document.writeln(JSON.stringify(json)));

    client(URL)
        .then(json => document.writeln(JSON.stringify(json)));

    client(URL, 'POST', {"firstName": "Roger", "imageUrl": null, "lastName": "Federer"})
        .then(json => {
            document.writeln(JSON.stringify(json));
        });

    client(URL + '/3', 'DELETE')
        .then(json => document.writeln(JSON.stringify(json))); // Error expected if FK violation

}
