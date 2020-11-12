function remove_validator()

{
    console.log('Test - User deleteUser User...')
    let res = true;
    try {
        remove_user(3);
    } catch (error) {
        res = res && (error instanceof NullObjectError);
        console.assert((error instanceof NullObjectError), 'KO Test deleteUser - Error type : NullObjectError' + error.message)
    }

    try {
        remove_user(new UserAttr('1', '1', '1', '1', 'r@e.es'));

    } catch (error) {
        res = res && (error instanceof InvalidOjectError);
        console.assert((error instanceof InvalidOjectError), 'KO Test deleteUser - Error type InvalidOjectError:' + error.message)
    }

    res ? console.log('(OK)Test - deleteUser Validators') : console.log('(KO)Test - deleteUser Validators => ')

    //
}