import React, { useState } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useTranslation } from "react-i18next";
import flagEn from "../../assets/flags/gb.png";
import flagDe from "../../assets/flags/de.png";
import flagFr from "../../assets/flags/fr.png";

const LANGUAGES = [
  { code: "en", name: "English", img: flagEn },
  { code: "fr", name: "French", img: flagFr },
  { code: "de", name: "German", img: flagDe },
];

const LanguageButton = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setCurrentLanguage(languageCode);
    handleClose();
  };

  return (
    <Box
      sx={{
        marginX: 1,
        width: "100%",
        display: "flex",
        justifyContent: { xs: "flex-end", md: "flex-start" },
      }}
    >
      <Button
        sx={{
          display: { xs: "none", md: "flex" },
          color: "white",
          fontSize: "18px",
          fontWeight: 700,
        }}
        // startIcon={<LanguageIcon />}
        startIcon={
          <img
            src={LANGUAGES.find((lang) => lang.code === currentLanguage)?.img}
            alt={currentLanguage}
            style={{ width: "30px", height: "20px", borderRadius: "2%" }}
          />
        }
        endIcon={<ArrowDropDownIcon sx={{ marginLeft: "-8px" }} />}
        onClick={handleClick}
      >
        {LANGUAGES.find(
          (lang) => lang.code === currentLanguage
        )?.code.toUpperCase()}
      </Button>

      <IconButton
        sx={{
          fontSize: "24px",
          color: "white",
          display: { xs: "flex", md: "none" },
        }}
        onClick={handleClick}
      >
        <LanguageIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
      >
        {LANGUAGES.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px", // Space between flag and text
            }}
          >
            <img
              src={language.img}
              alt={language.name}
              style={{ width: "25px", height: "18px", borderRadius: "2%" }}
            />
            <Typography>{language.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default LanguageButton;
