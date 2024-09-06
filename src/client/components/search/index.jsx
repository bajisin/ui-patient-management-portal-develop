import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import { CALLTYPES } from "../../_helpers/constants";

const SearchComponent = ({
  updateSearch,
  params,
  dispatchgetNotificationList,
  callType,
  setSearchTerm,
  searchTerm,
  endDate,
  startDate,
  setStartDate = () => {},
  setEndDate = () => {},
  index,
  selectedTests
}) => {
  const [searchTerms, setSearchTerms] = useState([]);
  const [showClear, setShowClear] = useState(false);

useEffect(() => {
  if(selectedTests?.length >0){
    const selected = selectedTests
    ?.map((dgCode) => dgCode?.dgnstcCodes?.[0]?.diagnosticCode || dgCode?.dgnstcCodes)
    .filter((code) => code !== null); 
  // const selectedString = selected.join(', ');
  setSearchTerms(selected)
  }
}, [selectedTests]);
const handleSearchChange = (e, idx) => {
  const newValue = e.target.value;
  setSearchTerms(prevTerms => {
    const updatedTerms = [...prevTerms];
    updatedTerms[idx] = newValue;
    return updatedTerms;
  });
};
  const onSearchClick = () => {
    if (callType !== CALLTYPES.Notification) {
      if (searchTerms || searchTerm?.trim() !== "") {
        setShowClear(true);
        updateSearch(searchTerms[index]);
      }
      updateSearch(searchTerms[index]);
      setStartDate(startDate);
      setEndDate(endDate);
    } else {
      dispatchgetNotificationList();
    }
  };

  const clearSearch = () => {
    setSearchTerms("");
    setShowClear(false);
    updateSearch("");
  };
  return (
    <Paper className="search__wrapper">
      <InputBase
      {...params}
      placeholder="Search..."
      data-testid="myTextField"
      onChange={(e) => handleSearchChange(e, index)} // Pass index to handler
      onKeyDown={(e) => { 
        if (e.key === "Enter") { 
          onSearchClick();
        } 
      }} 
      value={searchTerms ? searchTerms[index] :  searchTerm}
      type="search"
    />
      {showClear && (
        <IconButton aria-label="clear" onClick={clearSearch}>
          <Typography component="span" variant="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
      )}
      <IconButton
        className="searchIconBtn"
        aria-label="search"
        onClick={() => {
          onSearchClick();
        }}
      >
        <Typography component="span" variant="span" className="ls-icon-search secondaryIcon fs-16"></Typography>
      </IconButton>
    </Paper>
  );
};
export default SearchComponent;
