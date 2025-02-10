import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Fab, Zoom, useScrollTrigger } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function ScrollTop(props) {
  const { children, window } = props;

  // Der useScrollTrigger-Hook ermittelt, ob der User weit genug gescrollt hat.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true, // Sofortiges Reagieren ohne Verzögerung
    threshold: 100, // Schwellenwert in Pixeln
  });

  const handleClick = (event) => {
    // Sucht ein Element mit der ID "back-to-top-anchor" (muss im DOM vorhanden sein)
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        onClick={handleClick}
        role="presentation"
        style={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

export default function BackToTop(props) {
  return (
    <React.Fragment>
      {/* Dieser Anker wird als Ziel für das Scrollen nach oben verwendet */}
      <div id="back-to-top-anchor" />

      {/* ScrollTop-Komponente umhüllt den Button */}
      <ScrollTop {...props}>
        <Fab
          sx={{
            bgcolor: "orange", // Hintergrundfarbe
            color: "white", // Text-/Icon-Farbe
            marginBottom: "70px",
            zIndex: 100,
            "&:hover": {
              bgcolor: "darkorange", // Hover-Farbe
            },
          }}
          size="big"
          aria-label="scroll back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
