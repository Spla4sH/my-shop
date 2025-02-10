import * as React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Slide,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import shopIcon from "../../assets/icons/icons8-shopee-100.png";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageButton from "../LanguageButton/LanguageButton";
import ArticleSearch from "../ArticleSearch/ArticleSearch";
import { getCategories } from "../../api";
import { useTranslation } from "react-i18next";
import CartButtonWithArticlesCount from "../CartButtonWithArticlesCount/CartButtonWithArticlesCount";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function AppBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  function handleCategoryClick(categoryId) {
    if (categoryId === "all") {
      navigate("/articles");
    } else {
      navigate(`/category/${categoryId}`);
    }
    // Schließe das Menü, wenn ein Element ausgewählt wurde
    setMobileOpen(false);
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

  useEffect(() => {
    console.log("test");
    console.log(registeredUser);
    const registered = localStorage.getItem("registeredUser");
    console.log("registered:", registered);
    if (registered) {
      setRegisteredUser(true);
      console.log("xxxx:", registered);
    }
  }, []);
  // Inhalt des Drawers (Burger-Menü) für mobile Ansichten
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ width: 250 }}>
      <List>
        {categoriesList.map((category) => (
          <ListItem key={category._id} disablePadding>
            <ListItemButton onClick={() => handleCategoryClick(category._id)}>
              <ListItemText primary={category.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, textAlign: "start" }}>
      <HideOnScroll>
        <MuiAppBar position="fixed">
          {/* Obere Toolbar mit Logo und Desktop-Elementen */}
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
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
              {!registeredUser && (
                <Button
                  sx={{
                    backgroundColor: "#FF9900", // Amazon Orange
                    color: "#fff",
                    padding: { xs: "8px 12px", sm: "10px 20px" },
                    margin: "5px",
                    borderRadius: "4px",
                    fontWeight: "bold",
                    textTransform: "none",
                    boxShadow: "none",
                    width: { xs: "130px", sm: "160px" },
                    "&:hover": {
                      backgroundColor: "#e88b00",
                    },
                  }}
                  variant="contained"
                  size="medium"
                  onClick={() => navigate("/signup")}
                >
                  {t("sign-up")}
                </Button>
              )}
              <Button
                sx={{
                  backgroundColor: "#fff",
                  color: "#111",
                  padding: { xs: "8px 12px", sm: "10px 20px" },
                  margin: "5px",
                  borderRadius: "4px",
                  fontWeight: "bold",
                  textTransform: "none",
                  border: "1px solid #ccc",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  width: { xs: "130px", sm: "160px" },
                  "&:hover": {
                    backgroundColor: "#f2f2f2",
                  },
                }}
                variant="outlined"
                size="medium"
                onClick={() => navigate("/login")}
              >
                {t("login")}
              </Button>

              <CartButtonWithArticlesCount
                color={
                  location.pathname === "/cart" ? "secondary.main" : "white"
                }
              />
            </Box>
          </Toolbar>

          {/* Mobile Toolbar: Burger-Menü-Icon + Suchfeld */}
          <Toolbar
            sx={{
              display: { xs: "flex", md: "none" },
              height: "50px",
              backgroundColor: "primary.main",
              alignItems: "center",
              pl: 1,
              pr: 1,
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <ArticleSearch />
          </Toolbar>

          {/* Desktop-Kategorien (nur für md und größere Ansichten) */}
          <Toolbar
            sx={{
              display: { xs: "none", md: "block" },
              height: { xs: "40px", md: "60px" },
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
      </HideOnScroll>

      {/* Drawer für mobile Kategorien */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // verbessert die Leistung bei mobilen Geräten
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
