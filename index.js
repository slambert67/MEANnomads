const express = require('express');


// passport.js
// middleware integrating with express handling authentication logic
// passport.js has multiple strategies
// - passport-local
// - passport-jwt
// - passport-oauth2



app.get('/', (req, res, next) => {
    res.send('<h1>Hello world (sessions)</h1>');
});
app.listen(3000);