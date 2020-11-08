var users = []

var title = document.querySelector('.title')
var register = document.getElementById('register')
var login = document.querySelector('#login')
var errorFeedback = document.querySelector('.error')

register.addEventListener('submit', function (event) {
    event.preventDefault()

    var name = register['name'].value
    var surname = register['surname'].value
    var email = register['email-register'].value
    var password = register['password-register'].value
    try {
        registerUser(email, password, name, surname)

        register.style.display = 'none'
        login.style.display = 'flex'

        title.innerHTML = 'LOGIN'
    } catch (error) {
        errorFeedback.innerHTML = error.message
    }
})

login.addEventListener('submit', function (event) {


})

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

function authenticateUser(email, password) {
    if (!email) throw new TypeError('email is required')
    if (!password) throw new TypeError('password is required')

    var user = users.find(function (user) {
        return user.email === email
    })

    if (!user) throw new Error(`user with email ${email} does not exist`)

    if (user.password !== password) throw new Error('password wrong')

    return user.id * 213
}

function getUser(token) {
    if (!token) throw new TypeError('bad request')

    var userId = token / 213

    var user = users.find(function (user) {
        return user.id === userId
    })

    var result = {}

    result.name = user.name
    result.surname = user.surname
    result.email = user.email

    return result
}
