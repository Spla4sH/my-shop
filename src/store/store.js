import { configureStore } from "@reduxjs/toolkit";
import articleReducer from "./articleSlice";

// Konfiguration des Stores
// Hier wird ein einzelner Slice namens "articles" verwendet, der den articleReducer nutzt.
const store = configureStore({
  reducer: {
    articles: articleReducer, // Der Key "articles" ermöglicht den Zugriff auf diesen Teil des globalen States.
  },
});

export default store;
