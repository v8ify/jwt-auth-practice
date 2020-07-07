require("dotenv").config();
const jwt = require("jsonwebtoken");

const User = require("../models/User");

exports.signup = function (req, res, next) {
  const { email, password } = req.body;

  // Find if user with email already exits
  User.findOne({ email: email }, function (err, user) {
    if (err) return next(err);

    // If user already exists then
    if (user) {
      return res
        .status(404)
        .send({ success: false, error: "Email already in use" });
    }

    // If user does not exist then save to db and return JWT
    new User({ email: email, password: password }).save(function (err, user) {
      if (err) return next(err);

      // Send jwt token
      jwt.sign(
        { sub: user.id },
        process.env.JWT_SECRET,
        { algorithm: "HS256" },
        function (err, token) {
          if (err) return next(err);

          return res.status(200).json({ success: true, token: token });
        }
      );
    });
  });
};
