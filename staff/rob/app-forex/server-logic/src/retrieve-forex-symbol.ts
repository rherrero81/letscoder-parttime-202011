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
 
const execTardeS=(x:XAPI): Promise<XAPI>  => {

  let s: Promise<any> = new Promise((resolve, reject) => {
 
    x.Socket.send 
      .getAllSymbols()
      .then((symbols:any) => {
        resolve(symbols);
      })
      .catch((e:any)=> {        
 
        console.error(e);
        resolve([]);
      });
  });

  return s;

	}

export default async (x:any,symbol:any) => {

  return new Promise((resolve)=>{
  
  x.Socket.send 
  .getSymbol(symbol)
  .then((symbols:any) => {
    resolve(symbols);
  })
  .catch((e:any)=> {        

    console.error(e);
    resolve([]);
  });

  });

	}
