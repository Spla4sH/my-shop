// Importiere Material-UI-Komponenten und Funktionen für Styling und Layout
import { Box, CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// Importiere den I18nextProvider für Mehrsprachigkeit
import { I18nextProvider } from "react-i18next";

// Importiere den Redux-Provider, um den globalen Store zur Verfügung zu stellen
import { Provider } from "react-redux";

// Importiere Router-Komponenten für die Navigation in der SPA
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// Importiere allgemeine CSS-Datei
import "./App.css";

// Importiere selbst erstellte Komponenten für den Header, Footer u.a.
import AppBar from "./components/AppBar/AppBar";
import BackToTop from "./components/BackToTop/BackToTop";
import Footer from "./components/Footer/Footer";

// Importiere die i18n-Konfiguration
import i18n from "./i18n/i18n";

// Importiere Seiten-Komponenten
import AllArticlesPage from "./pages/AllArticlesPage/AllArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage/ArticleDetailPage";
import CartPage from "./pages/CartPage/CartPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/Loginpage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";

// Importiere den Redux-Store und das Theme
import store from "./store/store";
import theme from "./theme/theme";

function App() {
  return (
    // ThemeProvider stellt das definierte Theme der gesamten Anwendung bereit
    <ThemeProvider theme={theme}>
      {/* Provider stellt den Redux-Store zur Verfügung, damit alle Komponenten auf den globalen State zugreifen können */}
      <Provider store={store}>
        {/* I18nextProvider stellt Übersetzungsfunktionen bereit */}
        <I18nextProvider i18n={i18n}>
          {/* Äußere Box als Container der gesamten Anwendung mit flexiblem Layout und mindestens voller Viewport-Höhe */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            {/* BackToTop-Komponente ermöglicht das Scrollen an den Seitenanfang */}
            <BackToTop />
            {/* CssBaseline sorgt für einen konsistenten Basisstil über alle Browser hinweg */}
            <CssBaseline />
            {/* Router kapselt alle Routen der Single-Page-Application */}
            <Router basename="/">
              {/* AppBar stellt den Header (Navigationsleiste) der Anwendung dar */}
              <AppBar />
              {/* Box, die den dynamischen Inhalt (Seiten) einbettet und den restlichen Platz einnimmt */}
              <Box sx={{ flexGrow: 1 }}>
                {/* Definiert alle möglichen Routen (URLs) der Anwendung */}
                <Routes>
                  {/* Route für die Startseite */}
                  <Route path="/" element={<Home />} />
                  {/* Route für die Login-Seite */}
                  <Route path="/login" element={<LoginPage />} />
                  {/* Route für die Registrierungsseite */}
                  <Route path="/signup" element={<SignUpPage />} />
                  {/* Route für den Warenkorb */}
                  <Route path="/cart" element={<CartPage />} />
                  {/* Route für die Artikelseite, auf der alle Artikel angezeigt werden */}
                  <Route path="/articles" element={<AllArticlesPage />} />
                  {/* Dynamische Route für Artikel-Details. articleId wird als Parameter übergeben */}
                  <Route
                    path="/article/:articleId"
                    element={<ArticleDetailPage />}
                  />
                  {/* Dynamische Route für Kategorien, категорияId wird übergeben */}
                  <Route
                    path="/category/:categoryId"
                    element={<CategoryPage />}
                  />
                </Routes>
              </Box>
              {/* Footer-Komponente, die am unteren Bildschirmrand Informationen oder Links anzeigt */}
              <Footer />
            </Router>
          </Box>
        </I18nextProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
