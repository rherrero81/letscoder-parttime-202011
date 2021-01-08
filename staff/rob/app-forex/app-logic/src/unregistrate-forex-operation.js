import validator from './validators/index.js'
import exception from './exceptions/Exception.js'
import ENV from './constants.js'
export default (token, operation) => {

    validator.StringValidator.prototype.validate(token);


    return fetch(`${ENV.FOREX_API_URL}/operation`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        method: 'PUT',
        body: JSON.stringify(operation)
    }).then(res => {
        if (res.status == 400) return res.message;
        // throw new BadRequest('Invalid token');
        return res.json();
    })
}