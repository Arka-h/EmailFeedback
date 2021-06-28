"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxForm = require("redux-form");

var _authReducer = _interopRequireDefault(require("./authReducer"));

var _surveysReducer = _interopRequireDefault(require("./surveysReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = (0, _redux.combineReducers)({
  auth: _authReducer["default"],
  form: _reduxForm.reducer,
  // as in the redux-form docs
  surveys: _surveysReducer["default"]
});

exports["default"] = _default;