import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import { DATE_RANGE_OPTIONS, roleIds } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { OrderStatusChart } from "../highCharts";
import dayjs from "dayjs";
import moment from "moment";
import { orderStatusDashboard } from "@redux/slices/orderStatusSlice";

export default function OrderStatus() {
  const dispatch = useDispatch();
  const [selectedDateRange, setSelectedDateRange] = useState(1);
  const [startDate, setStartDate] = useState(
    moment().startOf("month").format("YYYY-MM-DD") // Format as YYYY-MM-DD
  );
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD")); // Format as YYYY-MM-DD
  const [customPickerOpen, setCustomPickerOpen] = useState(false);
  const { orderStatus: data } = useSelector((state) => state.DASHBOARDSTATUS);

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
      orderStatusDashboard({
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

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);
  const today = dayjs();
  return (
    <Box className="orderStatus__wrapper mb-3">
      <Box className="basic__card order-card mt-0">
        <Box className="title__wrapper">
          <Box className="title__wrapper--left w-100">
            <Typography variant="h5" component="h5" className="section_title">
              Order Status
            </Typography>
            <Typography variant="span" component="span" className="overview_text">
              Get an overview of all the order status
            </Typography>
          </Box>
        </Box>
        <Box className="title__wrapper">
          <Box className="title__wrapper--left w-100 d-flex flex-column justify-content-start">
            <Select
              className="add__select dateRangePicker"
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
            {customPickerOpen && (
              <Grid container className="w-100 justify-content-start mt-2">
                <Grid item xs={6} sm={6} md={6} lg={6} className="pe-1">
                  <Typography>Start Date</Typography>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(startDate)}
                      className="w-100 datetimepicker-control"
                      onChange={
                        (newValue) => setStartDate(dayjs(newValue).format("YYYY-MM-DD")) // Format as YYYY-MM-DD
                      }
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} className="ps-1">
                  <Typography>End Date</Typography>

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={dayjs(endDate)}
                      className="w-100 datetimepicker-control"
                      onChange={(newValue) => {
                        setEndDate(dayjs(newValue).format("YYYY-MM-DD")); // Format as YYYY-MM-DD
                      }}
                      minDate={dayjs(startDate)}
                      maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            )}
          </Box>
        </Box>
        <Box className="total__card">
          <Typography component="p" variant="p" className="total-orders">
            {data?.totalOrders === null ? "0" : data.totalOrders}
            <Typography component="span" variant="span" className="total-order-title">
              Total Orders
            </Typography>
          </Typography>

          <Typography component="div" variant="p" className="order-status-chart-wrapper">
            <OrderStatusChart />
          </Typography>
          <Grid container className="total__card--totalCount">
            <Grid item xs={3}>
              <Typography variant="label" component="label">
                <Typography variant="b" component="b" className="orders completed"></Typography>
                <Typography variant="div" component="div">
                  <Typography variant="h4" component="h4">
                    Resulted
                  </Typography>
                  <Typography variant="p" component="p">
                    {data?.completed === null ? "0" : data.completed}
                  </Typography>
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="label" component="label">
                <Typography variant="b" component="b" className="orders pending"></Typography>
                <Typography variant="div" component="div">
                  <Typography variant="h4" component="h4">
                    Submitted
                  </Typography>
                  <Typography variant="p" component="p">
                    {data?.pending}
                  </Typography>
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="label" component="label">
                <Typography variant="b" component="b" className="orders rejected"></Typography>
                <Typography variant="div" component="div">
                  <Typography variant="h4" component="h4">
                    Rejected
                  </Typography>
                  <Typography variant="p" component="p">
                    {data?.rejected === null ? "0" : data.rejected}
                  </Typography>
                </Typography>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="label" component="label">
                <Typography variant="b" component="b" className="orders rejected"></Typography>
                <Typography variant="div" component="div">
                  <Typography variant="h4" component="h4">
                    Cancelled
                  </Typography>
                  <Typography variant="p" component="p">
                    {data?.cancelled === null ? "0" : data.cancelled}
                  </Typography>
                </Typography>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
