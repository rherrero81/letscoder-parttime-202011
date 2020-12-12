 describe('unregistrateForexOperation()', () => {

     describe('when no string parameters', () => {
         let a

         beforeEach(() => {
             a = [true, {}, function() {}, new Date, []].random()

         })

         it('should fail some no string parameter', () => {
             expect(() => unregistrateForexOperation(a)).toThrowError(InvalidOjectError)
         })
     })

     describe('when null  parameters', () => {
         let a, b, c

         beforeEach(() => {
             a = null,
                 b = null,
                 c = null
         })

         it('should fail on some null parameter', () => {
             expect(() => unregistrateForexOperation(a, b, c)).toThrowError(NullObjectError)
         })
     })

     /*      describe('when wrong user  ', () => {
              let a, b, c

              beforeEach(() => {
                  a = '11544433'
                  b = 'Vamosvamos2'
                  c = 'demo'
                  operation = new Operation("EURUSD", "B", 0, 10, 1.18494, 1.18905, 0, 0.1, 0)
                  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
              })

              it('should fail unregistred username or password', async() => {
                  var tok = await retrieveForexToken(a, b, c);
                  var ret = await unregistrateForexOperation(tok, operation);
                  expect(ret).toBeNull();


              })
          }) */

     describe('when valid user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'
             c = 'demo'

             operation = new Operation("BITCOINCASH", 0, 0, 1, 0, 0, 0, 1, 0)
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })



         it('should return data registred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await registrateForexOperation(tok, operation);
             operation.order = ret.order;
             var end = new Date();
             var start = new Date(end);
             start.setDate(end.getDate() - 8);
             var ret2 = await retrieveForexTrade(tok, "BITCOINCASH", start, end);
             operation.order = ret2.returnData[ret2.returnData.length - 1].order;
             var ret3 = await unregistrateForexOperation(tok, operation);
             expect(ret3.order).not.toBeNull();

         })
     })


 })