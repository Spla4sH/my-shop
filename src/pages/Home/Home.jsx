import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getArticles } from "../../api";
import ArticleCard from "../../components/ArticleCard/ArticleCard";

function Home() {
  // useTranslation liefert die Übersetzungsfunktion t, sowie i18n (falls benötigt)
  const { t, i18n } = useTranslation();
  // Zustand zum Speichern der gerade angezeigten Anzahl von Artikeln (Initial 4)
  const [numberOfArticles, setNumberOfArticles] = useState(4);
  // Zustand für die Liste aller geladenen Artikel
  const [articles, setArticles] = useState([]);

  // useEffect, der beim initialen Rendern die Artikel von der API abruft
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // API-Aufruf zum Laden der Artikel
        const data = await getArticles();
        setArticles(data); // Setzt die geladenen Artikel in den lokalen Zustand
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Funktion, die die Anzahl der angezeigten Artikel um 4 erhöht
  const handleShowMore = () => {
    setNumberOfArticles((prev) => prev + 4);
  };

  // boolean, der prüft, ob alle Artikel bereits angezeigt werden
  const allArticlesVisible = numberOfArticles >= articles.length;

  return (
    // Rendert den Inhalt nur, wenn mindestens 1 Artikel geladen wurde
    articles.length > 0 && (
      <Box>
        {/* Welcome Section */}
        <Box
          sx={{
            background: "linear-gradient(to right, lightyellow, white)",
            height: { xs: "25vh", md: "40vh" },
            display: "flex",
            marginTop: "100px",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Typography
            variant="h3"
            sx={{ paddingX: 4, fontSize: { xs: "28px", md: "50px" } }}
          >
            {t("welcome-to")} <b>{t("page")}</b>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 300,
              mt: 1,
              fontSize: { xs: "14px", md: "28px" },
            }}
          >
            {t("slogan")}
          </Typography>
        </Box>

        {/* Artikelbereich */}
        <Box
          sx={{
            marginY: 2,
            marginX: { xs: 1, lg: "120px", xl: "280px" },
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            rowGap: 5,
            columnGap: 1,
            paddingTop: 5,
          }}
        >
          {/* Zeigt nur die ersten "numberOfArticles" Artikel an */}
          {articles.slice(0, numberOfArticles).map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </Box>

        {/* Show More Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 5,
          }}
        >
          {/* Wenn alle Artikel angezeigt werden, wird der Button disabled und zeigt einen entsprechenden Text */}
          <Button onClick={handleShowMore} disabled={allArticlesVisible}>
            {allArticlesVisible
              ? t("all-articles-shown")
              : t("show-more-articles")}
          </Button>
        </Box>
      </Box>
    )
  );
}

export default Home;
