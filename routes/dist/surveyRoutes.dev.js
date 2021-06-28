"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ = require('lodash');

var _require = require('path-parser'),
    Path = _require.Path;

var _require2 = require('url'),
    URL = _require2.URL; // node helper lib


var surveyRouter = require('express').Router();

var ObjectId = require('mongoose').Types.ObjectId;

var requireLogin = require('../middlewares/requireLogin');

var requireCredits = require('../middlewares/requireCredits');

var Survey = require('../models/Survey');

var Mailer = require('../services/Mailer');

var surveyTemplate = require('../services/emailTemplates/surveyTemplate'); // We need to explicitly wire up body parser, 
// now depricated, use express.json() instead


surveyRouter.get('/api/surveys', requireLogin, function _callee(req, res) {
  var surveys;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Survey.find({
            _user: req.user.id
          }).select({
            recipients: false
          }));

        case 2:
          surveys = _context.sent;
          res.status(200).send(surveys);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
surveyRouter.get('/api/:surveyId/:choice', function (req, res) {
  res.send('Thanks for voting!');
});
surveyRouter.post('/api/webhooks', function (req, res) {
  // [
  //     ...
  //     ,
  //     {
  //       email: 'example@test.com',
  //       timestamp: 1623847301,
  //       'smtp-id': '<14c5d75ce93.dfd.64b469@ismtpd-555>',
  //       event: 'group_resubscribe',
  //       category: [ 'cat facts' ],
  //       sg_event_id: 'sjAGD-sH5G8OLHLryPj18g==',
  //       sg_message_id: '14c5d75ce93.dfd.64b469.filter0001.16648.5515E0B88.0',
  //       useragent: 'Mozilla/4.0 (compatible; MSIE 6.1; Windows XP; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
  //       ip: '255.255.255.255',
  //       url: 'http://www.sendgrid.com/',
  //       asm_group_id: 10
  //     }
  // ]
  // npx ngrok http 5000 > exposes a port in the web to listen to WebHooks
  var p = new Path('/api/:surveyId/:choice'); // is null if pattern not present

  var events = _.chain(req.body).map(function (_ref) {
    var email = _ref.email,
        url = _ref.url;
    var match = p.test(new URL(url).pathname);
    return match ? _objectSpread({
      email: email
    }, match) : undefined;
  }).compact().uniqBy('email', 'surveyId') // keeps only the unique entries, by {'email','surveyId'}
  .each(function (_ref2) {
    var surveyId = _ref2.surveyId,
        email = _ref2.email,
        choice = _ref2.choice;
    // console.log("updating")
    Survey.updateOne({
      _id: ObjectId(surveyId),
      recipients: {
        $elemMatch: {
          email: email,
          responded: false
        }
      }
    }, {
      $inc: _defineProperty({}, "response.".concat(choice), 1),
      $set: {
        'recipients.$.responded': true
      },
      lastResponded: new Date()
    }).exec();
  }).value(); // console.log("console logging: ", events)


  res.status(200).send(); // to sendgrid
});
surveyRouter.post("/api/createSurvey", requireLogin, requireCredits, function _callee2(req, res) {
  var _req$body, title, subject, body, recipients, response, resp, recip, survey, mailer, user;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          // check if user has enough credits
          // recipients has list of recipientEmails
          _req$body = req.body, title = _req$body.title, subject = _req$body.subject, body = _req$body.body, recipients = _req$body.recipients, response = _req$body.response; // Assume response is a list of response arrays

          resp = {}; //atleast

          if (response) response.map(function (prop) {
            resp[prop] = 0;
          }); // create a doc out of list of response strings added

          recip = recipients.map(function (p) {
            return {
              email: p
            };
          });
          _context2.next = 6;
          return regeneratorRuntime.awrap(new Survey({
            title: title,
            subject: subject,
            body: body,
            recipients: recip,
            // Frontend should be like schema, responded is not necessary
            response: resp,
            _user: req.user,
            dateSent: Date.now()
          }));

        case 6:
          survey = _context2.sent;
          mailer = new Mailer(survey, surveyTemplate(survey)); // Mailer

          _context2.prev = 8;
          _context2.next = 11;
          return regeneratorRuntime.awrap(survey.save());

        case 11:
          _context2.next = 13;
          return regeneratorRuntime.awrap(mailer.sendMail());

        case 13:
          req.user.credits -= 1;
          _context2.next = 16;
          return regeneratorRuntime.awrap(req.user.save());

        case 16:
          user = _context2.sent;
          res.send(user);
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](8);
          res.status(422).send(new Error(_context2.t0));

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[8, 20]]);
});
module.exports = surveyRouter;