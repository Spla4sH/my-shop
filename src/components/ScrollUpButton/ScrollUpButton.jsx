import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";

const ScrollUpButton = ({ showButton = true }) => {
  // Scroll back to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    showButton && (
      <Button color="primary" onClick={scrollToTop}>
        Back to Top
      </Button>
    )
  );
};

export default ScrollUpButton;
