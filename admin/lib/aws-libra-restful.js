const request = require('request');

var config = require('config');
        const util = require('util');

        module.exports = {
            'createAccount': function () {
        return new Promise(function (resolve, reject) {

        });
    },

    'mint': function (userNo, account) {
        return new Promise(function (resolve, reject) {

        });
    },

    'getBalance': function (userNo, account) {

        return new Promise(function (resolve, reject) {
            var options = {
                "method": "get",
                "url": "http://13.209.35.50:8080/account/state?address=" + account.substr(2),
                "headers": {
                    "Accept": "*/*"
                }
            };

            request.get(options, function (error, data, body) {
                if (error) {
                    reject(error);
                } else {
                    try {
                        console.log(JSON.parse(body))
                        resolve(JSON.parse(body));
                    } catch(e) {
                        resolve(body);
                    }
        }
    })

});
},

'sendTransfer': function (privKey, pubKey, to, amount) {
    return new Promise(function (resolve, reject) {
        var bodystr = "payeeAddress="+to.substr(2)+"&publicKeyStr=" +pubKey + "&privateKeyStr=" +privKey + "&amount=" + amount;
        var options = {
            "method": "post",
            "url": "http://13.209.35.50:8080/account/transfer?" + bodystr,
            "headers": {
                "User-Agent": "request",
                "Accept": "*/*",
                "Content-Type": "application/json"
            }
        };

        request.post(options, function (error, data, body) {
            if (error) {
                reject(error);
            } else {
                try{
                    console.log(JSON.parse(body))
                    resolve(JSON.parse(body));
                } catch(e) {
                    resolve(body);
                }

            }
        })

    });


    }
};




