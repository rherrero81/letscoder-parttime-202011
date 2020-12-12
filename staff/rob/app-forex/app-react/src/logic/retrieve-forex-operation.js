import validator from './validators/index.js'
import exception from './exceptions/Exception.js'
import ENV from './constants.js'
const retrieveForexOperation = (token) => {

    validator.StringValidator.prototype.validate(token);


    return fetch(`${ENV.FOREX_API_URL}/operation`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'GET',
        /*   body: JSON.stringify({}) */
    }).then(res => {
        if (res.status == 400) return null;
        // throw new BadRequest('Invalid token');
        return res.json();
    })
}

export default retrieveForexOperation