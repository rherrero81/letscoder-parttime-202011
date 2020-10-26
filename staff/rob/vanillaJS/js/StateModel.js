 var templates = {};
 var listUsers = [];
 var status = "2";
 var current_user = {
     f: '',
     u: '',
     l: '',
     p: '',
     m: ''
 };

 /*  listUsers.push({
      f: '1',
      u: '1',
      l: '1',
      p: '1',
      m: '1'
  }); */


 // const status$ = new ObservableOf(status)
 const status$ = new pubSub();



 // publisher
 // Subscriber
 // unsubscribe
 // Some place to store callbacks that are registered from subscribers.