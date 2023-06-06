const mongoose = require("./connection");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minlength: [3, "Minimum password length must be 3 characters"],
  },
  registerDate: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
