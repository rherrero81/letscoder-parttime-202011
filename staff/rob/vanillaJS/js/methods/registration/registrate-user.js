 function registrate_user(user) {


     ObjectValidator.prototype.validate(user, new UserAttr('', '', '', '', ''));
     return ((async() => {
         let aut = await auth_user(new User(user.username, user.password));
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
                 firstname: user.firstname,
                 lastname: user.lastname,
                 email: user.email
             }
         }

         const response = await fetch('https://b00tc4mp.herokuapp.com/api/v2/users/', {
             headers: headers,
             method: method,
             body: JSON.stringify(user)
         });
         if (response.ok) {
             return {
                 e: '',
                 t: aut
             }
         } else
             return { e: response.statusText, t: '' };
     })());
 }