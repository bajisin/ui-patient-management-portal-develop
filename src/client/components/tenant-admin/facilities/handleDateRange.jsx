import { Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DATE_RANGE_OPTIONS } from "../../../_helpers/constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import moment from "moment";

export default function AdvanceDateRange({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  selectedDateRange,
  setSelectedDateRange
}) {
  const [customPickerOpen, setCustomPickerOpen] = useState(false);

  const handleDateRange = (value) => {
    switch (value) {
      case "1":
        setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        break;
      case "2":
        setStartDate(moment().subtract(7, "days").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        break;
      case "3":
        setStartDate(moment().subtract(15, "days").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        break;
      case "4":
        setStartDate(moment().startOf("year").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        break;
      case "5":
        setStartDate("");
        setEndDate("");
        setCustomPickerOpen(true);
        break;
    }
  };
  const today = dayjs();
  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <Typography variant="label" component="label" className="add__label">
          Date Range
        </Typography>
        <Select
          className="add__select"
          value={selectedDateRange}
          onChange={(e) => {
            setSelectedDateRange(e.target.value);
            handleDateRange(e.target.value);
          }}
        >
          {DATE_RANGE_OPTIONS.map((opt, i) => (
            <MenuItem key={i} value={opt.id}>
              {opt.title}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      {customPickerOpen && (
        // <Grid item xs={12} sm={12} md={6} lg={6}>
        //   <Typography variant="label" component="label" className="add__label">
        //     Date Range
        //   </Typography>
        //   <Stack gap={2} className="flex-row justify-content-between">
        //     <LocalizationProvider dateAdapter={AdapterDayjs}>
        //       <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
        //     </LocalizationProvider>
        //     <LocalizationProvider dateAdapter={AdapterDayjs}>
        //       <DatePicker
        //         defaultValue={dayjs("YYYY-MM-DD")}
        //         className="w-100 datetimepicker-control"
        //         maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
        //       />
        //     </LocalizationProvider>
        //   </Stack>
        // </Grid>
        <>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="label" component="label" className="add__label">
              Start Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // value={dayjs(startDate)}
                className="w-100 datetimepicker-control"
                defaultValue={dayjs("YYYY-MM-DD")}
                onChange={(newValue) => setStartDate(dayjs(newValue).format("YYYY-MM-DD"))}
              />
            </LocalizationProvider>
          </Grid>
          <Grid>
            <Typography variant="label" component="label" className="add__label">
              End Date
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                // value={dayjs(endDate)}
                className="w-100 datetimepicker-control"
                onChange={(newValue) => setEndDate(dayjs(newValue).format("YYYY-MM-DD"))}
                // minDate={dayjs(startDate)}
                maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
                defaultValue={dayjs("YYYY-MM-DD")}
              />
            </LocalizationProvider>
          </Grid>
        </>
      )}
    </>
  );
}
