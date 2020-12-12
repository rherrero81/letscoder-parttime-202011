import logic from '../../../logic/index.js';
import framework from '../../../utils/index.js';
import app from '../../../app.js';

class Operations extends framework.component {
    get ContainerElement() {
        if (app.templates["./components/Forex/Operations/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/FOrex/Operations/template.html"];
            return this.querySelector("#operations");
        } else return this.querySelector("#operations");

        //  if (!this.hasOwnProperty('children')) {
    }

    constructor() {
        super();
        let that = this;
        that.url = "/components/Forex/Operations/";
        that.search = '';
        app.modelservice$.subscribe('neworder', (c) => {
            that.Onload();
        });
    }

    OnUnload() {
        clearInterval(this.handelrtimer);
    }

    Onload() {
        let that = this;
        var dstar = new Date();
        var dend = new Date();
        dstar.setDate(dend.getDate() - 10);
        logic.retrieveForexTrade(app.modelservice$.getvalue("user").forex_token, '', 0, 0).then((operationsC) => {

            logic.retrieveForexTradeHistorical(app.modelservice$.getvalue("user").forex_token, '', dstar.getTime(), dend.getTime()).then((operationsH) => {
                that.operationsBAK = [];
                that.operations = [];
                that.operationsBAK = [...operationsC.returnData, ...operationsH.returnData];
                that.operations = [...operationsC.returnData, ...operationsH.returnData];
                that.operations = that.operations.filter(c => !c.closed).filter((v, i, a) => a.findIndex(t => (t.order === v.order)) === i);
                that.calculateProfit();
                that.refresh(that);
            });
        });

    }
    filterAll() {
        let that = this;
        that.operations = that.operationsBAK.map(c => c).filter((v, i, a) => a.findIndex(t => (t.order === v.order)) === i);;
        that.refresh(that);

    }
    filterOpen() {
        let that = this;
        that.operations = that.operationsBAK.filter(c => !c.closed).filter((v, i, a) => a.findIndex(t => (t.order === v.order)) === i);;
        that.refresh(that);

    }
    filterClosed() {
        let that = this;
        that.operations = that.operationsBAK.filter(c => c.closed).filter((v, i, a) => a.findIndex(t => (t.order === v.order)) === i);;
        that.refresh(that);

    }


    calculateProfit() {
        let that = this;
        const sums = that.operationsBAK.reduce(function(accum, value, index) {

            if (value.closed)
                accum.consolidated += value.profit;
            else accum.current += value.profit;
            return accum;
        }, {
            consolidated: 0,
            current: 0
        });

        that.profitSum = sums.current.toFixed(2);
        that.profitSumConsolidated = sums.consolidated.toFixed(2);
    }

    changeSearch(search) {
        let that = this;
        that.search = search;
        that.operations = that.operationsBAK.filter(c => c.symbol.toLowerCase().indexOf(search.toLowerCase()) !== -1);
        that.calculateProfit();
        that.refresh(that);
    }


    refresh(that) {
        framework.utils.getTemplate("." + that.url + "template.html").then((html) => {
            app.modelservice$.publish("loading", false);
            that.innerHTML = html;
            that.renderTemplate();
        });
    }


    editOperation(idop) {
        let seloper = this.operationsBAK.find(c => c.order == idop);
        app.modelservice$.publish('selOperation', new Operation(seloper.symbol, seloper.cmd, seloper.offset, 1, seloper.sl, seloper.tp, seloper.type, seloper.volume, seloper.order));
    }

    closeOperation(idop) {
        let that = this;
        let seloper = that.operationsBAK.find(c => c.order == parseInt(idop));
        logic.unregistrateForexOperation(app.modelservice$.getvalue("user").forex_token, new Operation(seloper.symbol, seloper.cmd, seloper.offset, 1, seloper.sl, seloper.tp, seloper.type, seloper.volume, seloper.order)).then(c => {
            that.Onload();
        });


    }

}
customElements.define("i-operations", Operations);
export default Operations;