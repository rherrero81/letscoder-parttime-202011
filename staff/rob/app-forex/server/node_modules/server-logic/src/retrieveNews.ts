import XAPI, {TYPE_FIELD} from "xapi-node";
import execFunc from './execFunc';
export default  async (x: XAPI,time: any) => {  
   
    let rets: any;
     
    await execFunc(x, x.Socket.send.getNews,[Date.now()-7,Date.now()-4]).then((s) => {
      
      console.log(JSON.stringify(s));
      rets = s;
    });
    return rets;
  };