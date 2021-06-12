"use strict";

var passport = require('passport');

var authRouter = require('express').Router();

authRouter.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
})); // SCOPES : https://support.google.com/cloud/answer/9110914

authRouter.get('/auth/google/callback', passport.authenticate('google'), function (req, res) {
  res.redirect('/surveys');
});
authRouter.get('/api/currentUser', function (req, res) {
  // deserialize attaches User model instance to req.user
  res.send(req.user);
});
authRouter.get('/api/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});
module.exports = authRouter;