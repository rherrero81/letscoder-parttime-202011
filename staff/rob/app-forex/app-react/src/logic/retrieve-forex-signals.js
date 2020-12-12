import validator from './validators/index.js'
import exception from './exceptions/Exception.js'
import ENV from './constants.js'

const retrieveForexSignals = (token, symbol, period) => {
    validator.StringValidator.prototype.validate(token);
    validator.StringValidator.prototype.validate(symbol);

    return fetch(`${ENV.FOREX_API_URL}/signal`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({
            symbol: symbol,
            period: period ? period : '1d'
        })
    }).then(res => {

        if (res.status == 400) return null;
        //  throw new BadRequest();
        return res.json()
    })

}

export default retrieveForexSignals