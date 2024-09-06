import { Autocomplete, Grid, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { Controller } from "react-hook-form";
import GeoLocationSearch from "../../tenant/google-location";
import { getLoggedInUserRoleId } from "@utils/common";
import { roleIds } from "../../../_helpers/constants";
import useDebounce from "../../../utils/useDebounce";
import { useSelector } from "react-redux";

export const ProviderForm = ({
  npiNo,
  setNpiNo,
  city,
  setCity,
  control,
  errors,
  associatedTo,
  setAssociatedTo,
  getNpiDetails,
  clearErrors,
  error,
  setNpiReadOnly,
  userData,
  editVal
}) => {
  const [alignment, setAlignment] = React.useState("left");
  const [physician, setPhysician] = React.useState(true);
  const [npi, setNpi] = React.useState("");
  const { npiArray } = useSelector((state) => state.tenants);
  const { clients } = useSelector((state) => state.createOrder);
  const debounceVal = useDebounce(npi, 1000);
  const handleAlignment = (event, newAlignment) => {
    setPhysician(!physician);
    setAlignment(newAlignment);
    setNpiReadOnly(false);
  };
  useEffect(() => {
    if (clients?.length > 0) {
      const filtered = clients?.find((id) => id?.userId === userData?.reportingManagerUserId);
      setAssociatedTo(filtered);
    }
  }, [editVal, clients]);
  useEffect(() => {
    if (editVal) {
      setNpiNo(npiArray?.length === 1 && npiArray[0]);
    }
  }, [npiArray, editVal]);
  useEffect(() => {
    if (debounceVal !== "") getNpiDetails(debounceVal);
  }, [debounceVal]);
  const filterOptions = (options, { inputValue }) => {
    const terms = inputValue.split(" ").map((term) => term.trim().toLowerCase());
    return options.filter((option) => terms.every((term) => option.basic.name.toLowerCase().includes(term)));
  };
  return (
    <>
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Typography variant="label" component="label" className="add__label required">
          Provider
        </Typography>
        <ToggleButtonGroup
          className="toggle__buttons customized__toggle"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton className="toggle__buttons--left" value="left" aria-label="left aligned">
            <Typography className="list_name">Physician</Typography>
          </ToggleButton>

          <ToggleButton className="toggle__buttons--right" value="justify" aria-label="justified">
            <Typography className="grid_name">Nurses</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {getLoggedInUserRoleId() !== roleIds.CLIENT_ADMIN && (
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Client Admin
          </Typography>
          <Controller
            key={"clientAdmin"}
            control={control}
            name={"clientAdmin"}
            rules={{
              required: !associatedTo || associatedTo.length === 0 ? "This field is required." : ""
            }}
            render={({ field }) => (
              <Autocomplete
                className="customAutocomplete__input"
                id=""
                options={clients}
                disableCloseOnSelect
                getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
                value={associatedTo} // Set the selected options
                defaultValue={clients[0]}
                onChange={(event, newValue) => {
                  setAssociatedTo(newValue);
                  clearErrors("clientAdmin");
                }} // Update selectedPermissions
                renderOption={(props, option, { selected }) => (
                  <li {...props}>{`${option?.firstName} ${option?.lastName}`}</li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    placeholder=""
                    error={Boolean(errors?.clientAdmin)}
                    helperText={errors?.clientAdmin?.message}
                  />
                )}
              />
            )}
          />
        </Grid>
      )}
      {physician && (
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label mb-2">
            City
          </Typography>
          <Controller
            control={control}
            name={"perCity"}
            render={({ field }) => (
              <div>
                <GeoLocationSearch
                  defaultValue={city !== "" ? `${city}` : ""}
                  setLocation={(newLocation) => {
                    if (newLocation !== "") {
                      setCity(newLocation.city);
                    }
                  }}
                  setCity={setCity}
                />
                {/* {<Typography className="errorInfo">{error1}</Typography>} */}
              </div>
            )}
          />
        </Grid>
      )}
      {physician && (
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            NPI Number
          </Typography>
          <Controller
            key={"npiNumber"}
            control={control}
            name={"npiNumber"}
            rules={{
              required:
                editVal && !npiNo?.number
                  ? "This Field is required"
                  : !editVal && (typeof npiNo !== "string" || npiNo.trim() === "")
                  ? "This field is required."
                  : undefined
            }}
            render={({ field }) => (
              <Autocomplete
                className="customAutocomplete__input"
                id="patientNameSearch"
                disableClearable
                freeSolo
                filterOptions={filterOptions}
                options={npiArray?.message ? [] : npiArray || []}
                getOptionLabel={(option) => (option?.number ? `${option?.number} - ${option?.basic?.name}` : "")}
                value={npiNo}
                // onKeyUp={(e) => getNpiDetails(e.target.value)}
                onKeyUp={(e) => {
                  const inputValue = e.target.value.trim();
                  const words = inputValue.split(" ");
                  const isValidInput = words.every((word) => word.length >= 1);
                  if (isValidInput) {
                    if (e.key) {
                      getNpiDetails(inputValue);
                    } else if (e.key === " ") {
                      e.currentTarget.blur();
                    }
                  } else {
                    if (e.key) {
                      getNpiDetails(inputValue);
                    }
                  }
                }}
                onChange={(event, newValue) => {
                  setNpiNo(newValue);
                  field.onChange(newValue);
                }}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>{`${option?.number} - ${option?.basic?.name}`}</li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    InputProps={{
                      ...params.InputProps,
                      type: "search"
                      // onKeyDown: (e) => {
                      //   if (!isNaN(Number(e.key))) {
                      //     e.preventDefault();
                      //   }
                      // }
                    }}
                    error={Boolean(errors.npiNumber)}
                    helperText={errors.npiNumber?.message}
                  />
                )}
              />
            )}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!npiArray?.message?.includes("Search value is not valid") ? (
            <Typography className="errorInfo">{npiArray?.message}</Typography>
          ) : (
            <p style={{ color: "red" }}>Please enter at least 2 characters for FN/LN</p>
          )}
        </Grid>
      )}
    </>
  );
};

export default ProviderForm;
