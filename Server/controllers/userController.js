const User = require("../modules/userModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupUser = async (req, res) => {
  // Check if all fields are completed
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.send({ message: "Please complete all the fields" });
  } else {
    // Check if user exists in DB
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.send({ message: "The user already exist" });
    } else {
      // Create salt and hash
      bcrypt.hash(req.body.password, 10, async (err, hash) => {
        if (hash) {
          let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
          });
          // Save user
          await newUser.save();
          res.send({ message: true });
        } else {
          console.log(err);
          res.send({ message: false });
        }
      });
    }
  }
};

const loginUser = async (req, res) => {
  let user = await User.findOne({ username: req.body.username });
  if (user) {
    bcrypt.compare(req.body.password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign({ id: user._id }, process.env.TOKEN_KEY);

        res.send({ token });
      } else {
        res.send({ message: "Wrong password" });
      }
    });
  } else {
    res.send({ message: "Wrong username" });
  }
};

const verifyUser = async (req, res) => {
  jwt.verify(req.body.token, process.env.TOKEN_KEY, async (err, payload) => {
    if (payload) {
      let user = await User.findOne({ _id: payload.id });
      res.send(user);
    } else {
      res.send({ message: "Session expired" });
    }
  });
};

module.exports = {
  signupUser,
  loginUser,
  verifyUser,
};
