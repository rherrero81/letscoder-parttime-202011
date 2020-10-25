class Sing_In extends HTMLElement {
    get BackElement() {
        return document.getElementById("bBack");
    }

    get SaveElement() {
        return document.getElementById("bSave");
    }

    get ErrorElement() {
        return document.getElementById("lErrorS");
    }

    get ContainerElement() {
        return document.getElementById("sign-in");
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

        getTemplate("./components/SignIn/template.html").then((html) => {
            document.querySelector('template').innerHTML += html;
            const template = document.querySelector("template");
            //getElementsByTagName('log-in')
            const clone = document.importNode(
                template.content.getElementById("sign-in"),
                true
            );

            this.appendChild(clone);
            VisibilityState();
            this.BackElement.addEventListener("click", function() {
                status = "2";
                VisibilityState();

            });
            this.SaveElement.addEventListener("click", function() {
                that.signin(
                    that,
                    document.getElementById("iUS").value,
                    document.getElementById("iPS").value,
                    document.getElementById("iFN").value,
                    document.getElementById("iLN").value,
                    document.getElementById("iM").value
                );
            });
        });
    }
    disconnectedCallback() {
        /*called when the element is disconnected from the page */
    }
    signin(that, u, p, f, l, m) {
        if (u != "" && p != "" && f != "" && f != "" && m != "") {
            document
                .getElementById("lErrorS")
                .classList.remove("label--error--display");
            listUsers.push({
                f: f,
                u: u,
                l: l,
                p: p,
                m: m,
            });
            console.log("Registered!");
            status = "2";
            VisibilityState();
        } else {
            this.ErrorElement.classList.add("label--error--display");
        }
    }
    setVisibility(v) {
        if (this.ContainerElement) {
            if (v) {

                this.ContainerElement.classList.remove("hidden");
            } else this.ContainerElement.classList.add("hidden");
        };
    }
}
customElements.define("sign-in", Sing_In);