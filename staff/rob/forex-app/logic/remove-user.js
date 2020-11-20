 const removeUser = async(user) => {

     ObjectValidator.prototype.validate(user, User);

     if (typeof user !== 'object')
         throw new TypeError('No es un objeto')

     let aut = await authenticateUser(user.username, user.password);

     if (!aut)
         return { e: 'No user to remove.' };
     return fetch(AUTH_API_URL, {
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