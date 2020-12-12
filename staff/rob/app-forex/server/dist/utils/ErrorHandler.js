"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.clientError = exports.notFoundError = void 0;
const HttpErrors_1 = require("../utils/HttpErrors");
const notFoundError = () => {
    throw new HttpErrors_1.HTTP400Error("Method not found.");
};
exports.notFoundError = notFoundError;
const clientError = (err, res, next) => {
    if (err instanceof HttpErrors_1.HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
exports.clientError = clientError;
const serverError = (err, res, next) => {
    console.error(err);
    if (process.env.NODE_ENV === "production") {
        res.status(500).send("Internal Server Error");
    }
    else {
        res.status(500).send(err.stack);
    }
};
exports.serverError = serverError;
//# sourceMappingURL=ErrorHandler.js.map