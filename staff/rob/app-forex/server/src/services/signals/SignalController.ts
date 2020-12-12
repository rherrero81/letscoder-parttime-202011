/* import { retrieveSignal, retrieveLast,retrieveSymbol } from "./providers/SignalCageDataProvider"; */
import SignalProvider from "server-logic";  
import { asc_sort,desc_sort  } from "../../utils/UtilsFunc";
 
const fs = require("fs");
const path = require("path");
const test_data1 = require("./calls/ma-avg_1.json");
const test_data2 = require("./calls/ma-avg_2.json");
const test_last = require("./calls/lastest.json");

export const getSymbols = async (search: string) => {
return await SignalProvider.retrieveSymbol(search);
};

export const getSignals = async (q: string,p: string) => {
  /* let res=await getSig(q);
  console.log(JSON.stringify(res)); */
  let res:any;
  console.log(process.env.EXEC_MODE); 
  if (process.env.EXEC_MODE=='1') {res= await SignalProvider.retrieveSignal(q,p);}
  else  res = await test_data2;

  let mov=res.response.oa_summary.indexOf('Buy')!=-1?'B':res.response.oa_summary.indexOf('Sell')!=-1?'S':'N';
 
 
  let sma: any = Object.values(res.response.ma_avg.SMA);
  let ema: any = Object.values(res.response.ma_avg.EMA);
  let op =
    res.response.ma_avg.summary == "Buy"
      ? "B"
      : res.response.ma_avg.summary == "Sell"
      ? "S"
      : "N";
  let positions: any[] = [];
  sma.map((c: any) => positions.push(c));
  ema.map((c: any) => positions.push(c));
  if (mov === "B") {
    positions = positions.sort(asc_sort);
  } else if (mov === "S") {
    positions = positions.sort(desc_sort);
  }
  console.log(res.response.oa_summary);
  return { t: mov, p: positions };
};

export const getLastest = async (r: any) => {
  if (process.env.EXEC_MODE=='1') return await SignalProvider.retrieveLast(r);
  else return await test_last;
};

export const calculateSignal =  async (r: any) => {
  
  let signal:any = await getSignals(r.body.symbol,r.body.period);

/*   let signal={
  t: 'B',
  p: [
    { v: '1.12621', s: 'Buy' },
    { v: '1.141', s: 'Buy' },
    { v: '1.15571', s: 'Buy' },
    { v: '1.15781', s: 'Buy' },
    { v: '1.1721', s: 'Buy' },
    { v: '1.17251', s: 'Buy' },
    { v: '1.17431', s: 'Buy' },
    { v: '1.17491', s: 'Neutral' },
    { v: '1.17491', s: 'Buy' },
    { v: '1.17531', s: 'Neutral' },
    { v: '1.17551', s: 'Neutral' },
    { v: '1.17991', s: 'Sell' }
  ]
};  
  */
  let glast: any = await getLastest(r.body.symbol);
  glast=glast.response[0];
 
  console.log(signal); 
  let sl = 0;
  let tp = 0;

  signal.p.forEach((c: { s: string; v: string; },i: number) => {     
    if (signal.t === "B") {
      if (c.s !== "Buy" && parseFloat(glast.price) > parseFloat(c.v)) {
        sl = parseFloat(c.v);
      } else if (
        tp == 0 &&
        c.s !== "Buy" &&
        parseFloat(glast.price) < parseFloat(c.v)
      ) {
        tp = parseFloat(c.v);
        if (sl == 0 && i - 1>=0) sl = parseFloat(signal.p[i - 1].v);
      }
    }

    if (signal.t === "S") {
      if (c.s !== "Sell" && parseFloat(glast.price) < parseFloat(c.v)) {
        sl = parseFloat(c.v);
      } else if (
        tp == 0 &&
        c.s !== "Sell" &&
        parseFloat(glast.price) > parseFloat(c.v)
      ) {
        tp = parseFloat(c.v);
        if (sl == 0 && i - 1>=0 ) sl = parseFloat(signal.p[i - 1].v);
      }
    }
  });

  let prop =
    signal.t == "S"
      ?  (sl - parseFloat(glast.price)/(parseFloat(glast.price) - tp))
      : (tp - parseFloat(glast.price))/(parseFloat(glast.price) - sl);
  let ret = {
    signal: signal.t,
    price: 1,
    vol: 0.1,
    sl: sl,
    tp: tp,
    current: parseFloat(glast.price),
    prop: prop,
  };
 

   return {cmd:ret.signal=='B'?0:ret.signal=='N'?-1:1,price:ret.current,sl:ret.sl,tp:ret.tp};
};
