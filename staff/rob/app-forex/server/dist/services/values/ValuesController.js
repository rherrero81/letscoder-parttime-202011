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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHystTrade = exports.getToken = exports.getSymbols = exports.getValues = void 0;
const ValuesDataProvider_1 = require("./providers/ValuesDataProvider");
const getValues = (q, r) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ValuesDataProvider_1.getVal(q, r);
});
exports.getValues = getValues;
const getSymbols = (q, r) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ValuesDataProvider_1.getSymb(q, r);
});
exports.getSymbols = getSymbols;
const getToken = (q, r) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ValuesDataProvider_1.getTok(q);
});
exports.getToken = getToken;
const getHystTrade = (q, r) => __awaiter(void 0, void 0, void 0, function* () {
    return yield ValuesDataProvider_1.getHystTad(q, r);
});
exports.getHystTrade = getHystTrade;
//# sourceMappingURL=ValuesController.js.map