/// Get / Set Components Template
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
/// Load / Unload js and css
function loadScript(url) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    head.appendChild(script);
}

function unLoadScript(url) {
    for (let item of document.querySelector("head").children)
        if (item.src.indexOf(url) != -1) item.remove();
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

///*VJ: Binding
/////////////////////////

function checkElementTabs(root, element) {
    let newnodes = document.createDocumentFragment();
    for (let item of element.children) {
        if (item.children) this.checkElementTabs(root, item);

        //FOR replication of hmlt template
        if (item.attributes["*vjfor"]) {
            let modeltofor = modelservice$.getvalue(item.attributes["*vjfor"].value);
            let result = "";

            for (let itemodel of modeltofor) {
                let titem = item.cloneNode();
                titem.innerHTML = item.innerHTML;
                this.setAttrsElement(titem, itemodel);
                titem.attributes.removeNamedItem("*vjfor");
                newnodes.appendChild(titem);
            }
            item.replaceWith(newnodes);
        }

        //EVENTS *vj:{event}
        let events = Array.from(item.attributes).filter(
            (c) => c.localName.indexOf("*vj:") != -1
        );
        if (
            Array.from(item.attributes).filter(
                (c) => c.localName.indexOf("*vj:") != -1
            ).length > 0
        ) {
            let event = events[0].localName.split(":")[1];
            item.addEventListener(event, function(e) {
                //e.target.value
                //item.attributes["*vjonchange"].value
                console.log("changeColor attr: " + e.target.value);
                let method = events[0].value.split("(")[0];
                let attr = events[0].value.split("(")[1].replace(")", "");
                if (attr === "") root[method](e.target.value);
                else root[method](attr);
            });
        }
    }
}


function setAttrsElement(item, model) {
    let cal = "src";
    if (item.children.length == 0) {
        Array.from(item.attributes).forEach(c => replaceAttrElement(item, c.localName, model));
        replaceAttrElement(item, "innerText", model);
    }

    for (let subitem of item.children) {
        Array.from(subitem.attributes).forEach(c => replaceAttrElement(subitem, c.localName, model));
        replaceAttrElement(subitem, "innerText", model);
    }
}


function replaceAttrElement(item, val, model) {
    if (item[val]) {
        let elem = item[val].replace('%7B%7B', '{{').replace('%7D%7D', '}}');
        if (elem.indexOf("{{") != -1) {



            let keys = elem
                .split("}")[0]
                .split("{")[2]
                .split(".");


            let objkey = keys.reduce(function(accum, value, index) {
                if (index == 0) accum = model[value];
                else {
                    accum = accum[value];
                }
                return accum;
            }, {});
            val == 'src' || val == 'href' ? item[val] = objkey : item[val] = elem.replace(keys.toString(), objkey).replace("{{", "").replace("}}", "");

        }
    }
}