 
import logic from "server-logic";
 

export const setConfig  = async (q: any,r:any) => {
  
  q.app.locals.configurations.set( r.locals.x.account.accountId,q.body.config); 
  return  q.app.locals.configurations.get( r.locals.x.account.accountId); 
  
};

export const getValues  = async (x:any,symbol:string,period:number) => {
 
  return await logic.getValue(x,symbol,period);
};

export const getSymbols = async  (x:any) => { 
  return await logic.retrieveAllSymbols(x);
}


export const getToken = async  (username:string,password:string,accountType:string,tokenCache:any)  => {

  return await logic.getToken(username,password,accountType,tokenCache);
}

export const getHystTrade = async  (x: any,startTime:any,endTime:any)  => {
 
  return await logic.getHistoryTrade(x,startTime,endTime);
}

 

 