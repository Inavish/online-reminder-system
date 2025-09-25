import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WelcomePage = ({}) => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  const handleSignup = () => navigate("/signup");
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Typography variant="h4" gutterBottom>
        Welcome
      </Typography>
      <Stack spacing={2} direction="row">
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleSignup}>
          Signup
        </Button>
      </Stack>
    </Box>
  );
};

export default WelcomePage;
