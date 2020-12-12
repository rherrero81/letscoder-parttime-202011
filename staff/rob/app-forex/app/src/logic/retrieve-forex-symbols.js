 const retrieveForexSymbols = (token) => {

     StringValidator.prototype.validate(token);


     return fetch(`${FOREX_API_URL}/symbols`, {
         headers: {
             'Content-type': 'application/json',
             'Authorization': 'Bearer ' + token
         },
         method: 'POST',
         body: JSON.stringify({})
     }).then(res => {
         if (res.status == 400) return null;
         // throw new BadRequest('Invalid token');
         return res.json();
     })
 }

 export default retrieveForexSymbols