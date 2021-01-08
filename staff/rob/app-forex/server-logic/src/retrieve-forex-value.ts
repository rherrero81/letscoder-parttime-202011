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
 
const   execTardeV=(x:XAPI,symbol:string,period:number): Promise<any>  => {
	let s: Promise < any > = new Promise((resolve, reject) => {
		x.getPriceHistory({
			symbol: symbol,
			period: period,
			})
			.then(({ candles, digits }) => {
 
				resolve({ candles, digits });
			})
			.catch((e:any) => {
 
				console.error(e);
				resolve([]);
			});
	});

	return s;
	}
 
export default async (x:any,symbol:string,period:number) => {

	let retq = {}

	await execTardeV(x, symbol,period).then((s) => (retq = s));
	return retq;
	}
