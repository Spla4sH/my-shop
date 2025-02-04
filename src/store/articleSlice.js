import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [], // For the shopping cart (with id and quantity)
  searchText: "", // For managing search text
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    // Action to add an article to the cart
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingArticle = state.cart.find((item) => item.id === id);
      if (existingArticle) {
        existingArticle.quantity += quantity;
      } else {
        state.cart.push({ id, quantity });
      }
    },

    // Action to add an article to the cart
    reduceQuantityOfArticleInCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingArticle = state.cart.find((item) => item.id === id);
      if (existingArticle) {
        existingArticle.quantity -= quantity;
      } else {
        state.cart.push({ id, quantity });
      }
    },

    // Action to completely remove an article from the cart
    removeArticleFromCart: (state, action) => {
      const { id } = action.payload;
      state.cart = state.cart.filter((item) => item.id !== id);
    },

    // Action to update the search text in the state
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  addToCart,
  reduceQuantityOfArticleInCart,
  removeArticleFromCart,
  setSearchText,
} = articleSlice.actions;
export default articleSlice.reducer;
