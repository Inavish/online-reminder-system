import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  TextField,
  Stack,
  Paper,
} from "@mui/material";
import { reminderService } from "../services/reminderService";
const ReminderForm = ({ onCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [datetime, setDatetime] = useState("");
  // Add new reminder
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!title || !datetime) return;
    const selected = new Date(datetime);
    const now = new Date();
    if (selected < now) {
      alert("Please choose a future date and time.");
      return;
    }

    reminderService
      .createReminder({
        title,
        description,
        send_at: new Date(datetime).toISOString(),
      })
      .then(() => {
        alert("Reminder Created");
        if (typeof onCreated === "function") {
          onCreated();
        }
      })
      .catch((err) => {
        console.error("Failed to create reminder:", err);
      });
    setTitle("");
    setDescription("");
    setDatetime("");
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, maxWidth: 600, margin: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Create a Reminder
      </Typography>
      <Box component="form" onSubmit={handleAddReminder}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            fullWidth
          />
          <TextField
            label="Date & Time"
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: (() => {
                const n = new Date();
                const pad = (v) => String(v).padStart(2, "0");
                const yyyy = n.getFullYear();
                const mm = pad(n.getMonth() + 1);
                const dd = pad(n.getDate());
                const hh = pad(n.getHours());
                const mi = pad(n.getMinutes());
                return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
              })(),
            }}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Add Reminder
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ReminderForm;
