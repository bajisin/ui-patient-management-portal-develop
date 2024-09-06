import { AccordionDetails, Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { idFields } from "../../../../../_helpers/constants";
import { useSelector } from "react-redux";

/**
 * @author
 * @function StateId
 **/

export const StateId = ({
  control,
  errors,
  setValue,
  ocrData,
  stateImg,
  insuranceImg,
  setGender,
  gender,
  setFirstName,
  setLastName,
  firstName,
  lastName,
  setCommAdd,
  commAdd,
  stateId
}) => {
  const stateIdFields = idFields.filter((field) => field.driving !== true);
  const { genderList } = useSelector((state) => state.createOrder);
  // const [gender, setGender] = useState();
  const [dates, setDates] = useState({
    birthDate: dayjs(),
    identityExpiryDate: dayjs(),
    identityIssueDate: dayjs()
  });

  useEffect(() => {
    if (ocrData) {
      setValue("address", ocrData?.Address?.content);
      setCommAdd(ocrData?.Address?.content);
      setValue("firstName", ocrData?.FirstName?.content);
      setFirstName(ocrData?.FirstName?.content);
      setLastName(ocrData?.LastName?.content);
      setValue("middleName", ocrData?.MiddleName?.content);
      setValue("lastName", ocrData?.LastName?.content);
      setValue("birthDate", dayjs(ocrData?.DateOfBirth?.content));
      setValue("identityExpiryDate", dayjs(ocrData?.DateOfExpiration?.content));
      setValue("identityIssueDate", dayjs(ocrData?.DateOfIssue?.content));
      setValue("identityNumber", ocrData?.DocumentNumber?.content);
      setValue("height", ocrData?.Height?.content);
      setValue("identityRestriction", ocrData?.Restrictions?.content);
      setValue("gender", ocrData?.Sex?.content);
      setValue("eyeColour", ocrData?.EyeColor?.content);
      setValue("identityIssueState", ocrData?.Region?.content);
      const ocrGender = genderList.find((gender) => gender.id === ocrData?.Sex?.content);
      setGender(ocrGender);
      stateIdFields.map((field) => {
        if (field.id === "birthDate") return (dates[field.id] = dayjs(ocrData?.DateOfBirth?.content));
        if (field.id === "identityExpiryDate") return (dates[field.id] = dayjs(ocrData?.DateOfExpiration?.content));
        if (field.id === "identityIssueDate") return (dates[field.id] = dayjs(ocrData?.DateOfIssue?.content));
      });
      setDates({ ...dates });
    }
  }, [ocrData]);

  const handleDateChange = (date, field) => {
    dates[field] = date;
    setDates({ ...dates });
  };
  return (
    <AccordionDetails>
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Grid container spacing={2}>
            {stateIdFields.map((dField, i) => (
              <Grid key={i} item xs={12} sm={6} md={4} lg={4}>
                <Typography variant="label" component="label" className={`add__label ${dField.required && "required"}`}>
                  {dField.label}
                </Typography>
                {dField?.type === "text" &&
                dField.id !== "firstName" &&
                dField.id !== "lastName" &&
                dField.id !== "address" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    rules={{
                      required: dField.required && "This field is required."
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="firstName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter ${dField.label}`}
                        // value={firstName}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        margin="normal"
                        error={Boolean(errors[dField.id])}
                        helperText={errors[dField.id]?.message}
                      />
                    )}
                  />
                ) : dField.type === "date" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    rules={{
                      required: dField.required && "This field is required."
                    }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          value={dates[dField.id]}
                          onChange={(newValue) => {
                            field.onChange(dayjs(newValue).format("MM/DD/YYYY"));
                            handleDateChange(newValue, dField.id);
                          }}
                          className="w-100 datetimepicker-control"
                        />
                      </LocalizationProvider>
                    )}
                  />
                ) : dField.type === "select" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    rules={{
                      required: dField.required && "This field is required."
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        className="customAutocomplete__input mb-2"
                        disablePortal
                        options={genderList} // Use the modified options array
                        value={gender}
                        getOptionLabel={(option) => option?.description} // Define how to display option labels
                        renderOption={(props, option, { selected }) => <li {...props}>{option?.description}</li>}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            // Display the custom value if it exists
                          />
                        )}
                        onChange={(event, newValue) => {
                          if (newValue) {
                            field.onChange(newValue);
                            setGender(newValue);
                          }
                        }}
                      />
                    )}
                  />
                ) : dField.type === "text" && dField.id === "firstName" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    rules={{
                      required: dField.required && "This field is required."
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="firstName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter ${dField.label}`}
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          field.onChange(e);
                        }}
                        margin="normal"
                        error={Boolean(errors[dField.id])}
                        helperText={errors[dField.id]?.message}
                      />
                    )}
                  />
                ) : dField.type === "text" && dField.id === "lastName" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    rules={{
                      required: dField.required && "This field is required."
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="lastName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter ${dField.label}`}
                        value={lastName}
                        onChange={(e) => {
                          setLastName(e.target.value);
                          field.onChange(e);
                        }}
                        margin="normal"
                        error={Boolean(errors[dField.id])}
                        helperText={errors[dField.id]?.message}
                      />
                    )}
                  />
                ) : (
                  dField.type === "text" &&
                  dField.id === "address" && (
                    <Controller
                      control={control}
                      name={dField.id}
                      rules={{
                        required: dField.required && "This field is required."
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="lastName"
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter ${dField.label}`}
                          value={commAdd}
                          onChange={(e) => {
                            setCommAdd(e.target.value);
                            field.onChange(e);
                          }}
                          margin="normal"
                          error={Boolean(errors[dField.id])}
                          helperText={errors[dField.id]?.message}
                        />
                      )}
                    />
                  )
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <div className="previewProfilePic">
            <img className="playerProfilePic_home_tile" src={stateImg || stateId?.docURL} />
          </div>
          {insuranceImg && (
            <div className="previewProfilePic">
              <img className="playerProfilePic_home_tile" src={insuranceImg} />
            </div>
          )}
        </Grid>
      </Grid>
    </AccordionDetails>
  );
};
