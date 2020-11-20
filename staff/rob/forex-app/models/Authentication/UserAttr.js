class UserAttr extends User {

    constructor(u, p, f, l, e) {


        u ? StringValidator.prototype.validate(u) : null;
        p ? StringValidator.prototype.validate(p) : null;
        f ? StringValidator.prototype.validate(f) : null;
        l ? StringValidator.prototype.validate(l) : null;
        e ? StringEmailValidator.prototype.validate(e) : null;
        super(u, p);
        this.firstname = f ? f : '';
        this.lastname = l ? l : '';
        this.email = e ? e : '';
    }

}