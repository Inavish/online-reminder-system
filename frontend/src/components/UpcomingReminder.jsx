import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { reminderService } from "../services/reminderService";

const ReminderList = ({ r, index, handleDelete }) => {
  return (
    <ListItem
      key={index}
      divider
      secondaryAction={
        <Box>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDelete(r)}
          >
            Delete
          </Button>
        </Box>
      }
    >
      <ListItemText
        primary={r.title}
        secondary={`${r.description || ""} — ${new Date(
          r.sent_at
        ).toLocaleString()}`}
      />
    </ListItem>
  );
};

const UpcomingReminder = ({ refreshKey }) => {
  const [reminders, setReminders] = useState([]);

  const fetchUpcomingReminders = () => {
    reminderService
      .getUpComingReminder()
      .then((res) => {
        setReminders(res.data);
      })
      .catch((err) => {
        console.error("Failed to load upcoming reminders:", err);
      });
  };

  const handleDelete = (r) => {
    reminderService
      .deleteReminder(r.id)
      .then(() => {
        alert("Reminder Deleted:", r.title);
        fetchUpcomingReminders();
      })
      .catch((err) => {
        console.error("Failed to delete reminder:", err);
      });
  };

  useEffect(() => {
    fetchUpcomingReminders();
  }, [refreshKey]);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Upcoming Reminders
      </Typography>
      {reminders.length === 0 ? (
        <Typography>No reminders yet.</Typography>
      ) : (
        <List>
          {reminders.map((r, index) => (
            <ReminderList
              key={r.id ?? index}
              r={r}
              index={index}
              handleDelete={handleDelete}
            />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UpcomingReminder;
