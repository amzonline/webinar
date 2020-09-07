let isMemberLogin = function (req) {
    return !!(req.session && req.session.web && req.session.web.userId);
};
let authMemberCheckAndRedirect = function (req, res, redirectUrl = '/') {
    if (!req.session.web) {
        req.session.web = {};
    }
    req.session.web.redirectUrl = redirectUrl;
    req.session.save();

    if (!isMemberLogin(req)) {
        res.redirect('/auth/login');
        return true;
    } else {
        return false;
    }
};
let ajaxAuthMemberCheck = function (req, res) {
    if (!isMemberLogin(req)) {
        res.status(403).json({
            error: '로그인 후 이용 가능합니다.'
        });
        return true;
    } else {
        return false;
    }
};

let isAdminLogin = function (req) {
    return !!(req.session && req.session.admin && req.session.admin.adminId);
};
let authAdminCheckAndRedirect = function (req, res, redirectUrl = '/admin/') {
    if (!req.session.admin) {
        req.session.admin = {};
    }
    req.session.admin.redirectUrl = redirectUrl;
    req.session.save();

    if (!isAdminLogin(req)) {
        res.redirect('/admin/auth/login');
        return true;
    } else {
        return false;
    }
};
let ajaxAuthAdminCheck = function (req, res) {
    if (!isAdminLogin(req)) {
        res.status(403).json({
            error: '로그인 후 이용 가능합니다.'
        });
        return true;
    } else {
        return false;
    }
};

module.exports = {
    'isMemberLogin': isMemberLogin,
    'authMemberCheckAndRedirect': authMemberCheckAndRedirect,
    'ajaxAuthMemberCheck': ajaxAuthMemberCheck,
    'isAdminLogin': isAdminLogin,
    'authAdminCheckAndRedirect': authAdminCheckAndRedirect,
    'ajaxAuthAdminCheck': ajaxAuthAdminCheck
};
