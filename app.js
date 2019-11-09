require('dotenv').config()
console.log(process.env.SESSION_SECRET);

const express = require('express')
const app = express()
const port = 3000
const cookieParser = require('cookie-parser');

const userRoute = require('./routes').user;
const authRoute = require('./routes').auth;
const middlware = require('./middlwares/auth.middlware');

app.set('view engine', 'pug')
app.set('views', './views');

// https://expressjs.com/en/4x/api.html#req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));

// GET method route
app.get('/', middlware.authorize, function (req, res) {
    res.render('index', {
        title: 'Hey',
        message: "ExpressJS"
    })
})

app.use('/users', middlware.authorize, userRoute);
app.use('/auth', authRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
