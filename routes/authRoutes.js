const passport = require("passport");
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  ); //options object

  app.get("/auth/google/callback", passport.authenticate("google")); //why? (req?,res?)=>{}?
  // GoogleStrategy has internal identifier as 'google'
  app.get("/api/logout", (req, res) => {
    //logout is attached to req by passport
    req.logout();
    res.redirect('/');
  });
  app.get("/api/current_user", (req, res) => {
    //user is attached to req by passport
    console.log(req.user);
    res.send(req.user);
  });
};
