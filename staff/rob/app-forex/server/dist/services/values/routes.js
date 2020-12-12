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
const ValuesController_1 = require("./ValuesController");
const checks_1 = require("../../middleware/checks");
exports.default = [
    {
        path: "/api/v1/auth",
        method: "post",
        handler: [
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield ValuesController_1.getToken(req, res);
                res.status(200).send({ result: result });
            })
        ]
    },
    {
        path: "/api/v1/symbols",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield ValuesController_1.getSymbols(req, res);
                res.status(200).send(result);
            })
        ]
    },
    {
        path: "/api/v1/values",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield ValuesController_1.getValues(req, res);
                res.status(200).send(result);
            })
        ]
    },
    {
        path: "/api/v1/historical",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield ValuesController_1.getHystTrade(req, res);
                res.status(200).send(result);
            })
        ]
    }
];
//# sourceMappingURL=routes.js.map