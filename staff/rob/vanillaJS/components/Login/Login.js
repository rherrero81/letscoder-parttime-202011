class Log_In extends HTMLComponent {
    get ContainerElement() {
        if (templates["./components/Login/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/Login/template.html"];
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
        let that = this;
        that.url = '/components/Login/';
    }

    async callAPI(user, url) {
        let r = await new Promise((resolve, reject) => {
            fetch(url, {
                headers: {
                    "Content-type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(user),
            }).then((c) => {
                resolve(c.json());
            });
        }).then((c) => {
            return c;
        });

        return r;
    }


    Onload() {
        let that = this;
        let template_url = "." + that.url +
            "template.html";
        getTemplate(template_url).then((html) => {
            that.innerHTML += html;



            that.renderTemplate();
            //APPLY ATTR
            // that.setVisibility(that.attributes["visible"].value === "true");
            //



            //BUTTON EVENTS
            that.OkElement.addEventListener("click", function() {
                if (
                    that.UserElement.checkValidity() &&
                    that.PasswordElement.checkValidity()
                )
                //that.login(that.UserElement.value, that.PasswordElement.value);
                    that.asyncLogin(that.UserElement.value, that.PasswordElement.value);
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

            that.RegisterElement.addEventListener("click", function() {
                modelservice$.publish("status", EnumPages.SigIn);
            });
            //
        });
    }

 

    refresh() {
        this.UserElement.value = "";
        this.PasswordElement.value = "";
        this.ErrorElement.classList.remove("label--error--display");
        this.UserElement.classList.remove("input--error");
        this.PasswordElement.classList.remove("input--error");
    }
    async asyncLogin(u, p) {
        let that = this;
        let user = new User(u, p);
        modelservice$.publish("loading", true);
        let c = await auth_user(user);
        if (c) {
            that.ErrorElement.classList.remove("label--error--display");
            let cc = await retrieve_user(user, c);
            current_user = cc.t;
 
            current_user.password = p;
            modelservice$.publish("user", current_user);
            modelservice$.publish("loading", false);
            modelservice$.publish("status", EnumPages.Forex);
 
        } else {
            modelservice$.publish("loading", false);
            that.ErrorElement.classList.add("label--error--display");
        }
    }
    login(u, p) {
        let that = this;
        let user = new User(u, p);

        modelservice$.publish("loading", true);
        auth_user(user).then((c) => {
            if (c) {
                that.ErrorElement.classList.remove("label--error--display");
                retrieve_user(user, c).then((cc) => {
                    current_user = cc.t;
                    modelservice$.publish("user", current_user);
                    modelservice$.publish("status", EnumPages.DriknDecorer);
                    modelservice$.publish("loading", false);
                });
            } else {
                modelservice$.publish("loading", false);
                that.ErrorElement.classList.add("label--error--display");
            }
        });
    }
    setVisibility(v) {
        if (v) {
            this.refresh();
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");
    }
}
customElements.define("log-in", Log_In);