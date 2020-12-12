function retrieveForexSignalsSymbols(token, search) {
    StringValidator.prototype.validate(token);
    StringValidator.prototype.validate(search);

    return fetch(`${FOREX_API_URL}/signalsymbol`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({
            search: search
        })
    }).then(res => {

        if (res.status == 400) return null;
        //  throw new BadRequest();
        return res.json()
    })

}