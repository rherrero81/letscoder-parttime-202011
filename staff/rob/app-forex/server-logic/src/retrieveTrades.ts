import XAPI, {TYPE_FIELD} from "xapi-node";

export default  async (x: any,operation: any) => {  
  
   
    let rets: any;
      
    return new Promise((resolve)=>{  
    x.Socket.send.getTrades(false).then((s:any) => { 
        s.returnData=s.returnData.filter((c:any)=> c.symbol==operation.symbol || operation.symbol=='' );
        resolve(s);
      }).catch((e:any)=> {    
          console.log(e);
          resolve([]);   
        }); 
        
  });
  }