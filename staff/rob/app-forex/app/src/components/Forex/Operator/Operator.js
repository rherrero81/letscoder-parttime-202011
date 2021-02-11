import logic from '/app/node_modules/app-logic/index.js';;
/* import framework from '/app/node_modules/app-framework/src/index.js' */
import framework from '/app/node_modules/app-framework/index.js';
import app from '../../../app.js';;
class Operator extends framework.component {
    get ContainerElement() {
        if (app.templates["./components/Forex/Operator/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/Forex/Operator/template.html"];
            return this.querySelector("#operations");
        } else return this.querySelector("#operations");

        //  if (!this.hasOwnProperty('children')) {
    }
    get ErrorElement() {
        return this.ContainerElement.querySelector("#lError");
    }


    constructor() {
        super();
        let that = this;
        that.url = "/components/Forex/Operator/";
    }

    OnUnload() {
        clearInterval(this.handelrtimer);
    }

    Onload() {
        this.app = app;
        let that = this;
        app.modelservice$.subscribe('selOperation', c => {
            that.operation = c;
            that.refresh(that);
        });

    }


    refresh(that) {
        framework.utils.getTemplate("." + that.url + "template.html").then((html) => {
            app.modelservice$.publish("loading", false);
            that.innerHTML = html;
            that.renderTemplate();
        });
    }


    saveOperation(idop) {
        let that = this;
        that.operation.sl = parseFloat(that.querySelector('#isl').value);
        that.operation.tp = parseFloat(that.querySelector('#itp').value);
        that.operation.price = parseFloat(that.querySelector('#ip').value);
        that.operation.volume = parseFloat(that.querySelector('#iv').value);

        // that.operation.cmd = that.operation.cmd == 0 ? 2 : that.operation.cmd == 1 ? 3 : that.operation.cmd;
        if (that.operation.validate())
            logic.registrateForexOperation(app.modelservice$.getvalue("user").forex_token, that.operation).then(c => {
                that.Onload();
                that.ErrorElement.classList.remove("label--error--display");
                if (c.error) {
                    that.ErrorElement.classList.add("label--error--display");
                    that.ErrorElement.innerText = c.error;
                }

                app.modelservice$.publish('neworder', '');

            });
    }

    closeOperation(idop) {
        let that = this;
        // let selor = that.operationsBAK.find(c => c.order == idop);

        logic.unregistrateForexOperation(app.modelservice$.getvalue("user").forex_token, that.operation).then(c => {
            if (c.mmessage)
                that.message = c.message;
            that.Onload();
        });


    }

}
customElements.define("i-operator", Operator);
export default Operator;