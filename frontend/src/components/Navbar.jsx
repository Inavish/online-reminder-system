import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils";

const Navbar = () => {
  const navigate = useNavigate();
  // Logout handler
  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Online Reminder App
        </Typography>
        <Button color="inherit" onClick={() => navigate("/profile")}>
          Profile
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
