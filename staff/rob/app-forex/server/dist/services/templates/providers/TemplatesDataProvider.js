"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemp = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fetch = require("node-fetch");
var fs = require("fs");
dotenv_1.default.config();
var curl = require("url");
const getTemp = (query, baseurl) => __awaiter(void 0, void 0, void 0, function* () {
    var currentPath = '';
    try {
        currentPath = process.cwd();
        let rel = currentPath + `\\src\\services\\templates\\templates\\${query}.html`;
        console.log(rel);
        let res = fs.readFileSync(rel);
        return res;
    }
    catch (error) {
        return error.message + ' > currentPath: ' + currentPath;
    }
});
exports.getTemp = getTemp;
//# sourceMappingURL=TemplatesDataProvider.js.map