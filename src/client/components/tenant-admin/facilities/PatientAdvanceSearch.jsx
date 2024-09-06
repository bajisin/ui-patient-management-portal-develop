import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AdvanceDateRange from "./handleDateRange";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { STATUS_OPTIONS } from "../../../_helpers/constants";
import { patientListByFacilityId } from "@redux/slices/facilitiesSlice";

export default function PatientAdvanceSearch({
  setFilterOpen,
  filterOpen,
  list,
  sortOrder,
  sortKey,
  pagination,
  data,
  facilityId,
  setSelectedDateRange,
  selectedDateRange
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const { patientList } = useSelector((state) => state.facilities);

  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedfacilityTypeDesc, setSelectedfacilityTypeDesc] = useState([]);
  const [selectedserviceDesc, setSelectedserviceDesc] = useState([]);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const handleAdvSearch = () => {
    const patientId = selectedfacilityTypeDesc.map((t) => t.globalPatientId);
    const statusId = selectedserviceDesc.map((t) => t.id);
    dispatch(
      patientListByFacilityId({
        facilityId,
        // pagination: {
        pageNo: 0,
        pageSize: 10,
        // },
        statusId,
        searchValue: "",
        patientId,
        startDate,
        endDate,
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );

    setFilterOpen(false);
  };

  const handleClear = () => {
    setSelectedfacilityTypeDesc([]);
    setSelectedserviceDesc([]);
    setFilterOpen(false);
    setSelectedDateRange("");

    dispatch(
      patientListByFacilityId({
        facilityId,
        // pagination: {
        pageNo: 0,
        pageSize: 10,
        // },
        statusId: [],
        searchValue: "",
        patientId: [],
        startDate,
        endDate,
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );
  };

  return (
    <>
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className="filter_wrapper">
        <IconButton aria-label="close" onClick={handleFilterClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <Box className="commonModal__wrapper--dialog"> */}
      <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
        Advanced Search
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Patient ID
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={patientList}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.globalPatientId}
                value={selectedfacilityTypeDesc} // Set the selected options
                onChange={(newValue) => setSelectedfacilityTypeDesc(newValue)} // Update selectedPermissions
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ padding: 1, marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.globalPatientId}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="label" component="label" className="add__label">
              Status
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id="permission-tags"
                options={STATUS_OPTIONS}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.title}
                value={selectedserviceDesc} // Set the selected options
                onChange={(newValue) => setSelectedserviceDesc(newValue)} // Update selectedPermissions
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
          <AdvanceDateRange
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
          />{" "}
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
      {/* </Box>
      </Dialog> */}
    </>
  );
}
