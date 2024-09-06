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
import { DATE_RANGE_OPTIONS, ORDER_PRIORITIES, ORDER_REPORTS_STATUS } from "../../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { COMMON_MASTER_DATA_APIS } from "@config/api-config";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { getOrderDetails } from "@redux/slices/tenantsSlice";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import moment from "moment";
import { orderDetailsPayload } from "@pages/payload/usersPayload";

export default function OrderReportsAdvanceSearch({
  setStartDate,
  setEndDate,
  setFilterOpen,
  filterOpen,
  selectedOrderStatus,
  selectedOrderType,
  selectedPriorityType,
  setSelectedOrderStatus,
  setSelectedOrderType,
  setSelectedPriorityType,
  startDate,
  endDate,
  sortKey,
  sortOrder,
  setRecurring,
  recurring,
  pagination,
  searchVal,
  searchKeys,
  tabStatus,
  value,
  selectedDateRange,
  setSelectedDateRange,
  customPickerOpen,
  setCustomPickerOpen
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const { groupData } = useSelector((state) => state.patientsByGroupData);

  useEffect(() => {
    dispatch(getPatientsByGroupId(COMMON_MASTER_DATA_APIS.orderList()));
  }, []);
  const today = dayjs();
  const dispatch = useDispatch();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const handleAdvSearch = () => {
    const orderStatus = selectedOrderStatus.map((t) => t.id);
    const priorityType = selectedPriorityType.map((t) => t.id);
    const orderType = selectedOrderType.map((t) => t.ordTypId);
    const mergedStatus = orderStatus;
    dispatch(
      getOrderDetails({
        ...orderDetailsPayload({
          pagination,
          sortOrder,
          sortKey,
          searchVal,
          searchKeys,
          priorityType,
          orderType,
          startDate,
          endDate,
          status,
          mergedStatus,
          recurring
        })
      })
    );
    // dispatch(
    //   getOrderDetails({
    //     pageNo: pagination.pageIndex,
    //     pageSize: pagination.pageSize,
    //     sortOrder: sortOrder.toUpperCase() || "ASC",
    //     searchValue: searchVal,
    //     searchKeys,
    //     sortKey: sortKey || "lastModifiedDate",
    //     sortBy: "",
    //     orderStatus,
    //     orderType,
    //     priorityType,
    //     roleId: loggedInUser?.roleMasterDTO?.roleId,
    //     startDate,
    //     endDate,
    //     tenantId
    //   })
    // );

    setFilterOpen(false);
  };
  // useEffect(() => {
  //   setSelectedOrderStatus([]);
  // }, [tabStatus]);
  const handleClear = () => {
    setStartDate("");
    setEndDate("");
    setCustomPickerOpen(false);
    setSelectedOrderStatus([]);
    setSelectedOrderType([]);
    setSelectedPriorityType([]);
    setSelectedDateRange("");
    // setFilterOpen(false);
    const orderStatus = selectedOrderStatus.map((t) => t.id);
    const priorityType = selectedPriorityType.map((t) => t.id);
    // const mergedStatus = [...orderStatus, ...tabStatus];
    const mergedStatus = orderStatus;

    dispatch(
      getOrderDetails({
        ...orderDetailsPayload({
          pagination,
          sortOrder,
          sortKey,
          searchVal,
          searchKeys,
          priorityType,
          orderType: [],
          startDate: "",
          endDate: "",
          status,
          mergedStatus
        })
      })
    );
    setFilterOpen(false);
  };

  const options = groupData.map((s) => s?.orderTypeDTO);

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
  return (
    <>
      <DialogContent>
        <Box className="d-flex justify-content-between align-items-center">
          <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
            Advanced Search
          </DialogTitle>
          {value === 0 && (
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={recurring} onChange={(e) => setRecurring(e.target.checked)} />
              <Typography className="agree-statement">Recurring Order</Typography>
            </Typography>
          )}
        </Box>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Order Status
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={ORDER_REPORTS_STATUS}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.title}
                value={selectedOrderStatus} // Set the selected options
                onChange={(event, newValue) => setSelectedOrderStatus(newValue)} // Update selectedPermissions
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
          {/* <Grid item xs={12} sm={12} md={6} lg={6} className="advanceRange"> */}

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
            <>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  Start Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    defaultValue={dayjs("YYYY-MM-DD")}
                    className="w-100 datetimepicker-control"
                    onChange={(newValue) => setStartDate(dayjs(newValue)?.format("YYYY-MM-DD"))}
                    value={dayjs(startDate)}
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
                    defaultValue={dayjs("YYYY-MM-DD")}
                    className="w-100 datetimepicker-control"
                    onChange={(newValue) => setEndDate(dayjs(newValue)?.format("YYYY-MM-DD"))}
                    maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
                  />
                </LocalizationProvider>
              </Grid>
            </>
          )}
          {/* <AdvanceDateRange setStartDate={setStartDate} setEndDate={setEndDate} /> */}
          {/* </Grid> */}
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Priority Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={ORDER_PRIORITIES}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.title}
                value={selectedPriorityType} // Set the selected options
                onChange={(event, newValue) => setSelectedPriorityType(newValue)} // Update selectedPermissions
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
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Order Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={options}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.ordTypDesc}
                value={selectedOrderType} // Set the selected options
                onChange={(event, newValue) => setSelectedOrderType(newValue)} // Update selectedPermissions
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ padding: 1, marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.ordTypDesc}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="clear-all" onClick={handleClear}>
          Clear All
        </Button>
        <Button type="submit" autoFocus className="primary-btn" onClick={() => handleAdvSearch()}>
          Search
        </Button>
      </DialogActions>
    </>
  );
}
