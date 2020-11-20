 const retrieveUser = (token) => {

     StringValidator.prototype.validate(token)
     return fetch(AUTH_API_URL, {
         headers: {
             'Authorization': 'Bearer ' + token
         },
         method: 'GET'
     }).then(res => {
         return res.json();

     }).then(response => {

         return {
             e: '',
             t: response
         }
     });


 }