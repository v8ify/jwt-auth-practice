require("dotenv").config();
const jwt = require("jsonwebtoken");

exports.signin = function (req, res, next) {
  jwt.sign(
    { sub: req.user.id },
    process.env.JWT_SECRET,
    { algorithm: "HS256" },
    function (err, token) {
      if (err) return next(err);

      res.status(200).json({ success: true, token: token });
    }
  );
};
