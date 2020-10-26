 class Log_In extends HTMLElement {

     get ContainerElement() {
         if (templates['./components/Login/template.html']) {
             if (this.innerHTML === '')
                 this.innerHTML += templates['./components/Login/template.html'];
             return this.querySelector("#log-in");
         } else return this.querySelector("#log-in");

     }

     get UserElement() {
         return this.ContainerElement.querySelector("#iU");
     }
     get PasswordElement() {
         return this.ContainerElement.querySelector("#iP");
     }
     get OkElement() {
         return this.ContainerElement.querySelector("#bOk");
     }

     get RegisterElement() {
         return this.ContainerElement.querySelector("#bR");
     }

     get ErrorElement() {
         return this.ContainerElement.querySelector("#lError");
     }



     constructor() {
         super();

         /*called when the class is 
                 instantiated
                 */
     }
     connectedCallback() {
         /*called when the element is 
                  connected to the page.
                  This can be called multiple 
                  times during the element's
                  lifecycle.
                  for example when using drag&drop
                  to move elements around
                 */
         let that = this;
         getTemplate("./components/Login/template.html").then((html) => {
             /*    document.querySelector("template").innerHTML += html;
                const template = document.querySelector("template");

                const clone = document.importNode(
                    template.content.getElementById("log-in"),
                    true
                ); */
             //template.content.children[0]
             //this.appendChild(clone);
             this.innerHTML += html;

             this.setVisibility(this.attributes['visible'].value === 'true');
             status$.subscribe('status', function name(params) {
                 console.log('Status changed (Login) : ' + params);
                 if (params == "2")
                     that.setVisibility(true);
                 else that.setVisibility(false);
             });
             this.OkElement.addEventListener("click", function() {
                 that.login(that.UserElement.value, that.PasswordElement.value);
             });

             this.RegisterElement.addEventListener("click", function() {
                 status = "1";

                 status$.publish('status', "1");
             });
         });
     }
     disconnectedCallback() {
         /*called when the element
                           is disconnected from the page
                         */
     }

     refresh() {
         this.UserElement.value = "";
         this.PasswordElement.value = "";
         this.ErrorElement.classList.remove("label--error--display");
     }
     login(u, p) {
         var found = listUsers.find(function(e) {
             return e.u == u && e.p == p;
         });

         if (found) {
             this.ErrorElement.classList.remove("label--error--display");

             current_user = found;
             status = "0";
             status$.publish('status', "0");
             //VisibilityState();

         } else {
             this.ErrorElement.classList.add("label--error--display");
         }
     }
     setVisibility(v) {

         if (v) {
             this.refresh();
             this.ContainerElement.classList.remove("hidden");
         } else this.ContainerElement.classList.add("hidden");

     }
 }
 customElements.define("log-in", Log_In);