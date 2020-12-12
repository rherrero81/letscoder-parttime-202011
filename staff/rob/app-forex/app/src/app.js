import logic from './logic/index.js';
import framework from './utils/index.js';
import components from './components/index.js';

var pages = [];
const EnumPages = {
    Login: 0,
    SigIn: 1,
    Wellcome: 2,
    DriknDecorer: 3,
    Iframe: 4,
    Forex: 5,
    HotWheels: 6
};
const templates = framework.utils.templates;
const modelservice$ = framework.appEvent();
var current_user = {
    fistname: "",
    username: "",
    lastname: "",
    password: "",
    email: "",
};

(async() => {

    //Load Pages
    pages[EnumPages.DriknDecorer] = await framework.utils.getTemplate('pages/DriknDecorer.html');
    pages[EnumPages.Iframe] = await framework.utils.getTemplate('pages/Iframe.html');
    pages[EnumPages.Forex] = await framework.utils.getTemplate('pages/Forex.html');
    pages[EnumPages.Login] = await framework.utils.getTemplate('pages/Login.html');
    pages[EnumPages.SigIn] = await framework.utils.getTemplate('pages/SigIn.html');
    pages[EnumPages.HotWheels] = await framework.utils.getTemplate('pages/HotWheels.html');

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


export default {
    modelservice$,
    current_user,
    EnumPages,
    templates
}