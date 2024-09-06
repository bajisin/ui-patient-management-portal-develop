import { Box, Button, DialogActions, DialogContent, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import { DATE_RANGE_OPTIONS, roleIds } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { dsrReports } from "@redux/slices/dashboardSlice";
import { getLoggedInUserId } from "../../utils/common";
import { getOrderDetails } from "@redux/slices/tenantsSlice";
import { getTenants } from "../../redux/slices/tenantsSlice";
import { getboardCastDetails } from "../../redux/slices/boardCastSlice";
import moment from "moment";
import { statusIds } from "../../_helpers/constants";
import { useLocation } from "react-router-dom";

export default function AdvanceFilter({
  setFilterOpen,
  filterOpen,
  list,
  selectedTenants,
  setSelectedTenants,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  status,
  setTenantIds,
  callType,
  pagination,
  fetchBroadCastData,
  filteredData,
  setFilteredData,
  selectedDateRange,
  setSelectedDateRange,
  setCustomPickerOpen,
  customPickerOpen,
  setStart,
  start,
  setEnd,
  end,
  setreportsRes
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  let startDateValue;
  let endDateValue;
  const pathnames = pathname;
  const [sDate, setSDate] = useState();
  const [eDate, seteDate] = useState();
  const handleDateRange = (value) => {
    switch (value) {
      case "1":
        startDateValue = moment().startOf("month").format("YYYY-MM-DD");
        endDateValue = moment().format("YYYY-MM-DD");
        setSDate(moment().startOf("month").format("YYYY-MM-DD"));
        setStart(moment().startOf("month").format("YYYY-MM-DD"));
        if (setStartDate && setEndDate) {
          setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
          setEndDate(moment().format("YYYY-MM-DD"));
        }
        setCustomPickerOpen(false);
        seteDate(moment().format("YYYY-MM-DD"));
        setEnd(moment().format("YYYY-MM-DD"));
        break;
      case "2":
        startDateValue = moment().subtract(7, "days").format("YYYY-MM-DD");
        endDateValue = moment().format("YYYY-MM-DD");
        setSDate(moment().subtract(7, "days").format("YYYY-MM-DD"));
        seteDate(moment().format("YYYY-MM-DD"));
        setStart(moment().subtract(7, "days").format("YYYY-MM-DD"));
        setEnd(moment().format("YYYY-MM-DD"));
        if (setStartDate && setEndDate) {
          setStartDate(moment().subtract(7, "days").format("YYYY-MM-DD"));
          setEndDate(moment().format("YYYY-MM-DD"));
        }
        setCustomPickerOpen(false);
        break;
      case "3":
        startDateValue = moment().subtract(15, "days").format("YYYY-MM-DD");
        endDateValue = moment().format("YYYY-MM-DD");
        if (setStartDate && setEndDate) {
          setStartDate(moment().startOf(15, "days").format("YYYY-MM-DD"));
          setEndDate(moment().format("YYYY-MM-DD"));
        }
        setStart(moment().subtract(15, "days").format("YYYY-MM-DD"));
        setEnd(moment().format("YYYY-MM-DD"));
        setSDate(moment().subtract(15, "days").format("YYYY-MM-DD"));
        seteDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "4":
        startDateValue = moment().startOf("year").format("YYYY-MM-DD");
        endDateValue = moment().format("YYYY-MM-DD");
        if (setStartDate && setEndDate) {
          setStartDate(moment().startOf("year").format("YYYY-MM-DD"));
          setEndDate(moment().format("YYYY-MM-DD"));
        }
        setStart(moment().startOf("year").format("YYYY-MM-DD"));
        setEnd(moment().format("YYYY-MM-DD"));
        setSDate(moment().startOf("year").format("YYYY-MM-DD"));
        seteDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "5":
        setStart("");
        setEnd("");
        setCustomPickerOpen(true);
    }
  };

  useEffect(() => {
    if (pathnames === "/dsrReport" || getLoggedInUserRoleId() === roleIds.PATIENT) {
      setSDate(start);
      seteDate(end);
    } else {
      setStartDate(sDate ? start : sDate);
      setEndDate(end);
    }
  }, [pathnames, start, end]);
  const role = getLoggedInUserRoleId();
  const handleAdvSearch = () => {
    setFilterOpen(false);

    if (list === "dsr") {
      dispatch(
        dsrReports({
          pageNo: 0,
          pageSize: 99999,
          searchValue: "",
          sortKey: "lastModifiedDate",
          sortOrder: "ASC",
          tenantId: getTenantId(),
          roleId: getLoggedInUserRoleId(),
          startDate: startDateValue || start || sDate,
          endDate: endDateValue || end || eDate
        })
      ).then((r) => {
        setreportsRes(r.payload.data.data);
      });
    } else if (list === "tenant") {
      dispatch(
        getTenants({
          pagination: {
            pageNo: 0,
            pageSize: 10
          },
          startDate: start || startDateValue || sDate ? start : sDate,
          endDate: eDate || endDateValue || end,
          role
        })
      );
    } else if (list === "broadcast") {
      dispatch(
        getboardCastDetails({
          pageNo: 0,
          pageSize: 10,
          searchValue: "",
          sortKey: "lastModifiedDate",
          sortOrder: "DESC",
          roleId: getLoggedInUserRoleId(),
          tenantId: [],
          startDate: startDate || start || sDate,
          endDate: endDate || end || eDate
        })
      );
    } else
      dispatch(
        getOrderDetails({
          pageNo: 0,
          pageSize: 10,
          sortOrder: "ASC",
          searchValue: "",
          sortKey: "lastModifiedDate",
          sortBy: "",
          orderStatus: [statusIds.IN_PROGRESS, statusIds.ON_HOLD, statusIds.COMPLETED, statusIds.CANCELLED],
          orderType: [],
          priorityType: [],
          roleId: getLoggedInUserRoleId(),
          startDate: startDateValue || start || sDate,
          endDate: endDateValue || end || eDate,
          tenantId: getTenantId(),
          userId: getLoggedInUserId()
        })
      ).then((response) => {
        setFilteredData(response?.payload?.data);
      });
  };

  const handleClear = () => {
    setSelectedDateRange("");
    setFilterOpen(false);
    setCustomPickerOpen(false);
    setStart("");
    setEnd("");
    seteDate("");
    if (list === "dsr") {
      dispatch(
        dsrReports({
          pageNo: 0,
          pageSize: 99999,
          searchValue: "",
          sortKey: "lastModifiedDate",
          sortOrder: "ASC",
          tenantId: getTenantId(),
          roleId: getLoggedInUserRoleId(),
          startDate: "",
          endDate: ""
        })
      ).then((r) => {
        setreportsRes(r.payload.data.data);
      });
    } else if (list === "tenant") {
      // setSelectedTenants([]);
      setSelectedDateRange("");
      setStartDate("");
      setEndDate("");
      setSDate("");
      seteDate("");
      dispatch(
        getTenants({
          pagination: {
            pageNo: 0,
            pageSize: 10
          },
          startDate: "",
          endDate: ""
        })
      );
    } else if (list === "broadcast") {
      setSelectedTenants([]);
      setSelectedDateRange("");
      setStartDate("");
      setEndDate("");
      setSDate("");
      seteDate("");
      dispatch(
        getboardCastDetails({
          pagination: {
            pageNo: 0,
            pageSize: 10
          },
          searchValue: "",
          sortKey: "lastModifiedDate",
          sortOrder: "DESC",
          roleId: getLoggedInUserRoleId(),
          tenantId: [],
          startDate: "",
          endDate: ""
        })
      );
    } else {
      dispatch(
        getOrderDetails({
          pageNo: 0,
          pageSize: 10,
          sortOrder: "ASC",
          searchValue: "",
          sortKey: "lastModifiedDate",
          sortBy: "",
          orderStatus: [statusIds.IN_PROGRESS, statusIds.ON_HOLD, statusIds.COMPLETED, statusIds.CANCELLED],
          orderType: [],
          priorityType: [],
          roleId: getLoggedInUserRoleId(),
          startDate: "",
          endDate: "",
          tenantId: getTenantId(),
          userId: getLoggedInUserId()
        })
      );
    }
  };

  return (
    <>
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className="filter_wrapper"> */}
      {/* <IconButton aria-label="close" onClick={handleFilterClose} className="modalClose">
        <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
      </IconButton> */}
      {/* <Box className="commonModal__wrapper--dialog"> */}
      <DialogContent>
        <Box className="d-flex justify-content-between align-items-center">
          <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
            Advanced Search
          </DialogTitle>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
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
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Start Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(start)}
                    className="w-100 datetimepicker-control"
                    onChange={(newValue) => setStart(dayjs(newValue).format("YYYY-MM-DD"))}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  End Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(end)}
                    className="w-100 datetimepicker-control"
                    onChange={(newValue) => setEnd(dayjs(newValue).format("YYYY-MM-DD"))}
                    minDate={dayjs(start)}
                  />
                </LocalizationProvider>
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="clear-all" onClick={handleClear}>
          Clear All
        </Button>
        <Button type="submit" autoFocus className="primary-btn ms-4" onClick={handleAdvSearch}>
          Search
        </Button>
      </DialogActions>
      {/* </Box> */}
      {/* </Dialog> */}
    </>
  );
}
