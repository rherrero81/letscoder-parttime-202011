 describe('removeUser()', () => {
     describe('on invalid parameters', () => {

         describe('when wrong parameters', () => {
             let a, b, c, d, e
             const lrand = [null, true, {}, function() {}, new Date, []];
             beforeEach(() => {
                 a = lrand.random()


             })



             it('should fail some no string parameter', async() => {

                 expect(() => {
                     const user = new UserAttr(a, a, a, a, a);
                     removeUser(user)
                 }).toThrowError(InvalidOjectError)
             })
         })

         describe('when register user unregistred', () => {
             let user;
             beforeEach(() => {
                 user = new UserAttr('testJasmineUserunregistered', '111', '1', '2', 'a@e.es')
             })

             it('should fail some no string parameter', async() => {
                 var ret = await removeUser(user);
                 expect(ret.e).toBe('No user to remove.');
             })
         })

     })
 })