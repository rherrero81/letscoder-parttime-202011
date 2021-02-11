import logic from '/app/node_modules/app-logic/index.js';;
/* import framework from '/app/node_modules/app-framework/src/index.js' */
import framework from '/app/node_modules/app-framework/index.js';
import app from '../../app.js';
class IFrame extends framework.component {


    get ContainerElement() {
        if (app.templates['./components/Iframe/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/Iframe/template.html'];
            return this.querySelector("#iframe");
        } else return this.querySelector("#iframe");

        //  if (!this.hasOwnProperty('children')) {

    }



    get FrameElement() {
        return this.ContainerElement.querySelector("#oframe");
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


        framework.utils.getTemplate("./components/Iframe/template.html").then((html) => {
            that.innerHTML = html;
            that.FrameElement.data = that.attributes['url'].value;







        });

    }


    setVisibility(v) {
        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("i-frame", IFrame);
export default IFrame;