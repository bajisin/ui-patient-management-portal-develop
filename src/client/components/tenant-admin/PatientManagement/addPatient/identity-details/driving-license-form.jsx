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
 * @function DrivingLicense
 **/

export const DrivingLicense = ({
  control,
  errors,
  setValue,
  ocrData,
  imgData,
  insuranceImg,
  patientDetailsById,
  onSubmit,
  setFirstName,
  setMiddleName,
  middleName,
  setLastName,
  firstName,
  lastName,
  setGender,
  gender,
  setCommAdd,
  commAdd,
  drivingLicense
}) => {
  const drivingFields = idFields.filter((field) => field?.stateId !== true);
  const { genderList } = useSelector((state) => state.createOrder);
  const [dates, setDates] = useState({
    birthDate: dayjs(),
    identityExpiryDate: dayjs(),
    identityIssueDate: dayjs()
  });

  const ocrGender = {};

  useEffect(() => {
    if (ocrData) {
      const ocrGender = genderList.find(
        (gender) =>
          gender?.description?.split("")[0] === ocrData?.Sex?.content || gender?.description === ocrData?.Sex?.content
      );
      setGender(ocrData);
      setValue("address", ocrData?.Address?.content);
      setValue("firstName", ocrData?.FirstName?.content);
      setFirstName(ocrData?.FirstName?.content);
      setValue("middleName", ocrData?.MiddleName?.content);
      setValue("lastName", ocrData?.LastName?.content);
      setLastName(ocrData?.LastName?.content);
      setMiddleName(ocrData?.MiddleName?.content);
      setCommAdd(ocrData?.Address?.content);
      setValue("birthDate", dayjs(ocrData?.DateOfBirth?.content));
      setValue("identityExpiryDate", dayjs(ocrData?.DateOfExpiration?.content));
      setValue("identityIssueDate", dayjs(ocrData?.DateOfIssue?.content));
      setValue("identityNumber", ocrData?.DocumentNumber?.content);
      setValue("endorsment", ocrData?.Endorsements?.content);
      setValue("height", ocrData?.Height?.content);
      setValue("gender", ocrGender);
      setValue("identityRestriction", ocrData?.Restrictions?.content);
      setValue("identityClass", ocrData?.VehicleClassifications?.content);
      setValue("eyeColour", ocrData?.EyeColor?.content);
      drivingFields.map((field) => {
        if (field.id === "birthDate") return (dates[field.id] = dayjs(ocrData?.DateOfBirth?.content));
        if (field.id === "identityExpiryDate") return (dates[field.id] = dayjs(ocrData?.DateOfExpiration?.content));
        if (field.id === "identityIssueDate") return (dates[field.id] = dayjs(ocrData?.DateOfIssue?.content));
      });
      setDates({ ...dates });
    }
  }, [ocrData]);

  useEffect(() => {
    if (patientDetailsById) {
      setValue("gender", patientDetailsById?.gender);

      drivingFields.map((field) => {
        if (field.id === "birthDate") return (dates[field.id] = dayjs(patientDetailsById?.birthDate));
        if (field.id === "identityExpiryDate") return (dates[field.id] = dayjs(patientDetailsById?.identityExpiryDate));
        if (field.id === "identityIssueDate") return (dates[field.id] = dayjs(patientDetailsById?.identityIssueDate));
      });
      setDates({ ...dates });
    }
  }, [patientDetailsById]);
  const handleDateChange = (date, field) => {
    dates[field] = date;
    setDates({ ...dates });
  };

  return (
    <AccordionDetails>
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Grid container spacing={2}>
            {drivingFields.map((dField, i) => (
              <Grid key={i} item xs={12} sm={6} md={8} lg={4}>
                <Typography variant="label" component="label" className={`add__label ${dField.required && ""}`}>
                  {dField.label}
                </Typography>
                {dField?.type === "text" &&
                dField.id !== "firstName" &&
                dField.id !== "lastName" &&
                dField.id !== "address" &&
                dField.id !== "middleName" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    // rules={{
                    //   required: dField.required && "This field is required."
                    // }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="firstName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter ${dField.label}`}
                        // value={firstName}
                        onChange={(e) => {
                          // setFirstName(e.target.value)
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
                      required: dField.required && dates[dField.id].length === 0 && "This field is required."
                    }}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          value={dates[dField.id]}
                          onChange={(newValue) => {
                            field.onChange(dayjs(newValue).format("YYYY/MM/DD"));
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
                    // rules={{
                    //   required: dField.required && "This field is required."
                    // }}
                    render={({ field }) => (
                      <Autocomplete
                        {...field}
                        className="customAutocomplete__input mb-2"
                        disablePortal
                        options={genderList} // Use the modified options array
                        // value={ocrData ? ocrGender : gender}
                        getOptionLabel={(option) => option?.description || ""} // Define how to display option labels
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
                            // setGender(newValue);
                          }
                        }}
                      />
                    )}
                  />
                ) : dField.type === "text" && dField.id === "firstName" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    // rules={{
                    //   required: dField.required && "This field is required."
                    // }}
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
                    // rules={{
                    //   required: dField.required && "This field is required."
                    // }}
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
                ) : dField.type === "text" && dField.id === "middleName" ? (
                  <Controller
                    control={control}
                    name={dField.id}
                    rules={
                      {
                        // required: dField.required && "This field is required."
                      }
                    }
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="middleName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter ${dField.label}`}
                        value={middleName}
                        onChange={(e) => {
                          setMiddleName(e.target.value);
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
                      // rules={{
                      //   required: dField.required && "This field is required."
                      // }}
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
            <img className="playerProfilePic_home_tile" src={imgData || drivingLicense?.docURL} />
          </div>
        </Grid>
      </Grid>
    </AccordionDetails>
  );
};
