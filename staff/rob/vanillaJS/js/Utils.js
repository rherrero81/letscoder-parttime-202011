async function setTemplate(url) {
    let promise = new Promise((resolve, reject) => {
        fetch(url).then((c) => {
            resolve(c.text());
        });
    });

    promise.then((html) => {
        document.querySelector("template").innerHTML += html;
    });
}

async function getTemplate(url) {
    // Singlenton
    if (templates[url] !== undefined) return templates[url];

    promise = new Promise((resolve, reject) => {
        fetch(url).then((c) => {
            resolve(c.text());
        });
    });

    promise.then((c) => {
        templates[url] = c;
    });
    return promise;
    /*  promise.then((html) => {
              document.querySelector('template').innerHTML += html;
          }); */
}

function ObservableOf(...data) {
    values = [];
    this.next = function(kay, data) {
        values[key] = data;
    };
    this.subscribe = function(...observer) {
        const [next, error, complete] = observer;
        observerD = { next, error, complete };

        try {
            data.forEach((item) => {
                //simulated an error with the type
                if (typeof item === "string") {
                    throw {};
                }
                observerD.next(item);
            });
            observerD.complete();
        } catch (e) {
            observerD.error("is a string");
        }
    };

    return { subscribe: this.subscribe };
}

function loadScript(url) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    head.appendChild(script);
}

function loadCSS(url) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("link");
    script.rel = "stylesheet";
    script.href = url;
    head.appendChild(script);
}

function unLoadCSS(url) {

    for (let item of document.querySelector("head").children)
        if (item.href.indexOf(url) != -1) item.remove();

}





function checkElementTabs(that) {
    let newnodes = document.createDocumentFragment();
    for (let item of that.children) {
        if (item.children) this.checkElementTabs(item);
        if (item.attributes["*vjfor"]) {
            let modeltofor = modelservice$.getvalue(
                item.attributes["*vjfor"].value
            );
            let result = "";

            for (let itemodel of modeltofor) {
                let titem = item.cloneNode();
                titem.innerHTML = item.innerHTML;
                this.setAttrElement(titem, itemodel);
                titem.attributes.removeNamedItem("*vjfor")
                newnodes.appendChild(titem);
                // result += titem.innerHTML;
            }
            item.replaceWith(newnodes);
        }
    }
}

function checkElementText(that) {
    for (let item of that.children) {
        if (item.children) checkElement(item);
        if (item.innerText.indexOf("{{") != -1) {
            let keys = item.innerText
                .replace("{{", "")
                .replace("}}", "")
                .split(".");
            if (keys.length == 1) item.innerText = modelservice$.getvalue(keys[0]);
            else {
                let objkey = keys.reduce(function(accum, value, index) {
                    if (index == 0) accum = modelservice$.getvalue(value);
                    else {
                        accum = accum[value];
                    }
                    return accum;
                }, {});
                item.innerText = objkey;
            }
        }
    }
}

function checkElementTextModel(that, model) {
    this.setTextElement(that, model);
    for (let item of that.children) {
        if (item.children) checkElementTextModel(item, model);
    }
}

function setAttrElement(item, model) {
    let cal = "src";
    for (let subitem of item.children) {
        replaceTextElement(subitem, "src", model);
        replaceTextElement(subitem, "innerText", model);
    }
}

function replaceTextElement(item, val, model) {
    if (item[val])
        if (item[val].indexOf("{{") != -1 || item[val].indexOf("%7B%7B") != -1) {
            let keys = item[val];

            if (item[val].indexOf("{{") != -1)
                keys = keys.replace(/\s/g, "")
                .replace("{{", "")
                .replace("}}", "")
                .split(".");
            else
                keys = keys.replace(/\s/g, "")
                .split("%7B%7B")[1]
                .replace("%7D%7D", "")
                .split(".");

            let objkey = keys.reduce(function(accum, value, index) {
                if (index == 0) accum = model[value];
                else {
                    accum = accum[value];
                }
                return accum;
            }, {});
            item[val] = objkey;
        }
}