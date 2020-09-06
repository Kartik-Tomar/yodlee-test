const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true,
   },
   mobileNumber: {
      type: Number,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = User = mongoose.model("Users", UserSchema);