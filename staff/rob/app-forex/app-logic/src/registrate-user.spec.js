 describe('authenticate_user()', () => {


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
                 registrateUser(user)
             }).toThrowError(InvalidOjectError)
         })
     })

     describe('when register user', () => {
         let user;
         beforeEach(() => {
             user = new UserAttr('testJasmineUser', '111', '1', '2', 'a@e.es')
         })

         it('should fail some no string parameter', async() => {
             var ret = await registrateUser(user);
             expect(ret.t).not.toBeNull();
         })
     })


 })