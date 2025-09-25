// src/components/Signup.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";
import { authService } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .signUp({ name, email, password })
      .then((res) => {
        navigate("/login");
        alert("ok");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={3}
    >
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <Box component="form" onSubmit={handleSubmit} maxWidth={400} width="100%">
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            variant="outlined"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Sign Up
          </Button>
        </Stack>
      </Box>

      <Typography mt={2}>
        Already have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/login")}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Signup;
