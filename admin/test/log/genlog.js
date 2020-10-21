var fs = require('fs');
var AWS = require('aws-sdk');

const count = 1000000;  // change log count !!!
const fn='./log_sample.txt';
fs.open(fn,'w',function(err,fd){
    if (err) throw err; console.log('file open complete');
});

function generateIPAddress(min, max) {

    var sb = null;

    var b1 = Math.random() * (max - min) + min;
    var b2 = Math.random() * (max - min) + min;
    var b3 = Math.random() * (max - min) + min;
    var b4 = Math.random() * (max - min) + min;

    //Now the IP is b1.b2.b3.b4
    sb = Math.round(b1) + "." + Math.round(b2) + "." + Math.round(b3) + "." + Math.round(b4)
    //console.log('IP address : ' + sb);

    return sb.toString();
}

function genLog() {
    try {

        var userID = Math.random() * (9999999 - 1000000) + 1000000;
        var ipAddress = generateIPAddress(0, 255);
        var eventID = Math.random() * (3 - 1) + 1;
        var tag = 'ACCESS';
        var level = 'info';

        let date_ob = new Date();
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        //let date = ("0" + date_ob.getDate()).slice(-2);
        let date = ("0" + Math.random() * (8 - 8) + 8).slice(-2);
        let year = date_ob.getFullYear();
        //let hours = ("0" + date_ob.getHours()).slice(-2);
        let hours = ("0" + Math.round(Math.random() * (11 - 9) + 9)).slice(-2);
        //let minutes = ("0" + date_ob.getMinutes()).slice(-2);
        let minutes = ("0" + Math.round(Math.random() * (59 - 1) + 1)).slice(-2);
        //let seconds = ("0" + date_ob.getSeconds()).slice(-2);
        let seconds = ("0" + Math.round(Math.random() * (59 - 1) + 1)).slice(-2);

        tm= year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

        // write one row
        var data = '';
        data = Math.round(userID) + ',' + ipAddress + ',' ;
        data += Math.round(eventID) + ',' + tag + ',' + level + ',' + tm + '\n';

        //list.push(log)
        fs.appendFile(fn, data, 'utf8', function(error){

        });

    } catch (err) {
        console.log(err);
        return err;
    }
}

for (var i=0;i<count;i++) {
    genLog();

    if(i%100==0) {
        console.log(i);
    }
}

