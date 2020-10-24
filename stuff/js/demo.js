var person = {
    name: 'Aitor',
    country: 'spain',
    age: 23,
    height: '196cm',
    favouriteColor: 'blue'
}

function checkAge(age) {
    if (age >= 18 && age < 90) console.log('You can drive')
    else if (age >= 90) console.log('You are too old!')
    else console.log('You are too young!')
}

var beatles = ["ringo", "john", "paul", "george"]
var beatle

for (var i = 0; i < beatles.length; i++) {
    for (var j = 0; j < beatles[i].length; j++) {
        if (!beatle) {
            beatle = beatles[i][j]
        } else {
            beatle = beatle + beatles[i][j]
        }
    }
}
console.log(beatle)

function calculate(operator, num1, num2) { // 'sum', 'minus', 'mult', 'div'

    if (operator === 'sum') return num1 + num2
    else if (operator === 'minus') return num1 - num2
    else if (operator === 'mult') return num1 * num2
    else if (operator === 'div') return num1 / num2
    else return 'Wrong operator!'
}

var result = calculate('sum', 10, 5)

beatles.forEach(function (beatle) {
    console.log('Welcome ' + beatle)
})

var allBeatles = beatles.toString()

beatles.indexOf('john')