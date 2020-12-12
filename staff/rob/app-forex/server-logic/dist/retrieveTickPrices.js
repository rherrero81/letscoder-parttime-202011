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
const execFunc_1 = __importDefault(require("./execFunc"));
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const x = res.locals.x;
    let rets;
    yield execFunc_1.default(x, x.Socket.send.getTickPrices, [[req.body.p.val]]).then((s) => {
        console.log(JSON.stringify(s));
        rets = s;
    });
    return rets;
});
//# sourceMappingURL=retrieveTickPrices.js.map