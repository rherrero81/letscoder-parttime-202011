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
 
export default  async (username:string,password:string,accountType:string,tokenCache:any): Promise<any>=> {
  let r = "-";
  let x = new XAPI({
    accountId: username,
    password: password,
    type: accountType, // or demo
  });
 
 tokenCache.keys().forEach((key:string) => {
  
  if( tokenCache.get(key))
  if( tokenCache.get(key).accountId==x.accountId)
  if( tokenCache.get(key).accountType==x.accountType)
  {
    //console.log('Remove cache element'+key);
     tokenCache.del(key);
  } 
});
  

 
    await x.connect();
    
    let s: Promise<any> = new Promise((resolve, reject) => {
      
            x.onReject((e)=>
            {     
                
              console.log('reject forex token' );       
              console.log(e)
              //x.Socket.closeConnection(); 
              resolve({ error: e.reason.explain });
            
            });
            x.onReady(async () => {         
           //const tok= base64url(crypto.randomBytes(120));
         try {
          var jwt = require('jsonwebtoken');
          var tok = jwt.sign({
           accountId:  username,
           password:  password,
           type:  accountType, // or demo
         }, 'shhhhh');       
          tokenCache.set(tok, x); 
         } catch (error) {
          console.log(error);   
         }
              
                resolve(tok);
            }); 
          

   
    });
    
    return s; 
  }