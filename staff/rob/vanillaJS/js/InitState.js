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

pages[EnumPages.DriknDecorer] = "<well-come arg='2'></well-come><drink-decorator></drink-decorator>";
pages[EnumPages.Iframe] = "<well-come arg='2'></well-come> <i-frame url='../../../src/html/marialunarillos/' > </i-frame>";
pages[EnumPages.Forex] = "<well-come arg='2'></well-come><i-forex> </i-forex>";
pages[EnumPages.Login] = "<log-in></log-in> <i-loading></i-loading> ";
pages[EnumPages.SigIn] = "<sign-in></sign-in><i-loading></i-loading> ";
pages[EnumPages.HotWheels] = "<well-come arg='2'></well-come><hot-wheels> </hot-wheels>";

const modelservice$ = new pubSub();
var current_user = {
    fistname: "",
    username: "",
    lastname: "",
    password: "",
    email: "",
};

modelservice$.subscribe("status", (c) => {
    let toremove = [];
    for (let item of document.querySelector("body").children) {
        if (item.localName !== 'script' && item.localName !== 'template')
            toremove.push(item);
    }
    toremove.map(c => c.remove());
    document.querySelector("body").innerHTML += pages[c];

});

/*
   <log-in></log-in>
    <sign-in></sign-in>

       <i-loading></i-loading> 

    <drink-decorator></drink-decorator>
    <i-frame url="../../../src/html/marialunarillos/"></i-frame>
   
   
 */

// const modelservice$ = new ObservableOf(status)
modelservice$.publish("status", EnumPages.Login);

// publisher
// Subscriber
// unsubscribe
// Some place to store callbacks that are registered from subscribers.