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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTemplate = void 0;
const TemplatesDataProvider_1 = require("./providers/TemplatesDataProvider");
const getTemplate = (q, u) => __awaiter(void 0, void 0, void 0, function* () {
    /*  if (q.length < 3) {
       return {
         type: "FeatureCollection",
         features: []
       };
     } */
    return yield TemplatesDataProvider_1.getTemp(q, u);
});
exports.getTemplate = getTemplate;
//# sourceMappingURL=TemplatesController.js.map