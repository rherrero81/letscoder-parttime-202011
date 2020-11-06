   /////
   function registrate_validator()

   {


       console.log('Test - User insertUser User...')
       let res = true;
       try {
           registrate_user(3);
       } catch (error) {
           res = res && (error instanceof NullObjectError);
           console.assert((error instanceof NullObjectError), 'KO Test insertUser - Error type : NullObjectError' + error.message)
       }

       try {
           registrate_user(new User('1', '1'));

       } catch (error) {
           res = res && (error instanceof InvalidOjectError);
           console.assert((error instanceof InvalidOjectError), 'KO Test insertUser - Error type InvalidOjectError:' + error.message)
       }

       res ? console.log('(OK)Test - insertUser Validators') : console.log('(KO)Test - insertUser Validators => ')

   }