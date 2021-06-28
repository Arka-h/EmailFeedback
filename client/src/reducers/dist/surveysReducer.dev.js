"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = surveysReducer;

var _types = require("../actions/types");

function surveysReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case _types.FETCH_SURVEYS:
      return action.payload || false;

    default:
      return state;
  }
}