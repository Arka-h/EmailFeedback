"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateEmails = void 0;

/* eslint-disable import/no-anonymous-default-export */
var validateEmails = function validateEmails(emails) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var invalidEmails = emails.split(',').map(function (s) {
    return s.trim();
  }).filter(function (s) {
    return re.test(s) === false;
  });
  if (invalidEmails.length) return "These emails are invalid: ".concat(invalidEmails.join(", "));
  return;
};

exports.validateEmails = validateEmails;