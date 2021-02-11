import logic from '/app/node_modules/app-logic/index.js';
/* import framework from '/app/node_modules/app-framework/src/index.js' */
import framework from '/app/node_modules/app-framework/index.js';
import app from '../../app.js';
class DrinkDecorator extends framework.component {


    get ContainerElement() {
        if (app.templates['./components/DrinkDecorator/template.html']) {
            if (this.innerHTML === '')
                this.innerHTML += templates['./components/DrinkDecorator/template.html'];
            return this.querySelector("#drinkdeco");
        } else return this.querySelector("#drinkdeco");

        //  if (!this.hasOwnProperty('children')) {

    }



    get DescElement() {
        return this.ContainerElement.querySelector("#Ldesc");
    }
    get CostElement() {
        return this.ContainerElement.querySelector("#Lcost");
    }

    constructor() {
        super();
        /*called when the class is 
                               instantiated
                               */


    }


    Onload() {
        this.app = app;
        let that = this;


        framework.utils.getTemplate("./components/DrinkDecorator/template.html").then((html) => {

            that.innerHTML += html;

            //APPLY ATTR
            // that.setVisibility(that.attributes['visible'].value === 'true');

            //MODEL EVENTS


            app.modelservice$.subscribe('toppin', (top) => {
                if (top) {
                    that.CostElement.innerHTML = top.getCost() + '(€)';
                    that.DescElement.innerHTML = top.getDescription();
                }

            });

            app.modelservice$.subscribe('drink', (dri) => {

                if (app.modelservice$.getvalue('toppin')) {
                    that.CostElement.innerHTML = app.modelservice$.getvalue('toppin').getCost() + '(€)';
                    that.DescElement.innerHTML = app.modelservice$.getvalue('toppin').getDescription();
                } else {
                    that.CostElement.innerHTML = dri.getCost() + '(€)';
                    that.DescElement.innerHTML = dri.getDescription();
                }


            });

            //

            //ELEMENTS EVENTS
            that.ContainerElement.querySelector('#ulS').addEventListener("click", function(e) {
                let val = parseInt(e.target.value);
                let drink = app.modelservice$.getvalue('drink');
                drink.setSize(val);
                app.modelservice$.publish('drink', drink);
                Array.from(e.target.parentNode.children).map(e => e.classList.remove('list__item--selected'));;

                e.target.classList.add('list__item--selected');

            });

            that.ContainerElement.querySelector('#ulD').addEventListener("click", function(e) {
                let val = e.target.value;
                let drink = app.modelservice$.getvalue('drink');
                let tp = app.modelservice$.getvalue('toppin');
                if (val == -1)
                    drink = new Coffe(drink ? drink.size : 1);
                if (val == -2)
                    drink = new Tea(drink ? drink.size : 1);
                app.modelservice$.publish('toppin', null);
                app.modelservice$.publish('drink', drink);
                Array.from(e.target.parentNode.children).map(e => e.classList.remove('list__item--selected'));;

                e.target.classList.add('list__item--selected');

            });

            that.ContainerElement.querySelector('#ulT').addEventListener("click", function(e) {
                let val = e.target.value;

                let tp = app.modelservice$.getvalue('toppin');
                let drink = app.modelservice$.getvalue('drink');
                let topping;
                if (val == 1)
                    tp = new Soya(drink);
                if (val == 2)
                    tp = new Milk(drink)
                if (val == 3)
                    tp = new Mokka(drink);
                app.modelservice$.publish('toppin', tp);

            });



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
customElements.define("drink-decorator", DrinkDecorator);
export default DrinkDecorator;