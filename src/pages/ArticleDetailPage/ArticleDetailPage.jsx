import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { getArticleById } from "../../api";
import { addToCart } from "../../store/articleSlice";

function ArticleDetailPage() {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  // Get the articleId from the URL
  const { articleId } = useParams();

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) return;
      setLoading(true); // Start loading
      setError(null); // Reset error state
      try {
        const el = await getArticleById(articleId);
        setArticle(el);
      } catch (error) {
        console.error(`Error fetching article with id ${articleId}:`, error);
        setError(t("failed-to-load-article"));
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchArticle();
  }, [articleId, t]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id: article._id, quantity }));
    console.log("Added to cart: ", article.name);
  };

  return (
    <Box sx={{ paddingTop: 20, m: 2 }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography variant="h6" color="error" textAlign="center">
          {error}
        </Typography>
      ) : article ? (
        <Card
          sx={{
            width: { xs: "95%", md: "80%" },
            height: "auto",
            margin: "auto",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },

            boxShadow: 3,
          }}
        >
          {/* Left side for image */}
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100%", md: "40%", margin: 20 },
              objectFit: "contain",
              height: { xs: 200, md: "auto" },
            }}
            image={article.href.replace("3005", "3030")}
            alt={article.name}
          />

          {/* Right side for content */}
          <Box
            sx={{
              padding: 2,
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "60%" },
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "primary.dark",
                  fontSize: { xs: "24px", md: "32px" },
                }}
              >
                {article.name}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h5" sx={{ mb: 1, color: "black" }}>
                Preis: {article.price} €
              </Typography>

              <Typography variant="body1" sx={{ mb: 1 }}>
                {article.description}
              </Typography>

              <Typography
                variant="body1"
                sx={{ mt: 2, color: article.quantity > 0 ? "green" : "orange" }}
              >
                {article.quantity > 0 ? t("available") : t("not-available")}
              </Typography>
            </CardContent>

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  width: "100%",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {t("quantity")}
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quantity}
                    label={t("quantity")}
                    onChange={(event) => setQuantity(event.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  size="large"
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                >
                  {t("add-to-cart")}
                </Button>
              </Box>
            </CardActions>
          </Box>
        </Card>
      ) : (
        <Typography variant="h6" color="error" textAlign="center">
          {t("article-not-found")}
        </Typography>
      )}
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

export default ArticleDetailPage;
