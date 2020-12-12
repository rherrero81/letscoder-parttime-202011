 const authenticateUser = (username, password) => {

     StringValidator.prototype.validate(username);
     StringValidator.prototype.validate(password);

     return fetch('https://b00tc4mp.herokuapp.com/api/v2/users/auth/', {
         headers: {
             'Content-type': 'application/json'
         },
         method: 'POST',
         body: JSON.stringify({ username: username, password: password })
     }).then(res => {

         return res.json()
     }).then(response => {

         if (response.token)
             return response.token;
         else return null
     });


 }

 export default authenticateUser