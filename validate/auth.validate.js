module.exports.postLogin = function(req, res, next) {
    const errors = [];
    if (!req.body.email) {
        errors.push('Email is required');
    }
    if (!req.body.password) {
        errors.push('Password is required');
    }
    if (errors.length > 0) {
        res.render('auth/login', {
            errors: errors
        });
        return;
    }
    next();
}