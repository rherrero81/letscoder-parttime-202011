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
exports.checkToken = exports.checkSignalsParams = exports.checkSearchParams = void 0;
const HttpErrors_1 = require("../utils/HttpErrors");
const checkSearchParams = (req, res, next) => {
    if (!req.query.q) {
        throw new HttpErrors_1.HTTP400Error("Missing q parameter");
    }
    else {
        next();
    }
};
exports.checkSearchParams = checkSearchParams;
const checkSignalsParams = (req, res, next) => {
    if (!req.query.q) {
        throw new HttpErrors_1.HTTP400Error("Missing q parameter");
    }
    else {
        next();
    }
};
exports.checkSignalsParams = checkSignalsParams;
const checkToken = (req, res, next) => {
    var _a;
    if (!req.header('authorization')) {
        throw new HttpErrors_1.HTTP400Error("Missing no token parameter");
    }
    else {
        const token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
        //res.locals.x=req.app.locals.tokenCache.get(token);    
        //TODO:https://expressjs.com/en/api.html#req
        res.locals.x = req.app.locals.tokenCache.get(token);
        if (!res.locals.x)
            throw new HttpErrors_1.HTTP400Error("Bad token");
        if (!res.locals.x.isReady)
            getReady(res.locals.x).then(() => next());
        else
            next();
        //next();
    }
    function getReady(x) {
        return __awaiter(this, void 0, void 0, function* () {
            let r = "-";
            yield x.connect();
            let s = new Promise((resolve, reject) => {
                x.onReady(() => {
                    console.log("readyOut");
                    resolve("readyOut");
                });
            });
            return s;
        });
    }
};
exports.checkToken = checkToken;
//# sourceMappingURL=checks.js.map