"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSymbols = exports.getServerTime = exports.getTickPrices = exports.getLastNews = exports.deleteOperation = exports.getTrades = exports.getTradesHistory = exports.setOperation = void 0;
const server_logic_1 = __importDefault(require("server-logic"));
const setOperation = (x, operation) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.registrateOperation(x, operation);
});
exports.setOperation = setOperation;
const getTradesHistory = (x, time) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveTradesHistory(x, time);
});
exports.getTradesHistory = getTradesHistory;
const getTrades = (x, time) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveTrades(x, time);
});
exports.getTrades = getTrades;
const deleteOperation = (x, operation) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.unregistrateOperation(x, operation);
});
exports.deleteOperation = deleteOperation;
const getLastNews = (x, time) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveNews(x, time);
});
exports.getLastNews = getLastNews;
const getTickPrices = (x, symbol) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveTickPrices(x, symbol);
});
exports.getTickPrices = getTickPrices;
const getServerTime = (x) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveServerTime(x);
});
exports.getServerTime = getServerTime;
const getAllSymbols = (x) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveAllSymbols(x);
});
exports.getAllSymbols = getAllSymbols;
//# sourceMappingURL=OperationController.js.map