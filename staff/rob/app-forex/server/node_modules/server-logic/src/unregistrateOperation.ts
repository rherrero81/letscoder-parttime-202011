import XAPI, {TYPE_FIELD} from "xapi-node";

export default  async (x: XAPI,operation: any) => {  
 
   
    console.log("deleting order "+operation.order+' type '+ operation.type );
    console.log(operation); 
    return new Promise((resolve)=>{ 
     
    x.onReady(() =>
      x.Socket.send 
        .tradeTransaction({
        //  cmd: operation.cmd === "B" ? CMD_FIELD.BUY : CMD_FIELD.SELL,
        cmd: operation.cmd,
          customComment: "test v.0",
          expiration: x.serverTime + 5000,
          offset: operation.offset,
          price: operation.price,
          symbol: operation.symbol,
          tp: operation.tp,
          sl: operation.sl,
        type:  operation.cmd == 0 ||  operation.cmd == 1 ? TYPE_FIELD.CLOSE : TYPE_FIELD.DELETE,
          volume: operation.volume,
          order: operation.order,
        })   
        .then(({ order }) => {
         // x.disconnect().then(() => console.log("Disconnected then"));
          console.log("Success delete order " + order);
          resolve({order:order});
        }) 
        .catch((e:any) => {
        //  x.disconnect().then(() => console.log("Disconnected catch"));
          console.error("Failed delete order ");
          console.error(e);
          resolve({order:null});
        })
    );
      });
  };
  