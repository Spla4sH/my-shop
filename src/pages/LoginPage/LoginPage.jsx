// LoginPage.js
import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { postLogin } from "../../api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*   const handleLogin = (event) => {
    event.preventDefault();
    // Hier kannst du deine Authentifizierungslogik einbauen.
    console.log("Email:", email);
    console.log("Passwort:", password);
  }; */

  const handleLogin = async (event) => {
    event.preventDefault();
    let userData = {
      email: email,
      password: password,
    };
    try {
      const response = await postLogin(userData);
      console.log(response);
    } catch (error) {
      console.error("Error authenticate:", error);
    }
  };

  return (
    <Container
      component={Paper}
      sx={{ marginTop: "200px", padding: 3 }}
      maxWidth="sm"
    >
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Passwort"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Anmelden
          </Button>
          <Button>Registrieren</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
