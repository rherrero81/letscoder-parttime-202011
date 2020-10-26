async function setTemplate(url) {
    let promise = new Promise((resolve, reject) => {
        fetch(url).then((c) => {
            resolve(c.text());
        });
    });

    promise.then((html) => {
        document.querySelector("template").innerHTML += html;
    });
}

async function getTemplate(url) {

    // Singlenton
    if (templates[url] !== undefined)
        return templates[url];

    promise = new Promise((resolve, reject) => {
        fetch(url).then((c) => {
            resolve(c.text());
        });
    });

    promise.then((c) => {
        templates[url] = c;
    });
    return promise;
    /*  promise.then((html) => {
            document.querySelector('template').innerHTML += html;
        }); */
}

function pubSub() {

    // object which will track of all events and subscription
    const subscribers = {}

    // Publisher: 
    function publish(eventName, data) {

        // return if event is not subscribed
        if (!Array.isArray(subscribers[eventName])) {
            return
        }

        // Whenever you publish any event, it will trigger callback for all stored event in subscriber object
        subscribers[eventName].forEach((callback) => {
            callback(data)
        })
    }

    // Subscriber
    function subscribe(eventName, callback) {

        if (!Array.isArray(subscribers[eventName])) {
            subscribers[eventName] = []
        }
        //on subscribe we will we will push callback to subscribers[eventName] array
        subscribers[eventName].push(callback);
        const index = subscribers[eventName].length - 1

        // subscribed callbacks to be removed when they are no longer necessary.
        return {
            unsubscribe() {
                subscribers[eventName].splice(index, 1);
            },
        }
    }

    return {
        publish,
        subscribe,
    }
}