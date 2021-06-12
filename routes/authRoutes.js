const passport = require('passport')
const authRouter = require('express').Router()

authRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }), // SCOPES : https://support.google.com/cloud/answer/9110914
    // (req, res) => { 
    //     console.log(`You're Logged in ${req.user.googleId}!`)
    // }
)
authRouter.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.send({ user: req.user })
})

authRouter.get('/api/currentUser', (req, res) => { // deserialize attaches User model instance to req.user
    res.send(req.user)
})

authRouter.get('/api/logout', (req, res) => {
    req.logout()
    res.send(req.user)
})

module.exports = authRouter