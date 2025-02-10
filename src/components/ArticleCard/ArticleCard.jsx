import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box, // NEU: Box importiert für zusätzlichen Wrapper
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addToCart } from "../../store/articleSlice";
import { useTranslation } from "react-i18next";

function ArticleCard({ article }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id: article._id, quantity: 1 }));
    console.log("Added to cart: ", article.name);
  };

  const handleViewDetails = () => {
    navigate(`/article/${article._id}`);
  };

  return (
    <Card
      sx={{
        width: { xs: "75%", md: "20%" },
        height: "320px",
        cursor: "pointer",
        boxShadow: 0,
        p: 1,
        m: 1,
        display: "flex",
        flexDirection: "column",
        // Entferne justifyContent: "space-between" um eine eigene Zentrierung zu ermöglichen
      }}
    >
      <CardMedia
        sx={{
          // Damit das Bild nicht beschnitten wird:
          objectFit: "contain",
          // Container soll ein Quadrat sein:
          aspectRatio: "1 / 1",
          // Passt das Bild proportional an die Breite an:
          width: "100%",
        }}
        component="img"
        height="55%"
        image={article.href.replace("3005", "3030")}
        alt={article.name}
      />

      {/* NEU: Wrapper-Box für zentrierten Inhalt und Buttons */}
      <Box
        sx={{
          flexGrow: 1, // Nimmt den übrigen Platz ein
          display: "flex",
          flexDirection: "column",
          justifyContent: "center", // Vertikale Zentrierung
          alignItems: "center", // Horizontale Zentrierung
        }}
      >
        <CardContent sx={{ textAlign: "center", m: 0, p: 0 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: "bold", paddingTop: 0, m: 0 }}
          >
            {article.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.price} €
          </Typography>
        </CardContent>

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "center", // GEÄNDERT: Von "end" zu "center"
            alignItems: "center", // NEU: Sorgt für horizontale Zentrierung
            gap: 1, // NEU: Abstand zwischen den Buttons
          }}
        >
          <Button variant="outlined" size="small" onClick={handleViewDetails}>
            {t("details")}
          </Button>
          <Button variant="contained" size="small" onClick={handleAddToCart}>
            {t("add-to-cart")}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}

export default ArticleCard;
