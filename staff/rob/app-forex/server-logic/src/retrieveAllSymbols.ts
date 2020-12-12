import XAPI, {TYPE_FIELD} from "xapi-node";
import execFunc from './execFunc';
 
export default  async (x: XAPI) => { 
   
    let rets: any;
   
    await execFunc(x, x.Socket.send.getAllSymbols,[]).then((s) => {
      
      console.log(JSON.stringify(s));
      rets = s;
    });
    return rets;
  };