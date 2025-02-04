import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AppBar from "./components/AppBar/AppBar";
import Footer from "./components/Footer/Footer";
import AllArticlesPage from "./pages/AllArticlesPage/AllArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage/ArticleDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import Home from "./pages/Home/Home";
import store from "./store/store";
import theme from "./theme/theme";
import i18n from "./i18n/i18n";
import CategoryPage from "./pages/CategoryPage/CategoryPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <CssBaseline />
            <Router basename="/">
              <AppBar />
              <Box sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/articles" element={<AllArticlesPage />} />
                  <Route
                    path="/article/:articleId"
                    element={<ArticleDetailPage />}
                  />
                  <Route
                    path="/category/:categoryId"
                    element={<CategoryPage />}
                  />
                </Routes>
              </Box>
              <Footer />
            </Router>
          </Box>
        </I18nextProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
