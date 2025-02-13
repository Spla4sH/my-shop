import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#232f3e",
    },
    secondary: {
      main: "#dbb1f2",
    },
    background: {
      default: "#E3E6E6", // Hintergrundfarbe für die ganze App
    },
    text: {
      primary: "#333",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Font family
    h1: {
      fontSize: "3rem",
      fontWeight: "bold",
    },
    h6: {
      fontSize: "1.25rem",
    },
  },
  spacing: 8,
});

export default theme;
