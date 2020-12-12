import logic from '../../logic/index.js';
import framework from '../../utils/index.js';
import app from '../../app.js';
class Wellcome extends framework.component {
    get ContainerElement() {
        if (app.templates["./components/Wellcome/template.html"]) {
            if (this.innerHTML === "")
                this.innerHTML += templates["./components/Wellcome/template.html"];
            return this.querySelector("#wellcome");
        } else return this.querySelector("#wellcome");

    }

    get FirstNameElement() {
        return this.ContainerElement.querySelector("#lf");
    }
    get LastNameElement() {
        return this.ContainerElement.querySelector("#ll");
    }

    get DescElement() {
        return this.ContainerElement.querySelector("#Ldesc");
    }
    get CostElement() {
        return this.ContainerElement.querySelector("#Lcost");
    }

    get iMenuElement() {
        return this.ContainerElement.querySelector("#iMenu");
    }
    get MenuVElement() {
        return this.ContainerElement.querySelector("#MenuV");
    }
    get MenuHElement() {
        return this.ContainerElement.querySelector("#MenuH");
    }

    get eMLElement() {
        return this.ContainerElement.querySelector("#eML");
    }
    get eDDElement() {
        return this.ContainerElement.querySelector("#eDD");
    }

    get eForElement() {
        return this.ContainerElement.querySelector("#eFor");
    }
    get eHWElement() {
        return this.ContainerElement.querySelector("#eHW");
    }




    constructor() {
        super();
        /*called when the class is 
                                   instantiated
                                   */
    }


    Onload() {
        //let template_url = 'http://localhost:3030/api/v1/template?q=wellcome';
        let template_url = "./components/Wellcome/template.html";
        let that = this;
        framework.utils.getTemplate(template_url).then((html) => {
            that.innerHTML = html;

            //   that.setVisibility(this.attributes["visible"].value === "true");

            //MODEL EVENTS

            that.FirstNameElement.innerHTML = app.modelservice$.getvalue("user").firstname;
            that.LastNameElement.innerHTML = app.modelservice$.getvalue("user").lastname;

            app.modelservice$.subscribe("user", function name(user) {
                console.log("User changed (Wellcome) : " + user);

                that.FirstNameElement.innerHTML = user.firstname; // + ' ( ' + this.attributes['arg'].value + ' ) ';
                that.LastNameElement.innerHTML = user.lastname;
            });
            //

            //ELEMENTS EVENTS

            that.eMLElement.addEventListener("click", function() {
                app.modelservice$.publish('status', app.EnumPages.Iframe);
            });
            that.eDDElement.addEventListener("click", function() {
                app.modelservice$.publish('status', app.EnumPages.DriknDecorer);
            });
            that.eForElement.addEventListener("click", function() {
                app.modelservice$.publish('status', app.EnumPages.Forex);
            });

            that.eHWElement.addEventListener("click", function() {
                app.modelservice$.publish('status', app.EnumPages.HotWheels);
            });




            that.MenuHElement.addEventListener("click", function() {
                that.MenuVElement.classList.add("container--hide");
            });

            that.iMenuElement.addEventListener("click", function(event) {
                event.stopPropagation();
                if (that.MenuVElement.classList.contains("container--hide"))
                    that.MenuVElement.classList.remove("container--hide");
                else that.MenuVElement.classList.add("container--hide");
            });

            that.ContainerElement.querySelector("#bKO").addEventListener(

                "click",
                function() {
                    current_user = {
                        fistname: "",
                        username: "",
                        lastname: "",
                        password: "",
                        mail: "",
                    };

                    app.modelservice$.publish("status", app.EnumPages.Login);
                    //VisibilityState();
                }
            );
            //
        });

    }
    changeDrink(e) {
        console.log(e);
    }
    addTopping(e) {
        console.log(e);
    }


    setVisibility(v) {
        if (v) {
            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");
    }
}
customElements.define("well-come", Wellcome);
export default Wellcome;