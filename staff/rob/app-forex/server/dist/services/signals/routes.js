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
const SignalController_1 = require("./SignalController");
const checks_1 = require("../../middleware/checks");
exports.default = [
    {
        path: "/api/v1/signal",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const ret = yield SignalController_1.calculateSignal(req);
                res.status(200).send(ret);
            })
        ]
    },
    {
        path: "/api/v1/signalsymbol",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const ret = yield SignalController_1.getSymbols(req.body.search);
                res.status(200).send(ret);
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map