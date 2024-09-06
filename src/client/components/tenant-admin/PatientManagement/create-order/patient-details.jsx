import { Autocomplete, Button, FormControl, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import GeoLocationSearch from "../../../tenant/google-location";
import Loader from "@utils/Loader";
import { getNpiDetailsByNumber } from "@redux/slices/tenantsSlice";
import { getNpiDetailsForInternal } from "../../../../redux/slices/tenantsSlice";
import { insEligibilityCheck } from "@redux/slices/order-slice";

/**
 * @author
 * @function PatientDetails
 **/

export const PatientDetails = ({
  getNpiDetails,
  error,
  setError,
  city,
  setCity,
  insuranceId,
  setInsuranceId,
  setInternal,
  internal,
  labs,
  setlabs,
  facilities,
  setfacilities,
  setStep1Complete,
  npi,
  setNpi,
  setMessage,
  message,
  setErrorMessage,
  errorMessage,
  type
}) => {
  const { lab, facility } = useSelector((state) => state?.createOrder);
  const { facilitiesOrders: data, loading, totalCount } = useSelector((state) => state.facilities);
  const { patientDetailsById, npiArray, npiforInternal } = useSelector((state) => state?.tenants);
  const { control } = useForm({
    mode: "onChange"
  });
  useEffect(() => {
    if (lab?.length <= 1) {
      setlabs(lab[0]);
    }
    if (data?.data?.length <= 1) {
      setfacilities(data?.data?.[0]);
    }
  }, [lab, data?.data]); 

  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const checkInsEligibility = async () => {
    // Initialize loader
    setLoader(true);

    try {
      let action;

      if (patientDetailsById) {
        action = await dispatch(
          insEligibilityCheck({
            messageHeader: {
              sequenceNumber: 1,
              userId: "lifescanws",
              orgAlias: "lifescan"
            },
            payload: {
              bypassCache: true,
              clientId: "ABBOT",
              includeEligibilityReportHtml: true,
              includeHumanReadableReport: true,
              insuranceInformation: {
                effectiveDate: "2022-04-28",
                insuredInformation: {
                  dateOfBirth: patientDetailsById?.birthDate,
                  gender: patientDetailsById?.gender?.genderDesc,
                  name: {
                    firstName: patientDetailsById?.firstName,
                    lastName: patientDetailsById?.lastName
                  },
                  relationship: "Self",
                  ssn: patientDetailsById?.ssnId,
                  subscriberId: insuranceId?.policyNumber
                },
                payorId: "BCBSFL"
              },
              patientInformation: {
                dateOfBirth: patientDetailsById?.birthDate,
                gender: patientDetailsById?.gender?.genderDesc,
                name: {
                  firstName: patientDetailsById?.firstName,
                  lastName: patientDetailsById?.lastName
                }
              }
            }
          })
        );
      }

      if (insEligibilityCheck.fulfilled.match(action)) {
        if (action?.payload?.statusFlag === false) {
          setErrorMessage(
            `${action?.payload?.Payload?.PatientEligibility?.EligibilityStatus} - ${action?.payload?.Payload?.PatientEligibility?.EligibilityStatusMessage}`
          );
        } else {
          setMessage(
            `${action?.payload?.Payload?.PatientEligibility?.EligibilityStatus} - ${action?.payload?.Payload?.PatientEligibility?.EligibilityStatusMessage}`
          );
        }
      }
    } catch (error) {
      console.error("An error occurred while checking insurance eligibility:", error);
      // Handle errors if needed
    } finally {
      // Turn off loader
      setLoader(false);
    }
  };
  const [state, setState] = useState("");
  useEffect(() => {
    if (insuranceId && labs?.labId && npi) {
      setStep1Complete(true);
    } else {
      setStep1Complete(false);
    }
  }, [insuranceId, npi, labs]);
  useEffect(() => {
    if (state.length < 1) {
      setCity("");
    }
  }, [state]);
  const filterOptions = (options, { inputValue }) => {
    const terms = inputValue?.split(" ")?.map((term) => term?.trim().toLowerCase());
    return options?.filter((option) => terms?.every((term) => option?.basic?.name?.toLowerCase()?.includes(term) || option?.number?.includes(term)));
  };
  // uncomment below code if you want to check with lastname
  // const handleInputChange = (event) => {
  //   const value = event;

  //   if (value.includes(" ")) {
  //     const parts = value.split(" ");
  //     const lastPart = parts[parts.length - 1];
  //     if (lastPart.length > 2) {
  //       getNpiDetails(value);
  //     }
  //   }
  //   if (!value.includes(" ")) {
  //     getNpiDetails(value);
  //   }
  // };
  useEffect(() => {
    if (patientDetailsById?.insuranceDetails?.length > 0) {
      setInsuranceId(patientDetailsById?.insuranceDetails[0]);
    } else {
      setInsuranceId(null);
    }
  }, [patientDetailsById]);
  return (
    <Typography variant="div" component="div" className="createOrder__wrapper--content pt-0">
      {loader && <Loader />}
      <Grid container spacing={2} className="mt-0">
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h6" component="h6" className="w-100">
            Patient
          </Typography>
          <Grid container spacing={2} className="mt-0 orderPreview__wrapper">
            <Grid item xs={12} sm={6} md={6} lg={6} className="name_cover">
              <Typography variant="label" component="label" className="add__label">
                First Name
              </Typography>
              <Typography variant="b" component="b">
                {patientDetailsById?.firstName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className="name_cover">
              <Typography variant="label" component="label" className="add__label">
                Last Name
              </Typography>
              <Typography variant="b" component="b">
                {patientDetailsById?.lastName}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} className="name_cover">
              <Typography variant="label" component="label" className="add__label">
                Email
              </Typography>
              <Typography variant="b" component="b">
                {patientDetailsById?.email}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <Typography variant="label" component="label" className="add__label">
                Phone No.
              </Typography>
              <Typography variant="b" component="b">
                {patientDetailsById?.phoneNumber}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="h6" component="h6" className="w-100 mt-4 mb-1">
            Insurance Eligibility Check
          </Typography>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="label" component="label" className="add__label required mt-1">
              Insurance ID
            </Typography>
            <FormControl className="d-flex flex-row justify-content-between flex-nowrap align-items-center">
              <Autocomplete
                className="customAutocomplete__input w-100"
                id="patientNameSearch"
                disableClearable
                options={patientDetailsById?.insuranceDetails || insuranceId || []}
                value={insuranceId}
                onChange={(e, newVal) => setInsuranceId(newVal)}
                getOptionLabel={(option) => option?.insuranceCompanyName || ""} // Define how to display option labels
                renderOption={(props, option, { selected }) => <li {...props}>{option?.insuranceCompanyName}</li>}
                renderInput={(params) => <TextField {...params} label="" />}
              />

              {/* <TextField className="add__input" value={insuranceId} onChange={(e) => setInsuranceId(e.target.value)} /> */}
              <Button
                variant="outlined"
                className="primary-outline-btn ms-3 whiteSpace-nowrap check-now"
                onClick={checkInsEligibility}
                disabled={insuranceId === ""}
              >
                Check Now
              </Button>
            </FormControl>
            {message ? (
              <Typography className="errorInfo">{message}</Typography>
            ) : (
              <Typography className="errorInfo">{errorMessage}</Typography>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Typography variant="h6" component="h6" className="w-100">
            Provider Details
          </Typography>
          <Grid container spacing={2} className="mt-0">
            {/* <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="label" component="label" className="add__label mb-2">
                Client
              </Typography>
              <Autocomplete
                className="customAutocomplete__input"
                id="patientNameSearch"
                disableClearable
                options={clients}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    InputProps={{
                      ...params.InputProps,
                      type: "search"
                    }}
                  />
                )}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <Typography variant="label" component="label" className="add__label mb-2">
                City
              </Typography>
              <Controller
                // key={id}
                control={control}
                name={"perCity"}
                // rules={{
                //   required:  !careGiverLocation?.city ? "This field is required." : ""
                // }}
                render={({ field }) => (
                  <div>
                    <GeoLocationSearch
                      defaultValue={city !== "" ? `${city}` : ""}
                      setLocation={(newLocation) => {
                        if (newLocation !== "") {
                          //   setPerCity(newLocation);
                          setCity(newLocation.city);
                          //   clearErrors("perCity");
                        }
                      }}
                      // setLocation={setCity}
                      setState={setState}
                      // location={i === 0 ? careGiverLocation : careGiverLocation1}
                    />
                    {/* {<Typography className="errorInfo">{error1}</Typography>} */}
                  </div>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} className="position-relative">
              <Typography variant="label" component="label" className="add__label required mb-2">
                Physician
              </Typography>
              <Typography component="label" className="switch toggleSwitchControl" htmlFor="checkboxs">
                <input
                  type="checkbox"
                  id="checkboxs"
                  checked={internal}
                  onChange={(e) => {
                    setInternal(e.target.checked);
                    if (internal === false) {
                      setNpi("");
                      dispatch(
                        getNpiDetailsForInternal({
                          // searchValue: internal === false ? "" : npi,
                          // city: internal === true ? "" : city || null,
                          // internalSearch: internal === false,
                          userId: internal === false ? getLoggedInUserId() : "",
                          roleId: internal === false ? getLoggedInUserRoleId() : ""
                        })
                      );
                    } else {
                      setNpi("");
                    }
                  }}
                />
                <Typography component="div" className="slider round"></Typography>
                <Typography> {internal === true ? "Internal" : "External"}</Typography>
              </Typography>
              {internal === false ? (
                <Autocomplete
                  className="customAutocomplete__input"
                  id="patientNameSearch"
                  disableClearable
                  freeSolo
                  options={npiArray?.message ? [] : npiArray || []}
                  getOptionLabel={(option) => (option?.number ? `${option?.number} - ${option?.basic?.name} ` : "")}
                  onKeyUp={(e) => {
                    const inputValue = e.target.value.trim();
                    const words = inputValue.split(" ");
                    const isValidInput = words.every((word) => word.length >= 2);
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
                      setError("Please enter at least 2 characters for FN/LN");
                    }
                  }}
                  filterOptions={filterOptions}
                  onChange={(event, newValue) => setNpi(newValue)}
                  value={npiArray?.message ? "" : npi}
                  renderOption={(props, option, { selected }) => {
                    return <li {...props}>{`${option?.number} - ${option?.basic?.name}`}</li>;
                  }}
                  renderInput={(params) => (
                    <>
                      <TextField
                        {...params}
                        label=""
                        InputProps={{
                          ...params.InputProps,
                          type: "search"
                        }}
                      />
                    </>
                  )}
                />
              ) : (
                <Autocomplete
                  className="customAutocomplete__input"
                  id="patientNameSearch"
                  disableClearable
                  options={npiforInternal || []}
                  value={npi}
                  onChange={(event, newValue) => setNpi(newValue)}
                  getOptionLabel={(option) => (option?.number ? `${option?.number} - ${option?.basic?.firstName}` : "")}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>{`${option?.number} - ${option?.basic?.firstName}`}</li>
                  )}
                  renderInput={(params) => <TextField {...params} label="" />}
                />
              )}
              {error && <p style={{ color: "red" }}>{error}</p>}
              {!npiArray?.message?.includes("Search value is not valid") ? (
                <Typography className="errorInfo">{npiArray?.message}</Typography>
              ) : (
                <p style={{ color: "red" }}>Please enter at least 2 characters for FN/LN</p>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="label" component="label" className="add__label required">
                Lab
              </Typography>
              <Autocomplete
                className="customAutocomplete__input"
                id="patientNameSearch"
                disableClearable
                options={lab}
                value={labs}
                onChange={(e, newVal) => setlabs(newVal)}
                getOptionLabel={(option) => option?.labName || ""} // Define how to display option labels
                renderOption={(props, option, { selected }) => <li {...props}>{option?.labName}</li>}
                renderInput={(params) => <TextField {...params} label="" />}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="label" component="label" className="add__label required">
                Facility
              </Typography>
              <FormControl className="w-100">
                {data?.data && data?.data.length > 0 && (
                  <Autocomplete
                    className="customAutocomplete__input"
                    id="patientNameSearch"
                    disableClearable
                    options={data?.data || []}
                    value={facilities}
                    onChange={(e, newVal) => setfacilities(newVal)}
                    getOptionLabel={(option) => option?.facilityName || ""} // Define how to display option labels
                    renderOption={(props, option, { selected }) => <li {...props}>{option?.facilityName}</li>}
                    renderInput={(params) => <TextField {...params} label="" />}
                  />
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* remove class d-none to see Add Patient section */}
    </Typography>
  );
};
