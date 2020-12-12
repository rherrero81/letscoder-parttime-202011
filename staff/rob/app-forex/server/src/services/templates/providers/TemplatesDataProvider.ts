import request from "request-promise";
import dotenv from "dotenv";
const fetch = require("node-fetch");
var fs = require("fs");
dotenv.config();
var curl = require("url");
export const getTemp = async (query: string, baseurl: string) => {
  var currentPath='';
  try {
    currentPath = process.cwd();
    let rel =
      currentPath + `\\src\\services\\templates\\templates\\${query}.html`;
      console.log(rel);
    let res = fs.readFileSync(rel);
    return res; 
  } catch (error) {
    return error.message+' > currentPath: '+currentPath;
  }


};
