import { Request, Response } from "express";
 import {  getSymbols, getValues,getHystTrade,getToken ,setConfig} from "./ValuesController";
import { checkToken } from "../../middleware/checks";
import { isConditionalExpression } from "typescript";
  

export default [
  {
    path: "/api/v1/auth",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {

        
        const result = await getToken(req.body.username,req.body.password,req.body.accountType,  req.app.locals.tokenCache);
        if(result.error) 
         res.status(200).send(result); 
        const config=req.app.locals.configurations.get(req.body.username);
        res.status(200).send({token:result,config:config});
      }
    ]
  },
  {
    path: "/api/v1/configWidget",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
      
        const result = await setConfig(req,res);  
  
        res.status(200).send({result:result});
      }
    ]
  },
  {
    path: "/api/v1/symbols",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {

        const result = await getSymbols(res.locals.x);     
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/values",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
     
        
        const result = await getValues(res.locals.x,req.body.symbol,req.body.period);
      
        res.status(200).send(result);
      }
    ]
  }
  ,
  {
    path: "/api/v1/historical",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {

        const result = await getHystTrade(res.locals.x,req.body.startTime,req.body.endTime);
        res.status(200).send(result);
      } 
    ]
  }

];


