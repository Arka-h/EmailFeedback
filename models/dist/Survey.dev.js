"use strict";

var mongoose = require('mongoose');

var Survey = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  recipients: {
    type: [{
      email: String,
      responded: {
        type: Boolean,
        "default": false
      }
    }],
    validate: function validate(v) {
      return Array.isArray(v) && v.length > 0;
    }
  },
  response: {
    type: Object,
    required: true
  },
  // Contains dict of poll numbers, can be anything yes/no, true/false, java/python/js etc
  _user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'users'
  },
  //Foreign Key
  dateSent: {
    type: Date,
    required: true
  },
  lastResponded: Date
}); // We can't have records > 16MB in a document, as it is the record limit. We can use GridFS to store docs > 16 MB

module.exports = mongoose.model('survey', Survey);