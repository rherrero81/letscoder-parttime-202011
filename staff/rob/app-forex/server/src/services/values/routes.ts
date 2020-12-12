import { Request, Response } from "express";
 import {  getSymbols, getValues,getHystTrade,getToken } from "./ValuesController";
import { checkToken } from "../../middleware/checks";
 

export default [
  {
    path: "/api/v1/auth",
    method: "post",
    handler: [
      async (req: Request, res: Response) => {

      
        const result = await getToken(req,res);  
 
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

        const result = await getSymbols(req,res);     
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
     
       
        const result = await getValues(req,res);
      
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

        const result = await getHystTrade(req,res);
        res.status(200).send(result);
      } 
    ]
  }

];


