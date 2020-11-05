class Forex extends HTMLComponent {


    get ContainerElement() {
        if (templates['./components/Forex/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/Forex/template.html'];
            return this.querySelector("#forex");
        } else return this.querySelector("#forex");

        //  if (!this.hasOwnProperty('children')) {

    }



    get DescElement() {
        return this.ContainerElement.querySelector("#Ldesc");
    }
    get CostElement() {
        return this.ContainerElement.querySelector("#Lcost");
    }
    get ValueElement() {
        return this.ContainerElement.querySelector('#uEl');
    }


    constructor() {
        super();
        /*called when the class is 
                               instantiated
                               */

    }



    Onload() {
        let that = this;
        getTemplate("./components/Forex/template.html").then((html) => {

            that.innerHTML += html;

            //APPLY ATTR
            //that.setVisibility(that.attributes['visible'].value === 'true');

            //MODEL EVENTS


            that.ValueElement.addEventListener("click", function(e) {
                let val = e.target.value;
                that.getValue(val).then(c => that.CostElement.innerHTML = JSON.stringify(c));

                Array.from(e.target.parentNode.children).map(e => e.classList.remove('list__item--selected'));;

                e.target.classList.add('list__item--selected');

            });

            // 

            //that.CostElement.innerHTML =

        });


    }
    changeDrink(e) {
        console.log(e);

    }
    addTopping(e) {
        console.log(e);

    }

    /*   refresh() {

        this.FirstNameElement.innerHTML = current_user.f; // + ' ( ' + this.attributes['arg'].value + ' ) ';
        this.LastNameElement.innerHTML = current_user.l;
    }
 */


    //    

    async getValue(v) {
        let that = this;
        let response = await fetch('https://blacksmithapi.herokuapp.com/api/v1/operation?q=' + v);
        const json = await response.json();
        return json;
    }


    setVisibility(v) {
        if (v) {

            this.ContainerElement.classList.remove("hidden");
        } else this.ContainerElement.classList.add("hidden");

    }
}
customElements.define("i-forex", Forex);