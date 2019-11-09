const db = require('../db/index').lowDB;

module.exports.authorize = function(req, res, next) {
    console.log(req.signedCookies); // const cookieParser = require('cookie-parser'); vs app.use(cookieParser());
    if (!req.signedCookies.userId) {
        res.redirect('auth/login')
        return;
    }
    const user = db.get('users').find({
        id: req.signedCookies.userId
    }).value();
    if (!user) {
        res.redirect('auth/login');
        return;
    }
    res.locals.user = user;
    next();
}