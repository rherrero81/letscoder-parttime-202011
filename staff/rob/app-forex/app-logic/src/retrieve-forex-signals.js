import validator from './validators/index.js'
import exception from './exceptions/Exception.js'
import ENV from './constants.js'

export default (token, symbol, period, price) => {
    validator.StringValidator.prototype.validate(token);
    validator.StringValidator.prototype.validate(symbol);

    return fetch(`${ENV.FOREX_API_URL}/signals`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'POST',
        body: JSON.stringify({
            symbol: symbol,
            period: period ? period : '1d',
            price: price
        })
    }).then(res => {

        if (res.status == 400) return null;
        //  throw new BadRequest();
        return res.json()
    })

}