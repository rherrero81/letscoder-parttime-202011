const searchVehicles = query => {
    if (typeof query !== 'string') throw new TypeError(`${query} is not a query`)

    if (!query.trim().length) throw new Error('query is empty or blank')

    return (async() => {
        const res = await fetch(`https://b00tc4mp.herokuapp.com/api/hotwheels/vehicles?q=${query}`)

        if (res.status !== 200) throw new Error('problem with api')

        const results = await res.json()

        return results
    })()
}


/* ;
(async () => {
    try {
        const vehicles = await searchVehicles(true)

        vehicles.forEach(console.log)
    } catch (error) {
        console.error(error)
    }
})(); */