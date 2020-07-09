require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;

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

// Local strategy for signin
const localStrategy = new LocalStrategy({ usernameField: "email" }, function (
  email,
  password,
  done
) {
  User.findOne({ email: email }, function (err, user) {
    if (err) return done(err);

    // If user with given email does exist
    if (user) {
      user.comparePassword(password, function (err, isMatch) {
        if (err) return done(err);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    } else {
      return done(null, false);
    }
  });
});

passport.use(jwtStrategy);
passport.use(localStrategy);
