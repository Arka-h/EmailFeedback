"use strict";

var billRouter = require('express').Router();

var _require = require('../config/keys'),
    stripeSecretKey = _require.stripeSecretKey;

var stripe = require('stripe')(stripeSecretKey);

var requireLogin = require('../middlewares/requireLogin'); // We need to explicitly wire up body parser, 
// now depricated, use express.json() instead


billRouter.post("/api/stripe", requireLogin, function _callee(req, res) {
  var charge, user;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripe.charges.create({
            amount: 100,
            currency: 'usd',
            source: req.body.id,
            // token that we got back from user
            shipping: {
              name: req.body.email,
              address: {
                //// ERR: As per Indian regulations, export transactions require a customer name and address 
                line1: "line1",
                city: "city",
                country: "US",
                line2: "line2",
                postal_code: "postal_code",
                state: "state"
              }
            },
            description: '$1 for 5 tokens'
          }));

        case 2:
          charge = _context.sent;
          console.log(charge);
          req.user.credits += 5;
          _context.next = 7;
          return regeneratorRuntime.awrap(req.user.save());

        case 7:
          user = _context.sent;
          res.send(user);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = billRouter;