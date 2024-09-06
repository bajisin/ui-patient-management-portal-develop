import { Box, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";

import TimeRange from "react-time-range";
import moment from "moment";

const TimeRangePickerComp = ({ timeErr, start, end, startTime, endTime }) => {
  const [isOpenTime, setIsOpenTime] = useState(false);

  const toggleTime = () => {
    setIsOpenTime(!isOpenTime);
  };

  return (
    <Box position="relative">
      <FormControl className="w-100" error={Boolean(timeErr)}>
        <TextField
          value={`${moment(startTime, "HH:mm").format("HH:mm")} - ${moment(endTime, "HH:mm").format("HH:mm")}`}
          className="add__input"
          onClick={toggleTime}
          error={Boolean(timeErr)}
          helperText={timeErr}
        />
        {isOpenTime && (
          <div className="add__select">
            <TimeRange
              onStartTimeChange={start}
              onEndTimeChange={end}
              minuteIncrement={15}
              startLabel={null}
              endLabel={null}
            />
            <span onClick={toggleTime}>&nbsp;</span>
          </div>
        )}
      </FormControl>
    </Box>
  );
};

export default TimeRangePickerComp;
