function splice(array, index, howMany) { // TODO add elements // EX ['10', '11', '12'], -2, 0 // TODO negative
    if (!(array instanceof Array)) throw new TypeError(`${array} is not an array`) // array + " is not an array"
    if (!(typeof index === 'number')) throw new TypeError(`${index} is not a number`)
    if (howMany !== undefined) {
        if (!(typeof howMany === 'number')) throw new TypeError(`${howMany} is not a number`)
    }

    var newArr = []
    var removed = []

    if (index < 0) {
        index = index + array.length // index = -2 => array.length = 6 => index = 4
    }

    for (var i = 0; i < index; i++) newArr[newArr.length] = array[i] // adds elements up to index

    for (var j = index; j < index + howMany; j++) removed[removed.length] = array[j] // saves elements to remove

    for (var k = index + howMany; k < array.length; k++) newArr[newArr.length] = array[k] // adds from last removed up to the end

    array.length = 0

    for (var l = 0; l < index; l++) array[array.length] = newArr[l]
    for (var m = 3; m < arguments.length; m++) array[array.length] = arguments[m]
    for (var n = index; n < newArr.length; n++) array[array.length] = newArr[n]


    return removed
}  