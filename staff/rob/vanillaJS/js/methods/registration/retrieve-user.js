 function retrieve_user(user, token) {

     ObjectValidator.prototype.validate(user, new User());
     return ((async() => {
         const response = await fetch('https://b00tc4mp.herokuapp.com/api/v2/users/', {
             headers: {
                 'Authorization': 'Bearer ' + token
             },
             method: 'GET'
         });
         const json = await response.json();
         if (json.hasOwnProperty('error'))

             return { e: json.error, t: '' }
         else
             return {
                 e: '',
                 t: json
             }
     })());
 }