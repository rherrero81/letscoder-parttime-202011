async function update_user_test() {
    ///
    console.log("Test - Update User...");

    const user = new UserAttr("1", "1", "1", "1", "r@e.es");
    const usera = new User(user.username, user.password);

    const r4 = await registrate_user(user);
    const r5 = await auth_user(usera);
    const r6 = await retrieve_user(usera, r5);

    r6.t.email == "r@e.es" ?
        console.log("(OK) Test - Update User> " + user.username) :
        console.assert(r6.t.email == "2", "(KO) Test Update fails");
}