import * as React from "react";
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import shopIcon from "../../assets/icons/icons8-shopee-100.png";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageButton from "../LanguageButton/LanguageButton";
import ArticleSearch from "../ArticleSearch/ArticleSearch";
import { getCategories } from "../../api";
import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

import CartButtonWithArticlesCount from "../CartButtonWithArticlesCount/CartButtonWithArticlesCount";

export default function AppBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);

  const [categoriesList, setCategoriesList] = useState([]);

  function handleCategoryClick(categoryId) {
    if (categoryId === "all") navigate("/articles");
    else {
      navigate(`/category/${categoryId}`);
    }
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Erstes Element hinzufügen: "Alle Artikel"
    // Dann die vorhandenen Kategorien aus "categories" übernehmen
    const updatedCategories = [
      { _id: "all", name: "Alle Artikel" },
      ...categories,
    ];

    // Die neue Liste setzen
    setCategoriesList(updatedCategories);
  }, [categories]);

  return (
    <Box sx={{ flexGrow: 1, textAlign: "start" }}>
      <MuiAppBar position="static">
        <Toolbar
          sx={{
            height: { xs: "70px", md: "85px" },
            backgroundColor: "primary.dark",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              justifyContent: "flex-start",
              alignItems: "center",
              width: "33%",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img
                src={shopIcon}
                alt="cart icon"
                style={{ width: 40, height: "auto" }}
              />
              <Typography
                variant="h5"
                sx={{
                  marginLeft: 1,
                  fontWeight: 600,
                  fontSize: { xs: "20px", md: "24px" },
                }}
              >
                My Shop
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              justifyContent: "center",
              alignItems: "center",
              width: "33%",
            }}
          >
            <ArticleSearch />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              width: "33%",
            }}
          >
            <LanguageButton />
            <CartButtonWithArticlesCount
              color={location.pathname == "/cart" ? "secondary.main" : "white"}
            />
          </Box>
        </Toolbar>

        {/* ArticleSearch for mobile */}
        <Toolbar
          sx={{
            display: {
              xs: "flex",
              md: "none",
            },
            height: "50px",
            backgroundColor: "primary.main",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
          }}
        >
          <ArticleSearch />
        </Toolbar>

        <Toolbar
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
            height: {
              xs: "40px",
              md: "60px",
            },
          }}
        >
          {categoriesList.map((category) => (
            <Button
              key={category._id}
              color="inherit"
              onClick={() => handleCategoryClick(category._id)}
              sx={{
                height: "100%",
                borderRadius: 0,
              }}
            >
              {category.name}
            </Button>
          ))}
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
