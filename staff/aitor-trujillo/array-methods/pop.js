function pop(array) { // length = 450

    var lastItem = array[array.length - 1]
    array.length--
    return lastItem
}



var arr = ['red [0]', 'blue [1]', 'green[2]'] // array.length = 4

arr.pop() // removes 'green' => returns 'green', now arr = ['red', 'blue']

pop(arr) // removes 'green' => returns 'green', now arr = ['red', 'blue']