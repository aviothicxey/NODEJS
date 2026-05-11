const express= require('express');
const session= require('express-session');
const passport= require('passport');

const app = express();
require('./auth/google');
app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());