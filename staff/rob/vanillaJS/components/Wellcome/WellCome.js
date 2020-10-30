class Wellcome extends HTMLElement {
    get ContainerElement() {
        if (templates["./components/Wellcome/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/Wellcome/template.html"];
            return this.querySelector("#wellcome");
        } else return this.querySelector("#wellcome");

        //  if (!this.hasOwnProperty('children')) {
    }

    get FirstNameElement() {
        return this.ContainerElement.querySelector("#lf");
    }
    get LastNameElement() {
        return this.ContainerElement.querySelector("#ll");
    }

    get DescElement() {
        return this.ContainerElement.querySelector("#Ldesc");
    }
    get CostElement() {
        return this.ContainerElement.querySelector("#Lcost");
    }

    get iMenuElement() {
        return this.ContainerElement.querySelector("#iMenu");
    }
    get MenuVElement() {
        return this.ContainerElement.querySelector("#MenuV");
    }
    get MenuHElement() {
        return this.ContainerElement.querySelector("#MenuH");
    }

    get eMLElement() {
        return this.ContainerElement.querySelector("#eML");
    }
    get eDDElement() {
        return this.ContainerElement.querySelector("#eDD");
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
                                    times during the element's lifecycle. for example when using drag&drop to move elements around */
        let that = this;

        getTemplate("./components/Wellcome/template.html").then((html) => {
            this.setVisibility(this.attributes["visible"].value === "true");

            modelservice$.subscribe("status", function name(params) {
                console.log("Status changed (Wellcome) : " + params);
                if (params != "1" && params != "2") that.setVisibility(true);
                else that.setVisibility(false);
            });

            modelservice$.subscribe("user", function name(user) {
                console.log("User changed (Wellcome) : " + user);

                that.FirstNameElement.innerHTML = user.firstname; // + ' ( ' + this.attributes['arg'].value + ' ) ';
                that.LastNameElement.innerHTML = user.lastname;
            });
            this.eMLElement.addEventListener("click", function() {
                modelservice$.publish('status', "5");
            });
            this.eDDElement.addEventListener("click", function() {
                modelservice$.publish('status', "0");
            });

            this.MenuHElement.addEventListener("click", function() {
                that.MenuVElement.classList.add("container--hide");
            });

            this.iMenuElement.addEventListener("click", function(event) {
                event.stopPropagation();
                if (that.MenuVElement.classList.contains("container--hide"))
                    that.MenuVElement.classList.remove("container--hide");
                else that.MenuVElement.classList.add("container--hide");
            });

            this.ContainerElement.querySelector("#bKO").addEventListener(
                "click",
                function() {
                    current_user = {
                        fistname: "",
                        username: "",
                        lastname: "",
                        password: "",
                        mail: "",
                    };

                    modelservice$.publish("status", "2");
                    //VisibilityState();
                }
            );
        });
    }
    changeDrink(e) {
        console.log(e);
    }
    addTopping(e) {
        console.log(e);
    }
    disconnectedCallback() {
        /*called when the element is disconnected from the page */
    }
    /*   refresh() {

        this.FirstNameElement.innerHTML = current_user.f; // + ' ( ' + this.attributes['arg'].value + ' ) ';
        this.LastNameElement.innerHTML = current_user.l;
    }
 */
    setVisibility(v) {
        if (v) {
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");
    }
}
customElements.define("well-come", Wellcome);