// Importiere benötigte Komponenten und Funktionen von Material-UI, React, Redux und weiteren Quellen
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Toolbar,
} from "@mui/material"; // UI-Komponenten für Layout, Buttons, Ladeanzeige, Text und Toolbar
import { useEffect, useState } from "react"; // React-Hooks für Nebenwirkungen (useEffect) und lokalen Zustand (useState)
import { useDispatch, useSelector } from "react-redux"; // Redux-Hooks zur Interaktion mit dem globalen Store
import { useTranslation } from "react-i18next"; // Hook für Internationalisierung (Übersetzungen)
import { getArticles } from "../../api"; // API-Funktion zum Abrufen der Artikel
import ArticleCard from "../../components/ArticleCard/ArticleCard"; // Komponente zur Darstellung eines einzelnen Artikels
import { setSearchText } from "../../store/articleSlice"; // Aktion aus dem ArticleSlice, um den Suchtext im Store zu setzen

// Definiert die Komponente für die Seite, auf der alle Artikel angezeigt werden
function AllArticlesPage() {
  const { t } = useTranslation(); // Holt die Übersetzungsfunktion, die Texte in der gewählten Sprache zurückgibt
  const dispatch = useDispatch(); // Hook, um Aktionen an den Redux-Store zu senden
  const searchText = useSelector((state) => state.articles.searchText); // Liest den aktuellen Suchtext aus dem globalen Redux-Store

  // Lokale Zustände
  const [articles, setArticles] = useState([]); // Zustand zum Speichern aller geladenen Artikel
  const [filteredArticles, setFilteredArticles] = useState([]); // Zustand zum Speichern der Artikel, die den Filterkriterien (Suchtext) entsprechen
  const [loading, setLoading] = useState(true); // Zustand, der angibt, ob aktuell Daten geladen werden

  // useEffect zum Laden der Artikel beim ersten Rendern der Komponente
  useEffect(() => {
    // Definiert eine asynchrone Funktion zum Abrufen der Artikel
    const fetchArticles = async () => {
      try {
        setLoading(true); // Setzt den Ladezustand auf "true", um anzuzeigen, dass Daten abgerufen werden

        // Führt eine zufällige Verzögerung ein, um einen Fake-Delay zwischen 0 und 1000ms zu simulieren
        const randomDelay = Math.floor(Math.random() * 1000);
        await new Promise((resolve) => setTimeout(resolve, randomDelay));

        // Ruft die Artikel-Daten von der API ab
        const data = await getArticles();
        setArticles(data); // Speichert die abgerufenen Artikel im Zustand
        setFilteredArticles(data); // Initial wird die Filterliste mit allen Artikeln befüllt
      } catch (error) {
        console.error("Error fetching articles:", error); // Konsolenausgabe falls ein Fehler beim Laden der Artikel auftritt
      } finally {
        setLoading(false); // Unabhängig vom Erfolg wird der Ladeindikator ausgeschaltet
      }
    };

    fetchArticles(); // Ruft die asynchrone Funktion auf
  }, []); // Leere Abhängigkeiten: Dieser Effekt wird nur einmal beim Mounten der Komponente ausgeführt

  // useEffect zum Aktualisieren der gefilterten Artikel, wenn sich entweder der geladene Artikelbestand oder der Suchtext ändert
  useEffect(() => {
    let filtered = articles; // Beginnt mit allen Artikeln

    // Falls ein Suchtext vorhanden ist, werden die Artikel anhand des Namens oder der Beschreibung gefiltert
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase(); // Konvertiert den Suchtext in Kleinbuchstaben
      filtered = filtered.filter(
        (article) =>
          article.name.toLowerCase().includes(lowerCaseSearchText) || // Prüft, ob der Name des Artikels den Suchtext enthält
          article.description.toLowerCase().includes(lowerCaseSearchText) // Prüft, ob die Beschreibung den Suchtext enthält
      );
    }

    // Aktualisiert den Zustand mit den gefilterten Artikeln
    setFilteredArticles(filtered);
  }, [articles, searchText]); // Dieser Effekt reagiert auf Änderungen in "articles" oder "searchText"

  // Handler-Funktion zum Zurücksetzen des Suchtexts
  const handleClearSearch = () => {
    // Dispatcht die Aktion, um den Suchtext im globalen Store zu leeren
    dispatch(setSearchText(""));
  };

  // Falls sich die Daten noch im Ladevorgang befinden, wird eine Ladeanzeige gerendert
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex", // Flex-Layout zur Zentrierung
          justifyContent: "center", // Zentriert horizontal
          alignItems: "center", // Zentriert vertikal
          flexDirection: "column", // Ordnet Elemente untereinander
        }}
      >
        <CircularProgress /> {/* Animierte Ladeanzeige */}
        <Typography
          variant="h6"
          sx={{
            textAlign: "center", // Zentrierter Text
            marginY: 2, // Vertikaler Abstand
            color: "primary.main", // Verwendet die Hauptfarbe des Themes
          }}
        >
          {t("loading-articles")} {/* Übersetzter Text "Lade Artikel" */}
        </Typography>
      </Box>
    );
  }

  // Haupt-Render der Seite, wenn keine Ladeanzeige mehr erforderlich ist
  return (
    <>
      <Toolbar />{" "}
      {/* Fügt zusätzlichen Platz ein, damit der Inhalt nicht unter der fixierten AppBar verschwindet */}
      <Box
        sx={{
          // Hintergrundfarbe-Beispiel als Kommentar (wird momentan nicht verwendet)
          // backgroundColor: { xs: "red", lg: "green", xl: "yellow" },
          marginY: 10, // Vertikaler Margin
          marginX: { xs: 1, lg: "120px", xl: "280px" }, // Horizontaler Margin, abhängig von der Bildschirmgröße
          display: "flex", // Setzt Flexbox zur Anordnung der Artikel
          flexWrap: "wrap", // Erlaubt Zeilenumbrüche, wenn nicht genug Platz vorhanden ist
          // Justiert den Inhalt abhängig von der Anzahl der gefilterten Artikel
          justifyContent:
            filteredArticles.length <= 3 && filteredArticles.length > 0
              ? { xs: "center", md: "flex-start" } // Bei 1 bis 3 Artikeln zentriert auf kleinen Bildschirmen, linksbündig auf mittleren Geräten
              : "center", // Für mehr als 3 Artikel wird der Inhalt zentriert
          alignItems: "center", // Zentriert die Artikel vertikal
          rowGap: 5, // Abstand zwischen den Zeilen
          columnGap: 1, // Abstand zwischen den Spalten
          paddingTop: 5, // Padding oben zum Abstand vom oberen Rand
        }}
      >
        {filteredArticles.length > 0 ? (
          // Wenn gefilterte Artikel vorhanden sind, werden diese in einer Liste gerendert
          <>
            {filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} /> // Rendert jede ArtikelCard-Komponente mit den Artikel-Daten
            ))}
          </>
        ) : (
          // Falls keine Artikel nach der Filterung vorhanden sind, wird eine Information und ein Button angezeigt
          <Box
            sx={{
              display: "flex", // Flex-Container
              justifyContent: "center", // Zentriert horizontal
              alignItems: "center", // Zentriert vertikal
              flexDirection: "column", // Elemente untereinander anordnen
            }}
          >
            <Typography
              variant="h5"
              color="primary.light"
              sx={{ fontWeight: 500 }} // Mittlere Schriftstärke
            >
              {t("no-results")} <b>{searchText}</b>{" "}
              {/* Zeigt an, dass keine Ergebnisse zum Suchtext gefunden wurden */}
            </Typography>
            <Button sx={{ marginTop: 2 }} onClick={handleClearSearch}>
              {t("reset-search")}{" "}
              {/* Übersetzter Button-Text zum Zurücksetzen der Suche */}
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

export default AllArticlesPage; // Exportiert die Komponente für den Einsatz in der App
