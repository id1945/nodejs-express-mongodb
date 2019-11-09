const express =  require('express');
const router = express();

const constroller = require('../controller/auth.controller');
const validate = require('../validate/auth.validate');

router.get('/login', constroller.login);
router.post('/login', validate.postLogin, constroller.postLogin);
router.get('/logout', constroller.postLogout);

module.exports = router;