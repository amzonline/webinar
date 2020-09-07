const crypto = require('crypto');
const saltkey = '!@SDFGHcfggs88909802jkj6ysma!@20@#$%7*(5543*&^545';

module.exports = {
    'encode': function (str) {
        if (str.length == 0) {
            return str;
        }
        const cipher = crypto.createCipher('aes-256-cbc', saltkey);
        let result = cipher.update(str, 'utf8', 'base64');
        result += cipher.final('base64');
        return result;
    },
    'decode': function (str) {
        if (str.length == 0) {
            return str;
        }
        const decipher = crypto.createDecipher('aes-256-cbc', saltkey);
        let result = decipher.update(str, 'base64', 'utf8');
        result += decipher.final('utf8');
        return result;
    },
    'password': function (str) {
        return new Promise(function (resolve, reject) {
            if (str.length == 0) {
                return resolve(str);
            }
            crypto.pbkdf2(str, 'sdfsjsdlksdfjklsdfjlkdsflkjfdskljdfskljl', 3145, 64, 'sha512', (err, key) => {
                if (err) {
                    reject(err);
                } else {
                    //console.log('password enc = ' + key.toString('base64'));
                    resolve(key.toString('base64'));
                }
            });
        });
    }
};
