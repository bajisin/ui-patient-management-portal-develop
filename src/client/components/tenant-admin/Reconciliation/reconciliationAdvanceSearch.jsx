import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { DATE_RANGE_OPTIONS, RECONCILIATION_STATUS_OPTIONS, statusIds } from "../../../_helpers/constants";
import React, { useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "../../../utils/common";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AdvanceDateRange from "../facilities/handleDateRange";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { getOrderDetails } from "@redux/slices/tenantsSlice";
import moment from "moment";
import { useDispatch } from "react-redux";

// import AdvanceDateRange from "./handleDateRange";

export default function ReconciliationAdvanceSearch({
  setFilterOpen,
  filterOpen,
  sortKey,
  sortOrder,
  pagination,
  startDate,
  endDate,
  setEndDate,
  setStartDate,
  searchKeys,
  searchVal,
  selectedOrderType,
  selectedPriorityType,
  setSelectedserviceDesc,
  selectedserviceDesc,
  setSelectedDateRange,
  selectedDateRange,
  customPickerOpen,
  setCustomPickerOpen
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  // const dispatch = useDispatch();

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const dispatch = useDispatch();
  const handleAdvSearch = () => {
    const statusId = selectedserviceDesc.map((t) => t.id);
    dispatch(
      getOrderDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "ASC",
        searchValue: searchVal,
        searchKeys,
        sortKey: sortKey || "lastModifiedDate",
        sortBy: "",
        orderStatus: [statusIds.ERRORED],
        orderType: selectedOrderType,
        priorityType: selectedPriorityType,
        roleId: getLoggedInUserRoleId(),
        startDate,
        endDate,
        tenantId: getTenantId()
      })
    );

    setFilterOpen(false);
  };

  const handleClear = () => {
    setCustomPickerOpen(false);
    setStartDate("");
    setEndDate("");
    setSelectedserviceDesc([]);
    setSelectedDateRange("");
    dispatch(
      getOrderDetails({
        pageNo: pagination.pageIndex,
        pageSize: pagination.pageSize,
        sortOrder: sortOrder.toUpperCase() || "ASC",
        searchValue: searchVal,
        searchKeys,
        sortKey: sortKey || "lastModifiedDate",
        sortBy: "",
        orderStatus: [statusIds.ERRORED],
        orderType: selectedOrderType,
        priorityType: selectedPriorityType,
        roleId: getLoggedInUserRoleId(),
        startDate: "",
        endDate: "",
        tenantId: getTenantId()
      })
    );
    setFilterOpen(false);
  };
  const handleDateRange = (value) => {
    switch (value) {
      case "1":
        setStartDate(moment().startOf("month").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "2":
        setStartDate(moment().subtract(7, "days").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "3":
        setStartDate(moment().subtract(15, "days").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
        break;
      case "4":
        setStartDate(moment().startOf("year").format("YYYY-MM-DD"));
        setEndDate(moment().format("YYYY-MM-DD"));
        setCustomPickerOpen(false);
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
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className=" filter_wrapper"> */}
      {/* <IconButton aria-label="close" onClick={handleFilterClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton> */}
      {/* <Box className="commonModal__wrapper--dialog"> */}
      <DialogContent>
        <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
          Advanced Search
        </DialogTitle>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
              <Typography variant="label" component="label" className="add__label">
                Status
              </Typography>
              <FormControl className="w-100 common_checkbox_selection">
                <Autocomplete
                  className="permissions--tag"
                  multiple
                  limitTags={5}
                  id=""
                  options={RECONCILIATION_STATUS_OPTIONS}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option?.title}
                  value={selectedserviceDesc} // Set the selected options
                  onChange={(event, newValue) => setSelectedserviceDesc(newValue)} // Update selectedPermissions
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ padding: 1, marginRight: 8 }}
                        checked={selected}
                      />
                      {option?.title}
                    </li>
                  )}
                  renderInput={(params) => <TextField {...params} label="" placeholder="" />}
                />
              </FormControl>
            </Grid> */}
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
            //   {/* <DateRangePickerComp
            //     dateRange={datePickerRange}
            //     setDateRange={setDatePickerRange}
            //     endDate={endDate}
            //     startDate={startDate}
            //     setStartDate={setStartDate}
            //     setEndDate={setEndDate}
            //     maxDate={moment().toDate()}
            //   /> */}
            // </Grid>
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
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
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  End Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dayjs(endDate)}
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="clear-all primaryTextButton" onClick={handleClear}>
          Clear All
        </Button>
        <Button type="submit" autoFocus className="primary-btn" onClick={() => handleAdvSearch()}>
          Search
        </Button>
      </DialogActions>
      {/* </Box>
      </Dialog> */}
    </>
  );
}