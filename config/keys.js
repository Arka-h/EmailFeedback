// Make it so that key.js decides, which keys to use 
// and export that... Basiclly pass the parcel
if (process.env.NODE_ENV === "production") {
  module.exports = require("./prod");
} else {
  module.exports = require("./dev");
}
