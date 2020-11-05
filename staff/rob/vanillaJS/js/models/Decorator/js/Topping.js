  //abstract
  class Topping extends Drink {
      constructor(drink) {

              super();
              this.drink = drink;
          }
          //abstract
      getCost() {
          return this.drink.getCost() + this.drink.CostToppis.reduce(function(accum, value, index) {

              return accum + value;
          }, 0);
      };
  }