import validator from './validators/index.js'
const authenticateUser = (username, password) => {

    validator.StringValidator.prototype.validate(username);
    validator.StringValidator.prototype.validate(password);

    return fetch('https://b00tc4mp.herokuapp.com/api/v2/users/auth/', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ username: username, password: password })
    }).then(res => {

        return res.json()
    }).then(response => {

        if (response.token)
            return { token: response.token };
        else return response.error
    });


}
export default authenticateUser