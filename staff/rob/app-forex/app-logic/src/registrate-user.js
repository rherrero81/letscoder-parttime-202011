import validator from './validators/index.js'
import exception from './exceptions/Exception.js'
import ENV from './constants.js'
import UserAttr from './models/Authentication/UserAttr.js'

import authenticateUser from './authenticate-user.js'
export default async(username, password, firstname, lastname, email) => {

    let user = { username: username, password: password, firstname: firstname, lastname: lastname, email: email }
    validator.ObjectValidator.prototype.validate(user, UserAttr);
    let aut = await authenticateUser(username, password);
    let method = 'POST';
    let headers = {
        'Content-type': 'application/json'
    };
    if (aut) {
        method = 'PATCH';
        headers = {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + aut
        };
        user = {
            firstname: firstname,
            lastname: lastname,
            email: email
        }
    }
    return await fetch(ENV.AUTH_API_URL, {
        headers: headers,
        method: method,
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok) {
            return {
                e: '',
                t: aut
            }
        } else
            return { e: response.statusText, t: '' }
    });
}