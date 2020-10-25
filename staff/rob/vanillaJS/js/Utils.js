 async function setTemplate(url) {
     let promise = new Promise((resolve, reject) => {
         fetch(url).then(c => {

             resolve(c.text());
         });
     });

     promise.then((html) => {
         document.querySelector('template').innerHTML += html;
     });
 }

 async function getTemplate(url) {
     return promise = new Promise((resolve, reject) => {
         fetch(url).then(c => {

             resolve(c.text());
         });
     });

     /*  promise.then((html) => {
          document.querySelector('template').innerHTML += html;
      }); */
 }