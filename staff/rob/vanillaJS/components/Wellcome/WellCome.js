class Wellcome extends HTMLElement {
    get FirstNameElement() {
        return document.getElementById("lf");
    }
    get LastNameElement() {
        return document.getElementById("ll");
    }

    get ContainerElement() {
        return document.getElementById("wellcome");
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
            document.querySelector("template").innerHTML += html;
            const template = document.querySelector("template");
            const clone = document.importNode(
                template.content.getElementById("wellcome"),
                true
            );
            this.appendChild(clone);
            VisibilityState();
            this.refresh();

            document.getElementById("bKO").addEventListener("click", function() {
                current_user = {
                    f: "",
                    v: "",
                    l: "",
                    p: "",
                    m: "",
                };
                that.refresh();
                status = "2";
                VisibilityState();

            });
        });
    }
    disconnectedCallback() {
        /*called when the element is disconnected from the page */
    }
    refresh() {
        this.FirstNameElement.innerHTML = current_user.f;
        this.LastNameElement.innerHTML = current_user.l;
    }

    setVisibility(v) {

        if (this.ContainerElement) {
            if (v) {
                this.refresh();
                this.ContainerElement.classList.remove("hidden");
            } else this.ContainerElement.classList.add("hidden")
        };
    }
}
customElements.define("well-come", Wellcome);