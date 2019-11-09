const express = require('express')
const router = express()
var multer  = require('multer')

var upload = multer({ dest: './public/uploads/' })

var controller = require('../controller/user.controller');

var validate = require('../validate/user.validate');

// GET method route
router.get('/', controller.index);

// GET method route
router.get('/create', controller.create);

// GET by id
router.get('/:id', controller.get);

// POST create user
router.post('/create', upload.single('avatar'), validate.postCreate, controller.postCreate);

// GET method route
router.get('/search/name', controller.search);

module.exports = router;