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

console.log('TEST splice') // title

console.log('should remove and return one element from array') // happy path

var arr = [2, 4, 6, 8, 10]

var result = splice(arr, 2, 1)

console.assert(result[0] === 6, 'should return the element removed')
console.assert(arr[2] === 8, 'should not have 6 on array')
console.assert(arr.length === 4, 'should have -1 in original length')
console.assert(result.length === 1, 'should only return one element')

console.log('should remove 2 elements and put hi on 3rd position') // happy path

var arr = [2, 4, 6, 8, 10]

var result = splice(arr, 2, 2, 'hi')

console.assert(arr.length === 4, 'should remove 2 to 5 and add one, length 4')
console.assert(result.length === 2, 'should have 2 elements removed, length 2')
console.assert(arr[2] === 'hi', 'should add new element in position 2')
console.assert(result[1] === 8, 'should remove second element 8')

console.log('should start from the end on negative index & add 2 arguments') // happy path

var arr = [2, 4, 6, 8, 10]

var result = splice(arr, -3, 1, 'hi', 'bye')

console.assert(arr[2] === 'hi', 'should add from the end new hi')
console.assert(arr[3] === 'bye', 'should add from the end new bye')
console.assert(arr.length === 6, 'should remove 1 and add 2, length 6')
console.assert(result[0] === 6, 'should remove 6 from array, item pos 2')


console.log('should fail on invalid array input') // unhappy path

var fail = ''

try {
    splice(undefined, 1, 0)

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'should exist error')
console.assert(fail === 'undefined is not an array', 'should throw array error')

console.log('should fail on invalid index input') // unhappy path

var fail = ''
var arr = [2, 4, 6, 8, 10]

try {
    splice(arr, false, 1)

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'should exist error')
console.assert(fail === 'false is not a number', 'should throw number error')


console.log('should fail on invalid howMany input') // unhappy path

var fail = ''
var arr = [2, 4, 6, 8, 10]

try {
    splice(arr, 1, 'hey')

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'should exist error')
console.assert(fail === 'hey is not a number', 'should throw number error')