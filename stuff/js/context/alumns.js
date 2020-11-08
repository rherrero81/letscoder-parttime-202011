var antonio = {
    name: 'Antonio',
    age: '>40',
    city: 'Zaragoza',
    man: true,
    sayHiTo: function (name) {
        console.log(`HI, how are you ${name}? I'm ${this.name}!`)
    },
    sendMyContext: function () {
        return this
    }
}



var kriss = {
    context: this,
    actingContext: undefined,
    name: 'Kriss',
    age: 12,
    city: 'Barcelona',
    man: true,
    sayHiTo: function (name) {
        console.log(`HI, how are you ${name}? I'm ${this.name} I'm from ${this.city} and I'm ${this.age} years old!`)
    },
    act: function () {
        console.log(`I'm ${this.actingContext.name} I'm from ${this.actingContext.city} and I'm ${this.actingContext.age} years old`)
    },
}

var antoniosContext = antonio.sendMyContext()

kriss.actingContext = antoniosContext

kriss.sayHiTo('Rob') // kriss context

kriss.act() // antonio context
