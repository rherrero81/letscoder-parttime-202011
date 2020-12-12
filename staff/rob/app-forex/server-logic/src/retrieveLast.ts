 
import retrieveLast_C from './retrieveLast_C'
const sleep = require('util').promisify(setTimeout);
export default async (symbol: string) => {

    let response:any;
  
    do {
    response=await retrieveLast_C(symbol);
    if(response.status==false && response.code=='213')
    await sleep(60000);
    } while (response.status==false && response.code=='213');
  
    return response;
  
  };
  