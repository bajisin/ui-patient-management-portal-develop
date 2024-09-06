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
  LABS_STATUS_OPTIONS,
  USER_STATUS_OPTIONS,
  roleIds,
  statusIds
} from "../../../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserRoleId, getTenantId, getLoggedInUserId} from "@utils/common";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { clientListByLabId } from "../../../../redux/slices/labs-slice";
import dayjs from "dayjs";
import { getAllLabs } from "@redux/slices/labs-slice";
import { getTenantUsers } from "@redux/slices/tenantsSlice";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function AdvanceSearch({
  setFilterOpen,
  filterOpen,
  roles,
  call,
  userId,
  setSelectedStatus,
  selectedStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  callType,
  selectedTenantId,
  calluser,
  statusId,
  value,
  selectedDateRange,
  setSelectedDateRange
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const dispatch = useDispatch();

  const [customPickerOpen, setCustomPickerOpen] = useState(false);

  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { pathname } = useLocation();
  const tenantIds = pathname.split("/")[1];
  const userID = pathname.split("/")[4];
  const Ids = pathname.split("/")[3];
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
  const userstatusId = selectedStatus?.map((t) => t.id);
  useEffect(() => {
    if (selectedDateRange === "5") {
      setCustomPickerOpen(true);
    } else {
      setCustomPickerOpen(false);
    }
  }, [selectedDateRange]);
  const handleAdvSearch = () => {
    if (call === "users") {
      const payload = {
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        searchValue: "",
        roleId:
          tenantIds === "client-admin-users" || tenantIds === "tenant-config" || tenantIds === "tenant-admin-users"
            ? roles
            : [roleIds?.PROVIDER],
        statusId: userstatusId,
        tenantId: Ids !== "" ? Ids : getTenantId(),
        role: getLoggedInUserRoleId(),
        startDate,
        endDate
      };

      if (userId)
        dispatch(
          getTenantUsers({
            ...payload,
            userId: userID === "user-details" || tenantIds === "client-admin-users" ? [userId] : [],
            roleId:
              tenantIds === "tenant-admin-user" || tenantIds === "client-admin-users" ? [roleIds.PROVIDER] : roles,
            statusId: userstatusId,
            tenantId: getTenantId(),
            role: getLoggedInUserRoleId()
          })
        );
      else {
        dispatch(
          getTenantUsers({ ...payload, userId: calluser === "user details" ? [selectedTenantId] : call === "users" ? selectedTenantId != null ? [selectedTenantId] : [] : [getLoggedInUserId()] })
        );
      }
    } else if (call === "labs") {
      dispatch(
        getAllLabs({
          pageNo: 0,
          pageSize: 10,
          searchValue: "",
          sortBy: "",
          sortKey: "lastModifiedDate",
          sortOrder: "DESC",
          status: userstatusId,
          startDate,
          endDate,
          role: loggedInUser?.roleMasterDTO?.roleId
        })
      );
    } else if (call === "Client Details") {
      dispatch(
        clientListByLabId({
          pageNo: 0,
          getLoggedInUserRoleId,
          pageSize: 10,
          labId: Ids,
          searchValue: "",
          sortKey: "lastName",
          sortOrder: "ASC",
          startDate,
          endDate,
          statusId: userstatusId
        })
      );
    }
    setFilterOpen(false);
  };
  const handleClear = () => {
    setSelectedDateRange("");
    setSelectedStatus([]);
    setStartDate("");
    setEndDate("");

    if (call === "users") {
      const payload = {
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        searchValue: "",
        statusId: statusId === "status" ? [statusIds.ACTIVE, statusIds.IN_ACTIVE, statusIds.PENDING] : [],
        tenantId: getTenantId(),
        role: getLoggedInUserRoleId(),
        roleId: getLoggedInUserRoleId() === 3 ? [4] : roles,
        userId: [],
        startDate: "",
        endDate: ""
      };
      if (userId)
        dispatch(
          getTenantUsers({
            ...payload,
            userId: userID === "user-details" || tenantIds === "client-admin-users" ? [userId] : []
          })
        );
      else
        dispatch(
          getTenantUsers({ ...payload, userId: calluser === "user details" ? [selectedTenantId] : call === "users" ? selectedTenantId != null ? [selectedTenantId] : [] : [getLoggedInUserId()] })
        );
    } else if (call === "Client Details") {
      dispatch(
        clientListByLabId({
          pageNo: 0,
          getLoggedInUserRoleId,
          pageSize: 10,
          labId: Ids,
          searchValue: "",
          sortKey: "lastName",
          sortOrder: "ASC",
          startDate: "",
          endDate: "",
          statusId: value === 0 ? [] : value === 1 ? [statusIds.ACTIVE] : [statusIds.IN_ACTIVE]
        })
      );
    } else {
      dispatch(
        getAllLabs({
          pageNo: 0,
          pageSize: 10,
          searchValue: "",
          sortBy: "",
          sortKey: "lastModifiedDate",
          sortOrder: "DESC",
          status: [],
          startDate: "",
          endDate: "",
          role: loggedInUser?.roleMasterDTO?.roleId
        })
      );
    }
    setFilterOpen(false);
  };
  const userDetailsString = sessionStorage.getItem("userDetails");

  const userDetails = JSON.parse(userDetailsString);

  const roleId = userDetails.roleMasterDTO.roleId;
  const today = dayjs();
  return (
    <>
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className=" filter_wrapper">
        <IconButton aria-label="close" onClick={handleFilterClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <Box className="commonModal__wrapper--dialog"> */}
      <DialogContent open={filterOpen}>
        <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
          Advanced Search
        </DialogTitle>
        <Grid container spacing={2}>
          {roleId === 3 ? (
            ""
          ) : (
            <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
              <Typography variant="label" component="label" className="add__label">
                Status
              </Typography>
              <FormControl className="w-100 common_checkbox_selection">
                {call === "users" ? (
                  <Autocomplete
                    className="permissions--tag"
                    multiple
                    limitTags={5}
                    id=""
                    options={USER_STATUS_OPTIONS}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    value={selectedStatus} // Set the selected options
                    onChange={(event, newValue) => setSelectedStatus(newValue)} // Update selectedPermissions
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
                ) : (
                  <Autocomplete
                    className="permissions--tag"
                    multiple
                    limitTags={1}
                    id="permission-tags"
                    options={LABS_STATUS_OPTIONS}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    value={selectedStatus} // Set the selected options
                    onChange={(event, newValue) => setSelectedStatus(newValue)} // Update selectedPermissions
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
                )}
              </FormControl>
            </Grid>
          )}
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
                    minDate={dayjs(startDate)}
                    maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
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
        <Button type="submit" autoFocus className="primary-btn ms-4" onClick={handleAdvSearch}>
          Search
        </Button>
      </DialogActions>
      {/* </Box>
      </Dialog> */}
    </>
  );
}
