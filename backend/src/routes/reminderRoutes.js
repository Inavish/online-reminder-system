const express = require("express");
const { createReminder } = require("../handler/reminderHandler");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/create", createReminder);

module.exports = router;
