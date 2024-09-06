import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { STATUS_OPTIONS_FACILITIES } from "../../../_helpers/constants";
import dayjs from "dayjs";
import { getFacilitiesDetails } from "@redux/slices/facilitiesSlice";
import { getLoggedInUserRoleId } from "../../../utils/common";

export default function FacilitiesAdvanceFilter({
  setFilterOpen,
  filterOpen,
  list,
  selectedService,
  setSelectedService,
  setSelectedstatusDesc,
  selectedstatusDesc,
  selectedfacilityTypeDesc,
  setSelectedfacilityTypeDesc,
  userId
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const { facilityList, serviceList } = useSelector((state) => state.commonAdmin);
  // const facilitiesByUserId = useSelector((state) => state.facilities.facilitiesByUserId);
  const dispatch = useDispatch();

  const [customPickerOpen, setCustomPickerOpen] = useState(false);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const handleAdvSearch = () => {
    const facilityTypeId = selectedfacilityTypeDesc.map((t) => t.id);
    const serviceId = selectedService.map((t) => t.id);
    const statusId = selectedstatusDesc.map((t) => t.id);
    dispatch(
      getFacilitiesDetails({
        pageNo: 0,
        pageSize: 10,
        searchValue: "",
        sortKey: "creationDate",
        sortOrder: "DESC",
        statusId,
        facilityTypeId,
        serviceId,
        startDate: "",
        endDate: "", 
        userId: [userId],
        roleId: getLoggedInUserRoleId()
      })
    );

    setFilterOpen(false);
  };

  const handleClear = () => {
    setSelectedfacilityTypeDesc([]);
    setSelectedstatusDesc([]);
    setSelectedService([]);
    dispatch(
      getFacilitiesDetails({
        pageNo: 0,
        pageSize: 10,
        searchValue: "",
        sortKey: "creationDate",
        sortOrder: "DESC",
        userId: [userId],
        roleId: getLoggedInUserRoleId()
      })
    );
    setFilterOpen(false);
  };

  return (
    <>
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className="filter_wrapper">
        <IconButton aria-label="close" onClick={() => handleFilterClose()} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <Box className="commonModal__wrapper--dialog"> */}
      <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
        Advanced Search
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Facility Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={facilityList}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedfacilityTypeDesc} // Set the selected options
                onChange={(event, newValue) => setSelectedfacilityTypeDesc(newValue)} // Update selectedPermissions
                renderOption={(props, option, { selected }) =>
                  option?.description != null && (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ padding: 1, marginRight: 8 }}
                        checked={selected}
                      />
                      {option?.description}
                    </li>
                  )
                }
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Services
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={serviceList}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedService} // Set the selected options
                onChange={(event, newValue) => setSelectedService(newValue)} // Update selectedPermissions
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ padding: 1, marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.description}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Status
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={STATUS_OPTIONS_FACILITIES}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.title}
                value={selectedstatusDesc} // Set the selected options
                onChange={(event, newValue) => setSelectedstatusDesc(newValue)} // Update selectedPermissions
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
            //       <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
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
                    // onChange={(newValue) => setStartDate(dayjs(newValue).format("YYYY-MM-DD"))}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Typography variant="label" component="label" className="add__label">
                  End Date
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // value={dayjs(endDate)}
                    className="w-100 datetimepicker-control"
                    // onChange={(newValue) => setEndDate(dayjs(newValue).format("YYYY-MM-DD"))}
                    // minDate={dayjs(startDate)}
                    defaultValue={dayjs("YYYY-MM-DD")}
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
        <Button type="submit" autoFocus className="primary-btn ms-4" onClick={() => handleAdvSearch()}>
          Search
        </Button>
      </DialogActions>
      {/* </Box>
      </Dialog> */}
    </>
  );
}
