import request from "request-promise";
 import retrievePivot_C from './retrievePivot_C'
const sleep = require('util').promisify(setTimeout);
export default async (symbol: string,period: string) => {
    let response:any;
  
    do {
    response=await retrievePivot_C(symbol,period);
    if(response.status==false && response.code=='213')
    await sleep(60000);
    } while (response.status==false && response.code=='213');
  
    return response;
  }