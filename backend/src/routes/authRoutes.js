const express = require("express");
const router = express.Router();
const { signUp } = require("../handler/authHandler");

router.post("/signup", signUp);

module.exports = router;
