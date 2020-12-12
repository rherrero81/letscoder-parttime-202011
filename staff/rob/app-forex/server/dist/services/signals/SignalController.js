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
exports.calculateSignal = exports.getLastest = exports.getSignals = exports.getSymbols = void 0;
/* import { retrieveSignal, retrieveLast,retrieveSymbol } from "./providers/SignalCageDataProvider"; */
const server_logic_1 = __importDefault(require("server-logic"));
const UtilsFunc_1 = require("../../utils/UtilsFunc");
const fs = require("fs");
const path = require("path");
const test_data1 = require("./calls/ma-avg_1.json");
const test_data2 = require("./calls/ma-avg_2.json");
const test_last = require("./calls/lastest.json");
const getSymbols = (search) => __awaiter(void 0, void 0, void 0, function* () {
    return yield server_logic_1.default.retrieveSymbol(search);
});
exports.getSymbols = getSymbols;
const getSignals = (q, p) => __awaiter(void 0, void 0, void 0, function* () {
    /* let res=await getSig(q);
    console.log(JSON.stringify(res)); */
    let res;
    console.log(process.env.EXEC_MODE);
    if (process.env.EXEC_MODE == '1') {
        res = yield server_logic_1.default.retrieveSignal(q, p);
    }
    else
        res = yield test_data2;
    let mov = res.response.oa_summary.indexOf('Buy') != -1 ? 'B' : res.response.oa_summary.indexOf('Sell') != -1 ? 'S' : 'N';
    let sma = Object.values(res.response.ma_avg.SMA);
    let ema = Object.values(res.response.ma_avg.EMA);
    let op = res.response.ma_avg.summary == "Buy"
        ? "B"
        : res.response.ma_avg.summary == "Sell"
            ? "S"
            : "N";
    let positions = [];
    sma.map((c) => positions.push(c));
    ema.map((c) => positions.push(c));
    if (mov === "B") {
        positions = positions.sort(UtilsFunc_1.asc_sort);
    }
    else if (mov === "S") {
        positions = positions.sort(UtilsFunc_1.desc_sort);
    }
    console.log(res.response.oa_summary);
    return { t: mov, p: positions };
});
exports.getSignals = getSignals;
const getLastest = (r) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.EXEC_MODE == '1')
        return yield server_logic_1.default.retrieveLast(r);
    else
        return yield test_last;
});
exports.getLastest = getLastest;
const calculateSignal = (r) => __awaiter(void 0, void 0, void 0, function* () {
    let signal = yield exports.getSignals(r.body.symbol, r.body.period);
    /*   let signal={
      t: 'B',
      p: [
        { v: '1.12621', s: 'Buy' },
        { v: '1.141', s: 'Buy' },
        { v: '1.15571', s: 'Buy' },
        { v: '1.15781', s: 'Buy' },
        { v: '1.1721', s: 'Buy' },
        { v: '1.17251', s: 'Buy' },
        { v: '1.17431', s: 'Buy' },
        { v: '1.17491', s: 'Neutral' },
        { v: '1.17491', s: 'Buy' },
        { v: '1.17531', s: 'Neutral' },
        { v: '1.17551', s: 'Neutral' },
        { v: '1.17991', s: 'Sell' }
      ]
    };
      */
    let glast = yield exports.getLastest(r.body.symbol);
    glast = glast.response[0];
    console.log(signal);
    let sl = 0;
    let tp = 0;
    signal.p.forEach((c, i) => {
        if (signal.t === "B") {
            if (c.s !== "Buy" && parseFloat(glast.price) > parseFloat(c.v)) {
                sl = parseFloat(c.v);
            }
            else if (tp == 0 &&
                c.s !== "Buy" &&
                parseFloat(glast.price) < parseFloat(c.v)) {
                tp = parseFloat(c.v);
                if (sl == 0 && i - 1 >= 0)
                    sl = parseFloat(signal.p[i - 1].v);
            }
        }
        if (signal.t === "S") {
            if (c.s !== "Sell" && parseFloat(glast.price) < parseFloat(c.v)) {
                sl = parseFloat(c.v);
            }
            else if (tp == 0 &&
                c.s !== "Sell" &&
                parseFloat(glast.price) > parseFloat(c.v)) {
                tp = parseFloat(c.v);
                if (sl == 0 && i - 1 >= 0)
                    sl = parseFloat(signal.p[i - 1].v);
            }
        }
    });
    let prop = signal.t == "S"
        ? (sl - parseFloat(glast.price) / (parseFloat(glast.price) - tp))
        : (tp - parseFloat(glast.price)) / (parseFloat(glast.price) - sl);
    let ret = {
        signal: signal.t,
        price: 1,
        vol: 0.1,
        sl: sl,
        tp: tp,
        current: parseFloat(glast.price),
        prop: prop,
    };
    return { cmd: ret.signal == 'B' ? 0 : ret.signal == 'N' ? -1 : 1, price: ret.current, sl: ret.sl, tp: ret.tp };
});
exports.calculateSignal = calculateSignal;
//# sourceMappingURL=SignalController.js.map