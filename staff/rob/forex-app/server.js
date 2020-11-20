var templates = {};
var pages = [];
EnumPages = {
    Login: 0,
    SigIn: 1,
    Wellcome: 2,
    DriknDecorer: 3,
    Iframe: 4,
    Forex: 5,
    HotWheels: 6
};
const modelservice$ = new pubSub();
var current_user = {
    fistname: "",
    username: "",
    lastname: "",
    password: "",
    email: "",
};

(async() => {

    //Load Pages
    pages[EnumPages.DriknDecorer] = await getTemplate('pages/DriknDecorer.html');
    pages[EnumPages.Iframe] = await getTemplate('pages/Iframe.html');
    pages[EnumPages.Forex] = await getTemplate('pages/Forex.html');
    pages[EnumPages.Login] = await getTemplate('pages/Login.html');
    pages[EnumPages.SigIn] = await getTemplate('pages/SigIn.html');
    pages[EnumPages.HotWheels] = await getTemplate('pages/HotWheels.html');

    //Subscribe status page flow
    modelservice$.subscribe("status", (c) => {
        let toremove = [];
        for (let item of document.querySelector("body").children) {
            if (item.localName !== 'script' && item.localName !== 'template')
                toremove.push(item);
        }
        toremove.map(c => c.remove());
        document.querySelector("body").innerHTML += pages[c];

    });

    //Publish first status page flow (Login)
    modelservice$.publish("status", EnumPages.Login);
})()