function auth_user(user) {

    ObjectValidator.prototype.validate(user, new User('', ''));

    return new Promise(function(resolve) {
        const response = fetch('https://b00tc4mp.herokuapp.com/api/v2/users/auth/', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        });

        resolve(response);
    }).then(c => {
        return new Promise(function(resolve) {
            resolve(c.json());

        }).then(cc => {
            if (cc.error == 'username and/or password wrong')
                return '';
            else return cc.token;
        });


    });
}