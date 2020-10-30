/*   const { Drink } = require('../../models/Decorator/Drink.ts');
  const { Topping } = require('../../models/Decorator/Topping.ts');
  const { Coffe } = require('../../models/Decorator/Coffe.ts');
  const { Milk } = require('../../models/Decorator/Milk.ts');
  const { Mokka } = require('../../models/Decorator/Mokka.ts');
  const { Soya } = require('../../models/Decorator/Soya.ts'); */
/* 
import { Drink } from '../../models/Decorator/Drink.ts';
import { Topping } from '../../models/Decorator/Topping.ts';
import { Coffe } from '../../models/Decorator/Coffe.ts';
import { Milk } from '../../models/Decorator/Milk.ts';
import { Mokka } from '../../models/Decorator/Mokka.ts';
import { Soya } from '../../models/Decorator/Soya.ts'; */


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

        //


    }



    async callAPI(user, url) {

        let r = await (new Promise((resolve, reject) => {
            fetch(url, {
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(user)
                })
                .then((c) => {
                    resolve(c.json());
                });
        })).then(c => {
            return c
        });

        return r;



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
            modelservice$.subscribe('status', function name(params) {
                console.log('Status changed (Login) : ' + params);
                if (params == "2")
                    that.setVisibility(true);
                else that.setVisibility(false);
            });
            this.OkElement.addEventListener("click", function() {
                if (that.UserElement.checkValidity() && that.PasswordElement.checkValidity())
                    that.login(that.UserElement.value, that.PasswordElement.value);
                else {
                    if (that.UserElement.validity.valueMissing) {
                        that.UserElement.classList.add("input--error");
                    }
                    if (that.PasswordElement.validity.valueMissing) {
                        that.PasswordElement.classList.add("input--error");
                    }
                    that.ErrorElement.classList.add("label--error--display");
                }
            });

            this.RegisterElement.addEventListener("click", function() {


                modelservice$.publish('status', "1");
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
        this.UserElement.classList.remove("input--error");
        this.PasswordElement.classList.remove("input--error");
    }
    login(u, p) {
        let that = this;
        let user = {
            username: u,
            password: p
        };


        authUser(user).then(c => {
            if (c) {
                that.ErrorElement.classList.remove("label--error--display");
                getUser(user, c).then(cc => {

                    current_user = cc.t;
                    modelservice$.publish('user', current_user);
                    modelservice$.publish('status', "0");

                });

            } else {
                that.ErrorElement.classList.add("label--error--display");
            }


        });
        /*
                var found = listUsers.find(function(e) {
                    return e.u == u && e.p == p;
                });

                if (found) {
                    this.ErrorElement.classList.remove("label--error--display");

                    current_user = found;
                    modelservice$.publish('user', current_user);
                    modelservice$.publish('status', "0");
                    //VisibilityState();

                } else {
                    this.ErrorElement.classList.add("label--error--display");
                }
                */
    }
    setVisibility(v) {

        if (v) {
            this.refresh();
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("log-in", Log_In);