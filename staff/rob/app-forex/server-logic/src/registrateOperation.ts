import XAPI, {TYPE_FIELD} from "xapi-node";
 
  export default  async (x: XAPI,operation: any) => {  
 
  
   
    return new Promise((resolve)=>{
      //console.log('symbol : '+operation.symbol+'cmd: '+operation.cmd+ ' price: '+ operation.price+' order :'+operation.order+ ' sl :'+operation.sl+' position :'+operation.tp); 
      x.onReady(() => {
         
         x.Socket.send 
          .tradeTransaction({
            cmd:operation.cmd,//==0?CMD_FIELD.BUY: operation.cmd==1?CMD_FIELD.SELL:operation.cmd==2?CMD_FIELD.BUY_LIMIT:CMD_FIELD.SELL_STOP,                 
            customComment: "test v.0",
            expiration: operation.cmd>1? x.serverTime+ 60000 * 60 * 24 * 365:x.serverTime + 5000,
            offset: operation.offset,
            price:operation.price==0?1: operation.price,
            symbol: operation.symbol,
            tp: operation.tp, 
            sl: operation.sl,
            type: operation.order == 0
                ? TYPE_FIELD.OPEN
                : TYPE_FIELD.MODIFY,
            volume: operation.volume,
            order: operation.order,
          })
          .then(({ order }) => {
           // x.disconnect().then(() => console.log("Disconnected"));
           /*  console.log(
              "Success : \n " +
                (operation.order == 0 ? "new" : "update") +
                " order " +
                order
            );    */
            resolve( {order: order,sucess:true});
          })
          .catch((e) => {
          //  x.disconnect().then(() => console.log("Disconnected"));
            console.error("Failed : ");
            console.error(e);
            e.error=e.message;
            e.sucess=false;
            resolve(e);
          });
      });
    
  
    });
  
   };