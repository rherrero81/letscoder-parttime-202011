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
exports.default = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let x = res.locals.x;
    let rets;
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        /*     await x.Socket.closeConnection();
            await x.Socket.logout(); */
        //  await x.Socket.closeConnection();
        let ss;
        try {
            ss = yield x.Socket.send.getTradesHistory(req.body.startTime, req.body.endTime);
            let s = yield x.Socket.send.getTrades(false);
            ss.returnData = ss.returnData.filter((c) => c.symbol == req.body.symbol || req.body.symbol == '');
            /*   await x.Socket.connect();
              await x.Socket.login(); */
            //await x.disconnect();
            /*       x = new XAPI({
                    accountId: x.accountId,
                    password: 'Vamosvamos1',
                    type: 'demo'
                  }); */
            /*       await x.connect();
                  
                  console.log(x.isConnectionReady);
                  console.log(x.isReady); */
            s.returnData = s.returnData.filter((c) => c.symbol == req.body.symbol || req.body.symbol == '');
            //  console.log(s.returnData.length);
            ss.returnData.push(...s.returnData);
            //    console.log(s.returnData.length); 
        }
        catch (error) {
            console.log(error);
        }
        resolve(ss);
        /*     x.Socket.send.getTradesHistory(req.body.startTime,req.body.endTime).then((s) => {
                s.returnData=s.returnData.filter(c=> c.symbol==req.body.symbol || req.body.symbol=='' );
                await x.disconnect();
                await x.connect();
                x.Socket.send.getTrades(false).then((ss) => {
                  ss.returnData=ss.returnData.filter(c=> c.symbol==req.body.symbol || req.body.symbol=='' );
                  s.returnData.push(... ss.returnData) ;
                  resolve(s);
                }).catch((e)=> {
                    console.log(e);
                    resolve([]);
                  });
                
              }).catch((e)=> {
                  console.log(e);
                  resolve([]);
                });  */
    }));
});
//# sourceMappingURL=retrieveTradesHistory.js.map