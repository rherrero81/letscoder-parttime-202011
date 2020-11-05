class StringValidator extends Object {



    isNotNull(o) {
        let ret = o == null || o == undefined
        if (ret)
            throw new NullObjectError('No es un string')
        return ret;

    }

    isString(o) {

        let ret = typeof o == 'string';
        if (!ret)
            throw new InvalidOjectError('No es un string')
        return ret;
    }

    isNotEmpty(o) {

        let ret = o == '';
        if (ret)
            throw new NullObjectError('No es un string')
        return ret;

    }



    validate(a) {
        this.isNotNull(a);
        this.isString(a);
        this.isNotEmpty(a);
    }

}

class StringEmailValidator extends StringValidator {

    isEmail(a) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let ret = a.match(mailformat);
        if (!ret)
            throw new InvalidOjectError('No es un email correcto.')
        return ret;

    }
    validate(a) {
        this.isNotNull(a);
        this.isString(a);
        this.isNotEmpty(a);
        this.isEmail(a);
    }

}