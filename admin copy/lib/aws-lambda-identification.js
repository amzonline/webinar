var AWS = require('aws-sdk');
var config = require('config');

let request = function (functionName, requestType, request) {
    return new Promise(function (resolve, reject) {
        new AWS.Lambda(config.get('aws')).invoke({
            FunctionName: functionName,
            InvocationType: 'RequestResponse',
            Payload: JSON.stringify({
                'requestType': requestType,
                'request': request
            })
        }, function (error, data) {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(data.Payload));
            }
        });
    });
};

export let encode = function (isPopup, isMobile, successReturnUrl, failureReturnUrl) {
    return request('Identification', 'ENCODE', {
        'isPopup': isPopup,
        'isMobile': isMobile,
        'successReturnUrl': successReturnUrl,
        'failureReturnUrl': failureReturnUrl
    });
};

export let success = function (encodedData) {
    return request('Identification', 'SUCCESS', {
        'encodedData': encodedData
    });
};

export let fail = function (encodedData) {
    return request('Identification', 'FAIL', {
        'encodedData': encodedData
    });
};


