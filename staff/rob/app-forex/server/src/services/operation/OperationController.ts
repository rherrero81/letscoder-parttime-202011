  
 import OperationProvider from "server-logic";  
  
 
 export const setOperation  = async (x: any,operation: any) => {
  return await  OperationProvider.registrateOperation(x,operation);
};
      
export const getTradesHistory= async (x: any,time: any) => {
    
  return await OperationProvider.retrieveTradesHistory(x,time);
};
export const getTrades = async (x: any,time: any) => {
 
  return await OperationProvider.retrieveTrades(x,time);
};
 

export const deleteOperation  = async (x: any,operation: any) => {
  
  return await OperationProvider.unregistrateOperation(x,operation);
};


export const getLastNews  = async  (x: any,time: any)  => {
 
  return await OperationProvider.retrieveNews(x,time);
};

export const getTickPrices  = async  (x: any,symbol: any) => {
 
  return await OperationProvider.retrieveTickPrices(x,symbol);
};

export const getServerTime  = async  (x: any) => {
 
  return await OperationProvider.retrieveServerTime(x);
};

export const getAllSymbols  = async   (x: any) => {
 
  return await OperationProvider.retrieveAllSymbols(x);
};

