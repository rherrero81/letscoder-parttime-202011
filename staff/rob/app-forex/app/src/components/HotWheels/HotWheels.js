import logic from '../../logic/index.js';
import framework from '../../utils/index.js';
import app from '../../app.js';
class HotWheels extends framework.component {
    get ContainerElement() {
        if (app.templates["./components/HotWheels/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/HotWheels/template.html"];
            return this.querySelector("#hotwheel");
        } else return this.querySelector("#hotwheel");
    }

    constructor() {
        super();

        let that = this;
        that.url = '/components/HotWheels/';
    }


    Onload() {
        let that = this;
        let template_url = "." + that.url +
            "template.html";


        app.modelservice$.subscribe('vehiclescolor', (d) => {
            logic.searchVehicles(d).then(c => {

                app.modelservice$.publish("vehicles", c);

                framework.utils.getTemplate(template_url).then((html) => {
                    that.innerHTML = html;

                    that.renderTemplate();
                    //APPLY ATTR
                    // that.setVisibility(that.attributes["visible"].value === "true");

                });

            });

        });

        app.modelservice$.publish("colors", [{
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


        app.modelservice$.publish("vehiclescolor", "nocolor");



    }


    changeColor(color) {
        app.modelservice$.publish("vehiclescolor", color);
    }


    setVisibility(v) {
        if (v) {
            this.refresh();
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");
    }
}
customElements.define("hot-wheels", HotWheels);
export default HotWheels;