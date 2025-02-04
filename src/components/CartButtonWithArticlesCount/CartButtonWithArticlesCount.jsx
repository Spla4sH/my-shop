import * as React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function CartButtonWithArticlesCount({ color }) {
  const navigate = useNavigate();
  const numberOfArticles = useSelector((state) =>
    state.articles.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <IconButton onClick={() => navigate("/cart")} sx={{marginX: 1}}>
      <ShoppingCartIcon sx={{ color: color, fontSize: {xs: "24px", lg: "28px"} }} />
      <CartBadge
        badgeContent={numberOfArticles}
        color="primary"
        overlap="circular"
      />
    </IconButton>
  );
}
