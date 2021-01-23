import logic from '/app/node_modules/app-logic/index.js';
import framework from '../../../utils/index.js';
import app from '../../../app.js';
class Signals extends framework.component {
    get ContainerElement() {
        if (app.templates["./components/Forex/Signals/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/FOrex/Signals/template.html"];
            return this.querySelector("#signals");
        } else return this.querySelector("#signals");

        //  if (!this.hasOwnProperty('children')) {
    }

    constructor() {
        super();
        let that = this;
        that.url = "/components/Forex/Signals/";
        that.search = '';
        that.signals = [];
        app.modelservice$.subscribe('neworder', (c) => {
            that.Onload();
        });

    }

    OnUnload() {
        clearInterval(this.handelrtimer);
    }

    Onload() {
        let that = this;
        app.modelservice$.subscribe('selOperationSignal', op => {
            that.signals = [];
            logic.retrieveForexSymbols(app.modelservice$.getvalue("user").forex_token).then(forexsymbols => {
                const search = forexsymbols.returnData.filter(c => c.symbol.indexOf(op.symbol) != -1)[0].description;

                logic.retrieveForexSignalsSymbols(app.modelservice$.getvalue("user").forex_token, search).then(signalsymbols => {


                    signalsymbols.response.forEach(searchsymbol => {
                        logic.retrieveForexSignals(app.modelservice$.getvalue("user").forex_token, searchsymbol.short_name).then(res => {
                            res.symbol = `${searchsymbol.name}`;
                            res.i = that.signals.length;
                            that.signals.push(res);
                            that.refresh(that);
                            /*    const operation = new Operation(op.symbol, res.cmd, 0, res.price, res.cmd == 0 ? res.sl : res.tp, res.cmd == 1 ? res.sl : res.tp, 0, 1, 0);
                               if (operation.validate())
                                   app.modelservice$.publish('selOperation', operation) */
                        })

                    });

                });
            });

        });

    }


    refresh(that) {
        framework.utils.getTemplate("." + that.url + "template.html").then((html) => {
            app.modelservice$.publish("loading", false);
            that.innerHTML = html;
            that.renderTemplate();
        });
    }


    operateSignal(i) {
        let that = this;
        let seloper = app.modelservice$.getvalue('selOperation');
        let res = that.signals[parseInt(i)];
        const operation = new Operation(seloper.symbol, res.cmd, 0, res.price, res.cmd == 0 ? res.sl : res.tp, res.cmd == 1 ? res.sl : res.tp, 0, 1, 0);

        app.modelservice$.publish('selOperation', operation);
    }

}
customElements.define("i-signals", Signals);
export default Signals;