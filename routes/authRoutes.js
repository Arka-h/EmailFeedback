const passport = require('passport')
const express = require('express')
const authRouter = express.Router()

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }), // SCOPES : https://support.google.com/cloud/answer/9110914
(req, res) => { 
})

authRouter.get('/auth/google/callback', passport.authenticate('google'))

module.exports = authRouter