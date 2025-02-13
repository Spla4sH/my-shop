import { createSlice } from "@reduxjs/toolkit";

// Initialzustand des Artikelslices
const initialState = {
  cart: [], // Enthält die Artikel im Warenkorb; jedes Objekt hat mindestens die Felder id und quantity
  searchText: "", // Wird genutzt, um den Suchtext in der Anwendung zu speichern
};

const articleSlice = createSlice({
  name: "articles", // Name des Slices; wird zur Identifikation im globalen Redux-Store verwendet
  initialState, // Der initiale Zustand des Slices
  reducers: {
    // Aktion, um einen Artikel in den Warenkorb hinzuzufügen
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      // Sucht im aktuellen Warenkorb nach einem Artikel mit der übergebenen id
      const existingArticle = state.cart.find((item) => item.id === id);
      if (existingArticle) {
        // Falls der Artikel bereits existiert, wird die Menge erhöht
        existingArticle.quantity += quantity;
      } else {
        // Falls nicht vorhanden, wird ein neuer Artikel mit id und Menge hinzugefügt
        state.cart.push({ id, quantity });
      }
    },

    // Aktion, um die Menge eines Artikels im Warenkorb zu verringern
    reduceQuantityOfArticleInCart: (state, action) => {
      const { id, quantity } = action.payload;
      // Sucht den Artikel anhand der id im Warenkorb
      const existingArticle = state.cart.find((item) => item.id === id);
      if (existingArticle) {
        // Reduziert die Menge des gefundenen Artikels
        existingArticle.quantity -= quantity;
      } else {
        // Sollte der Artikel nicht im Warenkorb vorhanden sein, wird er hinzugefügt.

        state.cart.push({ id, quantity });
      }
    },

    // Aktion, um einen Artikel komplett aus dem Warenkorb zu entfernen
    removeArticleFromCart: (state, action) => {
      const { id } = action.payload;
      // Filtert den Warenkorb und entfernt alle Artikel, deren id dem angegebenen Wert entspricht
      state.cart = state.cart.filter((item) => item.id !== id);
    },

    // Aktion, um den Suchtext im Zustand zu aktualisieren
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

// Exportiert die einzelnen Aktionen, damit man sie überall nutzen kann.
export const {
  addToCart,
  reduceQuantityOfArticleInCart,
  removeArticleFromCart,
  setSearchText,
} = articleSlice.actions;

// Exportiert den Reducer, der im Redux-Store eingebunden wird
export default articleSlice.reducer;
