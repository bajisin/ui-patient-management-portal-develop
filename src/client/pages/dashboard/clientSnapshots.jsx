import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DATE_RANGE_OPTIONS } from "../../_helpers/constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TenantSnapshotChart } from "../highCharts";
import dayjs from "dayjs";
import { getLoggedInUserRoleId } from "@utils/common";
import { getTenantSnapshot } from "@redux/slices/tenantSnapshotSlice";
import moment from "moment";

export default function ClientSnapShots() {
  const dispatch = useDispatch();
  const [selectedDateRange, setSelectedDateRange] = useState(1);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD") // Format as YYYY-MM-DD
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD")); // Format as YYYY-MM-DD
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  // const { tenantSnapshot: data } = useSelector((state) => state.TENANTSNAPSHOT);
  const handleDateRange = (value) => {
    setCustomPickerOpen(value === "5");
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
  const fetchData = () => {
    dispatch(
      getTenantSnapshot({
        startDate,
        endDate,
        roleId: getLoggedInUserRoleId()
      })
    );
  };
  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);
  const today = dayjs();
  useEffect(() => {
    handleDateRange("1");
    setSelectedDateRange(1);
  }, []);
  return (
    <Box className="tenantSnapshots__wrapper mb-3">
      <Box className="basic__card ">
        <Box className="title__wrapper">
          <Box className="title__wrapper--left">
            <Typography variant="h5" component="h5" className="section_title">
              Client Snapshots
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview of clients
            </Typography>
          </Box>
          <Box className="title__wrapper--right">
            <Select
              className="add__select dateRangePicker"
              value={selectedDateRange}
              onChange={(e) => {
                setSelectedDateRange(e.target.value);
                handleDateRange(e.target.value);
              }}
            >
              {DATE_RANGE_OPTIONS?.map((opt, i) => (
                <MenuItem key={i} value={opt.id}>
                  {opt.title}
                </MenuItem>
              ))}
            </Select>
            {customPickerOpen && (
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                className="title__wrapper--right w-100 justify-content-end ms-0"
              >
                <Grid item xs={6} sm={4} md={4} lg={4} className="d-flex flex-column">
                  <Typography variant="label" component="label" className="add__label">
                    Start Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(startDate)}
                      className="w-100 datetimepicker-control"
                      onChange={(newValue) => setStartDate(dayjs(newValue).format("YYYY-MM-DD"))}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={4} md={4} lg={4} className="d-flex flex-column">
                  <Typography variant="label" component="label" className="add__label">
                    End Date
                  </Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(endDate)}
                      className="w-100 datetimepicker-control"
                      onChange={(newValue) => {
                        setEndDate(dayjs(newValue).format("YYYY-MM-DD")); // Format as YYYY-MM-DD
                      }}
                      maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
                      defaultValue={dayjs("YYYY-MM-DD")}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            )}
            {/* <FormControl className="w-100">
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
                <Stack gap={2} className="flex-row justify-content-between">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
                  </LocalizationProvider>
                </Stack>
              </Select>
            </FormControl> */}
            {/* <Typography className="title_right">
              <FormControl className="w-100">
                <Select
                  className="add__select"
                  label="Select date"
                  InputProps={{
                    sx: {
                      height: "38px"
                    }
                  }}
                >
                  {DATE_RANGE_OPTIONS.map((opt, i) => (
                    <MenuItem key={i} value={opt.id}>
                      {opt.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography> */}
          </Box>
        </Box>

        <Typography component="div" variant="p" className="tenant-snapshot-chart-wrapper">
          <TenantSnapshotChart />
        </Typography>
      </Box>
    </Box>
  );
}
