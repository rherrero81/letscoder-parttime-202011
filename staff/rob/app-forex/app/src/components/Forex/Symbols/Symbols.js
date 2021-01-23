import logic from '/app/node_modules/app-logic/index.js';
import framework from '../../../utils/index.js';
import app from '../../../app.js';
class Symbols extends framework.component {
    get ContainerElement() {
        if (app.templates["./components/Forex/Symbols/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/Forex/Symbols/template.html"];
            return this.querySelector("#symbols");
        } else return this.querySelector("#symbols");

        //  if (!this.hasOwnProperty('children')) {
    }

    constructor() {
        super();
        let that = this;
        that.url = "/components/Forex/Symbols/";
    }

    OnUnload() {
        clearInterval(this.handelrtimer);
    }

    Onload() {
        let that = this;
        that.figureSelected = 'figure';
        if (that.attributes['main'])
            if (that.attributes['main'].value === 'false') {


            }
        that.figureSelected = 'figure_' + Date.now();
        that.updatedate = 'updatedate_' + Date.now();

        let template_url = "." + that.url + "template.html";
        app.modelservice$.subscribe(that.figureSelected, (c) => {
            framework.utils.getTemplate(template_url).then((html) => {
                app.modelservice$.publish("loading", false);
                that.innerHTML = html;
                that.renderTemplate();
                if (that.attributes['main'])
                    if (that.attributes['main'].value === 'false') {

                        that.querySelector("button[id='badd']").remove();
                    }

            });
        });

        app.modelservice$.publish(
            that.updatedate, {
                literal: 'Go Live',
                islive: false,
                ldate: new Date(Date.now()).toLocaleTimeString()
            });
        app.modelservice$.publish("loading", true);
        this.refresh(that);
    }

    refresh(that) {
        //retrieveForexSymbols
        //retrieve_symbols
        logic.retrieveForexSymbols(app.modelservice$.getvalue("user").forex_token).then((c) => {
            // console.log(c.returnData);
            //
            app.modelservice$.publish("figures", c.returnData);
            app.modelservice$.publish(that.updatedate, {
                islive: app.modelservice$.getvalue(that.updatedate).islive,
                literal: app.modelservice$.getvalue(that.updatedate).literal,
                ldate: new Date(Date.now()).toLocaleTimeString(),
            });

            if (app.modelservice$.getvalue(that.figureSelected)) {
                app.modelservice$.publish("loading", true);
                let cur = app.modelservice$.getvalue("figures").find(
                    (s) => s.symbol == app.modelservice$.getvalue(that.figureSelected).symbol
                );
                let removed = app.modelservice$.getvalue("figures").splice(app.modelservice$.getvalue("figures").indexOf(cur), 1);
                let tt = app.modelservice$.getvalue("figures");
                tt.unshift(removed[0])
                app.modelservice$.getvalue("figures", tt);
                that.processFigure(cur, app.modelservice$.getvalue(that.figureSelected));
                app.modelservice$.publish(that.figureSelected, cur);
            } else {
                if (!app.modelservice$.getvalue("figures"))
                    app.modelservice$.publish(
                        "figures", c.returnData.map((cc) => {
                            cc.visible = '';
                            //process colors--  that.processFigure(cc,app.modelservice$.getvalue("figures").find(s=> s.symbol=cc.symbol));
                            return cc;
                        })
                    );
                app.modelservice$.publish(that.figureSelected, app.modelservice$.getvalue("figures")[0]);
            }
        });
    }

    processFigure(cur, prev) {

        this.processColor(cur, prev, 'ask');
        this.processColor(cur, prev, 'bid');
        this.processColor(cur, prev, 'low');
        this.processColor(cur, prev, 'high');


    }

    processColor(cur, prev, val) {
        if (cur[val] > prev[val])
            cur[val + "_color"] = " symboltemplate__item--green ";
        else if (cur[val] < prev[val])
            cur[val + "_color"] = "symboltemplate__item--red";
        else {
            if (prev[val + "_color"])
                cur[val + "_color"] = prev[val + "_color"].indexOf('-light') != -1 ? prev[val + "_color"] : prev[val + "_color"] + '-light';
        }
    }

    async changeFigure(v) {
        let that = this;
        let cur = app.modelservice$.getvalue("figures").find((s) => s.symbol == v);
        let removed = app.modelservice$
            .getvalue("figures")
            .splice(app.modelservice$.getvalue("figures").indexOf(cur), 1);
        let tt = app.modelservice$.getvalue("figures");
        tt.unshift(removed[0])
        app.modelservice$.getvalue("figures", tt);;
        app.modelservice$.publish(
            that.figureSelected,
            app.modelservice$.getvalue("figures").filter((s) => s.symbol === v)[0]
        );
    }

    changeLive() {

        let updatedate = app.modelservice$.getvalue(this.updatedate) == undefined ? {
            literal: 'Stop Live',
            islive: true,
            ldate: new Date(Date.now()).toLocaleTimeString()
        } : {
            literal: app.modelservice$.getvalue(this.updatedate).literal == 'Stop Live' ? 'Go Live' : 'Stop Live',
            islive: !app.modelservice$.getvalue(this.updatedate).islive,
            ldate: new Date(Date.now()).toLocaleTimeString()
        };

        let that = this;
        if (updatedate.islive) {
            that.refresh(that);
            this.handelrtimer = setInterval(function() { that.refresh(that); }, FOREX_API_DELAY);
        } else {
            that.refresh(that);
            clearInterval(this.handelrtimer);
        }
        app.modelservice$.publish(
            that.updatedate, updatedate);

    }

    changeSearch(search) {
        let newcur;
        app.modelservice$.publish(
            "figures", app.modelservice$.getvalue("figures").map(c => {
                if (c.symbol.toLowerCase().indexOf(search.toLowerCase()) != -1 || c.description.toLowerCase().indexOf(search.toLowerCase()) != -1) {
                    c.visible = '';
                    if (!newcur)
                        newcur = c;
                } else c.visible = 'select_option--hide';
                return c;

            }));
        this.changeFigure(newcur.symbol);
    }

    setVisibility(v) {
        if (v) {
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");
    }

    addNew() {
        var newnode = document.createElement("i-symbols");

        var att = document.createAttribute("class");
        /*  att.value = "colSpan4"; */
        newnode.setAttributeNode(att);
        att = document.createAttribute("main");
        att.value = "false";
        newnode.setAttributeNode(att);
        this.parentNode.insertBefore(newnode, this.nextSibling);
        //this.parentNode.parentNode.appendChild(newnode);
        //<i-symbols class="colSpan4" main="false"> </i-symbols>
    }

    operate(symbol, cmd) {
        let cur = app.modelservice$.getvalue("figures").find((s) => s.symbol == symbol);
        app.modelservice$.publish('selOperation', new Operation(cur.symbol, cmd, 0, 1, cmd == 0 ? cur.low : cur.high, cmd == 0 ? cur.high : cur.low, 0, 1, 0));

    }
    operateSell(symbol) {
        this.operate(symbol, 1);
    }

    operateBuy(symbol) {
        this.operate(symbol, 0);
    }

    operateSignal(symbol) {
        let that = this;



        logic.retrieveForexSymbols(app.modelservice$.getvalue("user").forex_token).then(forexsymbols => {
            const search = forexsymbols.returnData.filter(c => c.symbol.indexOf(symbol) != -1)[0].description;

            logic.retrieveForexSignalsSymbols(app.modelservice$.getvalue("user").forex_token, search).then(signalsymbols => {
                logic.retrieveForexSignals(app.modelservice$.getvalue("user").forex_token, signalsymbols.response[0].short_name).then(res => {
                    const operation = new Operation(symbol, res.cmd, 0, res.price, res.cmd == 0 ? res.sl : res.tp, res.cmd == 1 ? res.sl : res.tp, 0, 1, 0);
                    if (operation.validate())
                        app.modelservice$.publish('selOperationSignal', operation)
                })

            });
        });




    }

}

customElements.define("i-symbols", Symbols);
export default Symbols;