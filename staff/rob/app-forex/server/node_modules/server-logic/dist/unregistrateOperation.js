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
const xapi_node_1 = require("xapi-node");
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const x = res.locals.x;
    console.log("deleting order " + req.body.order + ' type ' + req.body.type);
    return new Promise((resolve) => {
        x.onReady(() => x.Socket.send
            .tradeTransaction({
            //  cmd: req.body.cmd === "B" ? CMD_FIELD.BUY : CMD_FIELD.SELL,
            cmd: req.body.cmd,
            customComment: "test v.0",
            expiration: x.serverTime + 5000,
            offset: req.body.offset,
            price: req.body.price,
            symbol: req.body.symbol,
            tp: req.body.tp,
            sl: req.body.sl,
            type: req.body.cmd == 0 || req.body.cmd == 1 ? xapi_node_1.TYPE_FIELD.CLOSE : xapi_node_1.TYPE_FIELD.DELETE,
            volume: req.body.volume,
            order: req.body.order,
        })
            .then(({ order }) => {
            // x.disconnect().then(() => console.log("Disconnected then"));
            console.log("Success delete order " + order);
            resolve({ order: order });
        })
            .catch((e) => {
            //  x.disconnect().then(() => console.log("Disconnected catch"));
            console.error("Failed delete order ");
            console.error(e);
            resolve({ order: null });
        }));
    });
});
//# sourceMappingURL=unregistrateOperation.js.map