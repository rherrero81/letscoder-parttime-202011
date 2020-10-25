 class Log_In extends HTMLElement {
     get UserElement() {
         return document.getElementById("iU");
     }
     get PasswordElement() {
         return document.getElementById("iP");
     }
     get OkElement() {
         return document.getElementById("bOk");
     }

     get RegisterElement() {
         return document.getElementById("bR");
     }

     get ErrorElement() {
         return document.getElementById("lError");
     }

     get ContainerElement() {
         return document.getElementById("log-in");
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
             document.querySelector("template").innerHTML += html;
             const template = document.querySelector("template");

             const clone = document.importNode(
                 template.content.getElementById("log-in"),
                 true
             );
             //template.content.children[0]
             this.appendChild(clone);
             VisibilityState();
             this.OkElement.addEventListener("click", function() {
                 that.login(that.UserElement.value, that.PasswordElement.value);
             });

             this.RegisterElement.addEventListener("click", function() {
                 status = "1";

                 VisibilityState();
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

             VisibilityState();

         } else {
             this.ErrorElement.classList.add("label--error--display");
         }
     }
     setVisibility(v) {
         if (this.ContainerElement) {
             if (v) {
                 this.refresh();
                 this.ContainerElement.classList.remove("hidden");
             } else this.ContainerElement.classList.add("hidden");
         };
     }
 }
 customElements.define("log-in", Log_In);