const db = require("../db");

const createReminderInDb = async (reminderData) => {
  const [reminder] = await db("reminders").insert(reminderData).returning("*");

  return reminder;
};

module.exports = {
  createReminderInDb,
};
