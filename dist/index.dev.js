"use strict";

// MODULES
var express = require('express');

var mongoose = require('mongoose');

var passport = require('passport');

var cookieSession = require('cookie-session'); // IMPORTS FROM OTHER MODULES


var authRouter = require('./routes/authRoutes');

var billRouter = require('./routes/billRoutes');

var _require = require('./config/keys'),
    mongoURI = _require.mongoURI,
    cookieKey = _require.cookieKey;

require('./services/passport'); // Setup passport config : Strategy, serialize and deserialize logic


if (process.env.NODE_ENV !== 'production') require('dotenv').config(); // For link on '/'
// SET UP DATABASE

mongoose.connect(mongoURI, // Get the keys and set wire up the remote DB
{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}, function () {
  return console.log("MDB Altas instance connected");
}); // APP and COOKIE SETUP

var app = express(); // Starting app instance on Server

app.use(express.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  //30 days in ms
  keys: [cookieKey]
})); // Initialize and start passport session

app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter); // Wire up the Auth flow

app.use(billRouter);
app.get('/', function (req, res) {
  res.send(process.env.NODE_ENV === 'production' ? "Check out https://email-feedback-0.herokuapp.com/auth/google" : "Check out localhost:5000/auth/google");
}); // Get env from Heroku's Cloud env || assign 5000
// For Heroku deployment, add the engines prop with npm and node attributes set to version

var PORT = process.env.PORT || 5000;
app.listen(PORT); //nodemon index.js