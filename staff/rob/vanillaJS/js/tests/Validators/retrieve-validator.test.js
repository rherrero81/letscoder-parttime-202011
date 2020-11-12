function retrieve_validator()

{
    console.log('Test - User getUser User...')
    let res = true;
    try {
        retrieve_user(3, '');
    } catch (error) {
        res = res && (error instanceof NullObjectError);
        console.assert((error instanceof NullObjectError), 'KO Test getUser - Error type : NullObjectError' + error.message)
    }

    try {
        retrieve_user(new User('1', '1', '1', '1'), '');

    } catch (error) {
        res = res && (error instanceof InvalidOjectError);
        console.assert((error instanceof InvalidOjectError), 'KO Test getUser - Error type InvalidOjectError:' + error.message)
    }

    res ? console.log('(OK)Test - getUser Validators') : console.log('(KO)Test - getUser Validators => ')
}