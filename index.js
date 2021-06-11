
// MODULES
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')

// IMPORTS FROM OTHER MODULES
const authRouter = require('./routes/authRoutes')
const { mongoURI, cookieKey } = require('./config/keys')
require('./services/passport') // Setup passport config : Strategy, serialize and deserialize logic
if (process.env.NODE_ENV !== 'production') require('dotenv').config() // For link on '/'
// SET UP DATABASE
mongoose.connect(mongoURI, // Get the keys and set wire up the remote DB
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MDB Altas instance connected"))


// APP and COOKIE SETUP
const app = express() // Starting app instance on Server
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in ms
    keys: [cookieKey]
}))

// Initialize and start passport session
app.use(passport.initialize())
app.use(passport.session())

app.use(authRouter) // Wire up the Auth flow

app.get('/', (req, res) => {
    res.send(process.env.NODE_ENV === 'production' ? "Check out https://email-feedback-0.herokuapp.com/auth/google" : "Check out localhost:5000/auth/google")
})

// Get env from Heroku's Cloud env || assign 5000
// For Heroku deployment, add the engines prop with npm and node attributes set to version
const PORT = process.env.PORT || 5000
app.listen(PORT);
    //nodemon index.js