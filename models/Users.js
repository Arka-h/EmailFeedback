const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    googleId: String,
})

module.exports =  mongoose.model('users', Users)