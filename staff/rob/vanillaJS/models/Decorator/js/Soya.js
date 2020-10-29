class Soya extends Topping {

    constructor(drink) {

        super(drink);
        this.drink = drink;
        this.drink.setDescription(EToppins.Soya);
        this.drink.CostToppis.push(6 * this.drink.size);
    }

    getDescription() {

        return this.drink.getDescription();
    }
}