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
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const x = res.locals.x;
    let rets;
    return new Promise((resolve) => {
        x.Socket.send.getTrades(false).then((s) => {
            s.returnData = s.returnData.filter(c => c.symbol == req.body.symbol || req.body.symbol == '');
            resolve(s);
        }).catch((e) => {
            console.log(e);
            resolve([]);
        });
    });
});
//# sourceMappingURL=retrieveTrades.js.map