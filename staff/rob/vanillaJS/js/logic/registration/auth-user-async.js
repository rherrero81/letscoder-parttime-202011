async function auth_user(user) {

    ObjectValidator.prototype.validate(user, User());

    const response = await fetch('https://b00tc4mp.herokuapp.com/api/v2/users/auth/', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    });
    const json = await response.json();
    let token = json.token;
    return token;
}