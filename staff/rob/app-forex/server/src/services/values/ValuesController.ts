import { getVal,getSymb ,getHystTad,getTok} from "./providers/ValuesDataProvider";


export const getValues  = async (q: any,r:any) => {
 
  return await getVal(q,r);
};

export const getSymbols = async  (q: any,r:any) => { 
  return await getSymb(q,r);
}


export const getToken = async  (q: any,r:any)  => {
 
  return await getTok(q);
}

export const getHystTrade = async  (q: any,r:any)  => {
 
  return await getHystTad(q,r);
}



 