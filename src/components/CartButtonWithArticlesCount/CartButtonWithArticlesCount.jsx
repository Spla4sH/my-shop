import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge, { badgeClasses } from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <IconButton onClick={() => navigate("/cart")} sx={{ marginX: 1 }}>
      <ShoppingCartIcon
        sx={{ color: color, fontSize: { xs: "24px", lg: "28px" } }}
      />
      <CartBadge
        sx={{ color: "orange" }}
        badgeContent={numberOfArticles}
        overlap="circular"
      />
    </IconButton>
  );
}
