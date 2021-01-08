"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getTok = exports.getHystTad = exports.getSymb = exports.getVal = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const xapi_node_1 = __importStar(require("xapi-node"));
dotenv_1.default.config();
const getVal = (x, symbol) => __awaiter(void 0, void 0, void 0, function* () {
    let retq = {};
    yield execTardeV(x, symbol).then((s) => (retq = s));
    return retq;
});
exports.getVal = getVal;
const getSymb = (x) => __awaiter(void 0, void 0, void 0, function* () {
    let retq = {};
    yield execTardeS(x).then((s) => (retq = s));
    return retq;
});
exports.getSymb = getSymb;
const getHystTad = (x, startTime, endTime) => __awaiter(void 0, void 0, void 0, function* () {
    let retq = {};
    yield execTardeH(x, startTime, endTime).then((s) => (retq = s));
    return retq;
});
exports.getHystTad = getHystTad;
function getTok(username, password, accountType, tokenCache) {
    return __awaiter(this, void 0, void 0, function* () {
        let r = "-";
        let x = new xapi_node_1.default({
            accountId: username,
            password: password,
            type: accountType,
        });
        tokenCache.keys().forEach((key) => {
            if (tokenCache.get(key))
                if (tokenCache.get(key).accountId == x.accountId)
                    if (tokenCache.get(key).accountType == x.accountType) {
                        //console.log('Remove cache element'+key);
                        tokenCache.del(key);
                    }
        });
        yield x.connect();
        let s = new Promise((resolve, reject) => {
            x.onReject((e) => {
                console.log('reject get token');
              //  x.Socket.closeConnection();
                resolve({ error: e.reason.explain });
            });
            x.onReady(() => __awaiter(this, void 0, void 0, function* () {
                //const tok= base64url(crypto.randomBytes(120)); 
                var jwt = require('jsonwebtoken');
                var tok = jwt.sign({
                    accountId: username,
                    password: password,
                    type: accountType,
                }, 'shhhhh');
                tokenCache.set(tok, x);
                console.log('create token for: ' + username + ' , token= ' + tok);
                resolve(tok);
            }));
        });
        return s;
    });
}
exports.getTok = getTok;
function execTardeH(x, st, en) {
    return __awaiter(this, void 0, void 0, function* () {
        let s = new Promise((resolve, reject) => {
            x.Socket.send
                .getTradesHistory(st, en)
                .then((symbols) => {
                /*   console.error("execTardeH"); */
                console.error(symbols);
                /*   x.disconnect().then(() => console.log("Disconnected")); */
                resolve(symbols);
            })
                .catch((e) => {
                x.disconnect().then(() => console.log("Disconnected"));
                console.error("Failed");
                console.error(e);
                resolve([]);
            });
        });
        return s;
    });
}
function execTardeS(x) {
    return __awaiter(this, void 0, void 0, function* () {
        let s = new Promise((resolve, reject) => {
            x.Socket.send
                .getAllSymbols()
                .then((symbols) => {
                // console.log("Symbolsback * "); 
                /*     x.disconnect().then(() => console.log("Disconnected")); */
                resolve(symbols);
            })
                .catch((e) => {
                x.disconnect().then(() => console.log("Disconnected"));
                console.error("Failed");
                console.error(e);
                resolve([]);
            });
        });
        return s;
    });
}
function execTardeV(x, symbol) {
    return __awaiter(this, void 0, void 0, function* () {
        let s = new Promise((resolve, reject) => {
            x.getPriceHistory({
                symbol: symbol,
                period: xapi_node_1.PERIOD_FIELD.PERIOD_M1,
            })
                .then(({ candles, digits }) => {
                /*   console.error("execTardeV-return candles");
                  x.disconnect().then(() => console.log("Disconnected")); */
                resolve({ candles, digits });
            })
                .catch((e) => {
                /*   x.disconnect().then(() => console.log("Disconnected"));
                  console.error("execTardeV-Failed"); */
                console.error(e);
                resolve([]);
            });
        });
        return s;
    });
}
//# sourceMappingURL=ValuesDataProvider.js.map