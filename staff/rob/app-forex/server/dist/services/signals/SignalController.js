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
exports.calculateSignal = exports.getLastest = exports.getSignalsBAK = exports.getSignals = exports.getSymbols = void 0;
/* import { retrieveSignal, retrieveLast,retrieveSymbol } from "./providers/SignalCageDataProvider"; */
const server_logic_1 = __importDefault(require("server-logic"));
const UtilsFunc_1 = require("../../utils/UtilsFunc");
const fs = require("fs");
const path = require("path");
const test_media1 = require("./calls/ma-avg_1.json");
const test_media2 = require("./calls/ma-avg_2.json");
const test_pivot2 = require("./calls/pivot.json");
const test_indicators2 = require("./calls/indicators.json");
const test_last = require("./calls/lastest.json");
const symbols = require("./calls/symbols.json");
const getSymbols = (search) => __awaiter(void 0, void 0, void 0, function* () {
    let res = yield symbols;
    let temp = res.response.filter((c) => c.symbol.replace('\/', '') == search);
    if (temp.length == 0) {
        console.log(search.toUpperCase());
        temp = res.response.filter((c) => c.name.toUpperCase().indexOf(search.toUpperCase()) != -1);
    }
    return temp;
    //return await SignalProvider.retrieveSymbol(search);
});
exports.getSymbols = getSymbols;
const getSignals = (symbol, period, price) => __awaiter(void 0, void 0, void 0, function* () {
    let res;
    if (process.env.EXEC_MODE == '1') {
        res = yield server_logic_1.default.retrieveSignalMedia(symbol, period);
    }
    else
        res = yield test_media2;
    /* if (process.env.EXEC_MODE=='1') {res= await SignalProvider.retrieveIndicators(symbol,period);}
        else res = await test_indicators2; */
    let result = [];
    // console.log(res.response);
    let summaryMA = res.response.oa_summary;
    let allless = true;
    let allmore = true;
    let crossSMA = -1;
    let keys = Object.keys(res.response.ma_avg.SMA);
    keys.forEach(function (key) {
        if (res.response.ma_avg.SMA[key].v <= price)
            allless = false;
        if (res.response.ma_avg.SMA[key].v >= price)
            allmore = false;
        result.push({ name: key, type: 'SMA', price: res.response.ma_avg.SMA[key].v, cmd: res.response.ma_avg.SMA[key].s == 'Buy' ? 0 : res.response.ma_avg.SMA[key].s == 'Sell' ? 1 : -1, order: 0, volume: 0.1, sl: 0, tp: 0 });
    });
    crossSMA = allmore ? 0 : allless ? 1 : -1;
    let crossEMA = -1;
    allless = true;
    allmore = true;
    keys = Object.keys(res.response.ma_avg.EMA);
    keys.forEach(function (key) {
        if (res.response.ma_avg.EMA[key].v <= price)
            allless = false;
        if (res.response.ma_avg.EMA[key].v >= price)
            allmore = false;
        result.push({ name: key, type: 'EMA', price: res.response.ma_avg.EMA[key].v, cmd: res.response.ma_avg.EMA[key].s == 'Buy' ? 0 : res.response.ma_avg.EMA[key].s == 'Sell' ? 1 : -1, order: 0, volume: 0.1, sl: 0, tp: 0 });
    });
    crossEMA = allmore ? 0 : allless ? 1 : -1;
    if (process.env.EXEC_MODE == '1') {
        res = yield server_logic_1.default.retrieveSignalPivots(symbol, period);
    }
    else
        res = yield test_pivot2;
    //console.log(res.response)
    let summaryP = res.response.oa_summary;
    result.push({ name: 'Classic 3', type: 'PivotC', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.classic["S3"], tp: res.response.pivot_point.classic["R3"] });
    result.push({ name: 'Classic 2', type: 'PivotC', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.classic["S2"], tp: res.response.pivot_point.classic["R2"] });
    result.push({ name: 'Classic 1', type: 'PivotC', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.classic["S1"], tp: res.response.pivot_point.classic["R1"] });
    result.push({ name: 'Fibonacci 3', type: 'PivotF', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.fibonacci["S3"], tp: res.response.pivot_point.fibonacci["R3"] });
    result.push({ name: 'Fibonacci 2', type: 'PivotF', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.fibonacci["S2"], tp: res.response.pivot_point.fibonacci["R2"] });
    result.push({ name: 'Fibonacci 1', type: 'PivotF', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.fibonacci["S1"], tp: res.response.pivot_point.fibonacci["R1"] });
    result.push({ name: 'Camarilla 3', type: 'PivotCa', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.camarilla["S3"], tp: res.response.pivot_point.camarilla["R3"] });
    result.push({ name: 'Camarilla 2', type: 'PivotCa', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.camarilla["S2"], tp: res.response.pivot_point.camarilla["R2"] });
    result.push({ name: 'Camarilla 1', type: 'PivotCa', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.camarilla["S1"], tp: res.response.pivot_point.camarilla["R1"] });
    result.push({ name: 'Woodie 3', type: 'PivotW', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.woodie["S3"], tp: res.response.pivot_point.woodie["R3"] });
    result.push({ name: 'Woodie 2', type: 'PivotW', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.woodie["S2"], tp: res.response.pivot_point.woodie["R2"] });
    result.push({ name: 'Woodie 1', type: 'PivotW', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.woodie["S1"], tp: res.response.pivot_point.woodie["R1"] });
    result.push({ name: 'Demark 3', type: 'PivotD', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.demark["S3"], tp: res.response.pivot_point.demark["R3"] });
    result.push({ name: 'Demark 2', type: 'PivotD', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.demark["S2"], tp: res.response.pivot_point.demark["R2"] });
    result.push({ name: 'Demark 1', type: 'PivotD', price: 0, cmd: 0, order: 0, volume: 0.1, sl: res.response.pivot_point.demark["S1"], tp: res.response.pivot_point.demark["R1"] });
    return { summary: { summaryP: summaryP, summaryMA: summaryMA, crossSMA: crossSMA, crossEMA: crossEMA }, list: result };
});
exports.getSignals = getSignals;
const getSignalsBAK = (q, p) => __awaiter(void 0, void 0, void 0, function* () {
    /* let res=await getSig(q);
    console.log(JSON.stringify(res)); */
    let res;
    console.log(process.env.EXEC_MODE);
    if (process.env.EXEC_MODE == '1') {
        res = yield server_logic_1.default.retrieveSignalMedia(q, p);
    }
    else
        res = yield test_media2;
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
exports.getSignalsBAK = getSignalsBAK;
const getLastest = (r) => __awaiter(void 0, void 0, void 0, function* () {
    if (process.env.EXEC_MODE == '1')
        return yield server_logic_1.default.retrieveLast(r);
    else
        return yield test_last;
});
exports.getLastest = getLastest;
const calculateSignal = (r) => __awaiter(void 0, void 0, void 0, function* () {
    let signal = yield exports.getSignals(r.body.symbol, r.body.period, r.body.price);
    /* let signal={
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