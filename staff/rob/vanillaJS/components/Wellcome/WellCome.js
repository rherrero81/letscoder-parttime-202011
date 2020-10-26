class Wellcome extends HTMLElement {


    get ContainerElement() {
        if (templates['./components/Wellcome/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/Wellcome/template.html'];
            return this.querySelector("#wellcome");
        } else return this.querySelector("#wellcome");

        //  if (!this.hasOwnProperty('children')) {

    }


    get FirstNameElement() {
        return this.ContainerElement.querySelector("#lf");
    }
    get LastNameElement() {
        return this.ContainerElement.querySelector("#ll");
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


        getTemplate("./components/Wellcome/template.html").then((html) => {
            /*   document.querySelector("template").innerHTML += html;
              const template = document.querySelector("template");
              const clone = document.importNode(
                  template.content.getElementById("wellcome"),
                  true
              ); */
            //this.appendChild(clone);
            this.innerHTML += html;

            this.setVisibility(this.attributes['visible'].value === 'true');
            this.refresh();

            status$.subscribe('status', function name(params) {
                console.log('Status changed (Wellcome) : ' + params);
                if (params == "0")
                    that.setVisibility(true);
                else that.setVisibility(false);
            });

            this.ContainerElement.querySelector('#bKO').addEventListener("click", function() {
                current_user = {
                    f: "",
                    v: "",
                    l: "",
                    p: "",
                    m: "",
                };
                that.refresh();
                status = "2";
                status$.publish('status', "2");
                //VisibilityState();

            });
        });
    }
    disconnectedCallback() {
        /*called when the element is disconnected from the page */
    }
    refresh() {

        this.FirstNameElement.innerHTML = current_user.f; // + ' ( ' + this.attributes['arg'].value + ' ) ';
        this.LastNameElement.innerHTML = current_user.l;
    }

    setVisibility(v) {
        if (v) {
            this.refresh();
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden")

    }
}
customElements.define("well-come", Wellcome);