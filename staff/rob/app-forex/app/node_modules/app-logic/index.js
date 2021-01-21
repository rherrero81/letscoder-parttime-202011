 import registrateForexOperation from './src/registrate-forex-operation.js'
 import registrateUser from './src/registrate-user.js'
 import removeUser from './src/remove-user.js'
 import retrieveForexOperation from './src/retrieve-forex-operation.js'
 import retrieveForexSignals from './src/retrieve-forex-signals.js'
 import retrieveForexSignal from './src/retrieve-forex-signal.js'
 import retrieveForexSignalsSymbols from './src/retrieve-forex-signalssymbols.js'
 import retrieveForexSymbols from './src/retrieve-forex-symbols.js'
 import retrieveForexToken from './src/retrieve-forex-token.js'
 import retrieveForexTradeHistorical from './src/retrieve-forex-trade-historical.js'
 import retrieveForexTrade from './src/retrieve-forex-trade.js'
 import retrieveUser from './src/retrieve-user.js'
 import retrieveForexValues from './src/retrieve-forex-values.js'
 import searchVehicles from './src/retrieve-vehicles.js'
 import unregistrateForexOperation from './src/unregistrate-forex-operation.js'
 import calculate from './src/calculate.js'
 import configWidgetsUser from './src/configWidgets-user.js'

 import OperationModel from './src/models/Forex/Operation.js'
 import reduxOperations from './src/operations-redux.js'
 import chartlogic from './src/config-chartjs.js'


 export default { retrieveForexSignal, configWidgetsUser, chartlogic, reduxOperations, OperationModel, retrieveForexTrade, retrieveForexToken, registrateForexOperation, registrateUser, removeUser, retrieveForexSignalsSymbols, retrieveForexOperation, retrieveForexSignals, retrieveForexSymbols, calculate, unregistrateForexOperation, searchVehicles, retrieveForexValues, retrieveUser, retrieveForexTradeHistorical }

 // module.exports = { retrieveForexSignals, retrieveForexSignal, configWidgetsUser, chartlogic, reduxOperations, OperationModel, retrieveForexTrade, retrieveForexToken, configWidgetsUser, registrateForexOperation, registrateUser, removeUser, retrieveForexSignalsSymbols, retrieveForexOperation, retrieveForexSymbols, calculate, unregistrateForexOperation, searchVehicles, retrieveForexValues, retrieveUser, retrieveForexTradeHistorical }