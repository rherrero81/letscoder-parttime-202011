import { Request, Response, NextFunction } from "express";
import { HTTPClientError, HTTP400Error } from "../utils/HttpErrors";
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

export const checkSearchParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q) {
    throw new HTTP400Error("Missing q parameter");
  } else {
    next();
  }
};

export const checkSignalsParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.query.q) {
    throw new HTTP400Error("Missing q parameter");
  } else {
    next();
  }
};

export const checkToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
  if (!req.header('authorization')) {
    throw new HTTP400Error("Missing no token parameter");
  } else {
    const token=req.header('authorization')?.replace('Bearer ','');
    //res.locals.x=req.app.locals.tokenCache.get(token);    
    //TODO:https://expressjs.com/en/api.html#req
     res.locals.x=req.app.locals.tokenCache.get(token);
     
     //res.locals.configuration=req.app.locals.configurations.get();
    if(!res.locals.x)
    throw new HTTP400Error("Bad token");    

    if(!res.locals.x.isReady)  
    getReady(res.locals.x).then(()=> next());
    else next();

    //next();
  }


  async function getReady(x: XAPI): Promise<string> {
    let r = "-";
    await x.connect();
    let s: Promise<string> = new Promise((resolve, reject) => {
      x.onReady(() => {
        console.log("readyOut"); 
        resolve("readyOut");
      });
    });
    return s;
  }
  


};
