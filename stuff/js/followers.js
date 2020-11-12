var aitorFollowers = ['Alex', 'Arlette', 'My', 'Antonio', 'Jr'];
var manuFollowers = ['Rob', 'Kriss', 'Arlette', 'Steve'];

for (var i = 0; i < aitorFollowers.length; i++) {
    for (var j = 0; j < manuFollowers.length; j++) {
        if (aitorFollowers[i] === manuFollowers[j]) {
            console.log('coincidencia! ' + manuFollowers[j])
        }
    }
}


