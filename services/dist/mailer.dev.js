"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var sendgrid = require('sendgrid');

var helper = sendgrid.mail;

var keys = require('../config/keys');

var Mailer =
/*#__PURE__*/
function (_helper$Mail) {
  _inherits(Mailer, _helper$Mail);

  function Mailer(_ref, content) {
    var _this;

    var subject = _ref.subject,
        recipients = _ref.recipients;

    _classCallCheck(this, Mailer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mailer).call(this));
    _this.sgApi = sendgrid(keys.sendGridKey);
    _this.from_email = new helper.Email('aurkohaldi@gmail.com');
    _this.subject = subject;
    _this.body = new helper.Content("text/html", content);
    _this.recipients = recipients.map(function (r) {
      return new helper.Email(r.email);
    });

    _this.addContent(_this.body);

    _this.addClickTracking();

    _this.addRecipients();

    return _this;
  }

  _createClass(Mailer, [{
    key: "addRecipients",
    value: function addRecipients() {
      var personalize = new helper.Personalization();
      this.recipients.forEach(function (recipient) {
        return personalize.addTo(recipient);
      });
      this.addPersonalization(personalize);
    }
  }, {
    key: "addClickTracking",
    value: function addClickTracking() {
      var trackingSettings = new helper.TrackingSettings();
      var clickTracking = new helper.ClickTracking(true, true);
      trackingSettings.setClickTracking(clickTracking);
      this.addTrackingSettings(trackingSettings);
    }
  }, {
    key: "send",
    value: function send() {
      var request, response;
      return regeneratorRuntime.async(function send$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = this.sgApi.emptyRequest({
                method: 'POST',
                patch: 'v3/mail/send',
                body: this.toJSON()
              });
              response = this.sgApi.API(request);
              return _context.abrupt("return", response);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Mailer;
}(helper.Mail);

module.exports = Mailer;