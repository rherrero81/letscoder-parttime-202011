class Symbols extends HTMLComponent {
    get ContainerElement() {
        if (templates["./components/Forex/Symbols/template.html"]) {
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
                that.figureSelected = 'figure_' + Date.now();
                that.updatedate = 'updatedate_' + Date.now();

            }

        let template_url = "." + that.url + "template.html";
        modelservice$.subscribe(that.figureSelected, (c) => {
            getTemplate(template_url).then((html) => {
                modelservice$.publish("loading", false);
                that.innerHTML = html;
                that.renderTemplate();
                if (that.attributes['main'])
                    if (that.attributes['main'].value === 'false') {

                        that.querySelector("button[id='badd']").remove();
                    }

            });
        });

        modelservice$.publish(
            that.updatedate, {
                literal: 'Go Live',
                islive: false,
                ldate: new Date(Date.now()).toLocaleTimeString()
            });
        modelservice$.publish("loading", true);
        this.refresh(that);
    }

    refresh(that) {
        //retrieveForexSymbols
        //retrieve_symbols
        retrieveForexSymbols(modelservice$.getvalue("user").forex_token).then((c) => {
            // console.log(c.returnData);
            //
            modelservice$.publish("figures", c.returnData);
            modelservice$.publish(that.updatedate, {
                islive: modelservice$.getvalue(that.updatedate).islive,
                literal: modelservice$.getvalue(that.updatedate).literal,
                ldate: new Date(Date.now()).toLocaleTimeString(),
            });

            if (modelservice$.getvalue(that.figureSelected)) {
                modelservice$.publish("loading", true);
                let cur = modelservice$.getvalue("figures").find(
                    (s) => s.symbol == modelservice$.getvalue(that.figureSelected).symbol
                );
                let removed = modelservice$.getvalue("figures").splice(modelservice$.getvalue("figures").indexOf(cur), 1);
                let tt = modelservice$.getvalue("figures");
                tt.unshift(removed[0])
                modelservice$.getvalue("figures", tt);
                that.processFigure(cur, modelservice$.getvalue(that.figureSelected));
                modelservice$.publish(that.figureSelected, cur);
            } else {
                if (!modelservice$.getvalue("figures"))
                    modelservice$.publish(
                        "figures", c.returnData.map((cc) => {
                            cc.visible = '';
                            //process colors--  that.processFigure(cc,modelservice$.getvalue("figures").find(s=> s.symbol=cc.symbol));
                            return cc;
                        })
                    );
                modelservice$.publish(that.figureSelected, modelservice$.getvalue("figures")[0]);
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
        let cur = modelservice$.getvalue("figures").find((s) => s.symbol == v);
        let removed = modelservice$
            .getvalue("figures")
            .splice(modelservice$.getvalue("figures").indexOf(cur), 1);
        let tt = modelservice$.getvalue("figures");
        tt.unshift(removed[0])
        modelservice$.getvalue("figures", tt);;
        modelservice$.publish(
            that.figureSelected,
            modelservice$.getvalue("figures").filter((s) => s.symbol === v)[0]
        );
    }

    changeLive() {

        let updatedate = modelservice$.getvalue(this.updatedate) == undefined ? {
            literal: 'Stop Live',
            islive: true,
            ldate: new Date(Date.now()).toLocaleTimeString()
        } : {
            literal: modelservice$.getvalue(this.updatedate).literal == 'Stop Live' ? 'Go Live' : 'Stop Live',
            islive: !modelservice$.getvalue(this.updatedate).islive,
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
        modelservice$.publish(
            that.updatedate, updatedate);

    }

    changeSearch(search) {
        let newcur;
        modelservice$.publish(
            "figures", modelservice$.getvalue("figures").map(c => {
                if (c.description.toLowerCase().indexOf(search.toLowerCase()) != -1) {
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
}
customElements.define("i-symbols", Symbols);