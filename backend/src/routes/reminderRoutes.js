const express = require("express");
const {
  createReminder,
  getUpComingReminder,
  deleteReminder,
} = require("../handler/reminderHandler");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/create", createReminder);
router.get("/upcoming", getUpComingReminder);
router.delete("/:id", deleteReminder);

module.exports = router;
