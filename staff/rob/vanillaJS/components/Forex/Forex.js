class Forex extends HTMLComponent {
 
    get ContainerElement() {
        if (templates["./components/Forex/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/Forex/template.html"];
 
            return this.querySelector("#forex");
        } else return this.querySelector("#forex");

        //  if (!this.hasOwnProperty('children')) {
 
    }

    constructor() {
        super();
        let that = this;
        that.url = "/components/Forex/";
    }

    OnUnload() {
        clearInterval(this.handelrtimer);
    }

    Onload() {
        let that = this;
        let template_url = "." + that.url + "template.html";
        modelservice$.subscribe("figure", (c) => {
            getTemplate(template_url).then((html) => {
                modelservice$.publish("loading", false);
                that.innerHTML = html;
                that.renderTemplate();
            });
        });

        modelservice$.publish(
            "updatedate", {
                literal: 'Go Live',
                islive: false,
                ldate: new Date(Date.now()).toString()
            });
        modelservice$.publish("loading", true);
        this.refresh(that);
    }

    refresh(that) {

        retrieve_symbols(modelservice$.getvalue("user")).then((c) => {
            // console.log(c.returnData);
            //
            modelservice$.publish("updatedate", {
                islive: modelservice$.getvalue("updatedate").islive,
                literal: modelservice$.getvalue("updatedate").literal,
                ldate: new Date(Date.now()).toString(),
            });

            if (modelservice$.getvalue("figure")) {
                modelservice$.publish("loading", true);
                let cur = c.returnData.find(
                    (s) => s.symbol == modelservice$.getvalue("figure").symbol
                );
                let removed = c.returnData.splice(c.returnData.indexOf(cur), 1);
                c.returnData.unshift(removed);
                that.processFigure(cur, modelservice$.getvalue("figure"));
                modelservice$.publish("figure", cur);
            } else {
                if (!modelservice$.getvalue("figures"))
                    modelservice$.publish(
                        "figures", c.returnData.map((cc) => {
                            cc.visible = '';
                            return cc;
                        })
                    );
                modelservice$.publish("figure", c.returnData[0]);
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
        modelservice$.getvalue("figures").unshift(removed[0]);
        modelservice$.publish(
            "figure",
            modelservice$.getvalue("figures").filter((s) => s.symbol === v)[0]
        );
    }

    changeLive() {

        let updatedate = modelservice$.getvalue("updatedate") == undefined ? {
            literal: 'Stop Live',
            islive: true,
            ldate: new Date(Date.now()).toString()
        } : {
            literal: modelservice$.getvalue("updatedate").literal == 'Stop Live' ? 'Go Live' : 'Stop Live',
            islive: !modelservice$.getvalue("updatedate").islive,
            ldate: new Date(Date.now()).toString()
        };

        let that = this;
        if (updatedate.islive) {
            that.refresh(that);
            this.handelrtimer = setInterval(function() { that.refresh(that); }, 10000);
        } else {
            that.refresh(that);
            clearInterval(this.handelrtimer);
        }
        modelservice$.publish(
            "updatedate", updatedate);

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
}
customElements.define("i-forex", Forex);