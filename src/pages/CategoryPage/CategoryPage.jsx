import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticlesByCategory } from "../../api";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import { setSearchText } from "../../store/articleSlice";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function CategoryPage() {
  // Übersetzungsfunktion, um Texte entsprechend der aktuell gewählten Sprache darzustellen.
  const { t } = useTranslation();
  // Versendet Aktionen an den Redux-Store
  const dispatch = useDispatch();
  // Lese den aktuell im Store hinterlegten Suchtext aus.
  const searchText = useSelector((state) => state.articles.searchText);

  // Lokaler Zustand für die geladenen Artikel und deren gefilterte Liste.
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  // Zustand, um anzuzeigen, ob gerade Daten geladen werden.
  const [loading, setLoading] = useState(true);

  // Liest den Parameter categoryId aus der URL aus.
  const { categoryId } = useParams();

  // useEffect zum Laden der Artikel, sobald sich die categoryId ändert.
  useEffect(() => {
    console.log("test:", categoryId); // Debug Test
    const fetchArticles = async () => {
      try {
        // Setze den Ladezustand, bevor die API aufgerufen wird.
        setLoading(true);
        // Rufe die Artikel der Kategorie über die API ab.
        const data = await getArticlesByCategory(categoryId);
        // Speichere die abgefragten Artikel im Zustand.
        setArticles(data);
        // Initialisiere die gefilterte Liste mit allen abgerufenen Artikeln.
        setFilteredArticles(data);
      } catch (error) {
        // Bei Fehlern in der API-Abfrage wird der Fehler in der Konsole ausgegeben.
        console.error("Error fetching articles:", error);
      } finally {
        // Beende den Ladezustand, egal ob erfolgreich oder fehlerhaft.
        setLoading(false);
      }
    };

    fetchArticles();
  }, [categoryId]); // Effekt wird erneut ausgeführt, wenn sich die categoryId ändert

  // useEffect, der die Artikel filtert, wenn sich entweder die Artikel oder der Suchtext ändern.
  useEffect(() => {
    let filtered = articles;

    // Falls ein Suchtext vorhanden ist, werden die Artikel anhand des Namens oder der Beschreibung gefiltert.
    if (searchText) {
      const lowerCaseSearchText = searchText.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.name.toLowerCase().includes(lowerCaseSearchText) ||
          article.description.toLowerCase().includes(lowerCaseSearchText)
      );
    }

    // Aktualisiere den Zustand der gefilterten Artikel.
    setFilteredArticles(filtered);
  }, [articles, searchText]);

  // Handler zum Zurücksetzen des Suchtexts. Dispatcht die Action, um den Suchtext im Redux-Store zu leeren.
  const handleClearSearch = () => {
    dispatch(setSearchText(""));
  };

  // Falls die Daten noch geladen werden, wird eine Ladeanzeige angezeigt.
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress /> {/* Ladeindikator */}
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            marginY: 2,
            color: "primary.main",
          }}
        >
          {t("loading-articles")}{" "}
          {/* Übersetzter Text, dass Artikel geladen werden */}
        </Typography>
      </Box>
    );
  }

  // Rendern der Kategorie-Seite, sobald die Artikel geladen und ggf. gefiltert wurden.
  return (
    <Box
      sx={{
        marginY: 20,
        marginX: { xs: 1, lg: "120px", xl: "280px" },
        display: "flex",
        flexWrap: "wrap",
        justifyContent:
          filteredArticles.length <= 3 && filteredArticles.length > 0
            ? { xs: "center", md: "flex-start" }
            : "center",
        alignItems: "center",
        rowGap: 5,
        columnGap: 1,
        paddingTop: 5,
      }}
    >
      {/* Falls gefilterte Artikel vorhanden sind, werden diese gerendert */}
      {filteredArticles.length > 0 ? (
        <>
          {filteredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} /> // Jede ArticleCard erhält den Artikel
          ))}
        </>
      ) : (
        // Falls durch den Suchtext keine Artikel gefunden werden, wird ein Hinweis mit einem Reset-Button angezeigt.
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h5"
            color="primary.light"
            sx={{ fontWeight: 500 }}
          >
            {t("no-results")} <b>{searchText}</b>
          </Typography>
          <Button sx={{ marginTop: 2 }} onClick={handleClearSearch}>
            {t("reset-search")}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default CategoryPage;
