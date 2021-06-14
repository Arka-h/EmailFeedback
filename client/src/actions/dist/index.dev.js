"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleToken = exports.fetchUser = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchUser = function fetchUser() {
  return function _callee(dispatch, prevState) {
    var user;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(_axios["default"].get('/api/currentUser'));

          case 2:
            user = _context.sent;
            //not returning a promise but a callback
            dispatch({
              type: _types.FETCH_USER,
              payload: user.data
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  };
};

exports.fetchUser = fetchUser;

var handleToken = function handleToken(token) {
  return function _callee2(dispatch, prevState) {
    var user;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // thunk function
            console.log('token', token);
            _context2.next = 3;
            return regeneratorRuntime.awrap(_axios["default"].post('/api/stripe', token));

          case 3:
            user = _context2.sent;
            dispatch({
              type: _types.FETCH_USER,
              payload: user.data
            });

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    });
  };
};

exports.handleToken = handleToken;