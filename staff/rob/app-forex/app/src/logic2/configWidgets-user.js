import validator from './validators/index.js'
import ENV from './constants.js'
import exception from './exceptions/Exception.js'
const configWidgetsUser = (token, configuration) => {

	validator.StringValidator.prototype.validate(token)

	return fetch(`${ENV.FOREX_API_URL}/configWidget`, {
		headers: {
			'Content-type': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		method: 'POST',
		body: JSON.stringify(configuration)
	}).then(res => {

		return res.json()
	}).then(response => {
	return response });


}
export default configWidgetsUser
