class Coffe extends Drink {
    constructor(size) {
        super(size);
        this.setDescription(EDrinks.Coffe);
    }

    getCost() {
        return 20 * this.size;
    }
}