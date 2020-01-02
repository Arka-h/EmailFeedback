//import express from "express";
const express = require("express");
const app = express(); //returns app  object

app.get("/", (req, res) => {// req ==>  request from the client
    // res ==> response that you will send out to the client
  res.send({
    bye: "buddy"
  });
});
// Get env variable PORT from env on which Node runs, and Heroku modifies/creates
const PORT = process.env.PORT || 5000
app.listen(PORT); // express tells node to watch for traffic on port 5000
// we can use AWS/DigitalOcean for hosting

//TODO : dependencies : tell package what version node you want to use "engines"
//TODO : specify command to start our server: "scripts"
//TODO : The "node_modules" depndencies are auto-installed that are 
// set up as a consequence to the dependencies:express option in package.json
// Hence, they aren't required in the deployment/VersionControl and should be ignored using the ".gitignore"


