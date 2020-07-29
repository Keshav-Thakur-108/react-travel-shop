const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  gender: String,
});

module.exports = mongoose.model("User", userSchema);
