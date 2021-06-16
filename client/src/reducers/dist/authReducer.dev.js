"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = authReducer;

var _types = require("../actions/types");

// eslint-disable-next-line import/no-anonymous-default-export
function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  // console.log(action)
  switch (action.type) {
    case _types.FETCH_USER:
      return action.payload || false;
    // action.payload => {...} or "" value

    default:
      return state;
  }
}