import exception from '../exceptions/Exception.js';
class StringValidator extends Object {



     isNotNull(o)  {
        let ret = o == null || o == undefined
        if (ret)
            throw new exception.NullObjectError('Null')
        return ret;

    }

    isString(o)  {

        let ret = typeof o == 'string';
        if (!ret)
            throw new exception.InvalidOjectError('Is not string')
        return ret;
    }

    isNotEmpty(o)  {

        let ret = o == '';
        if (ret)
            throw new exception.NullObjectError('Empty string')
        return ret;

    }



    validate(element, NotAllowEmpty) {
        this.isNotNull(element);
        this.isString(element);
        if (NotAllowEmpty)
            this.isNotEmpty(element);
    }

}

export default StringValidator 