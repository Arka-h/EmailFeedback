const mongoose = require("mongoose");
const { Schema } = mongoose;

const MongoURI = require("../config/keys").MongoURI;

mongoose
  .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch(error => {
    console.log(JSON.stringify(error));
  });

// file:///home/arka/Documents/Personal_Interests/Projects/Web/Node/JS_MongoDB.png
// Schema is supppsed to be every bit of properties that every record in our Model class might have
const userSchema = new Schema({
  googleID: String
});
const User = mongoose.model("users", userSchema); //creates a User model

module.exports = User;
