async function registrate_user_test() {
    console.log("Test - Insert User.....");
    const user = new UserAttr("1", "1", "1", "1", "r@e.es");
    const usera = new User(user.username, user.password);
    const r1 = await registrate_user(user);
    const r2 = await auth_user(usera);
    const r3 = await retrieve_user(usera, r2);

    r3.t.username == "1" ?
        console.log("(OK) Test - Insert User> " + user.username) :
        console.assert(r3.t.username == "1", "(KO) Test Insert fails");
}