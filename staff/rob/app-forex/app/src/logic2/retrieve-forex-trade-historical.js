import validator from './validators/index.js'
import ENV from './constants.js'

function retrieveForexTradeHistorical(token, symbol, startTime, endTime) {
    validator.StringValidator.prototype.validate(token);
    validator.StringValidator.prototype.validate(symbol);
    /*     StringValidator.prototype.validate(startTime);
        StringValidator.prototype.validate(EndTime); */

    return fetch(`${ENV.FOREX_API_URL}/tradeshistory`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({ startTime: startTime, endTime: endTime, symbol: symbol })
    }).then(res => {

        if (res.status == 400) return null;
        //throw new BadRequest();
        return res.json()
    })

}

export default retrieveForexTradeHistorical