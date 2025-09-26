import { api } from "./axiousInit";

const createReminder = (payload) => {
  return api.post("/reminders/create", payload);
};

const getUpComingReminder = () => {
  return api.get("/reminders/upcoming");
};

const getPastReminders = () => {
  return api.get("/reminders/past");
};

const deleteReminder = (rId) => {
  return api.delete(`/reminders/${rId}`);
};

export const reminderService = {
  createReminder,
  getUpComingReminder,
  getPastReminders,
  deleteReminder,
};
