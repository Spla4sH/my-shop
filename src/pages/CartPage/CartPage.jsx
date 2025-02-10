// Importiere Icons von Material-UI für die Artikelerhöhung und -verringerung sowie zum Löschen eines Artikels
import { Add, Remove } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Importiere diverse Material-UI-Komponenten für Layout, Tabellen, Buttons, Tooltip, etc.
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

// Importiere die alpha()-Funktion für Farbtransparenz-Anpassungen
import { alpha } from "@mui/material/styles";

// Importiere React sowie die notwendigen Hooks
import React, { useEffect, useState } from "react";

// Importiere den Übersetzungshook zur Nutzung von Mehrsprachigkeit in Texten
import { useTranslation } from "react-i18next";

// Importiere Redux-Hooks für den Zugriff auf den globalen Store und zum Dispatchen von Aktionen
import { useDispatch, useSelector } from "react-redux";

// Importiere den useNavigate Hook von React Router für die Navigation
import { useNavigate } from "react-router-dom";

// Importiere eine API-Funktion zum Abrufen aller Artikel aus der Datenquelle
import { getArticles } from "../../api";

// Importiere ein Bild, welches angezeigt wird, wenn der Warenkorb leer ist
import emptyCartImg from "../../assets/images/cart.png";

// Importiere Redux-Aktionen zum Hinzufügen, Reduzieren und Entfernen von Artikeln aus dem Warenkorb
import {
  addToCart,
  reduceQuantityOfArticleInCart,
  removeArticleFromCart,
} from "../../store/articleSlice";

// Definition der CartPage-Komponente als funktionale Komponente
const CartPage = () => {
  const { t } = useTranslation(); // Holt die Übersetzungsfunktion
  const navigate = useNavigate(); // Erlaubt Navigation zu anderen Seiten
  const dispatch = useDispatch(); // Erlaubt das Versenden von Aktionen an den Redux-Store

  // Lokale Zustände
  const [loading, setLoading] = useState(true); // Zustand, um den Ladeprozess anzuzeigen
  const [error, setError] = useState(null); // Zustand, um Fehler darzustellen, falls etwas schiefgeht
  const [articlesInCart, setArticlesInCart] = useState([]); // Enthält die Artikel im Warenkorb mit zusätzlichen Details
  const [grandTotal, setGrandTotal] = useState(); // Gesamtpreis aller Artikel im Warenkorb
  const [articlesData, setArticlesData] = useState([]); // Speichert alle Artikeldaten, die aus der API gelesen werden

  // Erster useEffect: Lädt alle Artikeldaten aus der API, sobald die Komponente gemountet wird
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles(); // Ruft die Artikeldaten ab
        setArticlesData(data); // Speichert die Daten im lokalen Zustand
      } catch (error) {
        console.error("Error fetching articles data:", error);
      }
    };
    fetchArticles();
  }, []);

  // Lese Artikel aus dem globalen Redux-Store, in denen der Warenkorb gespeichert ist
  const cartItems = useSelector((state) => state.articles.cart);

  // Handler zum Erhöhen der Artikelmenge im Warenkorb
  const handleIncreaseQuantity = (id) => {
    dispatch(addToCart({ id, quantity: 1 })); // Fügt einen Artikel in der angegebenen Menge hinzu
  };

  // Handler zum Verringern der Artikelmenge im Warenkorb
  const handleDecreaseQuantity = (id) => {
    dispatch(reduceQuantityOfArticleInCart({ id, quantity: 1 })); // Reduziert die Menge eines Artikels um 1
  };

  // Handler zum vollständigen Entfernen eines Artikels aus dem Warenkorb
  const handleDeleteArticleFromCart = (id) => {
    dispatch(removeArticleFromCart({ id })); // Entfernt den Artikel anhand der ID
  };

  // Zweiter useEffect: Verarbeitet die Cart-Items und fügt Artikel-Details hinzu,
  // sodass wir für jedes Cart-Item auch den Artikel, die Menge und den Gesamtpreis haben
  useEffect(() => {
    setError(null);
    setLoading(true);

    try {
      // Verbinde cartItems mit den vollständigen Artikeldaten
      const elements = cartItems
        .map((cartItem) => {
          const article = articlesData.find(
            (article) => article._id === cartItem.id
          ); // Findet das Artikelobjekt anhand der ID
          if (article) {
            return {
              article: article, // Der Artikel selbst
              quantity: cartItem.quantity, // Die aktuelle Menge im Warenkorb
              total: article.price * cartItem.quantity, // Berechnet den Gesamtpreis für diesen Artikel
            };
          }
          return null;
        })
        .filter((item) => item !== null); // Entfernt Artikel, die nicht gefunden wurden

      setArticlesInCart(elements); // Speichert die verarbeiteten Artikel im Zustand
    } catch (err) {
      console.error("Error processing cart items:", err);
      setError("Failed to process cart items."); // Setzt einen Fehlertext
    } finally {
      setLoading(false); // Beendet den Ladezustand
    }
  }, [cartItems, articlesData]);

  // Dritter useEffect: Berechnet den Gesamtpreis aller Artikel im Warenkorb (Grand Total)
  useEffect(() => {
    if (articlesInCart.length > 0) {
      const total = articlesInCart.reduce((acc, item) => acc + item.total, 0);
      setGrandTotal(total); // Setzt den berechneten Gesamtpreis
    }
  }, [articlesInCart]);

  // Rendern der CartPage
  return (
    <Box
      sx={{
        mt: { xs: 20, md: 2 }, // Unterschiedlicher oberer Margin je nach Bildschirmgröße
        display: "flex", // Flexbox für die Anordnung der Elemente
        justifyContent: "center", // Zentriert den Inhalt horizontal
        alignItems: "center", // Zentriert den Inhalt vertikal
        flexDirection: "column", // Ordnet die Elemente in einer Spalte an
      }}
    >
      {/* Anzeige, wenn der Warenkorb leer ist: 
          - articlesInCart leer und es gibt Artikel-Daten (Laden abgeschlossen) ohne Fehler */}
      {!loading &&
        articlesInCart.length === 0 &&
        articlesData.length > 0 &&
        !error && (
          <>
            <img
              src={emptyCartImg} // Bild des leeren Warenkorbs
              alt="cart icon"
              style={{ width: 160, height: "auto" }} // Festgelegte Bildgröße
            />
            <Typography
              variant="h5"
              sx={{
                my: 2,
                color: "primary.dark",
                fontWeight: "bold",
              }}
            >
              {t("cart-empty")}{" "}
              {/* Übersetzter Text, der anzeigt, dass der Warenkorb leer ist */}
            </Typography>
            <Button sx={{ marginTop: 2 }} onClick={() => navigate("/articles")}>
              {t("show-articles")}{" "}
              {/* Button, der den Benutzer zur Artikelseite führt */}
            </Button>
          </>
        )}

      {/* Anzeige der Tabellen wenn Artikel im Warenkorb vorhanden sind */}
      {articlesInCart.length > 0 && (
        <>
          {/* Mobile Ansicht: Tabelle, die nur bei xs-Bildschirmgrößen angezeigt wird */}
          <TableContainer
            component={Paper}
            sx={{
              display: { xs: "block", md: "none" }, // Nur sichtbar auf kleinen Bildschirmen
              width: "95%",
              marginY: 2,
              backgroundColor: "#f5f5f5",
              padding: 1,
            }}
          >
            <Table>
              <TableBody>
                {articlesInCart.map((item, index) => (
                  <TableRow key={index}>
                    {/* Erster TableCell: Anzeige der Artikeldetails */}
                    <TableCell>
                      <Box>
                        {/* Name des Artikels und Löschen-Button */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {item.article.name}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              handleDeleteArticleFromCart(item.article._id)
                            }
                            sx={{ marginLeft: "1px" }}
                          >
                            <HighlightOffIcon /> {/* Icon zum Löschen */}
                          </IconButton>
                        </Box>
                        {/* Preis des Artikels */}
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: "text.secondary",
                          }}
                        >
                          {t("price")}: {item.article.price} €
                        </Typography>
                        {/* Bereich für Mengenanpassung */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              handleDecreaseQuantity(item.article._id)
                            }
                            disabled={item.quantity <= 1} // Verhindert, dass die Menge unter 1 fällt
                            title={t("decrease-quantity")} // Tooltip-Text
                          >
                            <Remove />
                          </IconButton>
                          <Typography
                            sx={{
                              marginX: 1,
                              fontSize: "0.9rem",
                            }}
                          >
                            {item.quantity} {/* Aktuelle Menge */}
                          </Typography>
                          <IconButton
                            onClick={() =>
                              handleIncreaseQuantity(item.article._id)
                            }
                            title={t("increase-quantity")} // Tooltip-Text
                          >
                            <Add />
                          </IconButton>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Zweiter TableCell: Anzeige des Gesamtpreises für diesen Artikel */}
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: "bold" }}>
                        {item.total?.toFixed(2)} €
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Letzte Tabellenzeile: Anzeige des Grand Total */}
                <TableRow
                  sx={{
                    "& td, & th": { border: 0 },
                  }}
                >
                  <TableCell colSpan={2} align="right">
                    <Typography fontWeight="bold" sx={{ mt: 2 }}>
                      {t("grand-total")}: {grandTotal?.toFixed(2)} €
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          {/* Desktop Ansicht: Tabelle, die ab mittleren Bildschirmen angezeigt wird */}
          <TableContainer
            component={Paper}
            sx={{
              display: { xs: "none", md: "block" },
              width: "80%",
              margin: "auto",
              backgroundColor: "#f5f5f5",
              padding: 2,
            }}
          >
            <Table>
              <TableHead>
                {/* Überschrift der Tabelle */}
                <Typography sx={{ fontWeight: "bold", fontSize: "5rem" }}>
                  {t("cart")}
                </Typography>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {t("article")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {t("price")}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {t("quantity")}
                    </Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ width: "150px" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {t("total")}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articlesInCart.map((item, index) => (
                  <TableRow key={index}>
                    {/* Artikelname mit Tooltip zum Löschen */}
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography sx={{ fontWeight: "bold", mr: 1 }}>
                          {item.article.name}
                        </Typography>
                        <Tooltip
                          title={t("delete-article-tt")}
                          placement="right"
                          arrow
                        >
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDeleteArticleFromCart(item.article._id)
                            }
                            sx={{
                              color: (theme) =>
                                alpha(theme.palette.primary.main, 0.4),
                            }}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                    {/* Preisanzeige */}
                    <TableCell align="center">{item.article.price} €</TableCell>
                    {/* Mengensteuerung */}
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconButton
                          onClick={() =>
                            handleDecreaseQuantity(item.article._id)
                          }
                          disabled={item.quantity <= 1}
                          title={t("decrease-quantity")}
                        >
                          <Remove />
                        </IconButton>
                        <Typography sx={{ marginX: 1 }}>
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() =>
                            handleIncreaseQuantity(item.article._id)
                          }
                          title={t("increase-quantity")}
                        >
                          <Add />
                        </IconButton>
                      </Box>
                    </TableCell>
                    {/* Berechneter Gesamtpreis dieses Artikels */}
                    <TableCell align="right" sx={{ width: "150px" }}>
                      {item.total?.toFixed(2)} €
                    </TableCell>
                  </TableRow>
                ))}
                {/* Gesamtzeile der Tabelle */}
                <TableRow
                  sx={{
                    "& td, & th": { border: 0 },
                  }}
                >
                  <TableCell colSpan={3} align="right">
                    <Typography fontWeight="bold">
                      {t("grand-total")}:
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography fontWeight="bold">
                      {grandTotal?.toFixed(2)} €
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Checkout-Bereich: Wird angezeigt, wenn Artikel im Warenkorb sind */}
      {articlesInCart.length > 0 && (
        <Box
          sx={{
            width: { xs: "95%", md: "80%" },
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => console.log("Payment initiated")} // Hier könnte später die Zahlungslogik hinzugefügt werden
          >
            {t("checkout")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
