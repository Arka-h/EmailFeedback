"use strict";

module.exports = function (survey) {
  return "\n      <html>\n        <body>\n          <div style=\"text-align: center;\">\n            <h3>I'd like your input!</h3>\n            <p>Please answer the following question:</p>\n            <p>".concat(survey.body, "</p>\n            <div>\n              <a href=\"http://localhost:3000\">Yes</a>\n            </div>\n            <div>\n              <a href=\"http://localhost:3000\">No</a>\n            </div>\n          </div>\n        </body>\n      </html>\n    ");
};