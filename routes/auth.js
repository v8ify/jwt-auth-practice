require("../services/passport");
const express = require("express");
const router = express.Router();

// Import controllers
const { signup } = require("../controllers/signup");
const { getHome } = require("../controllers/getHome");
const passport = require("passport");

// All route have prefix localhost:8000
router.route("/signup").post(signup);

router.route("/signin").post();

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getHome);

module.exports = router;
