"use strict";

if (process.env.NODE_ENV !== 'production') // Heroku : https://devcenter.heroku.com/articles/nodejs-support#runtime-behavior, pre-set value to 'production'
  require('dotenv').config(); // In production, we must provide below env variables

var _process$env = process.env,
    GCLIENT_ID = _process$env.GCLIENT_ID,
    GCLIENT_SECRET = _process$env.GCLIENT_SECRET,
    MONGO_ADMIN = _process$env.MONGO_ADMIN,
    MONGO_PASSWD = _process$env.MONGO_PASSWD,
    MONGO_PROJECT = _process$env.MONGO_PROJECT,
    DB_NAME = _process$env.DB_NAME,
    COOKIE_KEY = _process$env.COOKIE_KEY,
    STRIPE_PUBLISHABLE_KEY = _process$env.STRIPE_PUBLISHABLE_KEY,
    STRIPE_SECRET_KEY = _process$env.STRIPE_SECRET_KEY,
    SENDGRID_KEY = _process$env.SENDGRID_KEY,
    NODE_ENV = _process$env.NODE_ENV;
module.exports = {
  googleId: GCLIENT_ID,
  googleSecret: GCLIENT_SECRET,
  mongoURI: "mongodb+srv://".concat(MONGO_ADMIN, ":").concat(MONGO_PASSWD, "@cluster0.").concat(MONGO_PROJECT, ".mongodb.net/").concat(DB_NAME, "?retryWrites=true&w=majority"),
  cookieKey: COOKIE_KEY,
  stripePublishableKey: STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: STRIPE_SECRET_KEY,
  sendGridKey: SENDGRID_KEY,
  redirectDomain: NODE_ENV === 'production' ? 'https://email-feedback-0.herokuapp.com/' : 'http://localhost:3000/'
};