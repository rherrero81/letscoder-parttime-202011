import request from "request-promise";
export default async (search: string) => {
    const key = process.env.SIGNAL_KEY; 
    const url = `https://fcsapi.com/api-v3/forex/search?s=${search}&access_key=${key}`; 
    const response = await request(url);
    return JSON.parse(response);
  };
  