class Sing_In extends HTMLElement {

    get ContainerElement() {
        if (templates['./components/SignIn/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/SignIn/template.html'];
            return this.querySelector("#sign-in");
        } else return this.querySelector("#sign-in");

    }

    get BackElement() {
        return this.ContainerElement.querySelector("#bBack");
    }

    get SaveElement() {
        return this.ContainerElement.querySelector("#bSave");
    }

    get ErrorElement() {
        return this.ContainerElement.querySelector("#lErrorS");
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
            /*  document.querySelector('template').innerHTML += html;
             const template = document.querySelector("template");
             //getElementsByTagName('log-in')
             const clone = document.importNode(
                 template.content.getElementById("sign-in"),
                 true
             ); */
            //this.appendChild(clone);
            this.innerHTML += html;

            this.setVisibility(this.attributes['visible'].value === 'true');
            status$.subscribe('status', function name(params) {
                console.log('Status changed (Singin) : ' + params);
                if (params == "1")
                    that.setVisibility(true);
                else that.setVisibility(false);
            });
            this.BackElement.addEventListener("click", function() {
                status = "2";
                this.setVisibility(this.attributes['visible'].value === 'true');

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
            status$.publish('status', "2");
            //VisibilityState();
        } else {
            this.ErrorElement.classList.add("label--error--display");
        }
    }
    setVisibility(v) {

        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("sign-in", Sing_In);