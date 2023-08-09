const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  lastLoginTime: String,
  registrationTime: String,
  status: {
    type: String,
    default: "active",
  },
});

module.exports = mongoose.model("User", userSchema);
