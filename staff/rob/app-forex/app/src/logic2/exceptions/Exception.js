class ValidationError extends TypeError {

}

class NullObjectError extends ValidationError {

}

class InvalidOjectError extends ValidationError {

}

class BadRequest extends TypeError {

}


class BadOperation extends TypeError {

}


export default { ValidationError, NullObjectError, InvalidOjectError, BadRequest, BadOperation }