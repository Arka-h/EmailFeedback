"use strict";

var surveyRouter = require('express').Router();

var requireLogin = require('../middlewares/requireLogin');

var requireCredits = require('../middlewares/requireCredits');

var Survey = require('../models/Survey');

var Mailer = require('../services/Mailer');

var surveyTemplate = require('../services/emailTemplates/surveyTemplate'); // We need to explicitly wire up body parser, 
// now depricated, use express.json() instead


surveyRouter.get('/api/thanks', function (req, res) {
  res.send('Thanks for voting!');
});
surveyRouter.post("/api/createSurvey", requireLogin, requireCredits, function _callee(req, res) {
  var _req$body, title, subject, body, recipients, response, r, survey, mailer, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // check if user has enough credits
          // recipients has list of recipientEmails
          _req$body = req.body, title = _req$body.title, subject = _req$body.subject, body = _req$body.body, recipients = _req$body.recipients, response = _req$body.response; // Assume response is a list of response arrays

          r = {}; //atleast

          if (response) response.map(function (prop) {
            r[prop] = 0;
          }); // create a doc out of list of response strings added

          _context.next = 5;
          return regeneratorRuntime.awrap(new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recipients,
            response: r,
            _user: req.user,
            dateSent: Date.now()
          }));

        case 5:
          survey = _context.sent;
          mailer = new Mailer(survey, surveyTemplate(survey)); // Mailer

          _context.prev = 7;
          _context.next = 10;
          return regeneratorRuntime.awrap(survey.save());

        case 10:
          _context.next = 12;
          return regeneratorRuntime.awrap(mailer.sendMail());

        case 12:
          req.user.credits -= 1;
          _context.next = 15;
          return regeneratorRuntime.awrap(req.user.save());

        case 15:
          user = _context.sent;
          res.send(user);
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](7);
          res.status(422).send(new Error(_context.t0));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[7, 19]]);
});
module.exports = surveyRouter;