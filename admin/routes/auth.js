'use strict';
const express = require('express');
const router = express.Router();
const privacy = require('../lib/privacy-utils');
const query = require('../lib/Query');

router.route('/login')
    .get(function (req, res, next) {
        res.render('page/auth/login');
    })
    .post(async function (req, res, next) {
        const email = req.body.email;
        const password = req.body.password;
        const encodePassword = await privacy.password(password);

        (async () => {
            const sql = 'SELECT userNo, password FROM TB_USER WHERE email = :email';
            const user = await query.findOne(sql, {'email': privacy.encode(email)});

            if (!user) {
                console.log('사용자를 찾을 수 없습니다. email : ' + email);
                return next({
                    'status': 403,
                    'message': '로그인이 실패하였습니다.'
                });
            }

            if (user.password != encodePassword) {
                console.log('비밀번호가 맞지 않습니다.');
                return next({
                    'status': 403,
                    'message': '로그인이 실패하였습니다.'
                });
            }

            var redirectUrl = req.session.web.redirectUrl;

            req.session.web = {};
            req.session.web.userNo = user.userNo;
            req.session.web.userId = email;
            req.session.save();
            res.redirect(redirectUrl || '/');
        })();
    });

router.get('/logout', function (req, res, next) {
    req.session.web = null;
    res.redirect('/');
});

module.exports = router;
