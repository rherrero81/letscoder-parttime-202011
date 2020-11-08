var users = []

function registerUser(email, password, name, surname) {
    if (!email) throw new TypeError('email is required')
    if (!password) throw new TypeError('password is required')
    if (password.length < 3) throw new TypeError('password must be at least 3 caracters')

    for (var i = 0; i < users.length; i++) if (users[i].email === email) throw new Error(`user with email ${email} already exists`)

    var user = {
        name, surname, email, password
    }

    user.id = Math.random() * Math.floor(Math.random() * 10)

    return users.push(user)
}

console.log('TEST registerUser')
console.log('should register a valid user') // happy path
users = []

var email = Math.random() + '@mail.com'
var password = `${Math.random()}`
var name = Math.random() + 'da'
var surname = Math.random() + 'he'

var result = registerUser(email, password, name, surname)

console.assert(result === users.length, 'should return the users length')
console.assert(users[0].name === name, 'should have the registered name')
console.assert(users[0].surname === surname, 'should have the registered surname')
console.assert(users[0].email === email, 'should have the registered email')
console.assert(users[0].password === password, 'should have the registered password')
console.assert(users[0].id, 'should have the registered user id')

console.log('should fail on email missing') // unhappy path
users = []

var password = `${Math.random()}`
var name = Math.random() + 'da'
var surname = Math.random() + 'he'

var fail = ''

try {
    registerUser(undefined, password, name, surname)

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'fail should exist')
console.assert(fail === 'email is required', 'should throw email missing error')


console.log('should fail on password missing') // unhappy path
users = []

var email = Math.random() + '@mail.com'
var name = Math.random() + 'da'
var surname = Math.random() + 'he'

var fail = ''

try {
    registerUser(email, undefined, name, surname)

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'fail should exist')
console.assert(fail === 'password is required', 'should throw password missing error')


console.log('should fail on password length less than 3') // unhappy path
users = []

var email = Math.random() + '@mail.com'
var name = Math.random() + 'da'
var surname = Math.random() + 'he'

var fail = ''

try {
    registerUser(email, '12', name, surname)

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'fail should exist')
console.assert(fail === 'password must be at least 3 caracters', 'should throw password length error')



console.log('should fail on existing user') // unhappy path
users = []

var email = Math.random() + '@mail.com'
var password = `${Math.random()}`
var name = Math.random() + 'da'
var surname = Math.random() + 'he'

registerUser(email, password, name, surname)

console.assert(users.length === 1, 'should have registered the user')
console.assert(users[0].email === email, 'should have registered the user with the correct email')

var fail = ''

try {
    registerUser(email, password, name, surname)

} catch (error) {
    fail = error.message
}

console.assert(fail.length > 0, 'fail should exist')
console.assert(fail === `user with email ${email} already exists`, 'should throw already existing user')