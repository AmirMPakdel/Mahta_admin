const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const config = require('./config/config');


mongoose.connect(config.database, { useNewUrlParser: true });

let db = mongoose.connection;

// Check DB connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function (err) {
    console.log(`DB Error: ${err}`);
});

const app = express();

// Body Parser MiddleWare
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


app.use(cookieParser());

if (config.isDevelopment) {
    console.log(`We're on developement :)`);

    // Express session Middleware
    // app.use(session({
    //     secret: 'keyboard cat',
    //     resave: true,
    //     saveUninitialized: true,
    // }));

    // const cors = require('cors');
    // app.use(cors());

    // app.use(cors({
    //     origin: 'http://localhost:3005',
    //     credentials: true,
    //     exposedMethods: ['Content-Length', 'Options']
    // }));

    // app.use(function (req, res, next) {

        // res.setHeader('Access-Control-Allow-Origin', req.header('origin')
        //     || req.header('x-forwarded-host') || req.header('referer') || req.header('host'));
        //
        // res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        //
        // res.header('Access-Control-Allow-Origin', req.headers.origin);
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        //
        //
        // res.header('Access-Control-Allow-Origin', 'http://localhost:3005');
        //
        // res.header("Access-Control-Allow-Headers","*");
        // res.header('Access-Control-Allow-Credentials', true);
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');



        // Cookies that have not been signed
        // console.log('Cookies: ', req.cookies);

        // Cookies that have been signed
        // console.log('Signed Cookies: ', req.signedCookies);

        // next();
    // });



    // for fuck's sake we dont need these configuration on online server
    // Access Control Allow configuration
    // with this configuration both first Option req and next req statuses would be 200 OK :)
    app.use(function(req, res, next) {

        // res.header('Access-Control-Allow-Origin', 'http://localhost:3005');
        // res.header('Access-Control-Allow-Credentials', true);
        // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        next();
    });
}



// TODO: comment this if you don't need test samples
const faker = require('./tools/faker');
faker.insertFakeAdmin();
faker.insertFakeStudents();







// Route Files
let users = require('./routes/users');
app.use('/api/admin', users);

// just for fun :)
app.get('/api/info', (req, res) => {

    res.send(req.headers);
});


const port = 4000;

app.listen(port, '127.0.0.1', () => console.log(`Server Started on port ${port}`));