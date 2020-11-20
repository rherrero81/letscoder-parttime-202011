function retrieveForexTradeHistorical(token, symbol, startTime, endTime) {
    StringValidator.prototype.validate(token);
    StringValidator.prototype.validate(symbol);
    /*     StringValidator.prototype.validate(startTime);
        StringValidator.prototype.validate(EndTime); */

    return fetch(`${FOREX_API_URL}/historical`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({ startTime: startTime, endTime: endTime })
    }).then(res => {

        if (res.status == 400) return null;
        //throw new BadRequest();
        return res.json()
    })

}