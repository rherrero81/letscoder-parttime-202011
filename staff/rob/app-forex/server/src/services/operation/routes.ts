import { Request, Response } from "express";
import { setOperation,deleteOperation,getTradesHistory,getTrades } from "./OperationController";
import {  checkToken } from "../../middleware/checks";

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
 
export default [
  {
    path: "/api/v1/operation",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
     
        //  console.log('Stringify query');
         // console.log(JSON.stringify(req));
           
        const result = await setOperation(res.locals.x,req.body);
    /*     console.log('return operation :');
        console.log(JSON.stringify(result)) */
        res.status(200).send(result);
      }
    ]
  },
  {  
    path: "/api/v1/operation",
    method: "put",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
     
        //  console.log('Stringify query');
         // console.log(JSON.stringify(req));
        const result = await deleteOperation(res.locals.x,req.body);
        console.log(JSON.stringify(result))
        res.status(200).send(result);
      }
    ]
  },
  {
    path: "/api/v1/trades",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
     
        //  console.log('Stringify query');
         // console.log(JSON.stringify(req));

        const result = await getTrades(res.locals.x,req.body);
        
        res.status(200).send(result);
      }
    ]
  },  
  {
    path: "/api/v1/tradeshistory",
    method: "post",
    handler: [
      checkToken,
      async (req: Request, res: Response) => {
 
         
       
         let result:any = await getTradesHistory(res.locals.x,req.body)
       // result.returnData.push(result2.returnData); 
        res.status(200).send(result);
      }
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