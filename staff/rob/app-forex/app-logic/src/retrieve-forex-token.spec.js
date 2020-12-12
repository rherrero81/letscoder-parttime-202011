 describe('retrieveForexToken()', () => {
     describe('when no string parameters', () => {
         let a, b, c

         beforeEach(() => {
             a = [random().toString(), true, {}, function() {}, new Date, []].random()
             b = [random().toString(), true, {}, function() {}, new Date, []].random()
             c = [random().toString(), true, {}, function() {}, new Date, []].random()
         })

         it('should fail some no string parameter', () => {
             expect(() => retrieveForexToken(a, b, c)).toThrowError(InvalidOjectError)
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
             expect(() => retrieveForexToken(a, b, c)).toThrowError(NullObjectError)
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
             const ret = await retrieveForexToken(a, b, c);
             expect(ret).toEqual('')

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
             var ret = await retrieveForexToken(a, b, c);
             expect(ret).not.toEqual('')

         })
     })

 })