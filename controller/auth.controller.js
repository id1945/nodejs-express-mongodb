const db = require('../db/index').lowDB;
const md5 = require('md5');

module.exports.login = function (req, res, next) {
    res.render('auth/login');
}

module.exports.postLogin = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    const user = db.get('users').find({
        email: email
    }).value();

    if (!user) {
        res.render('auth/login', {
            errors: ['User does not exits'],
            values: res.body
        });
    }
    console.log(md5(password));
    if (md5(password) != user.password) {
        res.render('auth/login', {
            errors: ['Wrong password'],
            values: res.body
        });
    }
    res.cookie('userId', user.id, {
        signed: true
    });
    res.redirect('/users');
}

module.exports.postLogout = function (req, res, next) {
    res.clearCookie("userId");
    res.redirect('/');
}