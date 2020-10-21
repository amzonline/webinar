'use strict';
const express = require('express');
const auth = require('../lib/auth');
const router = express.Router();
const query = require('../lib/Query');
const numeral = require('numeral');
const moment = require('moment');

const util = require('util');

// URL 예제 : [GET] /ivsevent
router.get('/', async function (req, res, next) {

    if (auth.authMemberCheckAndRedirect(req, res, '/ivsevent/')) {
        return;
    }

    //if (auth.authAdminCheckAndRedirect(req, res)) {
    //    return;
    //}
    const userNo = req.session.web.userNo;

    let ivsevent = { };
    try {
        let sql = "";
        sql += "    SELECT count(*) as cnt FROM TB_EVENT; ";
        const historyCnt = await query.findOne(sql);

        res.render('page/event/ivsevent.ejs',
                {ivsevent: ivsevent,historyCnt: historyCnt });
    } catch (e) {
        next({
            'status': 400,
            'message': e,
        });
    }
});

// URL 예제 : [GET] /ivsevent/history
router.get('/history', async function (req, res, next) {

    if (auth.authMemberCheckAndRedirect(req, res, '/ivsevent/')) {
        return;
    }
    const userNo = req.session.web.userNo;

    try {
        let sql = "";
        sql += "    SELECT count(*) as cnt FROM TB_EVENT; ";
        const historyCnt = await query.findOne(sql);

        sql = "";
        sql += "    SELECT * FROM TB_EVENT ";
        sql += "    ORDER BY createdDate ASC ";
        const historyList = await query.find(sql);

        console.log('history:' + util.inspect(historyList))
        res.render('page/event/history.ejs', {
            historyCnt : historyCnt,
            historyList: historyList
        });
    } catch (e) {
        next({
            'status': 400,
            'message': e,
        });
    }
});

// URL 예제 : [GET] /ivsevent/playback
router.get('/playback', async function (req, res, next) {

    if (auth.authMemberCheckAndRedirect(req, res, '/ivsevent/')) {
        return;
    }
    const userNo = req.session.web.userNo;

    try {
        let sql = "";
        sql += "    SELECT count(*) as cnt FROM TB_EVENT; ";
        const historyCnt = await query.findOne(sql);

        res.render('page/event/playback.ejs',
                { historyCnt: historyCnt});

    } catch (e) {
        next({
            'status': 400,
            'message': e,
        });
    }
});



// URL 예제 : [GET] /ivsevent/:eventNo
router.get('/:eventNo', async function (req, res, next) {

    const eventNo = req.params.eventNo;

    if (auth.authMemberCheckAndRedirect(req, res, '/ivsevent/'+ eventNo)) {
        return;
    }
    const userNo = req.session.web.userNo;

    try {
        let sql = "";
        sql += "    SELECT count(*) as cnt FROM TB_EVENT; ";
        const historyCnt = await query.findOne(sql);

        if (eventNo) {
            sql = "";
            sql += "    SELECT *  FROM TB_EVENT ";
            sql += "    WHERE eventNo = :eventNo ";

            const ivsevent = await query.findOne(sql, {eventNo : eventNo});

            res.render('page/event/ivsevent.ejs',
                {ivsevent: ivsevent, historyCnt: historyCnt});
        }
    } catch (e) {
        next({
            'status': 400,
            'message': e,
        });
    }
});


// URL 예제 : [POST] /ivsevent/create
router.post('/create', async function (req, res, next) {

    if (auth.authMemberCheckAndRedirect(req, res, '/ivsevent/')) {
        return;
    }
    const userNo = req.session.web.userNo;

    var eventNo= req.body.eventNo;
    var eventName= req.body.eventName;
    var type = req.body.type;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var maxCapacity = req.body.maxCapacity;

    var status = req.body.status;
    var needAuth = req.body.needAuth;
    var siteOpen = req.body.siteOpen;
    var obsUrl = req.body.obsUrl;
    var playbackKey = req.body.playbackKey;
    var playbackUrl = req.body.playbackUrl;
    var ondemandUrl = req.body.ondemandUrl;
    var downloadUrl = req.body.downloadUrl;
    var feedbackUrl = req.body.feedbackUrl;

    console.log("body : " + util.inspect(req.body))

    try {
        // 있는지 확인
        let sql = "";
        sql = "";
        sql += 'SELECT count(*) as cnt FROM TB_EVENT WHERE eventNo = :eventNo; ' ;
        var ret = await query.findOne(sql, { 'eventNo' : eventNo });

        if (ret.cnt > 0) { //  UPDATE
            let sql = "";
            sql = "";
            sql += 'UPDATE TB_EVENT SET eventName = :eventName, type = :type, startDate = :startDate, endDate = :endDate, '  ;
            sql += 'maxCapacity = :maxCapacity, status = :status, needAuth = :needAuth, siteOpen = :siteOpen, obsUrl = :obsUrl, ';
            sql += 'playbackKey = :playbackKey, playbackUrl = :playbackUrl, ondemandUrl = :ondemandUrl, status = :status, ';
            sql += 'downloadUrl = :downloadUrl, feedbackUrl = :feedbackUrl, ';
            sql += 'updatedAdminNo = :updatedAdminNo, updatedDate = NOW() ';
            sql += 'WHERE eventNo = :eventNo; ';

            var ret = await query.update(sql, {
                'eventName' : eventName,
                'type' : type,
                'startDate' : startDate,
                'endDate' : endDate,
                'maxCapacity' : maxCapacity,
                'status' : status,
                'needAuth' : needAuth,
                'siteOpen' : siteOpen,
                'obsUrl' : obsUrl,
                'playbackKey' : playbackKey,
                'playbackUrl' : playbackUrl,
                'ondemandUrl' : ondemandUrl,
                'downloadUrl' : downloadUrl,
                'feedbackUrl' : feedbackUrl,
                'updatedAdminNo' : userNo,
                'eventNo' : eventNo
            });
        } else { // INSERT
            let sql = "";
            sql = "";
            sql += 'INSERT INTO TB_EVENT ( eventName, type, startDate, endDate, maxCapacity, status, needAuth, ';
            sql += 'siteOpen, obsUrl, playbackKey, playbackUrl, downloadUrl, feedbackUrl, status, createdAdminNo, createdDate ) ';
            sql += 'VALUES ( :eventName, :type, :startDate, :endDate, :maxCapacity, :status, :needAuth, :siteOpen, ';
            sql += ':obsUrl, :playbackKey, :playbackUrl, :ondemandUrl :downloadUrl, :feedbackUrl, :status, :createdAdminNo, NOW() )';

            var ret = await query.insert(sql, {
                'eventName' : eventName,
                'type' : type,
                'startDate' : startDate,
                'endDate' : endDate,
                'maxCapacity' : maxCapacity,
                'status' : status,
                'needAuth' : needAuth,
                'siteOpen' : siteOpen,
                'obsUrl' : obsUrl,
                'playbackKey' : playbackKey,
                'playbackUrl' : playbackUrl,
                'ondemandUrl' : ondemandUrl,
                'downloadUrl' : downloadUrl,
                'feedbackUrl' : feedbackUrl,
                'createdAdminNo' : userNo
            });
        }

        res.redirect('/ivsevent/history');

    } catch (e) {
        next({
            'status': 400,
            'message': e,
        });
    }
});


module.exports = router;
