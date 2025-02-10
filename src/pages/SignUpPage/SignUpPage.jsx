import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { postLogin, postSignup } from "../../api";

const SignUpPage = () => {
  // Initialisieren der Formular-Daten
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    street: "",
    postcode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    password: "",
  });

  const { t } = useTranslation();

  // Handler, der alle Änderungen in den Eingabefeldern verarbeitet
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler für das Absenden des Formulars
  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("Formulardaten:", userData);

    // Starte den Signup-Prozess
    postSignup(userData)
      .then((signupResponse) => {
        console.log(signupResponse);
        localStorage.setItem("registeredUser", "true");
        // Nach erfolgreichem Signup, führe den Login aus
        return postLogin(userData); // Hier evtl. andere Daten oder Token verwenden
      })
      .then((loginResponse) => {
        console.log("Login erfolgreich:", loginResponse);

        // Hier kannst du weitere Aktionen nach dem Login durchführen
      })
      .catch((error) => {
        console.error("Fehler beim Signup oder Login:", error);
      })
      .finally(() => {
        console.log("Signup- und Login-Prozess abgeschlossen.");
        // Hier kannst du abschließende Aktionen vornehmen, z.B. das UI aktualisieren
      });
  };

  return (
    <Container
      component={Paper}
      sx={{ marginTop: "200px", padding: 3 }}
      maxWidth="sm"
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {t("sign-up")}
      </Typography>
      <form onSubmit={handleSignUp}>
        <Grid container spacing={2}>
          {/* Vorname */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Vorname"
              name="firstname"
              value={userData.firstname}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Nachname */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nachname"
              name="lastname"
              value={userData.lastname}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Straße */}
          <Grid item xs={12}>
            <TextField
              label="Straße"
              name="street"
              value={userData.street}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Postleitzahl */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Postleitzahl"
              name="postcode"
              value={userData.postcode}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Stadt */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Stadt"
              name="city"
              value={userData.city}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Land */}
          <Grid item xs={12}>
            <TextField
              label="Land"
              name="country"
              value={userData.country}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Telefon */}
          <Grid item xs={12}>
            <TextField
              label="Telefon"
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* E-Mail */}
          <Grid item xs={12}>
            <TextField
              label="E-Mail"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Passwort */}
          <Grid item xs={12}>
            <TextField
              label="Passwort"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>

          {/* Absende-Button */}
          <Grid item xs={12}>
            <Button variant="contained" type="submit" color="primary" fullWidth>
              {t("sign-up")}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default SignUpPage;
