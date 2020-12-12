 describe('retrieveForexSymbols()', () => {

     describe('when no string parameters', () => {
         let a

         beforeEach(() => {
             a = [true, {}, function() {}, new Date, []].random()

         })

         it('should fail some no string parameter', () => {
             expect(() => retrieveForexSymbols(a)).toThrowError(InvalidOjectError)
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
             expect(() => retrieveForexSymbols(a, b, c)).toThrowError(NullObjectError)
         })
     })

     describe('when wrong user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos2'
             c = 'demo'
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })

         it('should fail unregistred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await retrieveForexSymbols(tok);
             expect(ret).toBeNull();
             //expect(() => retrieveForexSymbols(tok)).toThrowError(BadRequest);

         })
     })

     describe('when valid user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'
             c = 'demo'
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })



         it('should return data registred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await retrieveForexSymbols(tok);
             expect(ret.returnData).not.toBeNull();

         })
     })


 })