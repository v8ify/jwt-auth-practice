const express = require("express");
const router = express.Router();

// All route have prefix localhost:8000

router.route("/signup").post();

router.route("/signin").post();

router.route("/").get();
