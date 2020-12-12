 describe('retrieveUser()', () => {


     describe('when wrong parameters', () => {
         let a, b, c, d, e
         const lrand = [null, true, {}, function() {}, new Date, []];
         beforeEach(() => {
             a = lrand.random()
             b = lrand.random()
             c = lrand.random()
             d = lrand.random()
             e = lrand.random()

         })



         it('should fail some no string parameter', () => {

             expect(() => {
                 const user = new UserAttr(a, b, c, d, e);
                 retrieveUser(a)
             }).toThrowError(InvalidOjectError)
         })
     })

     describe('when register user', () => {
         let a, b

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'

             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })

         it('should be ok and return token', async() => {
             const ath = await authenticateUser(a, b);
             var ret = await retrieveUser(ath);
             expect(ret.t).not.toBe('');

         })


     })

     describe('when unregister user', () => {
         let token;
         beforeEach(() => {
             token = "xxxxxxxxxxxxx"
         })

         it('should fail and return empty token', async() => {
             var ret = await retrieveUser(token);
             expect(ret.t.error).toBe('invalid token');
         })
     })


 })