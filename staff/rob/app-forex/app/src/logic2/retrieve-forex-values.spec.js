 describe('retrieveForexValues()', () => {

     describe('when no string parameters', () => {
         let a

         beforeEach(() => {
             a = [true, {}, function() {}, new Date, []].random()

         })

         it('should fail some no string parameter', () => {
             expect(() => retrieveForexValues(a, a)).toThrowError(InvalidOjectError)
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
             expect(() => retrieveForexValues(a, b)).toThrowError(NullObjectError)
         })
     })

     describe('when wrong user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos2'
             c = 'demo'
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000
         })

         it('should fail unregistred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await retrieveForexValues(tok, 'EURUSD');
             expect(ret).toBeNull();
             //expect(() => retrieveForexValues(tok, 'EURUSD')).toThrowError(BadRequest);



         })
     })

     describe('when valid user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'
             c = 'demo'
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000
         })



         it('should return data registred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await retrieveForexValues(tok, 'EURUSD');
             expect(ret.returnData).not.toBeNull();

         })
     })


 })