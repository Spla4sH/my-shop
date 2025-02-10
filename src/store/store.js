// Importiere die configureStore-Funktion aus dem Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Importiere den articleReducer, der aus dem articleSlice definiert wurde
import articleReducer from "./articleSlice";

// Erstelle den Redux-Store, in dem die einzelnen Slices zusammengefasst werden.
// Hier wird ein einzelner Slice namens "articles" verwendet, der den articleReducer nutzt.
const store = configureStore({
  reducer: {
    articles: articleReducer, // Der Key "articles" ermöglicht den Zugriff auf diesen Teil des globalen States.
  },
});

// Exportiere den Store, damit er in der gesamten Anwendung verwendet werden kann.
export default store;
