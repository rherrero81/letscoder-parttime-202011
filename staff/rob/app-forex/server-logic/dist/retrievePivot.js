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
const retrievePivot_C_1 = __importDefault(require("./retrievePivot_C"));
const sleep = require('util').promisify(setTimeout);
exports.default = (symbol, period) => __awaiter(void 0, void 0, void 0, function* () {
    let response;
    do {
        response = yield retrievePivot_C_1.default(symbol, period);
        if (response.status == false && response.code == '213')
            yield sleep(60000);
    } while (response.status == false && response.code == '213');
    return response;
});
//# sourceMappingURL=retrievePivot.js.map