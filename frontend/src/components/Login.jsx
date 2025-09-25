// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Stack, Link } from "@mui/material";
import { authService } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    authService
      .login({ email, password })
      .then((res) => {
        alert("Login successful!");
        localStorage.setItem("token", res?.data?.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data.error || "Login failed");
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
        Login
      </Typography>
      <Box component="form" onSubmit={handleSubmit} maxWidth={400} width="100%">
        <Stack spacing={2}>
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
            Login
          </Button>
        </Stack>
      </Box>

      <Typography mt={2}>
        Don't have an account?{" "}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;
