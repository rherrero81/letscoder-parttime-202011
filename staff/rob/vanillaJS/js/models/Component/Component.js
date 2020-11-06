class HTMLComponent extends HTMLElement {
    connectedCallback() {
        /*called when the element is 
                                    connected to the page.
                                    This can be called multiple 
                                    times during the element's lifecycle. for example when using drag&drop to move elements around */
        this.Onload();
    }
    disconnectedCallback() {
        /*called when the element is disconnected from the page */
    }

    OnUnload() {
        unLoadCSS(this.url + "template.css");
    }

    renderTemplate() {
        let that = this;
        if (this.url) loadCSS("." + this.url + "template.css");
        checkElementTabs(that, that);
    }

    Onload() {
        throw new Error("This method must be overwritten!");
    }
}