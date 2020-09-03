'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../lib/auth');

router.get('/', function (req, res, next) {

    if (auth.authMemberCheckAndRedirect(req, res, '/')) {
        return;
    }

    res.render('page/index.ejs');
});

module.exports = router;
