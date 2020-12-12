import request from "request-promise";
const sleep = require('util').promisify(setTimeout);
export default async (symbol: string,period: string) => {
    const key = process.env.SIGNAL_KEY;
    const url = `https://fcsapi.com/api-v2/forex/ma_avg?symbol=${symbol}&period=${period}&access_key=${key}`;
  console.log(url); 
    const response = await request(url);
    return JSON.parse(response);
  };
  