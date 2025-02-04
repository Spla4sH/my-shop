import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../../store/articleSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Search = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const searchTextFromStore = useSelector((state) => state.articles.searchText);

  const [searchInput, setSearchInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSearchChange = (e) => {
    if (e.target.value.length < searchInput.length) {
      dispatch(setSearchText(e.target.value));
    }
    setSearchInput(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchText(searchInput));
      if (location.pathname != "/articles") navigate("/articles");
    }
  };

  const handleSearchButtonClick = () => {
    dispatch(setSearchText(searchInput));
    if (location.pathname != "/articles") navigate("/articles");
  };

  useEffect(() => {
    if (searchTextFromStore == "") {
      setSearchInput("");
    }
  }, [searchTextFromStore]);

  return (
    <>
      <TextField
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        sx={{
          backgroundColor: "white",
          borderRadius: "4px",
          width: "80%",
          height: { xs: "40px", md: "50px" },
          padding: 0,
          "& input": {
            padding: "0 20px",
            height: { xs: "40px", md: "50px" },
            textAlign: "start",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              border: isFocused ? "transparent" : "none",
              borderRightColor: "transparent",
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
        placeholder={t("search") + "..."}
      />
      <Button
        onClick={handleSearchButtonClick}
        sx={{
          marginLeft: "0px",
          backgroundColor: "secondary.main",
          height: { xs: "40px", md: "50px" },
          minWidth: 0,
          width: { xs: "50px", md: "60px" },
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          border: isFocused ? "transparent" : "none",
          borderLeftColor: isFocused ? "transparent" : "none",
          "&:focus": {
            outline: "none",
          },
        }}
      >
        <SearchIcon color="primary" sx={{fontSize: { xs: "25px", md: "30px" }}}/>
      </Button>
    </>
  );
};

export default Search;
