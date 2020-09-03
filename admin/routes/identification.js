'use strict';
const express = require('express');
const router = express.Router();
const identification = require('../lib/aws-lambda-identification');
const config = require('config');

router.post('/request', async function (req, res, next) {
    const code = req.body.code;
    const domain = (req.headers["x-forwarded-proto"] || req.protocol) + '://' + req.get('host');
    const isPopup = true;
    const isMobile = false;
    const successReturnUrl = domain + config.get('identification').success;
    const failureReturnUrl = domain + config.get('identification').fail;
    const payload = await identification.encode(isPopup, isMobile, successReturnUrl, failureReturnUrl);

    if (req.session.web.identificationMap == null) {
        req.session.web.identificationMap = {};
    }
    req.session.web.identificationMap[code] = payload.requestId;
    req.session.save();

    res.json({
        encodeData: payload.encodeData
    });
});

router.post('/success', function (req, res, next) {

    const encodedData = req.body.EncodeData;

    res.render('page/identification/success.ejs', {
        encodedData: encodedData,
        layout: 'layouts/base'
    });
});

router.post('/fail', async function (req, res, next) {

    const encodedData = req.body.encodedData;
    const payload = await identification.fail(encodedData);

    res.render('page/identification/fail.ejs', {
        requestId: payload.requestId,
        errorCode: payload.errorCode,
        authType: payload.authType,
        cipherTime: payload.cipherTime,
        layout: 'layouts/base'
    });
});

module.exports = router;
