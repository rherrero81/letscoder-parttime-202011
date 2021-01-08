import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import middleware from "./middleware";
import routes from "./services";
import NodeCache from 'node-cache';
 

var spawn = require('child_process').spawn;
var fs = require("fs");


const router = express();


//Cache
var ttlSeconds = 1000;
router.locals.tokenCache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
router.locals.configurations= new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
applyMiddleware(middleware, router);

applyRoutes(routes, router);


const { PORT = 3030 } = process.env;
const server = http.createServer(router);
server.listen(PORT, () =>
  console.log(`Server is running http://localhost:${PORT}...`)
);


process.on("uncaughtException", (e) => {
  console.log('uncaughtException');
  console.log(e.message);
  //process.exit(1);
});
process.on("unhandledRejection", (e, f) => {
  let ee: any = e;
  let ff: any = f;
  if (ee?.reason?.code == 'BE103' || ee?.reason?.code == 'XAPINODE_1') {
    debugger
/*     console.log(ee?.reason?.explain); */
    //console.log(ee);


    /*      spawn(process.argv[0], process.argv.slice(1), {
          env: { process_restarting: 1 },
          stdio: 'ignore'
        }).unref();  */
  } else {
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
