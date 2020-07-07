const express = require("express");
const router = express.Router();

// Import controllers
const { signup } = require("../controllers/signup");

// All route have prefix localhost:8000

router.route("/signup").post(signup);

router.route("/signin").post();

router.route("/").get();

module.exports = router;
