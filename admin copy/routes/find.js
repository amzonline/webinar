'use strict';
const express = require('express');
const router = express.Router();
const query = require('../lib/Query');
const identification = require('../lib/aws-lambda-identification');
const util = require('util');
const privacy = require('../lib/privacy-utils');
const verify = require('../lib/verify');

router.post('/id/result', async function (req, res, next) {

    const code = 'findId';
    const identificationData = req.body.identificationData;
    const payload = await identification.success(identificationData);

    const requestId = payload.requestId;
    const di = payload.di;

    if (req.session.web.identificationMap == null || requestId != req.session.web.identificationMap[code]) {
        return next({
            status: 400,
            message: '본인인증 정보가 잘못 되었습니다.'
        });
    }

    req.session.web.identificationMap[code] = null;
    req.session.save();

    const user = await query.findOne('SELECT email FROM TB_USER WHERE di = :di', {
        'di': privacy.encode(di)
    });

    if (!user) {
        res.status(400).json({
            error: '머클라인 아이디를 찾을 수 없습니다.'
        });
        return;
    }

    res.json({
        email: privacy.decode(user.email)
    });
});

router.get('/password', async function (req, res, next) {
    res.render('page/member/find/password/index.ejs');
});

router.post('/password/validate', async function (req, res, next) {

    const password = req.body.password;
    const ret = await verify.verifyPassword(password);
    if (ret) {
        res.status(400).json(ret);
        return;
    }

    res.json({});
});

router.post('/password/reset', async function (req, res, next) {

    const code = 'resetPassword';
    const password = req.body.password;
    const identificationData = req.body.identificationData;

    const payload = await identification.success(identificationData);

    const requestId = payload.requestId;
    const di = payload.di;

    if (req.session.web.identificationMap == null || requestId != req.session.web.identificationMap[code]) {
        return next({
            status: 400,
            message: '본인인증 정보가 잘못 되었습니다.'
        });
    }

    req.session.web.identificationMap[code] = null;
    req.session.save();

    const user = await query.findOne('SELECT userNo FROM TB_USER WHERE di = :di', {
        'di': privacy.encode(di)
    });

    if (!user) {
        res.status(400).json({
            error: '머클라인 아이디를 찾을 수 없습니다.'
        });
        return;
    }

    const encodePassword = await privacy.password(password);
    query.update('UPDATE TB_USER SET password = :password, passwordChangeDate = NOW() WHERE userNo = :userNo', {
        'userNo': user.userNo,
        'password' : encodePassword
    });

    res.json({});
});

module.exports = router;
