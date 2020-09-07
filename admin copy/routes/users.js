'use strict';
const express = require('express');
const auth = require('../lib/auth');
const router = express.Router();
const query = require('../lib/Query');
const privacy = require('../lib/privacy-utils');

const util = require('util');

//----------------------------
// 리스트 화면
//----------------------------
router.get('/', async function (req, res, next) {
    if (auth.authMemberCheckAndRedirect(req, res, '/users')) {
        return;
    }

    const userNo = req.session.web.userNo;

    try {
        let curr = 1;
        if (req.query.curr)
        {
            curr = parseInt(req.query.curr);
        }

        // 전체 카운트
        const num = await query.findOne('SELECT COUNT(*) as n FROM TB_USER');
        if (!num) {
            console.error('전체 페이징수를 찾을 수 없습니다.');
            return;
        }
        const page = parseInt(num.n/200)+1;

        // 4. 유저 정보 가져오기
        let sql = '';
        sql += 'SELECT TB_USER.userNo, email, userName, mobileNo, DATE_FORMAT(TB_USER.joinDate, "%d/%m/%Y") as createdDate FROM TB_USER ' ;
        sql += 'JOIN (SELECT userNo ';
        sql += 'FROM   TB_USER ';
        sql += 'ORDER  BY userNo desc ';
        sql += 'LIMIT  :nMin, :nMax) AS t ON t.userNo = TB_USER.userNo; ' ;

        let nMin = Math.max(0, curr*200-200);
        let nMax = Math.min(num.n, (curr)*200);
        const userPreList = await query.find(sql, {'nMin' : nMin, 'nMax': nMax});

        if (!userPreList) {
            console.error('유저를 찾을 수 없습니다.');
            return;
        }
        const email = '' // privacy.decode(userPreList.email)
        console.log('email : ' + email)
        res.render('page/users.ejs', {userList: userPreList, email: email, curr: curr, page: page, total:num.n});
    } catch (e) {
        next({
            'status': 400,
            'message': e,
        });
    }

});

//----------------------------
// 이체하기 액션화면
//----------------------------
router.post('/ivsevents-transaction', function(req, res, next) {
    var userNo= req.body.userNo;

    let icoNo =1;
    if (req.body.icoNo)
    {
        icoNo = req.body.icoNo;
    }
    let passwd ='';
    if (req.body.passwd)
    {
        passwd = req.body.passwd;
    }
    let curr = 1;
    if (req.body.curr)
    {
        curr = parseInt(req.body.curr);
    }
    let symbol = '';
    if (req.body.symbol)
    {
        symbol = req.body.symbol;
    }
    let dir = '';
    if (req.body.dir)
    {

        dir = req.body.dir;
    }
    let totalBalance ='';
    if (req.body.totalBalance)
    {
        totalBalance = req.body.totalBalance;
    }

    /*
    if (!userNo || !passwd || !icoNo || !dir ) {
      return next({
        'status': 403,
        'message': '필수 항목이 없습니다.(userNo:'+userNo+', icoNo:'+icoNo+', passwd:'+passwd+', dir:'+dir+')'});
    }
    */

    (async () => {
        try {
            // 1. 유저 조회
            const user = await query.findOne('SELECT * FROM TB_USER_ETH_ACCOUNT WHERE userNo = :userNo and symbol = :symbol', {'userNo': userNo, 'symbol': symbol});
            //console.log('user = ' + util.inspect(user));
            if (!user) {
                console.error('유저를 찾을 수 없습니다.');
                return;
            }
            if (user.userEthAccountLookup == 'CACHE') {
                return next({
                    'status': 403,
                    'message': user.userNo + ': 관리자에게 이미 이체된 이용자입니다.'});
            }



            // 3. 히스토리를 기록한다. (READY)
            const retDel = await deleteHistory(user.userNo, icoNo);
            if(!retDel) {
                console.log('삭제할 데이터가 없습니다.(정상)');
            }
            const retHis = await insertHistory(icoNo, balance.userNo, balance.account, balance.result);
            if(!retHis) {

                return next({
                    'status': 403,
                    'message': balance.userNo + ': 히스토리 기록(READY)에 실패하였습니다.'
                });
            }

        } catch (e) {
            next({
                'status': 400,
                'message': e,
            });
        }
    })();
});


module.exports = router;
