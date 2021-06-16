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

var _require = require('@sendgrid/mail'),
    MailService = _require.MailService;

var keys = require('../config/keys');

var Mailer =
/*#__PURE__*/
function (_MailService) {
  _inherits(Mailer, _MailService);

  function Mailer(_ref, content) {
    var _this;

    var subject = _ref.subject,
        recipients = _ref.recipients;

    _classCallCheck(this, Mailer);

    // Enter in Schema format
    _this = _possibleConstructorReturn(this, _getPrototypeOf(Mailer).call(this)); // Client created, can now call 

    _this.setApiKey(keys.sendGridKey); // Set Keys


    _this.data = {
      to: recipients.map(function (r) {
        return r.email;
      }),
      from: 'aurkohaldi@gmail.com',
      subject: subject,
      html: content,
      trackingSettings: {
        clickTracking: {
          enable: true,
          enableText: true
        }
      }
    };
    return _this;
  }

  _createClass(Mailer, [{
    key: "sendMail",
    value: function sendMail() {
      var data,
          content,
          cb,
          _args = arguments;
      return regeneratorRuntime.async(function sendMail$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              data = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              content = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
              cb = _args.length > 2 ? _args[2] : undefined;
              // optionally add any params default 
              if (typeof content === 'function') cb = content;else if (typeof data === 'function') cb = data; // callback handling

              if (data.subject || data.recipients || content) {
                // update whichever is not populated
                this.data.subject = data.subject ? data.subject : this.data.subject;
                this.data.to = data.recipients ? data.recipients.map(function (r) {
                  return r.email;
                }) : this.data.to;
                this.data.html = data.content ? data.content : this.data.html;
              } // check if all three are filled, else error


              if (this.data.subject && this.data.to.length && this.data.html) {
                _context.next = 7;
                break;
              }

              throw new Error("Enter all the required fields: \ndata: { subject: String, recipient(s): String | Array(String) }, \ncontent : String");

            case 7:
              console.log("debugging", this.data);
              _context.next = 10;
              return regeneratorRuntime.awrap(this.send(this.data, true, cb));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Mailer;
}(MailService);

module.exports = Mailer;