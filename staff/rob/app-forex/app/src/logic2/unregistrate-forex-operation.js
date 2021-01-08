import validator from './validators/index.js'
import exception from './exceptions/Exception'
import ENV from './constants.js'
const unregistrateForexOperation = (token, operation) => {

    validator.StringValidator.prototype.validate(token);
    if (!operation.validate())
        throw new exception.BadOperation();

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

export default unregistrateForexOperation