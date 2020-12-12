 describe('registrateForexOperation()', () => {

     describe('when no string parameters', () => {
         let a

         beforeEach(() => {
             a = [true, {}, function() {}, new Date, []].random()

         })

         it('should fail some no string parameter', () => {
             expect(() => registrateForexOperation(a)).toThrowError(InvalidOjectError)
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
             expect(() => registrateForexOperation(a, b, c)).toThrowError(NullObjectError)
         })
     })

     describe('when wrong user  ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos2'
             c = 'demo'
             operation = new Operation("BITCOIN", 0, 0, 10679, 10938, 10579, 1, 0.1, -1)
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })

         it('should fail unregistred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             //var ret = await registrateForexOperation(tok, operation);
             // expect(ret).toBeUndefined();
             expect(() => registrateForexOperation(tok, operation)).toThrowError(BadOperation);

         })
     })

     describe('when valid user no limits ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'
             c = 'demo'
             operation = new Operation("EURUSD", 0, 0, 1, 0, 0, 0, 0.1, 0)
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

         })

         it('should return data registred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await registrateForexOperation(tok, operation);
             expect(ret.order).not.toBeNull();

         })
     })

     describe('when valid user with limits ', () => {
         let a, b, c

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'
             c = 'demo'
             operation = new Operation("EURUSD", 0, 0, 10, 0.1, 4, 0, 0.1, 0)
             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

         })

         it('should return data registred username or password', async() => {
             var tok = await retrieveForexToken(a, b, c);
             var ret = await registrateForexOperation(tok, operation);
             expect(ret.order).not.toBeNull();

         })
     })

 })