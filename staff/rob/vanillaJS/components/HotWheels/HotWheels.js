class HotWheels extends HTMLComponent {
    get ContainerElement() {
        if (templates["./components/HotWheels/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/HotWheels/template.html"];
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
        that.url = '/components/HotWheels/';
    }


    Onload() {
        let that = this;
        let template_url = "." + that.url +
            "template.html";
        const query = ['red', 'blue', 'green', 'pink', 'black'];

        searchVehicles(query[0]).then(c => {

            modelservice$.publish("vehicles", c);

            getTemplate(template_url).then((html) => {
                that.innerHTML += html;
                that.renderTemplate();
                //APPLY ATTR
                // that.setVisibility(that.attributes["visible"].value === "true");

            });

        });

    }

    disconnectedCallback() {
        /*called when the element is disconnected from the page */
        this.OnUnload('/components/Login/login.css');
    }


    setVisibility(v) {
        if (v) {
            this.refresh();
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");
    }
}
customElements.define("hot-wheels", HotWheels);