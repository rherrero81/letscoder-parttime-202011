 describe('searchVehicles()', () => {


     describe('when wrong parameters', () => {
         let a
         const lrand = [true, {}, function() {}, new Date, []];
         beforeEach(() => {
             a = lrand.random()
         })

         it('should fail some no string parameter', async() => {

             expect(() => searchVehicles(a)).toThrowError(InvalidOjectError)
         })
     })

     describe('when call argument return data', () => {
         let a;
         beforeEach(() => {
             a = 'green'
         })

         it('should ok', async() => {
             var ret = await searchVehicles(a);
             expect(ret.length).toBeGreaterThan(0);
         })
     })


     describe('when call argument no return data', () => {
         let a;
         beforeEach(() => {
             a = 'undoing'
         })

         it('should ok', async() => {
             var ret = await searchVehicles(a);
             expect(ret).not.toHaveSize();
         })
     })


 })