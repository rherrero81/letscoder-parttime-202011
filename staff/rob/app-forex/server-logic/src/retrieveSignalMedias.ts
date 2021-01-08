import retrieveSignal_C from './retrieveSignal_C'
const sleep = require('util').promisify(setTimeout);

export default async (symbol: string,period: string) => {
    let response:any;
  let cont=0; 
  
    do {
    response=await retrieveSignal_C(symbol,period);
    cont++;
  
    if(response.status==false && response.code=='213')
    await sleep(62000);
    console.log('Status signal media: '+response.status+ ' code = '+response.code);
    } while (response.status==false && response.code=='213' && cont<3);
  
    return response;
  };
  