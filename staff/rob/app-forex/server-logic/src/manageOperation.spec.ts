
import registrateOperation from "./registrateOperation"
import unRegistrateOperation from "./unregistrateOperation"
import retrieveSymbol from "./retrieve-forex-symbol"
import retrieveAllSymbol from "./retrieveAllSymbols"
import CONST from './constants'
import XAPI, {TYPE_FIELD} from "xapi-node";
import { notDeepEqual } from "assert";
import { syncBuiltinESMExports } from "module"


const manageTestOperation=async (x:any,operation:any,toDelete:boolean)=>
{
	let res1:any;
	let res2:any;
	await registrateOperation(x,operation).then(r=>res1=r); 
	operation.order=res1.order;

	expect(res1).toHaveProperty("sucess", true)

	setTimeout(async () =>{
		if(toDelete)
		{
		await unRegistrateOperation(x,operation).then(r=>res2=r); 
		expect(res2).toHaveProperty("sucess", true)
		}

	} ,1000)
	//jest.useRealTimers().setTimeout(1000);

}

describe('Registration test for BITCOIN',()=>{
	const x = new XAPI({
		accountId: CONST.FOREX_API_LOGIN,
		password: CONST.FOREX_API_PASSWORD,
		type: 'demo', // or demo
		});
		let ask=0;
		let bid=0;
	
		const toDelete=true;

	x.connect();
	x.onReject((e)=> expect(e).toEqual('todo ok'));

		beforeEach(async (done) => {
		await x.onReady(async ()=> {

			const val:any=await retrieveSymbol(x,"BITCOIN");

			ask=val.returnData.ask;
			bid=val.returnData.bid;

			done(); 
		});
	},10000);
 
	test('Buy  Bitcoin', async (done) => { await manageTestOperation(x,{"cmd":0,"offset":0,"price":0,"symbol":"BITCOIN","tp":ask+2000,"sl":ask-4000,"ask":27040.86,"bid":26790.87,"type":0,"volume":0.1,"order":0},toDelete); done();});
 	test('Buy Stop Bitcoin', async (done) => {await manageTestOperation(x,{"cmd":4,"offset":0,"price":ask+2000,"symbol":"BITCOIN","tp":ask+4000,"sl":ask-2000,"ask":27040.86,"bid":26790.87,"type":0,"volume":0.1,"order":0},toDelete); done();});
	test('Buy Limit Bitcoin', async (done) => {await  manageTestOperation(x,{"cmd":2,"offset":0,"price":ask-2000,"symbol":"BITCOIN","tp":ask+2000,"sl":ask-4000,"ask":27040.86,"bid":26790.87,"type":0,"volume":0.1,"order":0},toDelete); done();});	
	
 
/* 	test('Sell Limit Bitcoin', async () => { manageTestOperation(x,{"cmd":3,"offset":0,"price":bid+2000,"symbol":"BITCOIN","tp":bid-2000,"sl":bid+5000,"ask":27040.86,"bid":26790.87,"type":0,"volume":0.1,"order":0},toDelete);});
	test('Sell Stop Bitcoin', async () =>{ manageTestOperation(x,{"cmd":5,"ofset":0,"price":bid-2000,"symbol":"BITCOIN","tp":bid-4000,"sl":bid+5000,"ask":27040.86,"bid":26790.87,"type":0,"volume":0.1,"order":0},toDelete); });
	test('Sell  Bitcoin', async () => { manageTestOperation(x,{"cmd":1,"offset":0,"price":0,"symbol":"BITCOIN","tp":bid-5000,"sl":bid+1000,"ask":27040.86,"bid":26790.87,"type":0,"volume":0.1,"order":0},toDelete)}); 
 */
})
