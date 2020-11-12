class Tea extends Drink {
    constructor(size) {
        super(size);
        this.setDescription(EDrinks.Tea);
    }

    getCost() {
        return 15;
    }
}