import request from "request-promise";
import dotenv from "dotenv";
import XAPI, {
  ConnectionStatus,
  TYPE_FIELD,
  CMD_FIELD,
  DAY_FIELD,
  PERIOD_FIELD,
  STATE_FIELD,
  REQUEST_STATUS_FIELD,
  Candle,
  errorCode,
  ListenerChild,
} from "xapi-node";
import crypto from "crypto";
import base64url from "base64url";
import NodeCache from 'node-cache';
import { Resolver } from "dns";
 
dotenv.config();

export const getVal = async  (req: any,res:any)=> { 
 
  let retq={}
  const x=res.locals.x; 
   await execTardeV(x,req.body.symbol).then((s) => (retq = s)); 
  return retq;
};

export const getSymb = async  (req: any,res:any)=> {
 
  let retq={};
  const x=res.locals.x; 
  await execTardeS(x).then((s) => (retq = s));  
  return retq;   

};

export const getHystTad = async (req: any,res:any) => {
 
  let retq={}
  const x=res.locals.x;  
  await execTardeH(x, req.body.startTime, req.body.endTime).then((s) => (retq = s));
  return retq;

};

 

export async function getTok(req: any): Promise<string> {
  let r = "-";
  let x = new XAPI({
    accountId: req.body.username,
    password: req.body.password,
    type: req.body.accountType, // or demo
  });
 
req.app.locals.tokenCache.keys().forEach((key:string) => {
  
  if(req.app.locals.tokenCache.get(key))
  if(req.app.locals.tokenCache.get(key).accountId==x.accountId)
  if(req.app.locals.tokenCache.get(key).accountType==x.accountType)
  {
    //console.log('Remove cache element'+key);
    req.app.locals.tokenCache.del(key);
  } 
});
  
 
 
    await x.connect();
    
    let s: Promise<string> = new Promise((resolve, reject) => {
         
            x.onReject((e)=>
            {       
              console.log('reject');       
              x.Socket.closeConnection(); 
              resolve("")
            
            });
            x.onReady(async () => {         
           //const tok= base64url(crypto.randomBytes(120)); 
           var jwt = require('jsonwebtoken');
           var tok = jwt.sign({
            accountId: req.body.username,
            password: req.body.password,
            type: req.body.accountType, // or demo
          }, 'shhhhh');       
           req.app.locals.tokenCache.set(tok, x);
          
          // console.log('create token for: '+ req.app.locals.tokenCache.get(tok).accountId); 
            resolve(tok);
            }); 
          

   
    });
    
    return s; 
  }
   

async function execTardeH(x: XAPI,st:number,en:number): Promise<any> {
  let s: Promise<any> = new Promise((resolve, reject) => {
    x.Socket.send
      .getTradesHistory(st,en)
      .then((symbols) => {
        console.error("execTardeH");
        console.error(symbols);
        x.disconnect().then(() => console.log("Disconnected"));
        resolve(symbols);
      })
      .catch((e) => {
        x.disconnect().then(() => console.log("Disconnected"));
        console.error("Failed");
        console.error(e);
        resolve([]);
      });
  });

  return s;
}

async function execTardeS(x: XAPI): Promise<any> {
  let s: Promise<any> = new Promise((resolve, reject) => {
 
    x.Socket.send 
      .getAllSymbols()
      .then((symbols) => {
       // console.log("Symbolsback * "); 
        x.disconnect().then(() => console.log("Disconnected"));
        resolve(symbols);
      })
      .catch((e) => {        
        x.disconnect().then(() => console.log("Disconnected"));
        console.error("Failed");
        console.error(e);
        resolve([]);
      });
  });

  return s;
}

async function execTardeV(x: XAPI,symbol:string): Promise<any> {
  let s: Promise<any> = new Promise((resolve, reject) => {
    x.getPriceHistory({
      symbol:symbol,
      period: PERIOD_FIELD.PERIOD_M1,
    })
      .then(({ candles, digits }) => {
        console.error("execTardeV-return candles");
        x.disconnect().then(() => console.log("Disconnected"));
        resolve({candles,digits});
      })
      .catch((e) => {
        x.disconnect().then(() => console.log("Disconnected"));
        console.error("execTardeV-Failed");
        console.error(e);
        resolve([]);
      });
  });

  return s;
}

 