 import registrateForexOperation from './registrate-forex-operation.js'
 import registrateUser from './registrate-user.js'
 import removeUser from './remove-user.js'
 import retrieveForexOperation from './retrieve-forex-operation.js'
 import retrieveForexSignals from './retrieve-forex-signals.js'
 import retrieveForexSignal from './retrieve-forex-signal.js'
 import retrieveForexSignalsSymbols from './retrieve-forex-signalssymbols.js'
 import retrieveForexSymbols from './retrieve-forex-symbols.js'
 import retrieveForexToken from './retrieve-forex-token.js'
 import retrieveForexTradeHistorical from './retrieve-forex-trade-historical.js'
 import retrieveForexTrade from './retrieve-forex-trade.js'
 import retrieveUser from './retrieve-user.js'
 import retrieveForexValues from './retrieve-forex-values.js'
 import searchVehicles from './retrieve-vehicles.js'
 import unregistrateForexOperation from './unregistrate-forex-operation.js'
 import calculate from './calculate.js'
 import configWidgetsUser from './configWidgets-user.js'

 import OperationModel from './models/Forex/Operation.js'
 import reduxOperations from './operations-redux.js'
 import chartlogic from './config-chartjs.js'


 export default { retrieveForexSignal, configWidgetsUser, chartlogic, reduxOperations, OperationModel, retrieveForexTrade, retrieveForexToken, configWidgetsUser, registrateForexOperation, registrateUser, removeUser, retrieveForexSignalsSymbols, retrieveForexOperation, retrieveForexSignals, retrieveForexSymbols, calculate, unregistrateForexOperation, searchVehicles, retrieveForexValues, retrieveUser, retrieveForexTradeHistorical }