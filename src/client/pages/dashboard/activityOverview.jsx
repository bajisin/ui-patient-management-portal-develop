import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { DATE_RANGE_OPTIONS, roleIds } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { getDashboardActivity } from "@redux/slices/activityOverviewSlice";
import moment from "moment";

export default function ActivityOverview() {
  const { dashboardActivity: data } = useSelector((state) => state.DASHBOARDACTIVITY);
  const dispatch = useDispatch();
  const [selectedDateRange, setSelectedDateRange] = useState(1);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD") // Format as YYYY-MM-DD
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD")); // Format as YYYY-MM-DD
  const [customPickerOpen, setCustomPickerOpen] = useState(false);

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
      getDashboardActivity({
        startDate,
        endDate,
        roleId: getLoggedInUserRoleId(),
        userId:
          getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
            ? getLoggedInUserId()
            : ""
      })
    );
  };
  const today = dayjs();
  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    handleDateRange("1");
    setSelectedDateRange(1);
  }, []);
  return (
    <Box className="activityOverview__wrapper mb-3">
      <Box className="basic__card activity-cards">
        <Box className="title__wrapper">
          <Box className="title__wrapper--left">
            <Typography variant="h5" component="h5" className="section_title">
              Activity Overview
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview of all the orders
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
                      defaultValue={dayjs("YYYY-MM-DD")}
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
                      onChange={(newValue) => setEndDate(dayjs(newValue).format("YYYY-MM-DD"))}
                      minDate={dayjs(startDate)}
                      maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
                      defaultValue={dayjs("YYYY-MM-DD")}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>

              // <>
              //   <Grid item xs={12} sm={12} md={6} lg={6}>
              //     <Typography variant="label" component="label" className="add__label">
              //       Start Date
              //     </Typography>
              //     <LocalizationProvider dateAdapter={AdapterDayjs}>
              //       <DatePicker
              //         // value={dayjs(startDate)}
              //         className="w-100 datetimepicker-control"
              //         defaultValue={dayjs("YYYY-MM-DD")}
              //         onChange={(newValue) => setStartDate(dayjs(newValue).format("YYYY-MM-DD"))}
              //       />
              //     </LocalizationProvider>
              //   </Grid>
              //   <Grid>
              //     <Typography variant="label" component="label" className="add__label">
              //       End Date
              //     </Typography>
              //     <LocalizationProvider dateAdapter={AdapterDayjs}>
              //       <DatePicker
              //         // value={dayjs(endDate)}
              //         className="w-100 datetimepicker-control"
              //         onChange={(newValue) => setEndDate(dayjs(newValue).format("YYYY-MM-DD"))}
              //         minDate={dayjs(startDate)}
              //         maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
              //         defaultValue={dayjs("YYYY-MM-DD")}
              //       />
              //     </LocalizationProvider>
              //   </Grid>
              // </>
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
        {getLoggedInUserRoleId() === 1 ? (
          <Grid container spacing={1} className="mt-0">
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="overview__card overview__card--red">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-tenants_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.tenants === null ? "0" : data.tenants}
                  <Typography component="p" variant="p" className="activity-title">
                    Tenants
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="overview__card overview__card--purple">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-client_admin_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.clients === null ? "0" : data.clients}
                  <Typography component="p" variant="p" className="activity-title">
                    Client Admins
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="overview__card overview__card--green">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-provider_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.providers === null ? "0" : data.providers}
                  <Typography component="p" variant="p" className="activity-title">
                    Providers
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="overview__card overview__card--grey">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-patients_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.patients === null ? "0" : data.patients}
                  <Typography component="p" variant="p" className="activity-title">
                    Patients
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="overview__card overview__card--blue">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-facility_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.facilities === null ? "0" : data.facilities}
                  <Typography component="p" variant="p" className="activity-title">
                    Facilities
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4}>
              <Box className="overview__card overview__card--orange">
                <Typography component="span" variant="span" className="ls-labs_db whiteIcon whiteIcon--bg"></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.labs === null ? "0" : data.labs}
                  <Typography component="p" variant="p" className="activity-title">
                    Labs
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={1} className="mt-0">
            {getLoggedInUserRoleId() !== roleIds.CLIENT_ADMIN && (
              <Grid item xs={12} sm={6} md={4} lg={4} hidden={getLoggedInUserRoleId() === roleIds.PROVIDER}>
                <Box className="overview__card overview__card--purple">
                  <Typography
                    component="span"
                    variant="span"
                    className="ls-client_admin_db whiteIcon whiteIcon--bg"
                  ></Typography>
                  <Typography component="p" variant="p" className="activity-count">
                    {data.clients === null ? "0" : data.clients}
                    <Typography component="p" variant="p" className="activity-title">
                      Client Admins
                    </Typography>
                  </Typography>
                </Box>
              </Grid>
            )}
            <Grid item xs={12} sm={6} md={4} lg={4} hidden={getLoggedInUserRoleId() === roleIds.PROVIDER}>
              <Box className="overview__card overview__card--green">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-provider_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.providers === null ? "0" : data.providers}
                  <Typography component="p" variant="p" className="activity-title">
                    Providers
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} hidden={getLoggedInUserRoleId() === roleIds.PROVIDER}>
              <Box className="overview__card overview__card--orange">
                <Typography component="span" variant="span" className="ls-labs_db whiteIcon whiteIcon--bg"></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.labs === null ? "0" : data.labs}
                  <Typography component="p" variant="p" className="activity-title">
                    Labs
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="pt-2"
              hidden={getLoggedInUserRoleId() === roleIds.PROVIDER}
            >
              <Box className="overview__card overview__card--blue">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-facility_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.facilities === null ? "0" : data.facilities}
                  <Typography component="p" variant="p" className="activity-title">
                    Facilities
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} className="pt-2">
              <Box className="overview__card overview__card--grey">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-patients_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.patients === null ? "0" : data.patients}
                  <Typography component="p" variant="p" className="activity-title">
                    Patients
                  </Typography>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={4} className="pt-2">
              <Box className="overview__card overview__card--red">
                <Typography
                  component="span"
                  variant="span"
                  className="ls-tenants_db whiteIcon whiteIcon--bg"
                ></Typography>
                <Typography component="p" variant="p" className="activity-count">
                  {data.orders === null ? "0" : data.orders}
                  <Typography component="p" variant="p" className="activity-title">
                    Total Orders
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
