 describe('authenticate_user()', () => {

     describe('when no string parameters', () => {
         let a, b

         beforeEach(() => {
             a = [random().toString(), true, {}, function() {}, new Date, []].random()
             b = [random().toString(), true, {}, function() {}, new Date, []].random()

         })

         it('should fail some no string parameter', () => {
             expect(() => authenticateUser(a, b)).toThrowError(InvalidOjectError)
         })
     })

     describe('when null  parameters', () => {
         let a, b, c

         beforeEach(() => {
             a = null,
                 b = null

         })

         it('should fail on some null parameter', () => {
             expect(() => authenticateUser(a, b)).toThrowError(NullObjectError)
         })
     })

     describe('when wrong user  ', () => {
         let a, b

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos2'

             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })

         it('should fail unregistred username or password', async() => {
             const ret = await authenticateUser(a, b);
             expect(ret).toBeNull();

         })
     })

     describe('when valid user  ', () => {
         let a, b

         beforeEach(() => {
             a = '11544433'
             b = 'Vamosvamos1'

             jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
         })

         it('should return data registred username or password', async() => {
             var ret = await authenticateUser(a, b);
             expect(ret).not.toBe('')

         })
     })


 })