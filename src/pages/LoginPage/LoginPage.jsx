// Importiere benötigte Komponenten von Material-UI für Layout, Formulare, Buttons und Typografie
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

const LoginPage = () => {
  // Lokale Zustände für Email und Passwort, die durch die Eingabefelder aktualisiert werden
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Früher wurde hier eine synchron arbeitende Funktion handleLogin kommentiert,
  // die stattdessen durch die asynchrone Fassung ersetzt wurde.

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
      console.log(response); // Ausgabe der Antwort in der Konsole (hier kann z.B. die Navigation oder Speicherung des Tokens erfolgen)
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
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {/* Formular, das beim Absenden die handleLogin-Funktion ausführt */}
        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          {/* TextField für die Eingabe der Email-Adresse */}
          <TextField
            label="Email" // Beschriftung des Felds
            type="email" // Definiert den Eingabetyp als Email
            variant="outlined" // Verwenden eines Umriss-Stils
            margin="normal" // Normale Margin-Einstellung
            fullWidth // Nimmt die gesamte verfügbare Breite ein
            required // Pflichtfeld
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
          {/* Zusätzlich vorhandener Button für die Registrierung (ohne Event-Handler) */}
          <Button>Registrieren</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
