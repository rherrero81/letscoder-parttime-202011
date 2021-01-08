import validator from './validators/index.js'
import exception from './exceptions/Exception.js'
import ENV from './constants.js'
import User from './models/Authentication/User.js'
import authenticateUser from './authenticate-user.js'
const removeUser = async(user) => {

    validator.ObjectValidator.prototype.validate(user, User);

    if (typeof user !== 'object')
        throw new TypeError('No es un objeto')

    let aut = await authenticateUser(user.username, user.password);

    if (!aut)
        return { e: 'No user to remove.' };
    return fetch(ENV.AUTH_API_URL, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + aut
        },
        method: 'DELETE',
        body: JSON.stringify(user)
    }).then(response => {
        if (response.ok)
            return { e: '', t: '' };
        else return { e: response.statusText, t: '' }
    });

}

export default removeUser