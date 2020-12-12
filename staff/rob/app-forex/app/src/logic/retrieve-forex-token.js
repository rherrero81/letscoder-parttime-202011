  const retrieveForexToken = (username, password, accountType = 'demo') => {

      StringValidator.prototype.validate(username);
      StringValidator.prototype.validate(password);
      StringValidator.prototype.validate(accountType);

      return fetch(`${FOREX_API_URL}/auth`, {
          headers: {
              'Content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ username: username, password: password, accountType: accountType })
      }).then(res => res.json()).then(data => data.result);
  }

  export default retrieveForexToken