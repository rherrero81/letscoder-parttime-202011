///*VJ: Binding
/////////////////////////

const checkElementTabs = (that, root, element, app) => {
    let newnodes = document.createDocumentFragment();
    for (let item of element.children) {
        if (item.children) that.checkElementTabs(that, root, item, app);
        //BIND MODEL *vjmodel=model
        that.bindModel(that, root, item, newnodes, app);

        //BIND EVENTS *vj:{event}
        that.bindEvents(that, root, item, {}, app);


        //BIND variables
        that.bindVariables(that, root, item, app);




    }
}

const bindModel = (that, root, item, newnodes, app) => {
    if (item.attributes["*vjmodel"]) {
        let modelname = item.attributes["*vjmodel"].value;
        let ss;
        if (modelname.indexOf('{{') !== -1) {
            modelname = modelname.replace('{{', '').replace('}}', '').trim();
            if (root[modelname]) {
                if (app.modelservice$.getvalue(root[modelname]))
                    ss = app.modelservice$.getvalue(root[modelname]);
                else ss = root[modelname];
            } else
                ss = app.modelservice$.getvalue(modelname);
        } else ss = app.modelservice$.getvalue(modelname);
        if (ss != undefined) {
            let modeltofor = ss.length ? ss : [ss];
            let result = "";

            for (let itemodel of modeltofor)

                if (itemodel.length != 0 || itemodel.length == NullObjectError) {
                    let titem = item.cloneNode();
                    titem.innerHTML = item.innerHTML;
                    that.setAttrsElement(that, root, titem, itemodel);
                    titem.attributes.removeNamedItem("*vjmodel");
                    newnodes.appendChild(titem);
                }
            item.replaceWith(newnodes);
        }

    }

}

const bindEvents = (that, root, item, model, app) => {
    let events = Array.from(item.attributes).filter(
        (c) => c.localName.indexOf("*vj:") != -1
    );
    if (
        events.length > 0
    ) {
        let event = events[0].localName.split(":")[1];
        let method = events[0].value;
        if (method.indexOf('{{') !== -1) {
            let variable = method.split('{{')[1].replace('}})', '');
            if (root[variable] || app.modelservice$.getvalue(variable) || model[variable]) {
                item.attributes.removeNamedItem(events[0].name);
                item.removeEventListener(event, that.raiseEvent.bind(that, null, root, events, model[variable]));
                item.addEventListener(event, that.raiseEvent.bind(that, null, root, events, model[variable]));
            }
        } else {
            item.attributes.removeNamedItem(events[0].name);
            item.removeEventListener(event, that.raiseEvent.bind(that, null, root, events, null));
            item.addEventListener(event, that.raiseEvent.bind(that, null, root, events, null));
        }

    }
}


const bindVariables = (that, root, item, app) => {
    if (item.innerHTML.indexOf('{{') != -1 && !item.attributes["*vjmodel"] && !item.parentElement.attributes["*vjmodel"]) {
        let re = /{{[a-zA-Z_]*}}/gi;

        let liste = that.getVariables(item.innerHTML);
        liste.forEach(ss => {
            let sss = ss.replace('{{', '').replace('}}', '');
            if (root[sss] !== null && root[sss] !== undefined)
                item.innerHTML = item.innerHTML.replace(ss, root[sss]);
            else
            if (app.modelservice$.getvalue(sss) !== null && app.modelservice$.getvalue(sss) !== undefined)
                item.innerHTML = item.innerHTML.replace(ss, app.modelservice$.getvalue(sss));
        });
        //item.innerHTML = item.innerHTML.replace('{{', '').replace('}}', '');

    }
}

const raiseEvent = (that, root, events, model, e) => {
    let method = events[0].value.split("(")[0];
    let attr = events[0].value.split("(")[1].replace(")", "").trim();
    if (!root[method])
        throw new TypeError(`Method ${method} doesn't exists`);

    if (attr === "") {
        if (e.target.type == 'checkbox')
            root[method](e.target.checked);
        else {

            root[method](e.target.value.trim());

        }

    } else

    {
        if (model)
            root[method](model);
        else
            root[method](attr);
    }

}

const bindIf = (that, root, item, model) => {
    if (item.attributes["*vjif"]) {
        let varif = item.attributes["*vjif"].value;
        item.attributes.removeNamedItem("*vjif");
        if (varif.indexOf('!') != -1) {
            if (model[varif.replace('!', '').replace('{{', '').replace('}}', '')] == true)
                item.replaceWith('');
        } else
        if (varif == 'false') {

            item.replaceWith('');

        }
    }
}

const setAttrsElement = (that, root, item, model) => {
    let cal = "src";
    //if (item.children.length == 0) {
    Array.from(item.attributes).forEach(c => replaceAttrElement(that, item, c.localName.replace('class', 'className'), model));
    replaceAttrElement(that, item, "innerHTML", model);
    that.bindEvents(that, root, item, model);
    //}

    for (let subitem of item.children) {
        Array.from(subitem.attributes).forEach(c => replaceAttrElement(that, subitem, c.localName.replace('class', 'className'), model));
        replaceAttrElement(that, subitem, "innerHTML", model);
        that.bindEvents(that, root, subitem, model);
        that.bindIf(that, root, subitem, model);
        if (subitem.children.length > 0)
            Array.from(subitem.children).forEach(c => that.setAttrsElement(that, root, c, model))


    }
}


const replaceAttrElement = (that, item, val, model) => {
    if (item[val]) {
        let elem = item[val].replace('%7B%7B', '{{').replace('%7D%7D', '}}');

        let liste = that.getVariables(elem);


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


const getVariables = (elem) => {
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
export default { raiseEvent, bindVariables, bindEvents, bindModel, bindIf, checkElementTabs, setAttrsElement, getVariables, replaceAttrElement }