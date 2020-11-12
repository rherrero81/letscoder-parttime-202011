class IFrame extends HTMLComponent {


    get ContainerElement() {
        if (templates['./components/Iframe/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/Iframe/template.html'];
            return this.querySelector("#iframe");
        } else return this.querySelector("#iframe");

        //  if (!this.hasOwnProperty('children')) {

    }



    get FrameElement() {
        return this.ContainerElement.querySelector("#oframe");
    }


    constructor() {
        super();
        /*called when the class is 
                               instantiated
                               */

    }
    Onload() {
        let that = this;


        getTemplate("./components/Iframe/template.html").then((html) => {
            that.innerHTML = html;
            that.FrameElement.data = that.attributes['url'].value;







        });

    }


    setVisibility(v) {
        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("i-frame", IFrame);