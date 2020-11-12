function retrieve_historical(user, val, s, e) {
    let req = {
        "a": {
            "u": user.username,
            "p": user.password,
            "t": "demo"
        },
        "p": {
            "val": val,
            "s": s,
            "e": e
        }

    };
    //let url = 'http://localhost:3030/api/v1/symbols';
    let url = 'https://blacksmithapi.herokuapp.com/api/v1/symbols';

    return (async() => {

        let response = await fetch(url, {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(req)
        });
        return await response.json();

    })();

}