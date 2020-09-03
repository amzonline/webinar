'use strict';

var aws = require('aws-sdk');
var config = require('config');
var ses = new aws.SES(config.get('aws-ses'));

//const configuration_set = "ConfigSet";
const sender = "cs@mail.webinar.io"
const charset = "UTF-8";
const subject = "[AWS Webinar] 거래소 출금 완료 알림";
const body_text = "Amazon SES Test (SDK for JavaScript in Node.js)\r\n"
    + "This email was sent with Amazon SES using the "
    + "AWS SDK for JavaScript in Node.js.";

// The HTML body of the email.
const body_html = `<html>
<head></head>
<body>
  <h1>Amazon SES Test (SDK for JavaScript in Node.js)</h1>
  <p>This email was sent with
    <a href='https://aws.amazon.com/ses/'>Amazon SES</a> using the
    <a href='https://aws.amazon.com/sdk-for-node-js/'>
      AWS SDK for JavaScript in Node.js</a>.</p>
</body>
</html>`;



exports.sendEmail = function(recipient) {
    var params = {
        Source: sender,
        Destination: {
            ToAddresses:
                recipient
            ,
        },
        Message: {
            Subject: {
                Data: subject,
                Charset: charset
            },
            Body: {
                Text: {
                    Data: body_text,
                    Charset: charset
                },
                Html: {
                    Data: body_html,
                    Charset: charset
                }
            }
        },
        //ConfigurationSetName: configuration_set
    };

    //Try to send the email.
    ses.sendEmail(params, function(err, data) {
        // If something goes wrong, print an error message.
        if(err) {
            console.log(err.message);
            return err;
        } else {
            console.log("Email sent! Message ID: ", data.MessageId);
            return data;
        }
    });
}





