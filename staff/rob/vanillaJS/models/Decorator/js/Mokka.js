class Mokka extends Topping {

    constructor(drink) {

        super(drink);
        this.drink = drink;
        this.drink.setDescription(EToppins.Mokka);
        this.drink.CostToppis.push(3 * this.drink.size);
    }


    getDescription() {

        return this.drink.getDescription();
    }
}