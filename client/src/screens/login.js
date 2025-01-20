import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for navigation
import { Button, TextField, Typography, Container, Box } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = ({
  handleAuthTokenChange,
  handleFirstNameChange,
  handleLastNameChange,
  handleProfileImageChange,
  handleEmailChange,
}) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (response) => {
    handleAuthTokenChange(response.credential);
    localStorage.setItem("token", response.credential);
    navigate("/");
  };

  const responseMessage = (response) => {
    handleAuthTokenChange(response.credential);
    localStorage.setItem("token", response.credential);
    const jwtInfo = jwtDecode(response.credential);

    handleEmailChange(jwtInfo.email);
    handleFirstNameChange(jwtInfo.givenName);
    handleLastNameChange(jwtInfo.familyName);
    handleProfileImageChange(jwtInfo.picture);

    navigate("/");
  };

  const errorMessage = (error) => {
    // Handle Google login error
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Email Address
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter email"
          onChange={(e) => setEmailOrUsername(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Typography variant="h6" gutterBottom>
          Password
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0 auto",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{ mb: 3, textTransform: "none" }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/register")}
            sx={{ mb: 3, textTransform: "none" }}
          >
            No account? Register
          </Button>
        </Box>
        <hr />
        <Box sx={{ pt: 1, textAlign: "center" }}>
          <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
