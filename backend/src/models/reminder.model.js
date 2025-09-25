const db = require("../db");

const createReminderInDb = async (reminderData) => {
  const [reminder] = await db("reminders").insert(reminderData).returning("*");

  return reminder;
};

async function getUpComingReminderFromDb(user) {
  return await db("reminders")
    .where("user_id", user.id)
    .andWhere("send_at", ">=", new Date())
    .andWhere("sent", false)
    .orderBy("send_at", "asc");
}

async function getReminderById(id) {
  const reminder = await db("reminders").where("id", id).first();
  return reminder || null;
}

async function deleteReminderById(id) {
  return await db("reminders").where("id", id).del();
}

/**
 * Fetch all due reminders (not yet sent) with user email.
 * @param {Date} now - Current date/time
 * @returns {Promise<Array>}
 */
async function getDueReminders(now) {
  let query = db("reminders")
    .join("users", "reminders.user_id", "users.id")
    .select("reminders.*", "users.email as user_email")
    .where("send_at", "<=", now)
    .andWhere("sent", false);

  return query;
}

/**
 * Mark a reminder as sent
 * @param {number} reminderId
 * @returns {Promise<number>} number of rows updated
 */
async function markAsSent(reminderId) {
  return db("reminders").where({ id: reminderId }).update({
    sent: true,
    sent_at: db.fn.now(), // sets to current DB time
  });
}

module.exports = {
  createReminderInDb,
  getDueReminders,
  markAsSent,
  getUpComingReminderFromDb,
  getReminderById,
  deleteReminderById,
};
