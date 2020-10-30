class IFrame extends HTMLElement {


    get ContainerElement() {
        if (templates['./components/Iframe/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/Iframe/template.html'];
            return this.querySelector("#iframe");
        } else return this.querySelector("#iframe");

        //  if (!this.hasOwnProperty('children')) {

    }



    get FrameElement() {
        return this.ContainerElement.querySelector("#iframe");
    }


    constructor() {
        super();
        /*called when the class is 
                               instantiated
                               */

    }
    connectedCallback() {
        /*called when the element is 
                                connected to the page.
                                This can be called multiple 
                                times during the element's lifecycle. for example when using drag&drop to move elements around */
        let that = this;


        getTemplate("./components/Iframe/template.html").then((html) => {


            that.setVisibility(that.attributes['visible'].value === 'true');
            modelservice$.subscribe('status', function name(params) {
                console.log('Status changed (Login) : ' + params);
                if (params == "5")
                    that.setVisibility(true);
                else that.setVisibility(false);
            });




        });
    }

    disconnectedCallback() {
        /*called when the element is disconnected from the page */
    }
    /*   refresh() {

        this.FirstNameElement.innerHTML = current_user.f; // + ' ( ' + this.attributes['arg'].value + ' ) ';
        this.LastNameElement.innerHTML = current_user.l;
    }
 */
    setVisibility(v) {
        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("i-frame", IFrame);