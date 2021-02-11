/* import framework from '/app/node_modules/app-framework/src/index.js' */
/* import framework from '/app/node_modules/app-framework/index.js' */
import framework from '/app/node_modules/app-framework/index.js';
import app from '../../app.js';
class Loading extends framework.component {


    get ContainerElement() {
        if (app.templates['./components/Loading/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += app.templates['./components/Loading/template.html'];
            return this.querySelector("#iloading");
        } else return this.querySelector("#iloading");

        //  if (!this.hasOwnProperty('children')) {

    }



    get FrameElement() {
        return this.ContainerElement.querySelector("#iloading");
    }


    constructor() {
        super();
        /*called when the class is 
                               instantiated
                               */

    }


    Onload() {
        this.app = app;
        let that = this;



        framework.utils.getTemplate("./components/Loading/template.html").then((html) => {

            that.innerHTML = html;
            if (app.modelservice$.getvalue("loading"))
                that.setVisibility(true);
            else that.setVisibility(false);
            app.modelservice$.subscribe('loading', function name(params) {

                if (params)
                    that.setVisibility(true);
                else that.setVisibility(false);
            });

        });
    }



    setVisibility(v) {
        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("i-loading", Loading);
export default Loading;