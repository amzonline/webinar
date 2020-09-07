const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const auth = require('./lib/auth');
const util = require('util');
const schedule = require('node-schedule');
const app = express();
const cookieSession = require('cookie-session');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;
const config = require('config');

if (config.get('redirectToHTTPS')) {
   app.use(redirectToHTTPS([], [/^\/static\//, /^\/healthcheck/]));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
// app.set('layout extractScripts', true);
app.set('layout', 'layouts/empty');
app.use(layouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

// 공통변수 처리 (ejs 지원)
app.use(function (req, res, next) {
    if (!req.session.web) {
        req.session.web = {};
    }
    if (!req.session.admin) {
        req.session.admin = {};
    }
    res.locals.isMemberLogin = auth.isMemberLogin(req);
    res.locals.rootPath = __dirname;
    next();


});

app.use('/healthcheck', require('./routes/healthcheck'));
app.use('/auth', require('./routes/auth'));
app.use('/qrcode', require('./routes/qrcode'));
app.use('/ivsevent', require('./routes/ivsevent'));
app.use('/membership/join', require('./routes/membership-join'));
app.use('/find', require('./routes/find'));
app.use('/users', require('./routes/users'));
app.use('/identification', require('./routes/identification'));
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next({
        status: 404,
        message: 'Page not found : ' + req.originalUrl
    });
});

// error handler
app.use(function (err, req, res, next) {
    console.log('error = ' + util.inspect(err));
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    if (err.status == 404) {
        res.status(err.status);
        res.render('page/error/error404');
    } else {
        res.status(err.status || 500);
        res.render('page/error/error');
    }
});

module.exports = app;
