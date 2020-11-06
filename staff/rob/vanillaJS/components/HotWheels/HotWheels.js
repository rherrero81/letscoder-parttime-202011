class HotWheels extends HTMLComponent {
    get ContainerElement() {
        if (templates["./components/HotWheels/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/HotWheels/template.html"];
            return this.querySelector("#hotwheel");
        } else return this.querySelector("#hotwheel");
    }
    get ColorsElement() {
        return this.ContainerElement.querySelector("#ulColor");
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
        modelservice$.publish("colors", [{
                name: '--Choose COLOR--'
            },
            {
                name: 'red'
            }, {
                name: 'blue'
            }, {
                name: 'green'
            }, {
                name: 'pink'
            },
            {
                name: 'black'
            }
        ]);


        modelservice$.subscribe('vehiclescolor', (d) => {
            searchVehicles(d).then(c => {

                modelservice$.publish("vehicles", c);

                getTemplate(template_url).then((html) => {
                    that.innerHTML = html;

                    that.renderTemplate();
                    //APPLY ATTR
                    // that.setVisibility(that.attributes["visible"].value === "true");

                });

            });

        });

        modelservice$.publish("vehiclescolor", "nocolor");

    }

    disconnectedCallback() {
        /*called when the element is disconnected from the page */
        this.OnUnload('/components/Login/login.css');
    }

    changeColor(color) {
        modelservice$.publish("vehiclescolor", color);

    }


    setVisibility(v) {
        if (v) {
            this.refresh();
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");
    }
}
customElements.define("hot-wheels", HotWheels);