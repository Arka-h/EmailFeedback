const passport = require("passport"); //passport is api that helps in authentication process of various services
const googleStrategy = require("passport-google-oauth20").Strategy; // this is the google oauth 'strategy'
const { googleClientID, googleClientSecret } = require("../config/keys");
//TODO: Create a new Google Strategy , and add it to the passport register
//TODO : Adding GoogleID prop to the instances of a User using our app
const mongoose = require("mongoose");
const User = mongoose.model("users"); // model class

//TODO : To add serializeUser((user,done)=>{}) & deserializeUser() statements
passport.serializeUser((user, done) => {
  // user.id ==> is the User colection instance's ID assigned by mongoDB itself
  done(null, user.id);
}); //this is the user returned by done() below, using googleStrategy
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy( //since heroku uses a proxy to handle redirect pages, "https==>http"
    {
      // pass a config object
      clientID: googleClientID,
      clientSecret: googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy:true
    }, //pass a callback function provided with (accessToken, refreshToken, profile, done)=>{}
    (accessToken, refreshToken, profile, done) => {
      //done() is a function
      User.findOne({
        //async func returns a JS promise for
        // synchronous access of other asynchronous processes by
        // .then(callback:<function>)
        googleID: profile.id
      }).then(existingUser => {
        if (!existingUser) {
          new User({ googleID: profile.id })
            .save() //async func
            .then(user => done(null, user)); //new saved User // needs  session cookie sset-cookie
        }
        done(null, existingUser);
      });
    }
  )
  //saves the model instance to the model-class

  // console.log("accessToken : " + accessToken); //tells google the permissions the user has granted, exists for a breif time
  // console.log("refreshToken " + refreshToken); //can be used to refresh accessToken
  // console.log(profile); //user data
  // console.log("done : " + done);
);
//this sets the config of the authentication flavour ...
