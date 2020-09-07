var privacy = require('../lib/privacy-utils');
var fs = require('fs');

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
                var email2 = privacy.decode(email)
                console.log(email2);
            }
        }
    }
});

/*
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
*/

// 배치 처리 수동 실행
//const bat = require('./routes/web/batch');
//bat.checkCorpLimit();



/*
const ses = require('./lib/aws-ses-sendemail');
ses.sendEmail(["cs@webinar.io"])
const bat = require('./routes/batch');
bat.checkCorpLimit();
return;
var mysql      = require('mysql');
var config = require('config');
var connection = mysql.createConnection(config.get('db'));
connection.connect();
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
connection.end();
const query = require('./lib/Query');
var orderNo =1;
const promise1 = query.findOne('SELECT * FROM TB_ORDER WHERE orderNo = :orderNo', {'orderNo': orderNo});
Promise.all([promise1])
.then(function (values) {
    console.log("1");
    console.log(values);
    const promise2 = coinone.limit_buy();
})
.catch(function (e) {
    next({
        'status': 400,
        'message': e
    });
});
*/
// 1. AWS lambda 호출 테스트
/*
const aws = require('aws-sdk');
const lambda = new aws.Lambda({
  region: 'ap-northeast-2',
  accessKeyId: 'AKIAJZIZRDYECWSD3DBQ',
  secretAccessKey: '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'
});
const event = { id: "1", name:"Luna"};
lambda.invoke({
  FunctionName: 'exchange',
  Payload: JSON.stringify(event, null, 2) // pass params
}, function(error, data) {
  if (error) {
    console.info(error);
  } else {
    console.info(data);
  }
});
*/

// 2. Coinone 'Recent Complete Orders' API 테스트
/*
var crypto = require('crypto');
var request = require('request');
var ACCESS_TOKEN = '';
var SECRET_KEY = '';
var url = 'https://api.coinone.co.kr/ticker?currency=eth';
var payload = {
  "access_token": ACCESS_TOKEN,
  "order_id": "32FF744B-D501-423A-8BA1-05BB6BE7814A",
  "currency": "btc",
  "nonce": Date.now()
};
payload = new Buffer(JSON.stringify(payload)).toString('base64');
var signature = crypto
.createHmac("sha512", SECRET_KEY.toUpperCase())
.update(payload)
.digest('hex');
var headers = {
  'content-type':'application/json',
  'X-COINONE-PAYLOAD': payload,
  'X-COINONE-SIGNATURE': signature
};
var options = {
  url: url,
  headers: headers,
  body: payload
};
request.get(options,
    function(error, response, body) {
      console.log(JSON.parse(body).last);
    });
*/

// 3. 노드 스케쥴러 테스트
/*
var schedule = require('node-schedule');
var j = schedule.scheduleJob('* * * * * *', function(){
    console.log('The world is going to end today.');
});
*/