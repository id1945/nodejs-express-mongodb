const db = require('../db/index').lowDB;
const ids = require('short-id');
const md5 = require('md5');

module.exports.index = function (req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    })
}

module.exports.create = function (req, res) {
    res.render('users/create')
}

module.exports.postCreate = function (req, res) {
    // Add a post
    req.body.id = ids.generate();
    req.body.avatar = req.file.path.split('\\').slice(1).join('/');
    req.body.password = md5(req.body.password);
    db.get('users').push(req.body).write()
    res.redirect('/users');
}

module.exports.get = function (req, res) {
    var id = req.params.id;
    res.render('users/view', {
        user: db.get('users').find({
            id: id
        }).value()
    })
}

module.exports.search = function (req, res) {
    var q = req.query.name;
    var matchUsers = db.get('users').value().filter(f => f.name.toLocaleLowerCase().indexOf(q.toLocaleLowerCase()) !== -1);
    res.render('users/index', {
        users: matchUsers
    })
}