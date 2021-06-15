"use strict";

var surveyRouter = require('express').Router();

var requireLogin = require('../middlewares/requireLogin');

var requireCredits = require('../middlewares/requireCredits');

var Survey = require('../models/Survey');

var Mailer = require('../services/Mailer');

var surveyTemplate = require('../services/emailTemplates/surveyTemplate'); // We need to explicitly wire up body parser, 
// now depricated, use express.json() instead


surveyRouter.post("/api/createSurvey", requireLogin, requireCredits, function _callee(req, res) {
  var _req$body, title, subject, body, recipients, response, r, survey, mailer;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // check if user has enough credits
          // recipients has list of recipientEmails
          _req$body = req.body, title = _req$body.title, subject = _req$body.subject, body = _req$body.body, recipients = _req$body.recipients, response = _req$body.response; // Assume response is a list of response arrays

          r = {};
          if (response) response.map(function (prop) {
            r[prop] = 0;
          }); // create a doc out of list of response strings added

          survey = new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients,
            response: r,
            _user: req.user,
            dateSent: Date.now()
          }); // await survey.save()
          // const status = await Survey.find()

          console.log("survey", survey); // Mailer

          mailer = new Mailer(survey, surveyTemplate(survey));
          mailer.send();

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = surveyRouter;