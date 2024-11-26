const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, " please add the user name"],
    },
    email: {
      type: String,
      required: [true, " please add the user email address"],
      unique: [true, "email already Registered"],
    },
    password: {
      type: String,
      required: [true, " please add the user password"],
    },
  },
  {
    timestampes: true,
  }
);

module.exports = mongoose.model("user", userSchema);
