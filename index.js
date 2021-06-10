const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.send("HI, I'm working")
})

app.listen(5000);
//node index.js