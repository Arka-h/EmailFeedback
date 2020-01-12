//TODO : Install and connect mongoose
const express = require("express");
const CookieSession = require("cookie-session")
const passport = require("passport")
const {cookieKey}=require("./config/keys")
require("./models/Users"); // placed here since passport uses this model
require("./services/passport");

// end of connections
const app = express(); //express is a class

//TODO : inform passport the token handling is done by the cookiesSession
app.use(CookieSession(
    {
        maxAge: 30*24*60*60*1000,
        keys: [cookieKey]
    }
))
app.use(passport.initialize())
app.use(passport.session())

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

