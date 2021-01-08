import XAPI, {TYPE_FIELD} from "xapi-node";

export default async (x: XAPI,func:any,args:any): Promise<any> =>{
    return new Promise((resolve, reject) => {
    
          func(...args).then((orders:any) => {
     
         // x.disconnect().then(() => console.log("Disconnected"));
     
          resolve(orders);
        }).catch((e:any)=>{ 
        
          console.log("execFunc catch: ");
          console.log(e);
          
          resolve([]);});
      });
      
    }