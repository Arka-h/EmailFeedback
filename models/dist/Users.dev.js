"use strict";

var mongoose = require('mongoose');

var Users = new mongoose.Schema({
  googleId: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    "default": 500
  }
});
module.exports = mongoose.model('users', Users);