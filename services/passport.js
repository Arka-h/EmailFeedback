const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require("../config/keys")

passport.use(new GoogleStrategy({
    clientID: keys.googleId,
    clientSecret: keys.googleSecret,
    callbackURL: '/auth/google/callback' // Flow of getting permission starts here
}, (accessToken, refreshToken, profile, done) => { // After redirection from callback, 
    // we get response from google with tokens and profile info
    console.log("accessToken: ", accessToken)
    console.log("refreshToken: ", refreshToken)
    console.log("profile: ", profile)
}))