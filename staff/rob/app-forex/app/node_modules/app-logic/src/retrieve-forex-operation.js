 const retrieveForexOperation = (token) => {

     StringValidator.prototype.validate(token);


     return fetch(`${FOREX_API_URL}/operation`, {
         headers: {
             'Content-type': 'application/json',
             'Authorization': 'Bearer ' + token
         },
         method: 'GET',
         /*   body: JSON.stringify({}) */
     }).then(res => {
         if (res.status == 400) return null;
         // throw new BadRequest('Invalid token');
         return res.json();
     })
 }