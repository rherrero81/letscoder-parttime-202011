import validator from './validators/index.js'
import ENV from './constants.js'
export default (token) => {

    validator.StringValidator.prototype.validate(token)
    return fetch(ENV.AUTH_API_URL, {
        headers: {
            'Authorization': 'Bearer ' + token
        },
        method: 'GET'
    }).then(res => {
        return res.json();

    }).then(response => {

        return {
            e: '',
            t: response
        }
    });


}