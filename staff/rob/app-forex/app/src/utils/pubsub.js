const pubSub = () => {

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

export default pubSub