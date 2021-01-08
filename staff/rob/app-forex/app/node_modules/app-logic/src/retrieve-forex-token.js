import validator from './validators/index.js'
import ENV from './constants.js'
export default (username, password, accountType = 'demo') => {

    validator.StringValidator.prototype.validate(username);
    validator.StringValidator.prototype.validate(password);
    validator.StringValidator.prototype.validate(accountType);

    return fetch(`${ENV.FOREX_API_URL}/auth`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username: username, password: password, accountType: accountType })
    }).then(res => {
        return res.json()
    }).then(data => data);
}