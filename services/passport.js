const passport = require('passport')
const User = require('../models/Users')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require("../config/keys")

// Store id as token (for now)
passport.serializeUser((user, done) => { console.log("serialize", user); done(null, user.id) })

// Get the corresponding user from token
passport.deserializeUser(async (token, done) => {
    // console.log("deserialize", token);
    const user = await User.findById(token)
    done(null, user)
})

passport.use(
    new GoogleStrategy({
        clientID: keys.googleId,
        clientSecret: keys.googleSecret,
        callbackURL: '/auth/google/callback', // Flow of getting permission starts here
        proxy: true // trust proxies, cause heroku server is hosted on a proxy 
        // (makes link http:// since proxies are by default untrustworthy)
    },
        async (accessToken, refreshToken, profile, done) => { // After redirection from callback, 
            // we get response from google with tokens and profile info
            let r = await User.findOne({ googleId: profile.id })
            if (!r) r = await User({ googleId: profile.id }).save()
            done(null, r)
        }))