 function remove_user(user) {

     ObjectValidator.prototype.validate(user, User);

     if (typeof user !== 'object')
         throw new TypeError('No es un objeto')


     return ((async() => {
         let aut = await auth_user(user);

         if (!aut)
             return { e: 'No user to remove.' };
         const response = await fetch('https://b00tc4mp.herokuapp.com/api/v2/users/', {
             headers: {
                 'Content-type': 'application/json',
                 'Authorization': 'Bearer ' + aut
             },
             method: 'DELETE',
             body: JSON.stringify(user)
         });
         if (response.ok)
             return { e: '', t: '' };
         else return { e: response.statusText, t: '' }
     })());

 }