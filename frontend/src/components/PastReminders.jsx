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

const PastReminders = () => {
  const [reminders, setReminders] = useState([]);

  const fetchPastReminders = () => {
    reminderService
      .getPastReminders()
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
      .then(() => {
        alert("Reminder Deleted: " + r.title);
        fetchPastReminders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPastReminders();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Past Reminders
      </Typography>
      {reminders.length === 0 ? (
        <Typography>No past reminders.</Typography>
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
                  r.send_at
                ).toLocaleString()}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default PastReminders;
