import { Add, Remove } from "@mui/icons-material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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
  Typography,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../../api";
import emptyCartImg from "../../assets/images/cart.png";
import {
  addToCart,
  reduceQuantityOfArticleInCart,
  removeArticleFromCart,
} from "../../store/articleSlice";
import { useTranslation } from "react-i18next";
import { alpha } from "@mui/material/styles";

const CartPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articlesInCart, setArticlesInCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState();
  const dispatch = useDispatch();
  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticlesData(data);
      } catch (error) {
        console.error("Error fetching articles data:", error);
      }
    };
    fetchArticles();
  }, []);

  const cartItems = useSelector((state) => state.articles.cart);

  const handleIncreaseQuantity = (id) => {
    dispatch(addToCart({ id, quantity: 1 }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(reduceQuantityOfArticleInCart({ id, quantity: 1 }));
  };

  const handleDeleteArticleFromCart = (id) => {
    dispatch(removeArticleFromCart({ id }));
  };

  useEffect(() => {
    setError(null);
    setLoading(true);

    try {
      // Map cartItems to include article details
      const elements = cartItems
        .map((cartItem) => {
          const article = articlesData.find(
            (article) => article._id === cartItem.id
          );
          if (article) {
            return {
              article: article,
              quantity: cartItem.quantity,
              total: article.price * cartItem.quantity,
            };
          }
          return null;
        })
        .filter((item) => item !== null);
      setArticlesInCart(elements);
    } catch (err) {
      console.error("Error processing cart items:", err);
      setError("Failed to process cart items.");
    } finally {
      setLoading(false);
    }
  }, [cartItems, articlesData]);

  useEffect(() => {
    // Calculate the grand total
    if (articlesInCart.length > 0) {
      const total = articlesInCart.reduce((acc, item) => acc + item.total, 0);
      setGrandTotal(total);
    }
  }, [articlesInCart]);

  return (
    <Box
      sx={{
        mt: { xs: 20, md: 2 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {!loading &&
        articlesInCart.length === 0 &&
        articlesData.length > 0 &&
        !error && (
          <>
            <img
              src={emptyCartImg}
              alt="cart icon"
              style={{ width: 160, height: "auto" }}
            />
            <Typography
              variant="h5"
              sx={{
                my: 2,
                color: "primary.dark",
                fontWeight: "bold",
              }}
            >
              {t("cart-empty")}
            </Typography>
            <Button sx={{ marginTop: 2 }} onClick={() => navigate("/articles")}>
              {t("show-articles")}
            </Button>
          </>
        )}

      {articlesInCart.length > 0 && (
        <>
          {/* Mobile Table (xs view) */}
          <TableContainer
            component={Paper}
            sx={{
              display: { xs: "block", md: "none" }, // Only visible for xs screens
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
                    {/* Article Details */}
                    <TableCell>
                      <Box>
                        {/* Article Name */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {item.article.name}
                          </Typography>
                          {/* Delete Button */}
                          <IconButton
                            onClick={() =>
                              handleDeleteArticleFromCart(item.article._id)
                            }
                            sx={{ marginLeft: "1px" }}
                          >
                            <HighlightOffIcon />
                          </IconButton>
                        </Box>
                        {/* Price */}
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: "text.secondary",
                          }}
                        >
                          {t("price")}: {item.article.price} €
                        </Typography>
                        {/* Quantity and Delete */}
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
                            disabled={item.quantity <= 1}
                            title={t("decrease-quantity")}
                          >
                            <Remove />
                          </IconButton>
                          <Typography
                            sx={{
                              marginX: 1,
                              fontSize: "0.9rem",
                            }}
                          >
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
                      </Box>
                    </TableCell>

                    {/* Total Price */}
                    <TableCell align="right">
                      <Typography sx={{ fontWeight: "bold" }}>
                        {item.total?.toFixed(2)} €
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Grand Total */}
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

          {/* Desktop Table (md and larger) */}
          <TableContainer
            component={Paper}
            sx={{
              display: { xs: "none", md: "block" }, // Only visible for md and larger screens
              width: "80%",
              margin: "auto",
              backgroundColor: "#f5f5f5",
              padding: 2,
            }}
          >
            <Table>
              <TableHead>
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
                    <TableCell align="center">{item.article.price} €</TableCell>
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
                    <TableCell align="right" sx={{ width: "150px" }}>
                      {item.total?.toFixed(2)} €
                    </TableCell>
                  </TableRow>
                ))}
                {/* Total Line */}
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
            onClick={() => console.log("Payment initiated")}
          >
            {t("checkout")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default CartPage;
