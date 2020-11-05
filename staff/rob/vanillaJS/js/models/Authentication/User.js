class User {


    constructor(u, p) {
        u ? StringValidator.prototype.validate(u) : '';
        p ? StringValidator.prototype.validate(p) : '';
        this.username = u ? u : '';
        this.password = p ? p : '';
    }

}