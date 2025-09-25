import React, { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils";
import Navbar from "./Navbar";
import ReminderForm from "./ReminderForm";

const Dashboard = () => {
  const [reminders, setReminders] = useState([]);

  return (
    <Box>
      <Navbar />
      <Box p={3}>
        {/* Create Reminder Form */}
        <ReminderForm />
        {/* Upcoming Reminders */}
        <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Upcoming Reminders
          </Typography>
          {reminders.length === 0 ? (
            <Typography>No reminders yet.</Typography>
          ) : (
            <List>
              {reminders.map((r, index) => (
                <ListItem key={index} divider>
                  <ListItemText
                    primary={r.title}
                    secondary={`${r.description || ""} — ${new Date(
                      r.datetime
                    ).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
