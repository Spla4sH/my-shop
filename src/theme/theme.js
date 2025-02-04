import { createTheme } from '@mui/material/styles';

// Define a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#232f3e', // Custom primary color
    },
    secondary: {
      main: '#dbb1f2', // Custom secondary color
    },
    background: {
      default: '#E3E6E6', // Background color for the whole app
    },
    text: {
      primary: '#333', // Primary text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Custom font family
    h1: {
      fontSize: '3rem', // Customize h1 style
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '1.25rem', // Customize h6 style
    },
  },
  spacing: 8, // Set a global spacing scale
});

export default theme;
