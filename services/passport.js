require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/User");

// jwt strategy for routes that require user to be logged in e.g. homeroute "/"
const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  },
  function (payload, done) {
    // Here payload contains sub property which when decoded with jwtOption above gives us id
    // This id used to check if user exists in out database
    User.findOne({ _id: payload.sub }, function (err, user) {
      if (err) return done(err);

      if (user) return done(null, user);
      else {
        return done(null, false);
      }
    });
  }
);

passport.use(jwtStrategy);
