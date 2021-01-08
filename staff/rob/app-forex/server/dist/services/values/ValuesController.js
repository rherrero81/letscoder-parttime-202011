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
exports.getHystTrade = exports.getToken = exports.getSymbols = exports.getValues = exports.setConfig = void 0;
const server_logic_1 = __importDefault(require("server-logic"));
const setConfig = (q, r) => __awaiter(void 0, void 0, void 0, function* () {
    q.app.locals.configurations.set(r.locals.x.account.accountId, q.body.config);
    return q.app.locals.configurations.get(r.locals.x.account.accountId);
});
exports.setConfig = setConfig;
const getValues = (x, symbol, period) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.getValue(x, symbol, period);
});
exports.getValues = getValues;
const getSymbols = (x) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveAllSymbols(x);
});
exports.getSymbols = getSymbols;
const getToken = (username, password, accountType, tokenCache) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.getToken(username, password, accountType, tokenCache);
});
exports.getToken = getToken;
const getHystTrade = (x, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.getHistoryTrade(x, startTime, endTime);
});
exports.getHystTrade = getHystTrade;
//# sourceMappingURL=ValuesController.js.map