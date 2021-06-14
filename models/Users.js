const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    googleId: String,
    credits: { type : Number, default: 500}
})

module.exports = mongoose.model('users', Users)