import { Request, Response } from "express";
import { calculateSignal,getSymbols,getSignals } from "./SignalController";
import { checkToken } from "../../middleware/checks";
export default [
  {
    path: "/api/v1/signals",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
        const ret=await getSignals(req.body.symbol,req.body.period,req.body.price);
       
        res.status(200).send(ret);
      }
    ]
  },
  {
    path: "/api/v1/signal",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
        const ret=await calculateSignal(req);
       
        res.status(200).send(ret);
      }
    ]
  },
  {
    path: "/api/v1/signalsymbol",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
        const ret=await getSymbols(req.body.search);
       
        res.status(200).send(ret);
      }
    ]
  }
];