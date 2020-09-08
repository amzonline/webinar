'use strict';
const express = require('express');
const router = express.Router();
const query = require('../lib/Query');
const config = require('config');
//const identification = require('../lib/aws-lambda-identification');
const privacy = require('../lib/privacy-utils');
const auth = require('../lib/auth');
const verify = require('../lib/verify');
const moment = require('moment');

router.get('/', async function (req, res, next) {

    let sql = '';
    sql += "SELECT A.termsCode, A.title, A.contents, B.requireYn ";
    sql += "FROM TB_TERMS A ";
    sql += "    INNER JOIN TB_TERMS_POLICY B ON ( A.termsCode = B.termsCode AND A.termsVersion = B.currentTermsVersion ) ";
    sql += "WHERE A.openYn = 1 AND B.openYn = 1 AND A.termsCode IN ('PRIVACY', 'SERVICE', 'AD') ";
    sql += "ORDER BY A.order ASC ";
    const termsList = await query.find(sql);

    res.render('page/member/join/form.ejs', {termsList: termsList});
});

router.post('/validate', async function (req, res, next) {

    const email = req.body.email;
    const password = req.body.password;


    const user = await query.findOne('SELECT userNo FROM TB_USER WHERE email = :email', {
        'email': privacy.encode(email)
    });
    if (user) {
        res.status(400).json({
            field: 'email',
            error: '이미 가입된 이메일 주소입니다.'
        });
    }

    let ret = await verify.verifyEmail(email);
    if (ret) {
        res.status(400).json(ret);
        return;
    }

    ret = await verify.verifyPassword(password);
    if (ret) {
        res.status(400).json(ret);
        return;
    }

    res.json({});
});

router.post('/identification', async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const terms = req.body.terms;

    const domain = (req.headers["x-forwarded-proto"] || req.protocol) + '://' + req.get('host');
    const isPopup = true;
    const isMobile = false;
    const successReturnUrl = domain + config.get('identification').success;
    const failureReturnUrl = domain + config.get('identification').fail;
    const payload = await identification.encode(isPopup, isMobile, successReturnUrl, failureReturnUrl);

    req.session.web.identificationId = payload.requestId;
    req.session.save;

    res.render('page/member/join/identification.ejs', {
        email: email,
        password: password,
        terms: terms,
    });
});

router.post('/create', async function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const terms = req.body.terms;
    const identificationData = req.body.identificationData;

    let ret = await verify.verifyEmail(email);
    if (ret) {
        res.status(400).json(ret);
        return;
    }

    ret = await verify.verifyPassword(password);
    if (ret) {
        res.status(400).json(ret);
        return;
    }

    const payload = await identification.success(identificationData);

    const requestId = req.body.requestId;
    const authType = req.body.authType;
    const name = '';
    const birthDate = '';
    const gender = '';
    //const nationalInfo = req.body.nationalInfo;
    const di = '';
    const ci = '';
    const mobileNo = '';
    const mobileCo = '';
    const cipherTime = '';

    if (requestId != req.session.web.identificationId) {
        return next({
            status: 400,
            message: '본인인증 정보가 잘못 되었습니다.'
        });
    }

    const user = await query.findOne('SELECT userNo FROM TB_USER WHERE di = :di', {
        'di': privacy.encode(di)
    });
    if (user) {
        return next({
            status: 400,
            message: '이미 가입된 고객입니다.'
        });
    }

    const encodePassword = await privacy.password(password);

    let sql = '';
    sql += 'INSERT INTO TB_USER ( email, password, di, userName, mobileNo, mobileCo, lastLogonDate, joinDate ) ';
    sql += 'VALUES ( :email, :password, :di, :userName, :mobileNo, :mobileCo, NOW(), NOW() )';
    let userNo = await query.insert(sql, {
        email: privacy.encode(email),
        password: encodePassword,
        di: privacy.encode(di),
        mobileNo: privacy.encode(mobileNo),
        mobileCo: mobileCo,
        userName: privacy.encode(name)
    });

    sql = '';
    sql += 'INSERT INTO TB_USER_TERMS ( userNo, termsCode, termsVersion, agreeYn, createdDate ) ';
    sql += "SELECT :userNo, A.termsCode, A.termsVersion, 0, NOW() ";
    sql += "FROM TB_TERMS A ";
    sql += "    INNER JOIN TB_TERMS_POLICY B ON ( A.termsCode = B.termsCode AND A.termsVersion = B.currentTermsVersion ) ";
    sql += "WHERE A.openYn = 1 AND B.openYn = 1 AND A.termsCode IN ('PRIVACY', 'SERVICE', 'AD')";
    query.insert(sql, {
        userNo: userNo
    });
    for (let i = 0; i < terms.length; i++) {
        sql = '';
        sql += 'UPDATE TB_USER_TERMS SET agreeYn = 1 WHERE userNo = :userNo AND termsCode = :termsCode';
        query.update(sql, {
            userNo: userNo,
            termsCode: terms[i]
        });
    }

    //sql = "";
    //sql += "SELECT ";
    //sql += "   icoNo, icoName, symbol, ";
    //sql += "   UNIX_TIMESTAMP(startDate) startTime, UNIX_TIMESTAMP(endDate) endTime, ";
    //sql += "   coinSymbol, exchangeIcoQuantity, maxCoinCap, ";
    //sql += "   confirmedCoinCap, totalBalance, userMinCoinCap, userMaxCoinCap, bonusPercent ";
    //sql += "FROM TB_ICO ";
    //sql += "WHERE siteOpen = 1 ";
    //sql += "ORDER BY icoNo DESC LIMIT 1 ";
    //const ico = await query.findOne(sql);

    req.session.web.userNo = userNo;
    req.session.web.userId = email;
    req.session.save;

    res.redirect('/membership/join/result');
});

router.get('/result', async function (req, res, next) {

    if (auth.authMemberCheckAndRedirect(req, res)) {
        return;
    }

    const sql = "SELECT email FROM TB_USER WHERE userNo = :userNo LIMIT 1";
    const user = await query.findOne(sql, {userNo: req.session.web.userNo});

    res.render('page/member/join/result.ejs', {email: privacy.decode(user.email)});
});

module.exports = router;
