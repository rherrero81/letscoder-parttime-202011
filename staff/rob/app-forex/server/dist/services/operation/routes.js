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
const OperationController_1 = require("./OperationController");
const checks_1 = require("../../middleware/checks");
/*
http://localhost:3030/api/v1/operation
Content-Type: application/json
 

{
"a" : {
"u" : "11462324",
"p" : "Vamosvamos123",
"t" : "demo"
},
"p" : {
"val" : "BITCOIN",
"cmd" : "B",
"price" : 1,
"vol" : 0.1,
"sl" : 10938,
"tp" : 10579,
"of" : 0,
"i":225785933,
"p":1
}
}



*/
exports.default = [
    {
        path: "/api/v1/operation",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                //  console.log('Stringify query');
                // console.log(JSON.stringify(req));
                const result = yield OperationController_1.setOperation(res.locals.x, req.body);
                console.log('return operation :');
                console.log(JSON.stringify(result));
                res.status(200).send(result);
            })
        ]
    },
    {
        path: "/api/v1/operation",
        method: "put",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                //  console.log('Stringify query');
                // console.log(JSON.stringify(req));
                const result = yield OperationController_1.deleteOperation(res.locals.x, req.body);
                console.log(JSON.stringify(result));
                res.status(200).send(result);
            })
        ]
    },
    {
        path: "/api/v1/trades",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                //  console.log('Stringify query');
                // console.log(JSON.stringify(req));
                const result = yield OperationController_1.getTrades(res.locals.x, req.body);
                res.status(200).send(result);
            })
        ]
    },
    {
        path: "/api/v1/tradeshistory",
        method: "post",
        handler: [
            checks_1.checkToken,
            (req, res) => __awaiter(void 0, void 0, void 0, function* () {
                let result = yield OperationController_1.getTradesHistory(res.locals.x, req.body);
                // result.returnData.push(result2.returnData); 
                res.status(200).send(result);
            })
        ]
    }
];
/*
function safeStringify (obj:any, indent = 2) {
  let c:any;

  const retVal = JSON.stringify(
    obj,
    (key, value) =>
      typeof value === "object" && value !== null
        ? c.includes(value)
          ? undefined // Duplicate reference found, discard key
          : c.push(value) && value // Store value in our collection
        : value,
    indent
  );
  c = null;
  return retVal;
};
*/ 
//# sourceMappingURL=routes.js.map