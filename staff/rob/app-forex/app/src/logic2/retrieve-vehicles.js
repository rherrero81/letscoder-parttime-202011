import validator from './validators/index.js'
import ENV from './constants.js'
const searchVehicles = query => {
    validator.StringValidator.prototype.validate(query);
    return (async() => {
        const res = await fetch(`${ENV.WHEELS_API_URL}${query}`)

        if (res.status !== 200) throw new Error('problem with api')

        const results = await res.json()

        return results
    })()
}

export default searchVehicles


/* ;
(async () => {
    try {
        const vehicles = await searchVehicles(true)

        vehicles.forEach(console.log)
    } catch (error) {
        console.error(error)
    }
})(); */