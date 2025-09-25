const cron = require("node-cron");
const { processDueReminders } = require("./processReminders");

function startCron() {
  // runs every minute
  cron.schedule("* * * * *", async () => {
    console.log("Running reminder cron at", new Date());
    await processDueReminders();
  });
}

module.exports = { startCron };
