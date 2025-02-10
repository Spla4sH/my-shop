import React from "react";
import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "primary.dark",
        color: "#fff",
        padding: "20px",
        mt: 1,
        position: "relative",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2" sx={{ textAlign: "center", fontWeight: 300 }}>
        &copy; {new Date().getFullYear()} Sebastian Rösch - My Shop. All rights
        reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
