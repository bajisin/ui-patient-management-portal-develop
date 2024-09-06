import { Autocomplete, Box, Button, Checkbox, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import React, { useEffect, useRef, useState } from "react";
import { patientIdentityDetailsforBE, statusIds } from "../../../../_helpers/constants";
import { uploadDrivingLicense, uploadInsurance } from "@utils/ocr";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GeoLocationSearch from "../../../tenant/google-location";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { getIdentityDocs } from "@redux/slices/order-slice";
import { getUsersByEmail } from "../../../../redux/slices/usersSlice";
import useDebounce from "../../../../utils/useDebounce";

/**
 * @author
 * @function PatientPersonalDetails
 **/

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const PatientPersonalDetails = ({
  firstName,
  setFirstName,
  middleName,
  mrn,
  setMrn,
  setMiddleName,
  lastName,
  setLastName,
  race,
  setRace,
  gender,
  setGender,
  ethnic,
  setEthnic,
  perAdd,
  setPerAdd,
  commAdd,
  setCommAdd,
  control,
  errors,
  loginIndicator,
  setLoginIndicator,
  setDateOfBirth,
  dateOfBirth,
  setStep1Complete,
  clearErrors,
  editParam,
  patientDetailsById,
  email,
  setEmail,
  setContactNumber,
  contactNumber,
  setPerZipCode,
  perZipCode,
  setCommZIpCode,
  commZipCode,
  setPerCity,
  perCity,
  setCommCity,
  commCity,
  setPatientLoginCheck,
  patientLoginCheck
}) => {
  // const [location, setLocation] = useState({ country: "", state: "", city: "" });
  const currentDate = dayjs().format("YYYY/MM/DD").trim();
  const [step1Fields, setStep1Fields] = useState({
    middleName: "",
    lastName: "",
    birthDate: currentDate,
    // perAdd: "",
    // commAdd: "",
    zipCode: "",
    insurance: "",
    drivingLicense: "",
    stateId: ""
    // contactNumber: ""
  });
  const { raceList, genderList, ethinicList } = useSelector((state) => state.createOrder);
  const debounceEmailVal = useDebounce(email, 1000);
 
  const dispatch = useDispatch();
  const emailPattern = /^[-a-zA-Z0-9_.*$]{2,64}[@]{1}[a-zA-Z0-9]{2,20}[.]{1}[a-zA-Z.]{2,240}$/;

  const handleStep1Change = (fieldName, value) => {
    setStep1Fields((prevStep1Fields) => {
      const updatedFields = { ...prevStep1Fields, [fieldName]: value };
      return updatedFields;
    });
  };
  const [flagPerCity, setFlagPerCity] = useState(false);
  const [flagCommCity, setFlagCommCity] = useState(false);
  useEffect(() => {
    if (perCity?.label === "") {
      setFlagPerCity(true);
    }
    if (commCity?.label === "") {
      setFlagCommCity(true);
    }
  }, [perCity, commCity]);
  useEffect(() => {
    const { lastName, race, gender } = step1Fields;
    const emailMandatory = loginIndicator !== null && loginIndicator;
    const allFieldsFilled =
      firstName !== "" &&
      lastName !== "" &&
      // race !== undefined &&
      gender !== undefined &&
      // ethnic !== undefined &&
      // contactNumber !== "" &&
      dayjs(dateOfBirth).format("DD/MM/YYYY") !== "Invalid Date";
    // (emailMandatory ? email : true) &&
    // commAdd !== "" &&
    // contactNumber !== "" &&
    // ethnic !== null &&
    // contactNumber !== undefined;
    setStep1Complete(allFieldsFilled);
  }, [step1Fields, commAdd, loginIndicator, email, contactNumber, dateOfBirth]);

  useEffect(() => {
    if (debounceEmailVal !== "") dispatch(getUsersByEmail(debounceEmailVal));
  }, [debounceEmailVal]);
  const { usersByEmail } = useSelector((state) => state.userDetails);

  useEffect(() => {
    const emailMandatory = loginIndicator !== null && loginIndicator;
    const allFields =
      firstName !== "" &&
      lastName !== "" &&
      race !== undefined &&
      gender !== undefined &&
      ethnic !== undefined &&
      dayjs(dateOfBirth).format("DD/MM/YYYY") !== "Invalid Date" &&
      // !errors?.dateofBirth?.message &&
      (emailMandatory ? email : true) &&
      commAdd !== "" &&
      contactNumber !== "" &&
      contactNumber !== undefined;
    setStep1Complete(allFields);
    setStep1Fields((prevState) => ({
      ...prevState,
      firstName: patientDetailsById?.firstName,
      lastName: patientDetailsById?.lastName,
      // perAdd: patientDetailsById?.permanentAddr,
      // commAdd: patientDetailsById?.communicationAddr,
      // ethnic: patientDetailsById?.ethenicGroup,
      gender: patientDetailsById?.gender,
      race: patientDetailsById?.race,
      contactNumber: patientDetailsById?.phoneNumber
    }));
    setLoginIndicator(patientLoginCheck);
  }, [patientDetailsById]);
  return (
    <Typography variant="div" component="div" className="createOrder__wrapper--content">
      {/* {isPopupOpen && <Ocr isOpen={isPopupOpen} onClose={handleClosePopup} data={ocrDetails} />} */}

      <Box className="w-100 dflex align-items-start">
        <Typography variant="h6" component="h6">
          Personal Information <br />
          <Typography component="b" variant="b">
            Note: The portal allows login for patients marked as online
          </Typography>
        </Typography>
        <Typography component="div">
          <Typography component="label" variant="label" className="checked--label">
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 4 }}
              checked={patientLoginCheck || loginIndicator}
              onChange={(e) => {
                setLoginIndicator(e.target.checked);
                setPatientLoginCheck((prevState) => !prevState);
              }}
            />
            Patient would like to Login
          </Typography>
        </Typography>
      </Box>
      <Grid container spacing={2} className="mt-0">
        {/* <Button onClick={analyzeDocument}>test</Button> */}

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            First Name
          </Typography>
          <Controller
            control={control}
            name="firstName"
            rules={{
              required: firstName?.length < 1 && "This field is required.",
              pattern: {
                value: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
                message: `Invalid first name.`
              }
              // validate: (value) => {
              //   if (personalField.id === "emailAddress" && usersByPhone?.userExist)
              //     return "Phone Number already exists";
              // }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="firstName"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter First Name`}
                  value={firstName}
                  onChange={(e) => {
                    field.onChange(e);
                    setFirstName(e.target.value);
                    handleStep1Change("firstName", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors?.firstName)}
                  helperText={errors?.firstName?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
              </div>
            )}
          />

          {/*
              <GeoLocationSearch
                // defaultValue={
                //   location?.city !== undefined && callType === "edit"
                //     ? `${location?.city}, ${location?.state}, ${location?.country}`
                //     : ""
                // }
                setLocation={setLocation}
              /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Middle Name
          </Typography>
          <Controller
            control={control}
            name="middleName"
            rules={{
              // required: lastName?.length <= 0 && "This field is required.",
              pattern: {
                value: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
                message: `Invalid middle name.`
              }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="middleName"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter Middle Name`}
                  value={middleName}
                  onChange={(e) => {
                    field.onChange(e);
                    setMiddleName(e.target.value);
                    handleStep1Change("middleName", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.middleName)}
                  helperText={errors.middleName?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Last Name
          </Typography>
          <Controller
            control={control}
            name="lastName"
            rules={{
              required: lastName?.length <= 0 && "This field is required.",
              pattern: {
                value: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
                message: `Invalid last name.`
              }
              // validate: (value) => {
              //   if (personalField.id === "emailAddress" && usersByPhone?.userExist)
              //     return "Phone Number already exists";
              // }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="lastName"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter Last Name`}
                  value={lastName}
                  onChange={(e) => {
                    field.onChange(e);
                    setLastName(e.target.value);
                    handleStep1Change("lastName", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Race
          </Typography>
          <FormControl className="w-100">
            <Controller
              key={"race"}
              control={control}
              name={"race"}
              rules={
                {
                  // required: (race === null || race?.length <= 0) && "This field is required."
                }
              }
              render={({ field }) => (
                <Autocomplete
                  className="customAutocomplete__input mb-2"
                  disablePortal
                  options={raceList} // Use the modified options array
                  value={race}
                  getOptionLabel={(option) => option?.description} // Define how to display option labels
                  renderOption={(props, option, { selected }) => <li {...props}>{option?.description}</li>}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      {...field}
                      value={field.value ? field.value.description : ""}
                      // id={t.id}
                      error={Boolean(errors?.race)}
                      helperText={errors?.race?.message}
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setRace(newValue);
                      handleStep1Change("race", newValue);
                      clearErrors("race");
                    }
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Biological Gender
          </Typography>
          <FormControl className="w-100">
            <Controller
              key={"gender"}
              control={control}
              name={"gender"}
              rules={{
                required: (gender === null || gender?.length < 0) && "This field is required."
              }}
              render={({ field }) => (
                <Autocomplete
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
                      {...field}
                      value={field.value ? field.value.description : ""}
                      // id={t.id}
                      error={Boolean(errors?.gender)}
                      helperText={errors?.gender?.message}
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setGender(newValue);
                      handleStep1Change("gender", newValue);
                      clearErrors("gender");
                    }
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Date of Birth
          </Typography>
          <Controller
            key={"dateofBirth"}
            control={control}
            name={"dateofBirth"}
            rules={{
              // required: dayjs(dateOfBirth).format("DD/MM/YYYY") === "Invalid Date" ? "This field is required." : "",
              validate: {
                futureDate: (value) => {
                  const selectedDate = dayjs(value || dateOfBirth);
                  const currentDate = dayjs();
                  return selectedDate.isBefore(currentDate) ? true : "Please select previous dates";
                }
              }
            }}
            render={({ field, fieldState }) => (
              <>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    value={dateOfBirth}
                    className="w-100 datetimepicker-control"
                    onChange={(newValue) => {
                      if (newValue) {
                        field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                        setDateOfBirth(dayjs(newValue));
                        handleStep1Change("dateofBirth", dayjs(newValue));
                      }
                    }}
                    maxDate={dayjs()}
                  />
                  {dayjs(dateOfBirth).format("DD/MM/YYYY") === "Invalid Date" ? (
                    <p style={{ color: "red" }}>This field is required.</p>
                  ) : fieldState.error ? (
                    <p style={{ color: "red" }}>{fieldState.error.message}</p>
                  ) : (
                    ""
                  )}
                  {}
                </LocalizationProvider>
              </>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Ethnic Group
          </Typography>
          <FormControl className="w-100">
            <Controller
              key={"ethnic"}
              control={control}
              name={"ethnic"}
              rules={
                {
                  // required: (ethnic === null || ethnic?.length < 0) && "This field is required."
                }
              }
              render={({ field }) => (
                <Autocomplete
                  className="customAutocomplete__input mb-2"
                  disablePortal
                  options={ethinicList} // Use the modified options array
                  value={ethnic}
                  getOptionLabel={(option) => option?.description} // Define how to display option labels
                  renderOption={(props, option, { selected }) => <li {...props}>{option?.description}</li>}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label=""
                      {...field}
                      value={field.value ? field.value.description : ""}
                      error={Boolean(errors?.ethnic)}
                      helperText={errors?.ethnic?.message}
                    />
                  )}
                  onChange={(event, newValue) => {
                    if (newValue) {
                      setEthnic(newValue);
                      handleStep1Change("ethnic", newValue);
                      clearErrors("ethnic");
                    }
                  }}
                />
              )}
            />
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
          {loginIndicator ? (
            <Typography variant="label" component="label" className="add__label required">
              {" "}
              Email Address
            </Typography>
          ) : (
            <Typography variant="label" component="label" className="add__label">
              {" "}
              Email Address
            </Typography>
          )}

          <Controller
            control={control}
            name="email"
            rules={{
              required: loginIndicator && email?.length < 1 ? "This field is required." : "",
              validate: (value) => {
                if (usersByEmail?.userExist && usersByEmail?.usersDTO?.email === value) {
                  return "Email already exists";
                }
                return undefined; // No error if validation passes
              },
              pattern: {
                value: emailPattern,
                message: "Invalid input format."
              }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="email"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter Email Address`}
                  value={email}
                  onChange={(e) => {
                    field.onChange(e);
                    setEmail(e.target.value);
                    control.trigger("email");
                  }}
                  margin="normal"
                  error={Boolean(errors?.email)}
                  helperText={errors.email?.message}
                />
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label ">
            Contact Number
          </Typography>
          <Controller
            control={control}
            name="contactNumber"
            rules={{
              // required: contactNumber?.length <= 0 && "This field is required.",
              pattern: {
                value: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
                message: `Invalid contact number.`
              }
              // validate: (value) => {
              //   if (personalField.id === "emailAddress" && usersByPhone?.userExist)
              //     return "Phone Number already exists";
              // }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="contactNumber"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter contact number`}
                  value={contactNumber}
                  onChange={(e) => {
                    field.onChange(e);
                    setContactNumber(e.target.value);
                    handleStep1Change("contactNumber", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.contactNumber)}
                  helperText={errors.contactNumber?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
              </div>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            MRN No
          </Typography>
          <Controller
            control={control}
            name="mrnNo"
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="mrnNo"
                  variant="outlined"
                  fullWidth
                  className="add__input"
                  placeholder={`Enter MRN No `}
                  value={mrn}
                  onChange={(e) => {
                    setMrn(e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.mrnNo)}
                  helperText={errors.mrnNo?.message}
                />
              </div>
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-3">
        <Typography component="h6" variant="h6" className="w-100 ps-3">
          Permanent Address
        </Typography>
        {/* <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Street Address
          </Typography>
          <Controller
            control={control}
            name="permanentAddr"
            rules={{
              required: perAdd?.length < 0 && "This field is required."
              // pattern: {
              //   value: personalField.pattern,
              //   message: `Invalid ${personalField.label.toLowerCase()}.`
              // }
              // validate: (value) => {
              //   if (personalField.id === "emailAddress" && usersByPhone?.userExist)
              //     return "Phone Number already exists";
              // }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="permanentAddr"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter Permanent Address`}
                  value={perAdd}
                  onChange={(e) => {
                    field.onChange(e);
                    setPerAdd(e.target.value);
                    // handleStep1Change("permanentAddr", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.permanentAddr)}
                  helperText={errors.permanentAddr?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p>
               </div>
             )}
          />
                </Grid> */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Address
          </Typography>
          {(editParam === "true" || editParam === null) && (
            <>
              {perCity?.label !== "" ? (
                <Controller
                  key={"perCity"}
                  control={control}
                  name={"perCity"}
                  // rules={{
                  //   required:
                  //     insurenceLocation?.city === "" && insurenceLocation1?.city === "" ? "This field is required." : ""
                  // }}
                  render={({ field }) => (
                    <div>
                      {perCity?.label !== "" && (
                        <GeoLocationSearch
                          defaultValue={perCity?.city !== "" ? `${perCity.label || ""}` : ""}
                          setLocation={(newLocation) => {
                            if (newLocation?.city !== "") {
                              setPerCity(newLocation);
                              clearErrors("perCity");
                            } else {
                              setPerCity({ country: "", state: "", city: "", label: "" });
                            }
                          }}
                          // location={i === 0 ? careGiverLocation : careGiverLocation1}
                        />
                      )}
                    </div>
                  )}
                />
              ) : (
                flagPerCity === true && (
                  <Controller
                    key={"perCity"}
                    control={control}
                    name={"perCity"}
                    // rules={{
                    //   required:
                    //     insurenceLocation?.city === "" && insurenceLocation1?.city === "" ? "This field is required." : ""
                    // }}
                    render={({ field }) => (
                      <div>
                        {perCity?.label === "" && (
                          <GeoLocationSearch
                            defaultValue={perCity?.city !== "" ? `${perCity.label}` : ""}
                            setLocation={(newLocation) => {
                              if (newLocation?.city !== "") {
                                setPerCity(newLocation);
                                clearErrors("perCity");
                              } else {
                                setPerCity({ country: "", state: "", city: "", label: "" });
                              }
                            }}
                            // location={i === 0 ? careGiverLocation : careGiverLocation1}
                          />
                        )}
                      </div>
                    )}
                  />
                )
              )}
            </>
          )}
          {/* <Controller
            // key={id}
            control={control}
            name={"perCity"}
            // rules={{
            //   required:  !careGiverLocation?.city ? "This field is required." : ""
            // }}
            render={({ field }) => (
              <div>
                <GeoLocationSearch
                  defaultValue={perCity?.city !== "" ? `${perCity.label}` : ""}
                  setLocation={(newLocation) => {
                    if (newLocation?.city !== "") {
                      setPerCity(newLocation);
                      clearErrors("perCity");
                    } else {
                      setPerCity({ country: "", state: "", city: "", label: "" });
                    }
                  }}
                  // location={i === 0 ? careGiverLocation : careGiverLocation1}
                />
                {/* {<Typography className="errorInfo">{error1}</Typography>}
              </div>
            )}
          /> */}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            ZipCode
          </Typography>
          <Controller
            control={control}
            name="perZipcode"
            rules={{
              // required: mandatory && "This field is required.",
              pattern: {
                value: /^[0-9]+$/,
                message: `Invalid ${"zipCode".toLowerCase()}.`
              },
              maxLength: {
                value: 5,
                message: "Length cannot be more than 5"
              }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="perZipcode"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter zipcode `}
                  value={perZipCode}
                  onChange={(e) => {
                    field.onChange(e);
                    setPerZipCode(e.target.value);
                    // handleStep1Change("perZipcode", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.perZipcode)}
                  helperText={errors.perZipcode?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
              </div>
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className="mt-3">
        <Typography component="h6" variant="h6" className="w-100 ps-3">
          Communication Address
        </Typography>
        {/* <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Street Address
          </Typography>
          <Controller
            control={control}
            name="communicationAddr"
            rules={
              {
                // required: commAdd?.length < 0 && "This field is required."
                // pattern: {
                //   value: personalField.pattern,
                //   message: `Invalid ${personalField.label.toLowerCase()}.`
                // }
                // validate: (value) => {
                //   if (personalField.id === "emailAddress" && usersByPhone?.userExist)
                //     return "Phone Number already exists";
                // }
              }
            }
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="communicationAddr"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter Communication Address  `}
                  value={commAdd}
                  onChange={(e) => {
                    field.onChange(e);
                    setCommAdd(e.target.value);
                    // handleStep1Change("communicationAddr", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.communicationAddr)}
                  helperText={errors.communicationAddr?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p>
              </div>
            )}
          />
        </Grid> */}
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Address
          </Typography>
          {(editParam === "true" || editParam === null) && (
            <>
              {commCity?.label !== "" ? (
                <Controller
                  key={"commCity"}
                  control={control}
                  name={"commCity"}
                  // rules={{
                  //   required:
                  //     insurenceLocation?.city === "" && insurenceLocation1?.city === "" ? "This field is required." : ""
                  // }}
                  render={({ field }) => (
                    <div>
                      {commCity?.label !== "" && (
                        <GeoLocationSearch
                          defaultValue={commCity?.city !== "" ? `${commCity.label || ""}` : ""}
                          setLocation={(newLocation) => {
                            if (newLocation?.city !== "") {
                              setCommCity(newLocation);
                              clearErrors("commCity");
                            } else {
                              setCommCity({ country: "", state: "", city: "", label: "" });
                            }
                          }}
                          // location={i === 0 ? careGiverLocation : careGiverLocation1}
                        />
                      )}
                    </div>
                  )}
                />
              ) : (
                flagCommCity === true && (
                  <Controller
                    key={"commCity"}
                    control={control}
                    name={"commCity"}
                    // rules={{
                    //   required:
                    //     insurenceLocation?.city === "" && insurenceLocation1?.city === "" ? "This field is required." : ""
                    // }}
                    render={({ field }) => (
                      <div>
                        {commCity?.label === "" && (
                          <GeoLocationSearch
                            defaultValue={commCity?.city !== "" ? `${commCity.label}` : ""}
                            setLocation={(newLocation) => {
                              if (newLocation?.city !== "") {
                                setCommCity(newLocation);
                                clearErrors("commCity");
                              } else {
                                setCommCity({ country: "", state: "", city: "", label: "" });
                              }
                            }}
                            // location={i === 0 ? careGiverLocation : careGiverLocation1}
                          />
                        )}
                      </div>
                    )}
                  />
                )
              )}
            </>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            ZipCode
          </Typography>
          <Controller
            control={control}
            name="commZipCode"
            rules={{
              // required: mandatory && "This field is required.",
              pattern: {
                value: /^[0-9]+$/,
                message: `Invalid ${"zipCode".toLowerCase()}.`
              },
              maxLength: {
                value: 5,
                message: "zipcode cannot be more than 5"
              }
            }}
            render={({ field }) => (
              <div className="w-100">
                <TextField
                  {...field}
                  id="commZipCode"
                  variant="outlined"
                  className="add__input"
                  placeholder={`Enter zipcode`}
                  value={commZipCode}
                  onChange={(e) => {
                    field.onChange(e);
                    setCommZIpCode(e.target.value);
                    // handleStep1Change("commZipCode", e.target.value);
                  }}
                  margin="normal"
                  error={Boolean(errors.commZipCode)}
                  helperText={errors.commZipCode?.message}
                />
                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
              </div>
            )}
          />
        </Grid>
      </Grid>
    </Typography>
  );
};
