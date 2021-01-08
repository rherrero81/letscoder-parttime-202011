class Milk extends Topping {

    constructor(drink) {
        super(drink);
        this.drink = drink;
        this.drink.setDescription(EToppins.Milk);
        this.drink.CostToppis.push(5 * this.drink.size);
    }


    getDescription() {
        return this.drink.getDescription();
        //return this.drink.getDescription();
    }
}