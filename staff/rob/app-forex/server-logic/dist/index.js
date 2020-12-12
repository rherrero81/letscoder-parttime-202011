"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const registrateOperation_1 = __importDefault(require("./registrateOperation"));
const retrieveAllSymbols_1 = __importDefault(require("./retrieveAllSymbols"));
const retrieveNews_1 = __importDefault(require("./retrieveNews"));
const retrieveServerTime_1 = __importDefault(require("./retrieveServerTime"));
const retrieveTickPrices_1 = __importDefault(require("./retrieveTickPrices"));
const retrieveTrades_1 = __importDefault(require("./retrieveTrades"));
const retrieveTradesHistory_1 = __importDefault(require("./retrieveTradesHistory"));
const unregistrateOperation_1 = __importDefault(require("./unregistrateOperation"));
const retrieveIndicators_1 = __importDefault(require("./retrieveIndicators"));
const retrieveIndicators_C_1 = __importDefault(require("./retrieveIndicators_C"));
const retrieveSymbol_1 = __importDefault(require("./retrieveSymbol"));
const retrievePivot_1 = __importDefault(require("./retrievePivot"));
const retrievePivot_C_1 = __importDefault(require("./retrievePivot_C"));
const retrieveSignal_1 = __importDefault(require("./retrieveSignal"));
const retrieveSignal_C_1 = __importDefault(require("./retrieveSignal_C"));
const retrieveLast_1 = __importDefault(require("./retrieveLast"));
const retrieveLast_C_1 = __importDefault(require("./retrieveLast_C"));
exports.default = { retrieveLast_C: retrieveLast_C_1.default, retrieveLast: retrieveLast_1.default, retrieveSignal_C: retrieveSignal_C_1.default, retrieveSignal: retrieveSignal_1.default, retrievePivot_C: retrievePivot_C_1.default, retrievePivot: retrievePivot_1.default, retrieveSymbol: retrieveSymbol_1.default, retrieveIndicators_C: retrieveIndicators_C_1.default, retrieveIndicators: retrieveIndicators_1.default, registrateOperation: registrateOperation_1.default, retrieveAllSymbols: retrieveAllSymbols_1.default, retrieveNews: retrieveNews_1.default, retrieveServerTime: retrieveServerTime_1.default, retrieveTickPrices: retrieveTickPrices_1.default, retrieveTrades: retrieveTrades_1.default, retrieveTradesHistory: retrieveTradesHistory_1.default, unregistrateOperation: unregistrateOperation_1.default };
/*module.exports = {
    registrateOperation: require('./registrateOperation')
} */ 
//# sourceMappingURL=index.js.map