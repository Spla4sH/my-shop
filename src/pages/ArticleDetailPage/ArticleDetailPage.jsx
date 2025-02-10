// Importiere UI-Komponenten von Material-UI zum Erstellen von Layout, Buttons, Karten usw.
import {
  Box, // Container-Komponente zum Layouten und Gruppieren von Elementen
  Button, // Button-Komponente für klickbare Buttons
  Card, // Card-Komponente als Container für Inhalte
  CardActions, // Container für Aktionen/Beschriftungen am unteren Rand der Karte
  CardContent, // Container für den Hauptinhalt der Karte
  CardMedia, // Komponente zum Anzeigen von Medien (z. B. Bildern) in der Karte
  CircularProgress, // Ladeindikator, wenn Daten geladen werden
  Divider, // Horizontale Linie zur Trennung von Abschnitten
  FormControl, // Formularelement, um Eingabefelder wie Selects zu gruppieren und zu stylen
  InputLabel, // Label-Komponente für Formulareingaben
  MenuItem, // Einzelfall in einem Select (Dropdown-Menü)
  Select, // Dropdown-Select-Komponente
  Typography, // Textkomponente zum Anzeigen von Überschriften und Fließtext
} from "@mui/material";

// Importiere React und benötigte Hooks
import React, { useEffect, useState } from "react";
// Importiere Redux Hooks und React Router Funktionen
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Importiere den Übersetzungshook für Mehrsprachigkeit
import { useTranslation } from "react-i18next";
// Importiere die API-Funktion zum Abrufen eines einzelnen Artikels anhand der ID
import { getArticleById } from "../../api";
// Importiere die Aktion zum Hinzufügen eines Artikels in den Warenkorb
import { addToCart } from "../../store/articleSlice";

// Definiert die Artikeldetail-Seite als funktionale Komponente
function ArticleDetailPage() {
  const { t } = useTranslation(); // Holt die Übersetzungsfunktion, um Texte je nach Sprache darzustellen
  const [quantity, setQuantity] = useState(1); // Zustandsvariable für die gewünschte Artikelmenge (Standard: 1)
  const [article, setArticle] = useState(null); // Zustand für die aktuellen Artikeldaten (zunächst null)
  const [loading, setLoading] = useState(false); // Zustand, der anzeigt, ob die Artikeldaten gerade geladen werden
  const [error, setError] = useState(null); // Zustand für eventuelle Fehlermeldungen beim Laden

  // Holt die articleId aus den URL-Parametern
  const { articleId } = useParams();

  // useEffect: Lädt den Artikel, sobald sich die articleId ändert oder beim initialen Rendern
  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return; // Falls keine ID vorhanden ist, wird nichts geladen
      setLoading(true); // Setzt den Ladezustand aktiv
      setError(null); // Setzt eventuelle vorherige Fehler zurück
      try {
        const el = await getArticleById(articleId); // Ruft Artikel-Daten über die API ab
        setArticle(el); // Speichert die erhaltenen Artikeldaten im Zustand
      } catch (error) {
        // Loggt den Fehler in die Konsole und zeigt eine Fehlermeldung mittels i18n an
        console.error(`Error fetching article with id ${articleId}:`, error);
        setError(t("failed-to-load-article"));
      } finally {
        setLoading(false); // Beendet den Ladezustand, unabhängig vom Erfolg oder Misserfolg
      }
    };

    fetchArticle(); // Führt die obige Funktion aus
  }, [articleId, t]); // Abhängigkeiten: erneutes Ausführen, wenn sich articleId oder die Übersetzungsfunktion ändert

  const navigate = useNavigate(); // Erlaubt die Navigation zu anderen Seiten
  const dispatch = useDispatch(); // Ermöglicht das Senden von Aktionen an den Redux-Store

  // Handler, der den Artikel zusammen mit der gewünschten Menge in den Warenkorb legt
  const handleAddToCart = () => {
    dispatch(addToCart({ id: article._id, quantity })); // Dispatcht eine Aktion mit Artikel-ID und Menge
    console.log("Added to cart: ", article.name); // Gibt zur Bestätigung in der Konsole aus, welcher Artikel hinzugefügt wurde
  };

  // Rendern der Seite:
  // Abhängig vom Zustand (Laden, Fehler, Artikel gefunden oder nicht gefunden) werden unterschiedliche UI-Elemente angezeigt.
  return (
    <Box sx={{ paddingTop: 20, m: 2 }}>
      {loading ? (
        // Ladeanzeige: Wird gerendert, wenn die Artikeldaten noch geladen werden
        <Box
          sx={{
            display: "flex", // Nutzt Flexbox zum Zentrieren
            justifyContent: "center", // Zentriert den Inhalt horizontal
            alignItems: "center", // Zentriert den Inhalt vertikal
            height: "40vh", // Höhe: 40% der Viewport-Höhe
          }}
        >
          <CircularProgress /> {/* Zeigt eine kreisförmige Ladeanzeige */}
        </Box>
      ) : error ? (
        // Fehleranzeige: Wird gerendert, falls ein Fehler beim Laden auftrat
        <Typography variant="h6" color="error" textAlign="center">
          {error}
        </Typography>
      ) : article ? (
        // Anzeige des Artikels, wenn die Daten erfolgreich geladen wurden
        <Card
          sx={{
            width: { xs: "95%", md: "80%" }, // Breite passt sich an unterschiedliche Bildschirmgrößen an
            height: "auto",
            margin: "auto",
            display: "flex", // Setzt Flexbox ein, um Bild und Inhalt nebeneinander (bei Desktop) oder untereinander (bei Mobil) anzuzeigen
            flexDirection: { xs: "column", md: "row" }, // Richtet die Elemente bei kleineren Geräten vertikal und bei größeren horizontal an
            boxShadow: 3, // Leichter Schatten für ein abgesetztes Aussehen der Karte
          }}
        >
          {/* Linke Seite: Darstellung des Artikelbildes */}
          <CardMedia
            component="img" // Gibt an, dass ein Bild gerendert wird
            sx={{
              width: { xs: "100%", md: "40%", margin: 20 }, // Breite und Margin passen sich an unterschiedliche Bildschirmgrößen an
              objectFit: "contain", // Sorgt dafür, dass das Bild komplett sichtbar bleibt (ohne Beschnitt)
              height: { xs: 200, md: "auto" }, // Höhe fixiert auf 200 bei kleinen Bildschirmen oder automatisch bei größeren
            }}
            image={article.href.replace("3005", "3030")} // Passt die Bild-URL an (ersetzt 3005 durch 3030)
            alt={article.name} // Alternativer Text für das Bild, z. B. bei Ladeproblemen
          />

          {/* Rechte Seite: Anzeige der Artikeldetails */}
          <Box
            sx={{
              padding: 2, // Innenabstand innerhalb des Content-Bereichs
              display: "flex", // Nutzt Flexbox für Anordnung des Inhalts
              flexDirection: "column", // Ordnet die Inhalte vertikal an
              width: { xs: "100%", md: "60%" }, // Breite passt sich an: Komplett bei Mobil, 60% bei Desktop
            }}
          >
            {/* Hauptinhalt der Karte */}
            <CardContent sx={{ flexGrow: 1 }}>
              {/* Artikelname als Überschrift */}
              <Typography
                variant="h4" // Überschrift 4
                sx={{
                  fontWeight: "bold", // Fett gedruckter Text
                  mb: 2, // Margin-Bottom für Abstand
                  color: "primary.dark", // Verwendet die dunkle Primärfarbe des Themes
                  fontSize: { xs: "24px", md: "32px" }, // Schriftgröße passt sich an die Bildschirmgröße an
                }}
              >
                {article.name} {/* Zeigt den Namen des Artikels */}
              </Typography>
              <Divider sx={{ marginY: 2 }} />{" "}
              {/* Horizontale Linie zur optischen Trennung */}
              <Typography variant="h5" sx={{ mb: 1, color: "black" }}>
                Preis: {article.price} € {/* Anzeige des Preises */}
              </Typography>
              {/* Beschreibung des Artikels */}
              <Typography variant="body1" sx={{ mb: 1 }}>
                {article.description}
              </Typography>
              {/* Anzeige der Verfügbarkeit: Grüne Farbe, wenn verfügbar; Orange, wenn nicht */}
              <Typography
                variant="body1"
                sx={{ mt: 2, color: article.quantity > 0 ? "green" : "orange" }}
              >
                {article.quantity > 0 ? t("available") : t("not-available")}
              </Typography>
            </CardContent>

            {/* Aktionen des Artikels, wie z. B. Auswahl der Menge und Hinzufügen zum Warenkorb */}
            <CardActions
              sx={{
                display: "flex", // Flexbox zur Anordnung der Aktionen
                justifyContent: "flex-end", // Richtet Aktionen am rechten Rand aus
                flexDirection: { xs: "column", md: "row" }, // Wechselt zwischen Spalten (bei Mobil) und Zeilen (bei Desktop)
                gap: 2, // Abstand zwischen den Elementen
              }}
            >
              <Box
                sx={{
                  display: "flex", // Gruppiert Auswahl und Button in einem flexiblen Container
                  flexDirection: "column", // Ordnet die Elemente vertikal
                  gap: 1, // Kleiner Abstand zwischen den Elementen
                  width: "100%", // Nimmt die gesamte verfügbare Breite ein
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("quantity")} {/* Beschriftung des Dropdowns: "Menge" */}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label" // Verknüpft das Label mit dem Select
                    id="demo-simple-select"
                    value={quantity} // Aktuell ausgewählte Menge
                    label={t("quantity")} // Label des Selects in der aktuellen Sprache
                    onChange={(event) => setQuantity(event.target.value)} // Aktualisiert den Zustand, wenn eine neue Menge ausgewählt wird
                  >
                    {/* Definiert die möglichen Mengenwerte als Menüelemente */}
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
                {/* Button zum Hinzufügen des Artikel in den Warenkorb */}
                <Button
                  size="large"
                  variant="contained" // Stil: ausgefüllter Button
                  color="primary" // Verwendet die Primärfarbe
                  onClick={handleAddToCart} // Beim Klick wird der Artikel in den Warenkorb gelegt
                >
                  {t("add-to-cart")}
                </Button>
              </Box>
            </CardActions>
          </Box>
        </Card>
      ) : (
        // Falls kein Artikel gefunden wurde, wird eine Fehlermeldung angezeigt
        <Typography variant="h6" color="error" textAlign="center">
          {t("article-not-found")}
        </Typography>
      )}

      {/* Schaltfläche zum Zurücknavigieren zu allen Artikeln */}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Button sx={{ marginTop: 4 }} onClick={() => navigate("/articles")}>
          {t("back-to-all-articles")}
        </Button>
      </Box>
    </Box>
  );
}

export default ArticleDetailPage; // Exportiert die Komponente, damit sie in der App verwendet werden kann
