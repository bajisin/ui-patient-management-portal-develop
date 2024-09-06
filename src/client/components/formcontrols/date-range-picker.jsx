import { Box, TextField } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangePickerComp = ({
  dateRange,
  setDateRange,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  minDate,
  maxDate,
  disabled
}) => {
  const [isOpenCalender, setIsOpenCalender] = useState(false);

  const toggleCalendar = () => {
    setIsOpenCalender(!isOpenCalender);
  };

  const handleSelect = (date) => {
    setDateRange(date.selection);
    setStartDate(moment(date?.selection?.startDate).format("MM-DD-YYYY"));
    setEndDate(moment(date?.selection?.endDate).format("MM-DD-YYYY"));
  };

  return (
    <Box position="relative">
      <TextField
        value={`${moment(startDate).format("MM-DD-YYYY")} - ${moment(endDate).format("MM-DD-YYYY")}`}
        className="add__input"
        onClick={toggleCalendar}
        disabled={disabled}
      />
      {isOpenCalender && (
        <React.Fragment>
          <DateRangePicker
            minDate={minDate}
            maxDate={maxDate}
            ranges={[dateRange]}
            onChange={handleSelect}
            editableDateInputs={false}
          />
          <span onClick={toggleCalendar}>&nbsp;</span>
        </React.Fragment>
      )}
    </Box>
  );
};

export default DateRangePickerComp;
