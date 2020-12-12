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
exports.default = (x, operation) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        x.onReady(() => {
            console.log("Sending Op.");
            x.Socket.send
                .tradeTransaction({
                cmd: operation.cmd,
                customComment: "test v.0",
                expiration: operation.cmd == 2 ? x.serverTime + 60000 * 60 * 24 * 365 : x.serverTime + 5000,
                offset: operation.offset,
                price: operation.price,
                symbol: operation.symbol,
                tp: operation.tp,
                sl: operation.sl,
                type: operation.order == 0
                    ? xapi_node_1.TYPE_FIELD.OPEN
                    : xapi_node_1.TYPE_FIELD.MODIFY,
                volume: operation.volume,
                order: operation.order,
            })
                .then(({ order }) => {
                // x.disconnect().then(() => console.log("Disconnected"));
                console.log("Success : \n " +
                    (operation.order == 0 ? "new" : "update") +
                    " order " +
                    order);
                resolve({ order: order.toString() });
            })
                .catch((e) => {
                //  x.disconnect().then(() => console.log("Disconnected"));
                console.error("Failed : ");
                console.error(e);
                resolve(e);
            });
        });
    });
});
//# sourceMappingURL=registrateOperation.js.map