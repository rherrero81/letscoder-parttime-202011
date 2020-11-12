function retrieve_values(user, val) {
    let req = {
        "a": {
            "u": user.username,
            "p": user.password,
            "t": "demo"
        },
        "p": {
            "val": val
        }

    };
    //let url = 'http://localhost:3030/api/v1/values';
    let url = 'https://blacksmithapi.herokuapp.com/api/v1/values';

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