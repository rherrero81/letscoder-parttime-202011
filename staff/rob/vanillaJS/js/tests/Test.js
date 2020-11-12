 
//Testing Validators (async is ok)
 
auth_validator();
registrate_validator();
remove_validator();
retrieve_validator();

 
//Testing Login features (async is not ok)
(async() => {
    //'use strict'
    // Use same user to registrate,update and remove have to be sync flow
    await registrate_user_test();
    await update_user_test();
    await remove_user_test();

})()

 





//nsole.assert( condition
// (x instanceOf y)// class.prototype (acesso estático)//Throw new TypeError()
//try catch
//TODO:Helper byt type  isvalid ateisX