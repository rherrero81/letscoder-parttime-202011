
import request from "request-promise";
 
export default async (symbol: string) => {

 
    const key = process.env.SIGNAL_KEY;
    const url = `https://fcsapi.com/api-v2/forex/latest?symbol=${symbol}&period=1d&access_key=${key}`; 
    const response = await request(url);
    return JSON.parse(response);
  };
  