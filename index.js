const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
// Get env from Heroku's Cloud env || assign 5000
// For Heroku deployment, add the engines prop with npm and node attributes set to version

app.get('/',(req,res)=>{
    res.send("HI, I'm working")
})

app.listen(PORT);
//node index.js