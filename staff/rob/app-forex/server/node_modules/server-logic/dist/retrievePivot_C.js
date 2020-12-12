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
const request_promise_1 = __importDefault(require("request-promise"));
exports.default = (symbol, period) => __awaiter(void 0, void 0, void 0, function* () {
    const key = process.env.SIGNAL_KEY;
    const url = `https://fcsapi.com/api-v2/forex/pivot_points?symbol=${symbol}&period=${period}&access_key=${key}`;
    const response = yield request_promise_1.default(url);
    return JSON.parse(response);
});
//# sourceMappingURL=retrievePivot_C.js.map