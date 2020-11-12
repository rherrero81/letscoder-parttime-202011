   function auth_validator()

   {
       console.log('Test - authUser Validators ...')
       let res = true;
       try {
           auth_user(3);
       } catch (error) {
           res = res && (error instanceof NullObjectError);
           console.assert((error instanceof NullObjectError), 'KO Test authUser - Error type : NullObjectError' + error.message)
       }

       try {
           auth_user(new UserAttr('1', '1', '1', '1', 're@es'));

       } catch (error) {
           res = res && (error instanceof InvalidOjectError);
           console.assert((error instanceof InvalidOjectError), 'KO Test authUser - Error type InvalidOjectError:' + error.message)
       }

       try {
           registrate_user(new UserAttr("2", "2", "1", "1", "re.es"));


       } catch (error) {
           res = res && (error instanceof InvalidOjectError);
           console.assert((error instanceof InvalidOjectError), 'KO Test authUser - Error type InvalidOjectError :' + error.message)
       }



       res ? console.log('(OK)Test - authUser Validators') : console.log('(KO)Test - authUser Validators => ')

       //
   }