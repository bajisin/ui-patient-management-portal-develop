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
import { STATUS_OPTIONS_ORDERTAB } from "../../../_helpers/constants";
import { orderListByFacilityId } from "../../../redux/slices/facilitiesSlice";

export default function OrderAdvanceSearch({
  setFilterOpen,
  filterOpen,
  sortOrder,
  sortKey,
  pagination,
  facilityId,
  setSelectedStatus,
  selectedStatus,
  setSelectedDateRange,
  selectedDateRange
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const dispatch = useDispatch();

  const [selectedfacilityTypeDesc, setSelectedfacilityTypeDesc] = useState([]);
  const [selectedserviceDesc, setSelectedserviceDesc] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const { orderList: data } = useSelector((state) => state.facilities);

  const handleAdvSearch = () => {
    const orderId = selectedfacilityTypeDesc.map((t) => t.orderId);
    const patientId = selectedserviceDesc.map((t) => t.globalPatientId);
    const statusId = selectedStatus.map((t) => t.id);
    dispatch(
      orderListByFacilityId({
        pageNo: pagination.pageIndex,
        facilityId,
        statusId,
        pageSize: pagination.pageSize,
        searchValue: "",
        patientId,
        startDate,
        endDate,
        orderId,
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );

    setFilterOpen(false);
  };

  const handleClear = () => {
    setSelectedfacilityTypeDesc([]);
    setSelectedserviceDesc([]);
    setSelectedStatus([]);
    setFilterOpen(false);
    setSelectedDateRange("");

    dispatch(
      orderListByFacilityId({
        pageNo: pagination.pageIndex,
        facilityId,
        statusId: [],
        pageSize: pagination.pageSize,
        searchValue: "",
        patientId: [],
        startDate,
        endDate,
        orderId: [],
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );
  };

  return (
    <>
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className=" filter_wrapper">
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
              Order ID
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={data}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.orderId}
                value={selectedfacilityTypeDesc} // Set the selected options
                onChange={(event, newValue) => setSelectedfacilityTypeDesc(newValue)} // Update selectedPermissions
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ padding: 1, marginRight: 8 }}
                      checked={selected}
                    />
                    {option?.orderId}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Typography variant="label" component="label" className="add__label">
              Patient ID
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id="permission-tags"
                options={data}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.globalPatientId}
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
                    {option?.globalPatientId}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Status ID
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={STATUS_OPTIONS_ORDERTAB}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.title}
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
                    {option?.title}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="" placeholder="" />}
              />
            </FormControl>
          </Grid>
          <AdvanceDateRange
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            selectedDateRange={selectedDateRange}
            setSelectedDateRange={setSelectedDateRange}
          />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="text" className="clear-all primaryTextButton" onClick={handleClear}>
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
