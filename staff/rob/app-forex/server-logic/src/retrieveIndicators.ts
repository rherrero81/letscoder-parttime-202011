
import retrieveIndicators_C from './retrieveIndicators_C'
const sleep = require('util').promisify(setTimeout);
export default async (symbol: string,period: string) => {
    let response:any;
  
    do {
    response=await retrieveIndicators_C(symbol,period);
    if(response.status==false && response.code=='213')
    await sleep(60000);
    } while (response.status==false && response.code=='213');
  
    return response;
  };