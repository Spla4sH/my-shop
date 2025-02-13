import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
// Importiere React und den useState-Hook zur Verwaltung des Komponenten-Zustands
import React, { useState } from "react";
// Importiere die Funktion zum Authentifizieren (POST-Request an die API)
import { postLogin } from "../../api";
import { useNavigate } from "react-router-dom"; // Add this import

const LoginPage = () => {
  // Lokale Zustände für Email und Passwort, die durch die Eingabefelder aktualisiert werden
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Asynchrone Funktion, die beim Absenden des Formulars ausgeführt wird
  const handleLogin = async (event) => {
    event.preventDefault(); // Verhindert das Standardverhalten des Formulars (Neuladen der Seite)
    // Erstellt ein Objekt mit den eingegebenen Nutzerdaten
    let userData = {
      email: email,
      password: password,
    };
    try {
      // Ruft postLogin auf, um die Nutzerdaten zu senden und eine Antwort der API zu erhalten
      const response = await postLogin(userData);
      console.log(response); // Ausgabe der Antwort in der Konsole
    } catch (error) {
      // Bei einem Fehler während des Logins wird dieser in der Konsole ausgegeben
      console.error("Error authenticate:", error);
    }
  };

  return (
    // Container-Komponente, die als Paper dargestellt wird und den Login-Bereich zentriert anzeigt
    <Container
      component={Paper}
      sx={{ marginTop: "200px", padding: 3 }}
      maxWidth="sm"
    >
      {/* Box, die den Inhalt (Formular) vertikal anordnet und zentriert */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        {/* Überschrift für die Login-Seite */}
        <Typography variant="h4">Login</Typography>
        {/* Formular, das beim Absenden die handleLogin-Funktion ausführt */}
        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          {/* TextField für die Eingabe der Email-Adresse */}
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={email} // Binde den aktuellen Zustand an den Wert des Feldes
            onChange={(e) => setEmail(e.target.value)} // Aktualisiert den Zustand beim Ändern des Eingabefelds
          />
          {/* TextField für die Eingabe des Passworts */}
          <TextField
            label="Passwort"
            type="password" // Verbirgt die Eingabe (Passworttyp)
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Aktualisiert den Passwort-Zustand
          />
          {/* Button zum Absenden des Formulars (Login) */}
          <Button
            type="submit" // Löst beim Klick das onSubmit des Formulars aus
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Anmelden
          </Button>
          {/* Button für die Registrierung */}
          <Button fullWidth sx={{ mt: 2 }} onClick={() => navigate("/signup")}>
            Registrieren
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
