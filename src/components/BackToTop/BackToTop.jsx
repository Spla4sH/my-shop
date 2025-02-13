// Kommt von MaterialUI, um den Button "Nach oben" zu erstellen

import React from "react";
import PropTypes from "prop-types";
import { Zoom, useScrollTrigger, Fab } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function ScrollTop(props) {
  const { children, window } = props;

  // Der useScrollTrigger-Hook ermittelt, ob der User weit genug gescrollt hat.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    // Sucht ein Element mit der ID "back-to-top-anchor"
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
            bgcolor: "orange",
            color: "white",
            marginBottom: "70px",
            zIndex: 100,
            "&:hover": {
              bgcolor: "darkorange",
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
