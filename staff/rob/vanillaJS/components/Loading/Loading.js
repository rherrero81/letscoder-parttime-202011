class Loading extends HTMLComponent {


    get ContainerElement() {
        if (templates['./components/Loading/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/Loading/template.html'];
            return this.querySelector("#iloading");
        } else return this.querySelector("#iloading");

        //  if (!this.hasOwnProperty('children')) {

    }



    get FrameElement() {
        return this.ContainerElement.querySelector("#iloading");
    }


    constructor() {
        super();
        /*called when the class is 
                               instantiated
                               */

    }


    Onload() {
        let that = this;



        getTemplate("./components/Loading/template.html").then((html) => {

            that.innerHTML = html;
            if (modelservice$.getvalue("loading"))
                that.setVisibility(true);
            else that.setVisibility(false);
            modelservice$.subscribe('loading', function name(params) {

                if (params)
                    that.setVisibility(true);
                else that.setVisibility(false);
            });

        });
    }



    setVisibility(v) {
        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("i-loading", Loading);