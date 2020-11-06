async function remove_user_test() {
    const user = new UserAttr("1", "1", "1", "1", "r@e.es");

    const usera = new User(user.username, user.password);
    //
    console.log("Test - Delete User...");

    const r7 = await remove_user(usera);
    const r8 = await auth_user(usera);

    r8 === "" ?
        console.log("(OK)Test - Delete User > " + user.username) :
        console.assert(!r8, "(KO) Test user deleted fails");
}