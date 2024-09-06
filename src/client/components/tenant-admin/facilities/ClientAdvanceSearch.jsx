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
import { clientListByFacilityId, getFacilitiesById } from "../../../redux/slices/facilitiesSlice";
import { useDispatch, useSelector } from "react-redux";

import AdvanceDateRange from "./handleDateRange";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { STATUS_OPTIONS_FACILITIES } from "../../../_helpers/constants";

export default function FacilitiesTabsAdvancefilter({
  setFilterOpen,
  filterOpen,
  list,
  data,
  sortKey,
  sortOrder,
  pagination,
  Id,
  setSelectedserviceDesc,
  selectedserviceDesc,
  setSelectedDateRange,
  selectedDateRange
}) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const facilitiesById = useSelector((state) => state.facilities.facilitiesById);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const handleAdvSearch = () => {
    const statusId = selectedserviceDesc.map((t) => t.id);
    dispatch(
      clientListByFacilityId({
        pageNo: pagination.pageIndex,
        facilityId: Id,
        statusId,
        startDate,
        endDate,
        pageSize: pagination.pageSize,
        searchValue: "",
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );

    setFilterOpen(false);
  };

  const handleClear = () => {
    setSelectedserviceDesc([]);
    setSelectedDateRange("");
    dispatch(
      clientListByFacilityId({
        pageNo: pagination.pageIndex,
        facilityId: Id,
        statusId: [],
        startDate: "",
        endDate: "",
        pageSize: pagination.pageSize,
        searchValue: "",
        sortKey: sortKey || "firstName",
        sortOrder: sortOrder.toUpperCase() || "ASC"
      })
    );
    dispatch(getFacilitiesById(facilitiesById?.facilityId));
    setFilterOpen(false);
  };

  return (
    // <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className=" filter_wrapper">
    //   <IconButton aria-label="close" onClick={handleFilterClose} className="modalClose">
    //     <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
    //   </IconButton>
    //   <Box className="commonModal__wrapper--dialog">
    <>
      <DialogContent>
        <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
          Advanced Search
        </DialogTitle>
        <Grid container spacing={2}>
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
                options={STATUS_OPTIONS_FACILITIES}
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
        <Button className="clear-all primaryTextButton" onClick={handleClear}>
          Clear All
        </Button>
        <Button type="submit" autoFocus className="primary-btn" onClick={() => handleAdvSearch()}>
          Search
        </Button>
      </DialogActions>
    </>
    //   </Box>
    // </Dialog>
  );
}
