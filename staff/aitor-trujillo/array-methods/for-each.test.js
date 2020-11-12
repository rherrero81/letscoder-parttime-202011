function forEach(array, callback) { // function declaration
    if (!(array instanceof Array)) throw new TypeError(array + ' is not an array')
    if (!(callback instanceof Function)) throw new TypeError(callback + ' is not a function')

    for (var i = 0; i < array.length; i++) {
        callback(array[i])
    }
}

console.log('TEST forEach') // title

console.log('multiply each item by 10') // happy path

var nums = [1, 2, 3, 4]

var result = []

forEach(nums, function (num) {
    result.push(num * 10)
})

console.assert(result.length === nums.length, 'should have the same length')

for (let i = 0; i < result.length; i++) {
    console.assert(result[i] === nums[i] * 10, 'each element in result should be the same as num * 10')
}

console.log("calculate the remainer by 2 of each item save if it's pair") // happy path

var nums = [1, 2, 3, 4, 5]

var result = []

forEach(nums, function (num) {
    if (num % 2 === 0) result.push(num)
})

console.assert(result.length === 2)
console.assert(result[0] === 2)
console.assert(result[1] === 4)

console.log('should fail if array is undefined') // unhappy path

var fail = '';

try {
    forEach(undefined, function (num) {
        if (num % 2 === 0) result.push(num)
    })

} catch (error) {
    fail = error
}

console.assert(typeof fail === 'object', 'should be object instanceof Error')
console.assert(fail.message === "undefined is not an array", 'should show undefined is not an array')


console.log('should fail if function is different of function') // unhappy path

var fail = '';
var nums = [1, 2, 3, 4, 5]

try {
    forEach(nums, 'hello')

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'should contain the error message')
console.assert(fail === "hello is not a function")