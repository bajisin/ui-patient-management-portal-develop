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

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { getTestCompendiumsList } from "@redux/slices/compendiumSlice";

export default function CompendiumAdvanceFilter({ setFilterOpen, filterOpen, data, setData }) {
  const handleFilterClose = () => {
    setFilterOpen(false);
  };
  const dispatch = useDispatch();
  const { orderableTypes, continerTypeData, workGroupData, performingData, specimentData } = useSelector(
    (state) => state.commonAdmin
  );
  const [selectedWorkGrpDataList, setSelectedWorkGrpDataList] = useState([]);
  const [selectedOrderableTypes, setSelectedOrderableTypes] = useState([]);
  const [selectedPerformingData, setSelectedPerformingData] = useState([]);
  const [selectedSpecimentData, setSelectedSpecimentData] = useState([]);
  const [selectedContainerData, setSelectedContainerTypes] = useState([]);
  const [selectedAlternativeContainerData, setSelectedAlternativeContainerTypes] = useState([]);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleClear = () => {
    setSelectedWorkGrpDataList([]);
    setSelectedOrderableTypes([]);
    setSelectedPerformingData([]);
    setSelectedSpecimentData([]);
    setSelectedContainerTypes([]);
    setSelectedAlternativeContainerTypes([]);
    dispatch(
      getTestCompendiumsList({
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        status: "all",
        searchValue: "",
        sortBy: "",
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        departmentId: [],
        orderTypeId: [],
        specimenTypeId: [],
        workGroupId: [],
        alternateContainerType: [],
        preferredContainerType: []
      })
    );
    setFilterOpen(false);
  };
  const handleAdvSearch = () => {
    const departmentId = selectedPerformingData.map((t) => t.id);
    const orderTypeId = selectedOrderableTypes.map((t) => t.id);
    const specimenTypeId = selectedSpecimentData.map((t) => t.id);
    const workGroupId = selectedWorkGrpDataList.map((t) => t.id);
    const preferredContainerType = selectedContainerData.map((t) => t.id);
    const alternateContainerType = selectedAlternativeContainerData.map((t) => t.id);
    const newData = [
      departmentId,
      orderTypeId,
      specimenTypeId,
      workGroupId,
      preferredContainerType,
      alternateContainerType
    ];

    setData(newData);
    dispatch(
      getTestCompendiumsList({
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        status: "all",
        searchValue: "",
        sortBy: "",
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        departmentId,
        orderTypeId,
        specimenTypeId,
        workGroupId,
        alternateContainerType,
        preferredContainerType
      })
    );
    setFilterOpen(false);
  };
  return (
    <>
      {/* <Dialog aria-labelledby="Filter-wrapper" open={filterOpen} enableResize={true} className=" filter_wrapper">
        <IconButton aria-label="close" onClick={handleFilterClose} className="modalClose">
          <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
        </IconButton>
        <Box className="commonModal__wrapper--dialog"> */}
      <DialogContent>
        <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
          Advanced Search
        </DialogTitle>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
            <Typography variant="label" component="label" className="add__label">
              Work Group
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={workGroupData}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedWorkGrpDataList} // Set the selected options
                onChange={(event, newValue) => setSelectedWorkGrpDataList(newValue)} // Update selectedPermissions
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
              Specimen Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={specimentData}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedSpecimentData} // Set the selected options
                onChange={(event, newValue) => setSelectedSpecimentData(newValue)} // Update selectedPermissions
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
              Performing Department
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={performingData}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedPerformingData} // Set the selected options
                onChange={(event, newValue) => setSelectedPerformingData(newValue)} // Update selectedPermissions
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
              Orderable Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={orderableTypes}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedOrderableTypes} // Set the selected options
                onChange={(event, newValue) => setSelectedOrderableTypes(newValue)} // Update selectedPermissions
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
              Preferred container Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id="permission-tags"
                options={continerTypeData}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedContainerData} // Set the selected options
                onChange={(event, newValue) => setSelectedContainerTypes(newValue)} // Update selectedPermissions
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
              Alternative Container Type
            </Typography>
            <FormControl className="w-100 common_checkbox_selection">
              <Autocomplete
                className="permissions--tag"
                multiple
                limitTags={5}
                id=""
                options={continerTypeData}
                disableCloseOnSelect
                getOptionLabel={(option) => option?.description}
                value={selectedAlternativeContainerData} // Set the selected options
                onChange={(event, newValue) => setSelectedAlternativeContainerTypes(newValue)} // Update selectedPermissions
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
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button className="clear-all primaryTextButton" onClick={handleClear}>
          Clear All
        </Button>
        <Button
          type="submit"
          autoFocus
          className="primary-btn ms-4"
          onClick={() => {
            handleAdvSearch();
          }}
        >
          Search
        </Button>
      </DialogActions>
      {/* </Box>
      </Dialog> */}
    </>
  );
}
