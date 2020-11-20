///*VJ: Binding
/////////////////////////

function checkElementTabs(root, element) {
    let newnodes = document.createDocumentFragment();
    for (let item of element.children) {
        if (item.children) this.checkElementTabs(root, item);
        //BIND MODEL *vjmodel=model
        if (item.attributes["*vjmodel"]) {
            let modelname = item.attributes["*vjmodel"].value;
            if (modelname.indexOf('{{') !== -1) {
                modelname = modelname.replace('{{', '').replace('}}', '').trim();
                if (root[modelname])
                    modelname = root[modelname];
                else
                    modelname = modelservice$.getvalue(modelname);
            }
            let ss = modelservice$.getvalue(modelname);
            if (ss != undefined) {
                let modeltofor = ss.length ? ss : [ss];
                let result = "";

                for (let itemodel of modeltofor)

                    if (itemodel.length != 0 || itemodel.length == NullObjectError) {
                        let titem = item.cloneNode();
                        titem.innerHTML = item.innerHTML;
                        this.setAttrsElement(titem, itemodel);
                        titem.attributes.removeNamedItem("*vjmodel");
                        newnodes.appendChild(titem);
                    }
                item.replaceWith(newnodes);
            }

        }

        //BIND EVENTS *vj:{event}
        let events = Array.from(item.attributes).filter(
            (c) => c.localName.indexOf("*vj:") != -1
        );
        if (
            events.length > 0
        ) {
            let event = events[0].localName.split(":")[1];
            item.attributes.removeNamedItem(events[0].name);
            item.removeEventListener(event, this.raiseEvent.bind(null, root, events));
            item.addEventListener(event, this.raiseEvent.bind(null, root, events));
        }
        //BIND variables
        if (item.innerHTML.indexOf('{{') != -1 && !item.attributes["*vjmodel"] && !item.parentElement.attributes["*vjmodel"]) {
            let re = /{{[a-zA-Z_]*}}/gi;

            let liste = this.getVariables(item.innerHTML);
            liste.forEach(ss => {
                let imodel = modelservice$.getvalue(ss.replace('{{', '').replace('}}', ''));
                item.innerHTML = item.innerHTML.replace(ss, imodel);
            });
            item.innerHTML = item.innerHTML.replace('{{', '').replace('}}', '');

        }


    }
}

function raiseEvent(root, events, e) {
    let method = events[0].value.split("(")[0];
    let attr = events[0].value.split("(")[1].replace(")", "").trim();
    if (!root[method])
        throw new TypeError(`Method ${method} doesn't exists`);

    if (attr === "") {
        if (e.target.type == 'checkbox')
            root[method](e.target.checked);
        else
            root[method](e.target.value.trim());
    } else root[method](attr);

}



function setAttrsElement(item, model) {
    let cal = "src";
    //if (item.children.length == 0) {
    Array.from(item.attributes).forEach(c => replaceAttrElement(item, c.localName.replace('class', 'className'), model));
    replaceAttrElement(item, "innerHTML", model);
    //}

    for (let subitem of item.children) {
        Array.from(subitem.attributes).forEach(c => replaceAttrElement(subitem, c.localName.replace('class', 'className'), model));
        replaceAttrElement(subitem, "innerHTML", model);
    }
}


function replaceAttrElement(item, val, model) {
    if (item[val]) {
        let elem = item[val].replace('%7B%7B', '{{').replace('%7D%7D', '}}');

        let liste = this.getVariables(elem);


        liste.forEach(keys => {

            let objkey = keys.replace("{{", "").replace("}}", "").split('.').reduce(function(accum, value, index) {
                if (index == 0) accum = model[value];
                else {
                    accum = accum[value];
                }
                return accum;
            }, {});
            val == 'src' || val == 'href' ? elem = objkey : elem = elem.replace(keys.toString(), objkey);

            //.replace("{{", "").replace("}}", "")

            item[val] = elem;

        })

    }
}


function getVariables(elem) {
    let liste = [];
    let re = /{{[a-zA-Z_]*}}/gi;

    let m;

    do {
        m = re.exec(elem);
        if (m) {
            liste.push(m[0]);
        }
    } while (m);
    return liste;
}