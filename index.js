const express = require("express");
const CookieSession = require("cookie-session")
const passport = require("passport")
const {cookieKey}=require("./config/keys")//{} works
require("./models/Users"); //mongo user model
// tell passport about auth schema
require("./services/google-schema");
//instantiate express app
const app = express();

//use cookie-session
app.use(CookieSession(
    {
        maxAge: 30*24*60*60*1000,
        keys: [cookieKey]
    }
))
//initialize and set up passport
app.use(passport.initialize())
app.use(passport.session())

//  set up routes
require("./routes/authRoutes");

const PORT = process.env.PORT || 5000;
app.listen(PORT);

