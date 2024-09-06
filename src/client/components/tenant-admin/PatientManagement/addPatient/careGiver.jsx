import { Autocomplete, Box, Button, Checkbox, Grid, Tab, Tabs, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GeoLocationSearch from "../../../tenant/google-location";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

const Caregiver = (props) => {
  const currentDate = dayjs().format("YYYY/MM/DD").trim();

  const {
    control,
    setValue,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      address: "",
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: "",
      identityExpiryDate: "",

      identityIssueDate: "",
      identityNumber: "",
      endorsment: "",
      height: "",
      gender: "",
      identityRestriction: "",
      identityClass: "",
      eyeColour: "",
      insuranceDetails: [
        {
          insuranceId: "",
          policyHolderName: "",
          policyNumber: "",
          groupNumber: "",
          contactNumber: "",
          networkCommunication: "",
          insuranceIssueDate: currentDate,
          insuranceExpiryDate: currentDate,
          deductableAmount: "",
          coPayment: "",
          coveredIndividuals: "",
          planType: "",
          address: "",
          coInsurancePercentage: "",
          emergencyContactNumber: "",
          gurantorDetails: {
            firstName: "",
            middleName: "",
            gurantorLastName: "",
            relationId: "",
            birthDate: currentDate,
            employerName: "",
            gurantorAddress: "",
            phoneNumber: "",
            gurantorAlternatePhoneNumber: ""
          }
        }
      ],
      careGiverDetails: [
        {
          // relationId: "",
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          userPhoneNo: ""
          // careGiverAddress: ""
        }
      ]
    },

    mode: "onChange"
  });
  const {
    a11yProps,
    Tabpanel,
    // errors,
    // control,
    patientObj,
    icon,
    relationList,
    setIsChecked,
    isChecked,
    setCareGiverLocation,
    careGiverLocation,
    setCareGiverLocation1,
    careGiverLocation1,
    handleDelete,
    setCareGiver,
    careGiver,
    // clearErrors,
    setStep4Complete,
    careGiverDetails,
    editParam,
    mandatory,
    onSubmit,
    // setMandatory,
    setPatientCareGiverId,
    setPatientCareGiverId1,
    setCareGiverTab,
    careGiverTab
  } = props;
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatient2, setSelectedPatient2] = useState(null);
  const [index, setIndex] = useState(0);
  const [step4Fields, setStep4Fields] = useState({
    relationId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    userPhoneNo: "",
    // careGiverAddress: "",
    careGiverZipCode: ""
  });
  useEffect(() => {
    if (editParam === "true") {
      if (careGiverDetails?.length > 0) {
        if (careGiverDetails[1]?.patientCareGiverId && careGiver < 2) {
          setCareGiver(careGiver + 1);
          setCareGiverTab(careGiverTab + 1);
        }
        setPatientCareGiverId(careGiverDetails[0]?.patientCareGiverId);
        setPatientCareGiverId1(careGiverDetails[1]?.patientCareGiverId);
        careGiverDetails.forEach((careGiver, index) => {
          setValue(`careGiverDetails[${index}].relation`, careGiver?.relation);
          setValue(`careGiverDetails[${index}].firstName`, careGiver.firstName?.trim());
          setValue(`careGiverDetails[${index}].middleName`, careGiver.middleName?.trim());
          setValue(`careGiverDetails[${index}].lastName`, careGiver.lastName?.trim());
          setValue(`careGiverDetails[${index}].email`, careGiver.email?.trim());
          setValue(`careGiverDetails[${index}].userPhoneNo`, careGiver.userPhoneNo?.trim());
          // setValue(`careGiverDetails[${index}].careGiverAddress`, careGiver.careGiverAddress?.trim());
          setValue(`careGiverDetails[${index}].careGiverCity`, careGiver.careGiverCity?.trim());
          setValue(`careGiverDetails[${index}].careGiverZipCode`, careGiver.careGiverZipCode?.trim());
        });
        if (relationList?.length > 0) {
          setSelectedPatient(relationList?.find((item) => item?.id === careGiverDetails[0]?.relation));
        }
        if (careGiverDetails?.length >= 1) {
          setSelectedPatient2(relationList?.find((item) => item?.id === careGiverDetails[1]?.relation));
        }
        setCareGiverLocation({
          city: careGiverDetails[0]?.careGiverCity,
          state: careGiverDetails[0]?.careGiverState,
          country: careGiverDetails[0]?.careGiverCountry,
          label: careGiverDetails[0]?.careGiverAddress
        });
        setCareGiverLocation1({
          city: careGiverDetails[1]?.careGiverCity,
          state: careGiverDetails[1]?.careGiverState,
          country: careGiverDetails[1]?.careGiverCountry,
          label: careGiverDetails[1]?.careGiverAddress
        });
      }
    }
  }, [relationList, careGiverDetails]);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCareGiverTab = (event, newValue) => {
    setCareGiverTab(newValue);
  };
  // useEffect(() => {
  //   setCareGiverTab(0);
  // }, [handleDelete]);
  const [careLocationFlag, setCareLocationFlag] = useState(false);
  useEffect(() => {
    if (index === 0) {
      setCareGiverLocation(careGiverLocation);
    } else if (index === 1) {
      setCareGiverLocation1(careGiverLocation1);
    }
    if (careGiverLocation?.label === "") {
      setCareLocationFlag(true);
    } else {
      setCareLocationFlag(false);
    }
  }, [index, careGiverLocation, careGiverLocation1]);

  const handleStep4Change = (fieldName, value) => {
    setStep4Fields((prevStep4Fields) => {
      const updatedFields = { ...prevStep4Fields, [fieldName]: value };
      return updatedFields;
    });
    if (editParam === "true") {
      if (careGiverDetails) {
        const updatedStep4Fields = {
          ...step4Fields,
          [fieldName]: value
        };
        const hasNullValues = Object.values(updatedStep4Fields).some(
          (value) => value === null || value === undefined || value === "" || value?.length < 0
        );
        setStep4Complete(hasNullValues);
      } else {
        setStep4Complete(false);
      }
    }
  };

  useEffect(() => {
    const { relationId, firstName, lastName, email, userPhoneNo, careGiverZipCode } = step4Fields || {};

    const allFieldsFilled =
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      userPhoneNo !== "" &&
      careGiverZipCode !== "" &&
      relationId !== undefined &&
      careGiverLocation?.city !== "";

    setStep4Complete(allFieldsFilled);
  }, [step4Fields, careGiverDetails]);

  useEffect(() => {
    if (careGiverDetails?.length > 0) {
      const updatedStep4Fields = careGiverDetails?.reduce(
        (acc, value) => {
          return {
            ...acc,
            relation: value?.relation || acc.relation,
            firstName: value?.firstName || acc.firstName,
            lastName: value?.lastName || acc.lastName,
            email: value?.email || acc.email,
            userPhoneNo: value?.userPhoneNo || acc.userPhoneNo,
            // careGiverAddress: value?.careGiverAddress || acc.careGiverAddress,
            careGiverZipCode: value?.careGiverZipCode || acc.careGiverZipCode
          };
        },
        { ...step4Fields }
      );
      setStep4Fields(updatedStep4Fields);

      const allFieldsFilled = Object.values(updatedStep4Fields).every(
        (value) => value !== null && value !== undefined && value.trim() !== ""
      );

      setStep4Complete(allFieldsFilled);
    }
  }, [careGiverDetails]);

  useEffect(() => {
    if (mandatory === false) {
      clearErrors("");
    }
  }, [mandatory])

  const renderTabHeader = () => {
    const tabsList = [];
    for (let i = 0; i < careGiver; i++) {
      tabsList.push(<Tab label={"Caregiver " + (i + 1)} {...a11yProps(i)} />);
    }
    return [...tabsList];
  };
  const renderTabContentforCareGiver = () => {
    const tabsList = [];
    for (let i = 0; i < careGiver; i++) {
      tabsList.push(
        <Tabpanel value={careGiverTab} index={i}>
          <Typography variant="h6" component="h6" className="mt-3">
            Caregiver Information
          </Typography>
          <Grid container spacing={2} className="mt-0">
            {patientObj?.careGiverObj?.map((t, index) => {
              const id = t.id.replace("index", i);
              const careGiverErrors = errors.careGiverDetails;
              const error = careGiverErrors?.length > 0 ? (careGiverErrors[i] ? careGiverErrors[i][t.name] : "") : "";
              const error1 = errors?.careGiverDetails?.map((p) => p?.careGiverCity?.message) ?? [];
              return (
                <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                  {mandatory && t.name !== "middleName" ? (
                    <Typography variant="label" component="label" className="add__label required">
                      {t.label}
                    </Typography>
                  ) : (
                    <Typography variant="label" component="label">
                      {t.label}
                    </Typography>
                  )}
                  {t.type === "text" && t.name !== "middleName" ? (
                    <Controller
                      key={id}
                      control={control}
                      name={id}
                      rules={{
                        required: mandatory && "This field is required.",
                        pattern: {
                          value: t.pattern,
                          message: `Invalid ${t.label.toLowerCase()}.`
                        },
                        maxLength: {
                          value: t?.maxLength,
                          message:
                            t.name === "careGiverZipCode"
                              ? "Length cannot be more than 5"
                              : t.name === "userPhoneNo"
                              ? "Length cannot be more than 10"
                              : "Length cannot be more than 30"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id={id}
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter ${t.label}`}
                          // value={tenantDetails[t.id]}
                          onChange={(e) => {
                            field.onChange(e);
                            handleStep4Change(t.name, e.target.value);
                          }}
                          margin="normal"
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                    />
                  ) : t.name === "middleName" ? (
                    <Controller
                      key={id}
                      control={control}
                      name={id}
                      rules={{
                        // required: mandatory && "This field is required.",
                        pattern: {
                          value: t.pattern,
                          message: `Invalid ${t.label.toLowerCase()}.`
                        },
                        maxLength: {
                          value: t?.maxLength,
                          message:
                            t.name === "careGiverZipCode"
                              ? "Length cannot be more than 5"
                              : "Length cannot be more than 30"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id={id}
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter ${t.label}`}
                          // value={tenantDetails[t.id]}
                          onChange={(e) => {
                            field.onChange(e);
                            handleStep4Change(t.name, e.target.value);
                          }}
                          margin="normal"
                          error={Boolean(error)}
                          helperText={error?.message}
                        />
                      )}
                    />
                  ) : t.type === "select" && t.label !== "Relation to Patient" ? (
                    <>
                      {(editParam === "true" || editParam === null) && (
                        <>
                          {careGiverLocation?.label !== "" && careLocationFlag === false ? (
                            <Controller
                              key={id}
                              control={control}
                              name={id}
                              rules={{
                                required: mandatory && !careGiverLocation?.city ? "This field is required." : ""
                              }}
                              render={({ field }) => (
                                <div>
                                  {careGiverLocation?.label !== "" && (
                                    <GeoLocationSearch
                                      defaultValue={
                                        // careGiverLocation.label
                                        i === 0 && careGiverLocation?.city !== ""
                                          ? `${careGiverLocation?.label}`
                                          : i === 1 &&
                                            careGiverLocation1?.city !== "" &&
                                            careGiverLocation1?.city !== undefined
                                          ? `${careGiverLocation1?.label}`
                                          : ""
                                      }
                                      setLocation={(newLocation) => {
                                        if (i === 0) {
                                          if (newLocation?.city !== "") {
                                            setCareGiverLocation(newLocation);
                                            clearErrors(id);
                                          } else {
                                            setCareGiverLocation({ country: "", state: "", city: "" });
                                          }
                                        } else if (i === 1) {
                                          if (newLocation) {
                                            setCareGiverLocation1(newLocation);
                                            clearErrors(id);
                                          } else {
                                            setCareGiverLocation1({ country: "", state: "", city: "" });
                                          }
                                        }
                                        setIndex(i);
                                      }}
                                      // location={i === 0 ? careGiverLocation : careGiverLocation1}
                                    />
                                  )}
                                  {<Typography className="errorInfo">{error1}</Typography>}
                                </div>
                              )}
                            />
                          ) : (
                            careLocationFlag === true && (
                              <Controller
                                key={id}
                                control={control}
                                name={id}
                                rules={{
                                  required: mandatory && !careGiverLocation?.city ? "This field is required." : ""
                                }}
                                render={({ field }) => (
                                  <div>
                                    {careGiverLocation?.label === "" && (
                                      <GeoLocationSearch
                                        defaultValue={
                                          // careGiverLocation.label
                                          i === 0 && careGiverLocation?.city !== ""
                                            ? `${careGiverLocation?.label}`
                                            : i === 1 &&
                                              careGiverLocation1?.city !== "" &&
                                              careGiverLocation1?.city !== undefined
                                            ? `${careGiverLocation1?.label}`
                                            : ""
                                        }
                                        setLocation={(newLocation) => {
                                          if (i === 0) {
                                            if (newLocation?.city !== "") {
                                              setCareGiverLocation(newLocation);
                                              clearErrors(id);
                                            } else {
                                              setCareGiverLocation({ country: "", state: "", city: "" });
                                            }
                                          } else if (i === 1) {
                                            if (newLocation) {
                                              setCareGiverLocation1(newLocation);
                                              clearErrors(id);
                                            } else {
                                              setCareGiverLocation1({ country: "", state: "", city: "" });
                                            }
                                          }
                                          setIndex(i);
                                        }}
                                        // location={i === 0 ? careGiverLocation : careGiverLocation1}
                                      />
                                    )}
                                    {<Typography className="errorInfo">{error1}</Typography>}
                                  </div>
                                )}
                              />
                            )
                          )}
                        </>
                      )}
                    </>
                  ) : t.type === "date" ? (
                    <Controller
                      key={id}
                      control={control}
                      name={id}
                      rules={{
                        required: mandatory && "This field is required.",
                        pattern: {
                          value: t.pattern,
                          message: `Invalid ${t.label.toLowerCase()}.`
                        }
                      }}
                      render={({ field }) => (
                        <>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              // value={}
                              {...field}
                              className="w-100 datetimepicker-control"
                              onChange={(newValue) => {
                                field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                                handleStep4Change(t.name, dayjs(newValue).format("YYYY/MM/DD").trim());
                              }}
                              minDate={dayjs()}
                            />
                          </LocalizationProvider>
                        </>
                      )}
                    />
                  ) : (
                    t.label === "Relation to Patient" && (
                      <Controller
                        key={id}
                        control={control}
                        name={id}
                        rules={{
                          required: mandatory && "This field is required."
                        }}
                        render={({ field }) => (
                          <Autocomplete
                            className="customAutocomplete__input mb-2"
                            disablePortal
                            freeSolo={true}
                            options={relationList} // Use the modified options array
                            value={i === 0 ? selectedPatient : selectedPatient2}
                            getOptionLabel={(option) => `${option?.description}`} // Define how to display option labels
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>{`${option?.description}`}</li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                // id={t.id}
                                // Display the custom value if it exists
                                value={i === 0 ? selectedPatient?.description : selectedPatient2?.description}
                                error={Boolean(error)}
                                helperText={error?.message}
                              />
                            )}
                            onChange={(event, newValue) => {
                              // Check if the user selected an option or entered a custom name
                              if (newValue && newValue.description) {
                                if (i === 0) {
                                  setSelectedPatient(newValue); // Set the custom name
                                  field.onChange(newValue.id.toString());
                                  handleStep4Change(t.name, newValue);
                                } else if (i === 1) {
                                  setSelectedPatient2(newValue); // Set the custom name
                                  field.onChange(newValue.id.toString());
                                }
                              } else {
                                setSelectedPatient(null);
                                setSelectedPatient2(null);
                              }
                            }}
                          />
                        )}
                      />
                    )
                  )}
                </Grid>
              );
            })}
          </Grid>
          <Box className="w-100 dflex mt-2">
            {/* <Typography component="label" variant="label" className="checked--label">
              <Checkbox icon={icon} style={{ marginRight: 4 }} checked={isChecked} onChange={handleCheckboxChange} />I
              give my consent
            </Typography> */}
            <Typography className="action__items positioned-text ">
              {careGiver > 1 && (
                <Button
                  variant="text"
                  className="p-0 errorTextButton"
                  onClick={() => handleDelete("Caregiver Details", i)}
                >
                  Delete Caregiver
                </Button>
              )}
            </Typography>
          </Box>
        </Tabpanel>
      );
    }
    return [...tabsList];
  };
  const keys = Object.keys(errors || {});

  return (
    <Typography variant="div" component="div" className="createOrder__wrapper--content">
      <Box className="tab__wrapper admin-tabs ps-0 w-100">
        <Tabs
          value={careGiverTab}
          onChange={handleCareGiverTab}
          aria-label="Guarentor Details"
          className="tabs_sections"
        >
          {renderTabHeader()}
          {careGiver < 2 ? (
            <Button
              variant="text"
              className="downloadBtn-text p-0 positioned--text"
              onClick={() => setCareGiver(careGiver + 1)}
            >
              Add Caregiver
            </Button>
          ) : (
            ""
          )}
        </Tabs>
      </Box>
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        {renderTabContentforCareGiver()}
        {/* <Tooltip title="if You Skip it will not mandatory to fill the fields" arrow>
          <Button className="primary-btn next-btn" onClick={() => setMandatory(false)}>
            Skip
          </Button>
        </Tooltip>
        <br /> */}
        <Button
        id="step4SubmitButton"
          // className="primary-btn next-btn"
          // disabled={ keys?.length > 0}
          type="submit"
          // onClick={() => step3Submit()}
          // step3Complete &&

          // }}
        >
          {/* Submit */}
        </Button>
      </form>
    </Typography>
  );
};
export default Caregiver;
