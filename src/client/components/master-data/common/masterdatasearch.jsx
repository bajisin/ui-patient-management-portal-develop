import { Paper, Typography } from "@mui/material";
import React, { useState } from "react";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

export default function MasterDataSearch({ filteredValue, handleSearchChange }) {
  const [icon, setIcon] = useState(false);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission on Enter key
    }
  };
  return (
    <Paper className="search__wrapper" component="form" onKeyDown={handleKeyDown}>
      <InputBase
        placeholder="Search here..."
        inputProps={{ "aria-label": "Search here..." }}
        value={filteredValue}
        onChange={(e, ...args) => handleSearchChange(e.target.value, ...args)}
      />
      {!icon ? <SearchIcon /> : <Typography component="span" variant="span" className="ls-close secondaryIcon" />}
    </Paper>
  );
}
