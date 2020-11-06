 function retrieve_user(user, token) {

     ObjectValidator.prototype.validate(user, User);
     return ((async() => {
         const response = await fetch('https://b00tc4mp.herokuapp.com/api/v2/users/', {
             headers: {
                 'Authorization': 'Bearer ' + token
             },
             method: 'GET'
         });
         const ret = await response.json();
         if (response.ok)
             return {
                 e: '',
                 t: ret
             };
         else
             return { e: ret.error, t: '' };


     })());
 }