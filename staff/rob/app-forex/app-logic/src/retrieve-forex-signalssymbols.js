import validator from './validators/index.js'
import exception from './exceptions/Exception.js'
import ENV from './constants.js'
export default (token, search) => {
    validator.StringValidator.prototype.validate(token);
    validator.StringValidator.prototype.validate(search);

    return fetch(`${ENV.FOREX_API_URL}/signalsymbol`, {
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