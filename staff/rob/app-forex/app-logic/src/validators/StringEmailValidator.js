import StringValidator from './StringValidator.js';
import exception from '../exceptions/Exception.js';
export default class StringEmailValidator extends StringValidator {

    isEmail(a) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let ret = a.match(mailformat);
        if (!ret)
            throw new exception.InvalidOjectError('No es un email correcto.')
        return ret;

    }
    validate(a) {
        this.isNotNull(a);
        this.isString(a);
        this.isNotEmpty(a);
        this.isEmail(a);
    }

}