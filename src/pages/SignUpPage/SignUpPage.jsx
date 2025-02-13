import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { postLogin, postSignup } from "../../api";

// Die SignUpPage-Komponente ermöglicht es neuen Nutzern, sich zu registrieren
const SignUpPage = () => {
  // Initialisieren der Formular-Daten mit useState.
  // Alle Felder (Vorname, Nachname, Adresse, usw.) werden in einem Objekt gesammelt.
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

  // useTranslation liefert die Übersetzungsfunktion t.
  const { t } = useTranslation();

  // Handler, der alle Änderungen in den Eingabefeldern verarbeitet.
  // Er ermittelt das name-Attribut des Feldes und aktualisiert den entsprechenden Wert in userData.
  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler für das Absenden des Formulars.
  // Er verhindert das Standardverhalten des Formulars und startet den Registrierungsvorgang.
  const handleSignUp = (event) => {
    event.preventDefault();
    console.log("Formulardaten:", userData);

    // Der Signup-Prozess wird gestartet, indem postSignup aufgerufen wird.
    postSignup(userData)
      .then((signupResponse) => {
        console.log(signupResponse);
        // Bei erfolgreicher Registrierung wird im localStorage vermerkt, dass der Nutzer registriert wurde.
        localStorage.setItem("registeredUser", "true");
        // Anschließend wird der Login-Prozess gestartet.
        // Hier wird postLogin mit den gleichen Nutzerdaten aufgerufen.
        return postLogin(userData);
      })
      .then((loginResponse) => {
        console.log("Login erfolgreich:", loginResponse);
      })
      .catch((error) => {
        // Fehler während Signup oder Login werden in der Konsole angezeigt.
        console.error("Fehler beim Signup oder Login:", error);
      })
      .finally(() => {
        console.log("Signup- und Login-Prozess abgeschlossen.");
      });
  };

  // Rendern des Formulars in einem Container, der als Paper dargestellt wird.
  // Der Container wird zentriert.
  return (
    <Container
      component={Paper}
      sx={{ marginTop: "200px", padding: 3 }}
      maxWidth="sm"
    >
      {/* Überschrift, die den Nutzer zur Registrierung auffordert */}
      <Typography variant="h4">{t("sign-up")}</Typography>
      {/* Formular, das den handleSignUp-Handler beim Absenden aufruft */}
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
