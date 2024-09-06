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
import {
  DATE_RANGE_OPTIONS,
  ORDER_PRIORITIES,
  ORDER_STATUS,
  ORDER_TYPES,
  roleIds
} from "../../../../_helpers/constants";
import React, { useState } from "react";
import { getLoggedInUserRoleId, getTenantId } from "@utils/common";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
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
import { useLocation } from "react-router-dom";

export default function AdvanceSearch({
  setFilterOpen,
  filterOpen,
  selectedDateRange,
  setSelectedDateRange,
  customPickerOpen,
  setCustomPickerOpen,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  setSelectedStatus,
  selectedStatus,
  setSelectedType,
  selectedType,
  setPriorityType,
  priorityType
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { pathname } = useLocation();
  const userId = pathname.split("/")[3];
  const clientUserId = pathname.split("/")[2];
  const labId = pathname.split("/")[3];
  // const [selectedStatus, setSelectedStatus] = useState([]);

  const handleDateRange = (value) => {
    switch (value) {
      case "1":
        setStartDate(moment().startOf("month").format("MM-DD-YYYY"));
        setEndDate(moment().format("MM-DD-YYYY"));
        setCustomPickerOpen(false);
        break;
      case "2":
        setStartDate(moment().subtract(7, "days").format("MM-DD-YYYY"));
        setEndDate(moment().format("MM-DD-YYYY"));
        setCustomPickerOpen(false);
        break;
      case "3":
        setStartDate(moment().subtract(15, "days").format("MM-DD-YYYY"));
        setEndDate(moment().format("MM-DD-YYYY"));
        setCustomPickerOpen(false);
        break;
      case "4":
        setStartDate(moment().startOf("year").format("MM-DD-YYYY"));
        setEndDate(moment().format("MM-DD-YYYY"));
        setCustomPickerOpen(false);
        break;
      case "5":
        setStartDate("");
        setEndDate("");
        setCustomPickerOpen(true);
        break;
    }
  };
  const [ostatus, setOStatus] = useState("");

  const handleAdvSearch = () => {
    const statusIds = selectedStatus ? selectedStatus?.map((t) => parseInt(t.id)) : ostatus?.map((s) => parseInt(s.id));
    const types = selectedType?.map((t) => parseInt(t.id));
    const priorities = priorityType?.map((t) => parseInt(t.id));

    dispatch(
      getOrderDetails({
        pageNo: 0,
        pageSize: 10,
        sortOrder: "DESC",
        searchValue: "",
        searchKeys: [],
        sortKey: "lastModifiedDate",
        sortBy: "lastModifiedDate",
        orderStatus: statusIds,
        orderType: types,
        priorityType: priorities,
        roleId: getLoggedInUserRoleId() ,
        startDate: startDate === "" ? "" : moment(startDate).format("YYYY-MM-DD"),
        endDate: endDate === "" ? "" : moment(endDate).format("YYYY-MM-DD"),
        tenantId: getTenantId(),
        userId: getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? clientUserId : getLoggedInUserRoleId() === roleIds.SUPER_ADMIN ? "" : userId
      })
    );
    setFilterOpen(false);
  };
  const today = dayjs();
  const handleClear = () => {
    setCustomPickerOpen(false);
    setSelectedStatus([]);
    setSelectedType([]);
    setPriorityType([]);
    setSelectedDateRange("");
    setStartDate("");
    setEndDate("");
    dispatch(
      getOrderDetails({
        endDate: "",
        // labId ,
        pageNo: 0,
        pageSize: 10,
        searchValue: "",
        sortKey: "lastName",
        sortOrder: "DESC",
        startDate: "",
        roleId: getLoggedInUserRoleId() ,
        statusId: [],
        tenantId: getTenantId(),
        userId: getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN ? clientUserId : getLoggedInUserRoleId() === roleIds.SUPER_ADMIN ? "" : userId
      })
    );
    setFilterOpen(false);
  };

  return (
    <>
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className="filter_wrapper"> */}
      {/* <IconButton aria-label="close" onClick={handleFilterClose} className="modalClose">
        <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
      </IconButton> */}
      {/* <Box className="commonModal__wrapper--dialog"> */}
      <DialogContent>
        <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
          Advanced Search
        </DialogTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Order Status
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={ORDER_STATUS}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.title}
                value={selectedStatus} // Set the selected options
                onChange={(event, newValue) => {
                  setSelectedStatus(newValue);
                  setOStatus(newValue);
                }} // Update selectedPermissions
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
                    value={dayjs(startDate)}
                    className="w-100 datetimepicker-control"
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
                  />
                </LocalizationProvider>
              </Grid>
            </>
          )}
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Order Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id="permission-tags"
                options={ORDER_TYPES}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                value={selectedType} // Set the selected options
                onChange={(event, newValue) => setSelectedType(newValue)} // Update selectedPermissions
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ padding: 1, marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Priority Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={1}
                id="permission-tags"
                options={ORDER_PRIORITIES}
                disableCloseOnSelect
                getOptionLabel={(option) => option.title}
                value={priorityType} // Set the selected options
                onChange={(event, newValue) => setPriorityType(newValue)} // Update selectedPermissions
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ padding: 1, marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
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
        <Button type="submit" autoFocus className="primary-btn ms-4" onClick={handleAdvSearch}>
          Search
        </Button>
      </DialogActions>
      {/* </Box>
      </Dialog> */}
    </>
  );
}
