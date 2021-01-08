import StringValidator from '../../validators/StringValidator.js'
export default class User {


    constructor(u, p) {
        if (u) StringValidator.prototype.validate(u) 
        if(p) StringValidator.prototype.validate(p); 
        this.username = u ? u : ''; this.password = p ? p : '';
        }

    }