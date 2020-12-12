 import authenticateUser from './authenticate-user.js'
 const registrateUser = async(user) => {


     ObjectValidator.prototype.validate(user, UserAttr);
     let aut = await authenticateUser(user.username, user.password);
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
     return await fetch(AUTH_API_URL, {
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


 export default registrateUser