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