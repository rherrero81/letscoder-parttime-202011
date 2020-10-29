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
    let values = []

    // Publisher: 
    function publish(eventName, data) {
        values[eventName] = data;
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

    function getvalue(eventName) {
        return values[eventName];

    }

    return {
        publish,
        subscribe,
        getvalue
    }
}

function ObservableOf(...data) {
    values = []
    this.next = function(kay, data) {

        values[key] = data;
    }
    this.subscribe = function(...observer) {
        const [next, error, complete] = observer
        observerD = { next, error, complete };

        try {
            data.forEach((item) => {
                //simulated an error with the type
                if (typeof item === 'string') {
                    throw {};
                }
                observerD.next(item)
            });
            observerD.complete();
        } catch (e) {
            observerD.error("is a string");
        }
    };

    return { subscribe: this.subscribe }
}