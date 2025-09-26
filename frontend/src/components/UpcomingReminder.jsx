import React, { useEffect, useState } from "react";
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

const UpcomingReminder = ({ refreshKey }) => {
  const [reminders, setReminders] = useState([]);

  const fetchUpcomingReminders = () => {
    reminderService
      .getUpComingReminder()
      .then((res) => {
        setReminders(res.data);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const handleDelete = (r) => {
    reminderService
      .deleteReminder(r.id)
      .then((res) => {
        alert("Reminder Deleted:", r.title);
        fetchUpcomingReminders();
      })
      .catch((err) => {
        console.log(err);
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
          ))}
        </List>
      )}
    </Paper>
  );
};

export default UpcomingReminder;
