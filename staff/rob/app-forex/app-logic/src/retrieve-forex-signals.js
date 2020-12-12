function retrieveForexSignals(token, symbol, period) {
    StringValidator.prototype.validate(token);
    StringValidator.prototype.validate(symbol);

    return fetch(`${FOREX_API_URL}/signal`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({
            symbol: symbol,
            period: period
        })
    }).then(res => {

        if (res.status == 400) return null;
        //  throw new BadRequest();
        return res.json()
    })

}