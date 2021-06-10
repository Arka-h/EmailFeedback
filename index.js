const express = require('express')
const authRouter = require('./routes/authRoutes')
const app = express()
const PORT = process.env.PORT || 5000
// Get env from Heroku's Cloud env || assign 5000
// For Heroku deployment, add the engines prop with npm and node attributes set to version
require('./services/passport') //Run stuff in here
app.use(authRouter)

app.get('/', (req, res) => { 
    res.send("Check out localhost:5000/auth/google")
})

app.listen(PORT);
//node index.js