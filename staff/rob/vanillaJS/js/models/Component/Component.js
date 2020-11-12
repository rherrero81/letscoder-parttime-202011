class HTMLComponent extends HTMLElement {
    connectedCallback() {
        /*called when the element is 
                                    connected to the page.
                                    This can be called multiple 
                                    times during the element's lifecycle. for example when using drag&drop to move elements around */
        this.Onload();
 
        if (this.url) loadCSS("." + this.url + "template.css")
    }
    disconnectedCallback() {

        if (this.url)
            unLoadCSS(this.url + "template.css");
        this.OnUnload();
    }

    OnUnload() {

    }

    renderTemplate() {
        let that = this;;
        checkElementTabs(that, that);
        //bind en vez de this
    }

 
    Onload() {
        throw new Error("This method must be overwritten!");
    }
}