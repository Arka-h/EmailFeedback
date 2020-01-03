//import express from "express";
const express = require("express"); //express is a backend api built on Nodejs
const passport = require("passport")//passport is api that helps in authentication process of various services
const googleStrategy = require("passport-google-oauth20").Strategy// this is the google oauth 'strategy'
const app = express(); //returns app  object


//TODO : Create a new Google Strategy , and add it to the passport register
passport.use(new googleStrategy())
//TODO : Create a profile with google and enaable G+ API for the Oauth feature



// app.get("/", (req, res) => {// req ==>  request from the client
//     // res ==> response that you will send out to the client
//   res.send({
//     bye: "buddy"
//   });
// });


// Get env variable PORT from env on which Node runs, and Heroku modifies/creates


const PORT = process.env.PORT || 5000
app.listen(PORT); // express tells nookde to watch for traffic on port 5000


// we can use AWS/DigitalOcean for hosting instead of Heroku...

//TODO : (in package.json) dependencies : tell package what version node you want to use "engines"
//TODO : (in package.json) specify command to start our server: "scripts"
//TODO : The "node_modules" depndencies are auto-installed that are 
// set up as a consequence to the dependencies:express option in package.json
// Hence, they aren't required in the deployment/VersionControl and should be ignored using the ".gitignore"

//TODO : deploy using Heroku CLI, and Git 


