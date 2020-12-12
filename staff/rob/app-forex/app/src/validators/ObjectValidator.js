class ObjectValidator extends Object {

    isNotNull(obj) {
        return obj == null || obj == undefined
    }

    isObject(obj) {
        let res = typeof obj == 'object';
        if (!res)
            throw new NullObjectError('No es un objeto')
        return res;

    }

    compareObjectsLessStrict(a, b) {
        let res = JSON.stringify(Object.keys(a).sort()) == JSON.stringify(Object.keys(b).sort()) ? true : false;
        if (!res)
            throw new InvalidOjectError('No es un objeto de este tipo')
        return res;

    }
    compareObjectsStrict(a, b) {
        let res = a instanceof b;
        if (!res)
            throw new InvalidOjectError('No es un objeto de este tipo')
        return res;

    }

    validate(a, b) {
        this.isNotNull(a);
        this.isObject(a);
        this.compareObjectsStrict(a, b);
    }

}