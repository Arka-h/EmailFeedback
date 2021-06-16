"use strict";

var _require = require('../../config/keys'),
    redirectDomain = _require.redirectDomain;

module.exports = function (survey) {
  return "\n      <html>\n        <body>\n          <div style=\"text-align: center;\">\n            <h3>".concat(survey.title, "</h3>\n\n            <p>").concat(survey.body, "</p>") + Object.keys(survey.response).map(function (option) {
    return "\n              <div>\n                <a href=\"".concat(redirectDomain, "api/").concat(survey.id, "/").concat(option, "\">").concat(option, "</a>\n              </div>");
  }).join('') + "\n          </div>\n        </body>\n      </html>\n    ";
};