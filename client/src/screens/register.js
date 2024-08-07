import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for navigation
import { Button, TextField, Typography, Container, Box } from '@mui/material';
import { GoogleLogin } from "@react-oauth/google";

const Register = ({ handleAuthTokenChange }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (response) => {
    handleAuthTokenChange(response.credential);
    localStorage.setItem("token", response.credential);
    navigate("/");
  };

  const responseMessage = (response) => {
    // Handle Google login success
  };

  const errorMessage = (error) => {
    // Handle Google login error
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>Email Address</Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter email"
          onChange={(e) => setEmailOrUsername(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" gutterBottom>Password</Typography>
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box sx={{display: "flex",justifyContent: "center", margin: "0 auto"}}>
        <Button
          variant="outlined"
          onClick={() => navigate("/register")}
          sx={{ mb: 3 }}
        >
          No account? Register
        </Button>
        <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mb: 3 }}>
          Login
        </Button>
        </Box>
        <hr />
        <Box sx={{ pt: 1, textAlign: 'center' }}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
