import retrieveSignal_C from './retrieveSignal_C'
const sleep = require('util').promisify(setTimeout);

export default async (symbol: string,period: string) => {
    let response:any;
   
  
    do {
    response=await retrieveSignal_C(symbol,period);
    console.log(response.status);
    if(response.status==false && response.code=='213')
    await sleep(60000);
    } while (response.status==false && response.code=='213');
  
    return response;
  };
  