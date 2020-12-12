import XAPI, {TYPE_FIELD} from "xapi-node";
export default  async (x: any,time: any) => {  
  
  
    let rets: any;
  
    return new Promise(async (resolve)=>{ 
 
    let ss:any; 
      try {
       
        ss=await x.Socket.send.getTradesHistory(time.startTime,time.endTime);
  
     /*    let s=await x.Socket.send.getTrades(false); 
        ss.returnData=ss.returnData.filter((c:any)=> c.symbol==req.body.symbol || req.body.symbol=='' );
   */    /*   await x.Socket.connect();
        await x.Socket.login(); */
        //await x.disconnect();
  /*       x = new XAPI({
          accountId: x.accountId,
          password: 'Vamosvamos1',
          type: 'demo'
        }); */
  /*       await x.connect();
        
        console.log(x.isConnectionReady);
        console.log(x.isReady); */
        //  s.returnData=s.returnData.filter((c:any)=> c.symbol==req.body.symbol || req.body.symbol=='' );
      //  console.log(s.returnData.length);
     //   ss.returnData.push(... s.returnData) ;
    //    console.log(s.returnData.length); 
      } catch (error) {
        console.log(error); 
      }
    
      resolve(ss);
  /*     x.Socket.send.getTradesHistory(req.body.startTime,req.body.endTime).then((s) => { 
          s.returnData=s.returnData.filter(c=> c.symbol==req.body.symbol || req.body.symbol=='' );
          await x.disconnect();
          await x.connect();      
          x.Socket.send.getTrades(false).then((ss) => { 
            ss.returnData=ss.returnData.filter(c=> c.symbol==req.body.symbol || req.body.symbol=='' );
            s.returnData.push(... ss.returnData) ;
            resolve(s);
          }).catch((e)=> {    
              console.log(e);
              resolve([]);   
            }); 
          
        }).catch((e)=> {    
            console.log(e);
            resolve([]);   
          });  */
          
    });
  
    
  };
  