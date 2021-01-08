import User from './User.js'
import StringValidator from '../../validators/StringValidator.js'
import StringEmailValidator from '../../validators/StringValidator.js'
export default class UserAttr extends User {

    constructor(u, p, f, l, e) {


        if (u) StringValidator.prototype.validate(u)
        if (p) StringValidator.prototype.validate(p)
        if (f) StringValidator.prototype.validate(f)
        if (l) StringValidator.prototype.validate(l)
        if (e) StringEmailValidator.prototype.validate(e)
        super(u, p);
        this.firstname = f ? f : '';
        this.lastname = l ? l : '';
        this.email = e ? e : '';
    }

}