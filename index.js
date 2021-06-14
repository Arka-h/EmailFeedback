
// MODULES
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const cookieSession = require('cookie-session')
// IMPORTS FROM OTHER MODULES
const authRouter = require('./routes/authRoutes')
const billRouter = require('./routes/billRoutes')
const { mongoURI, cookieKey } = require('./config/keys')
require('./services/passport') // Setup passport config : Strategy, serialize and deserialize logic
if (process.env.NODE_ENV !== 'production') require('dotenv').config() // For link on '/'
// SET UP DATABASE
mongoose.connect(mongoURI, // Get the keys and set wire up the remote DB
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
    () => console.log("MDB Altas instance connected"))


// APP and COOKIE SETUP
const app = express() // Starting app instance on Server
app.use(express.json())
app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in ms
    keys: [cookieKey]
}))

// Initialize and start passport session
app.use(passport.initialize())
app.use(passport.session())

app.use(authRouter) // Wire up the Auth flow
app.use(billRouter)

// https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process

// Handle Production build 
if(process.env.NODE_ENV === 'production'){
    // Express will serve up production assets
    // like main.js or main.css files
    app.use(express.static('client/build')) // If searching for static assets

    // It'll serve up index.html, if route is not understood
    const path = require('path')
    app.get('*',(res, req) =>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html')) // concats it's params--> Absoulte path
    })
}

// Get env from Heroku's Cloud env || assign 5000
// For Heroku deployment, add the engines prop with npm and node attributes set to version
const PORT = process.env.PORT || 5000
app.listen(PORT);
    //nodemon index.js