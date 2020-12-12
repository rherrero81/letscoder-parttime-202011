"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const middleware_1 = __importDefault(require("./middleware"));
const services_1 = __importDefault(require("./services"));
const node_cache_1 = __importDefault(require("node-cache"));
var spawn = require('child_process').spawn;
var fs = require("fs");
const router = express_1.default();
//Cache
var ttlSeconds = 1000;
router.locals.tokenCache = new node_cache_1.default({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
utils_1.applyMiddleware(middleware_1.default, router);
utils_1.applyRoutes(services_1.default, router);
const { PORT = 3030 } = process.env;
const server = http_1.default.createServer(router);
server.listen(PORT, () => console.log(`Server is running http://localhost:${PORT}...`));
process.on("uncaughtException", (e) => {
    console.log('uncaughtException');
    console.log(e.message);
    //process.exit(1);
});
process.on("unhandledRejection", (e, f) => {
    var _a, _b;
    let ee = e;
    let ff = f;
    if (((_a = ee === null || ee === void 0 ? void 0 : ee.reason) === null || _a === void 0 ? void 0 : _a.code) == 'BE103' || ((_b = ee === null || ee === void 0 ? void 0 : ee.reason) === null || _b === void 0 ? void 0 : _b.code) == 'XAPINODE_1') {
        debugger;
        /*     console.log(ee?.reason?.explain); */
        //console.log(ee);
        /*      spawn(process.argv[0], process.argv.slice(1), {
              env: { process_restarting: 1 },
              stdio: 'ignore'
            }).unref();  */
    }
    else {
        /*     console.log('unhandledRejection))');
            console.log(ee); */
    }
    // console.log(e.message);
    /*   console.log(e);
      process.exit(1); */
});
/* FUTURA CLASE LLAMAR TEMPORALMENTE
async function SignalCall() {
  let treq = request;
  (treq.body.a.u = process.env.Tlogin), (treq.body.a.p = process.env.Tpassword);
  treq.body.p.val = "EUR/USD";
  //setOper(treq);

  treq.body.p.period ='1d';
  treq = await calculateSignal(treq);
  console.log(treq);
  if (treq.body.p.exec ) await setOper(treq);

 // if (treq.body.p.exec ) await setOper(treq);
 //let news:any=await getNews(treq);
 // console.log(news.returnData)

 //let s:any=await getTickPri(treq);
  //console.log(s.returnData.quotations);

   // console.log(await getServerTim(treq));
 // console.log(await getAllSymb(treq));
}

if (process.env.TIME_INTERVAL !== undefined) {
  let itime: number = parseInt(process.env.TIME_INTERVAL);


  var handle =   setInterval(SignalCall, itime);

  // When you want to cancel it:
 // clearInterval(handle);


  SignalCall();
}
*/
//# sourceMappingURL=server.js.map