const passport = require("passport"); 
const googleStrategy = require("passport-google-oauth20"); 
const { googleClientID, googleClientSecret } = require("../config/keys");
const mongoose = require("mongoose");
const User = require('../models/Users')

passport.serializeUser((user, done) => {
  done(null, user.id);
}); 
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new googleStrategy( //since heroku uses a proxy to handle redirect pages, "https==>http"
    {
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleID: profile.id });
      if (!existingUser) {
        const user = await new User({ googleID: profile.id }).save(); 
        done(null, user); 
      } else done(null, existingUser);
    }
  )
  //saves the model instance to the model-class

  // console.log("accessToken : " + accessToken); //tells google the permissions the user has granted, exists for a breif time
  // console.log("refreshToken " + refreshToken); //can be used to refresh accessToken
  // console.log(profile); //user data
  // console.log("done : " + done);
);
//this sets the config of the authentication flavour ...
