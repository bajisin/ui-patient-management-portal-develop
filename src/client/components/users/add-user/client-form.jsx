import { Autocomplete, Checkbox, Grid, TextField, Typography } from "@mui/material";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Controller } from "react-hook-form";
import React from "react";
import { useSelector } from "react-redux";

const ClientForm = ({
  selectedFacilities,
  setSelectedFacilities,
  selectedLab,
  setSelectedLab,
  selectedFacilitiesErr,
  setSelectedFacilitiesErr,
  setSelectedLabErr,
  selectedLabErr,
  errors,
  control,
  clearErrors
}) => {
  const { data } = useSelector((state) => state.facilities);
  const { labList } = useSelector((state) => state.compendium);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  // const uniqueOptions = data?.filter((option, index, self) => index === self.findIndex((o) => o.id === option.id));
  // console.log(data,uniqueOptions,"data")

  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4} className="common_checkbox_selection">
        <Typography variant="label" component="label" className="add__label required">
          Facility
        </Typography>
        <Controller
          key={"facility"}
          control={control}
          name={"facility"}
          rules={{
            required: selectedFacilities?.length === 0 ? "This field is required." : ""
          }}
          render={({ field }) => (
            <Autocomplete
              className="permissions--tag"
              options={data}
              multiple
              isOptionEqualToValue={(option, value) => option.facilityId === value.facilityId}
              limitTags={5}
              disableCloseOnSelect
              getOptionLabel={(option) => option?.facilityName}
              value={selectedFacilities} // Set the selected options
              onChange={(event, newValue) => {
                setSelectedFacilities(newValue);
                clearErrors("facility");
              }} // Update selectedPermissions
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ padding: 1, marginRight: 8 }}
                    checked={selected}
                  />
                  {option?.facilityName}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label=""
                  error={Boolean(errors?.facility)}
                  helperText={errors?.facility?.message}
                />
              )}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} className="common_checkbox_selection">
        <Typography variant="label" component="label" className="add__label">
          Lab
        </Typography>
        <Autocomplete
          className="permissions--tag"
          id=""
          multiple
          limitTags={5}
          options={labList}
          disableCloseOnSelect
          isOptionEqualToValue={(option, value) => option.labId === value.labId}
          getOptionLabel={(option) => option?.labName}
          value={selectedLab} // Set the selected options
          onChange={(event, newValue) => {
            setSelectedLab(newValue);
            if (newValue.length === 0) {
              setSelectedLabErr(true);
            } else {
              setSelectedLabErr(false);
            }
          }} // Update selectedPermissions
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ padding: 1, marginRight: 8 }}
                checked={selected}
              />
              {option.labName}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label=""
              placeholder=""
              error={selectedLabErr}
              // helperText={selectedLabErr ? "This field is required" : ""}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default ClientForm;
