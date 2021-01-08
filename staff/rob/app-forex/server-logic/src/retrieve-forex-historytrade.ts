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
 
  const  execTardeH=(x: XAPI,st:number,en:number): Promise<any>  => {

  let s: Promise<any> = new Promise((resolve, reject) => {
    x.Socket.send
      .getTradesHistory(st,en)
      .then((symbols) => {
      /*   console.error("execTardeH"); */
        console.error(symbols);
      /*   x.disconnect().then(() => console.log("Disconnected")); */
        resolve(symbols);
      })
      .catch((e) => {
        x.disconnect().then(() => console.log("Disconnected"));
        console.error("Failed");
        console.error(e);
        resolve([]);
      });
  });

  return s;

	}

export default async (x: XAPI,st:number,en:number) => {
  let retq={}
  
  await execTardeH(x, st,  en).then((s) => (retq = s));
  return retq;
	}
