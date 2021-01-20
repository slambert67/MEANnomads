const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');  // npm install express-session


// package documentation - https://www.npmjs.com/package/connect-mongo
// session data (store) can be stored in multiple locations inc. in memory
// connect-mongo used for session storage
const MongoStore = require('connect-mongo')(session);  // explain later

// create the express application
const app = express();

// db stuff
const dbString = 'mongodb://localhost:27017/nomads';
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbString, dbOptions);


// looks like global middleware. But what is it doing?
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const sessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

// passport.js
// middleware integrating with express handling authentication logic
// passport.js has multiple strategies
// - passport-local
// - passport-jwt
// - passport-oauth2

// use express-session middleware
app.use( session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24  // 1 day
    }  // default cookie name : connect.sid
}));

app.get('/', (req, res, next) => {
    res.send('<h1></h1>Hello world (sessions)');
});
app.listen(3000);