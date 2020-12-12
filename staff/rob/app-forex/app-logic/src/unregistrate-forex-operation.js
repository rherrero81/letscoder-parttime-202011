 const unregistrateForexOperation = (token, operation) => {

     StringValidator.prototype.validate(token);
     if (!operation.validate())
         throw new BadOperation();

     return fetch(`${FOREX_API_URL}/operation`, {
         headers: {
             'Content-type': 'application/json',
             'Authorization': 'Bearer ' + token
         },
         method: 'PUT',
         body: JSON.stringify(operation)
     }).then(res => {
         if (res.status == 400) return null;
         // throw new BadRequest('Invalid token');
         return res.json();
     })
 }