var privacy = require('../../lib/privacy-utils');
var fs = require('fs');
/*
fs.readFile('email.txt', function(err, data) {
    if(err) {
        throw err;
    }
    else {
        var array = data.toString().split("\n");

        for (i in array) {
            var email = array[i].toString();
            console.log(email)
            if (i<45) {
                var email2 = privacy.encode(email)
                console.log(email2);
            }
        }
    }
});
*/

fs.readFile('passwd.txt', function(err, data) {
    if(err) {
        throw err;
    }
    else {
        var array = data.toString().split("\n");
        for (i in array) {
            var pw = array[i].toString();
            console.log(pw)
            if (i<45) {
                var pw2 = privacy.password(pw)
                console.log(pw2);
            }
        }
    }
});

