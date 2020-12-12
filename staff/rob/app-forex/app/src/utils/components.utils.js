var templates = {};
/// Get / Set Components Template
const setTemplate = async(url) => {
    let promise = new Promise((resolve, reject) => {
        fetch(url).then((c) => {
            resolve(c.text());
        });
    });

    promise.then((html) => {
        document.querySelector("template").innerHTML += html;
    });
}


const getTemplate = async(url) => {
        // Singlenton
        if (templates[url] !== undefined) return templates[url];

        const promise = new Promise((resolve, reject) => {
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
const loadScript = (url) => {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    head.appendChild(script);
}

const unLoadScript = (url) => {
    for (let item of document.querySelector("head").children)
        if (item.src.indexOf(url) != -1) item.remove();
}

const loadCSS = (url) => {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("link");
    script.rel = "stylesheet";
    script.href = url;
    head.appendChild(script);
}

const unLoadCSS = (url) => {
    for (let item of document.querySelector("head").children)
        if (item.href)
            if (item.href.indexOf(url) != -1) item.remove();
}



export default { templates, setTemplate, getTemplate, loadScript, unLoadScript, loadCSS, unLoadCSS }