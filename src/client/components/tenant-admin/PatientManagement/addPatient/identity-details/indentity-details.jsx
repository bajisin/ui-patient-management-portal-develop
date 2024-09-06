import {
  Accordion,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { patientIdentityDetailsforBE, statusIds } from "../../../../../_helpers/constants";
import { uploadDrivingLicense, uploadInsurance } from "@utils/ocr";
import { useDispatch, useSelector } from "react-redux";

import { DrivingLicense } from "./driving-license-form";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import QRCodeGeneration from "../../QRCode";
import { StateId } from "./state-id-form";
import dayjs from "dayjs";
import { getIdentityDocs } from "@redux/slices/order-slice";
import { getLoggedInUserId } from "@utils/common";

// import qrIcon from "@assets/images/qr-code.png";

/**
 * @author
 * @function IdentityDetails
 **/

export const IdentityDetails = ({
  drivingLicense,
  setDrivingLicense,
  stateId,
  setStateId,
  insurance,
  setInsurance,
  ssnId,
  setSsnId,
  email,
  setEmail,
  identityErr,
  insuranceIdErr,
  setStep2Complete,
  setOcrInsData,
  ocrInsData,
  editParam,
  setInsuranceImg,
  insuranceImg,
  patientDetailsById,
  onSubmit,
  step2Complete,
  setFirstName,
  middleName,
  setMiddleName,
  setLastName,
  firstName,
  lastName,
  setCommAdd,
  commAdd,
  file,
  setFile,
  setSuccessPopoup
}) => {
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
      eyeColour: ""
    },

    mode: "onChange"
  });
  const drivingLicenseInputRef = useRef(null);
  const stateIdInputRef = useRef(null);
  const insuranceInputRef = useRef(null);
  const [ocrData, setOcrData] = useState();
  const [ocrConfidence, setOcrConfidence] = useState(0);
  //  const { usersByEmail } = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const [statusId, setStatusId] = useState();
  const [openQRCode, setOpenQrCode] = useState(false);
  const patientId = sessionStorage.getItem("patientId");
  const { identityDocStatus } = useSelector((state) => state.createOrder);
  const [gender, setGender] = useState();

  // const debounceEmailVal = useDebounce(email, 1000);
  const [picture, setPicture] = useState(null);
  const [statePicture, setStatePicture] = useState(null);
  const [insurancePicture, setInsurancePicture] = useState(null);
  const [drivingImg, setDrivingImg] = useState(null);
  const [stateImg, setStateImg] = useState(null);
  const [fileName, setFileName] = useState("");
  const [ocrInsConfidence, setOcrInsConfidence] = useState(0);
  let getDrivingDetails;

  const handleClick = (file) => {
    if (file === "drivingLicense") {
      drivingLicenseInputRef.current.click();
    } else if (file === "stateId") {
      stateIdInputRef.current.click();
    } else if (file === "insurance") {
      insuranceInputRef.current.click();
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (editParam === "true") {
      setValue("address", patientDetailsById?.primaryAddrs);
      setValue("firstName", patientDetailsById?.firstName);
      setValue("middleName", patientDetailsById?.middleName);
      setValue("lastName", patientDetailsById?.lastName);
      setValue("birthDate", dayjs(patientDetailsById?.birthDate));
      setValue("identityExpiryDate", dayjs(patientDetailsById?.identityExpiryDate).format("YYYY/MM/DD"));
      setValue("identityIssueDate", dayjs(patientDetailsById?.identityIssueDate).format("YYYY/MM/DD"));
      setValue("identityNumber", patientDetailsById?.identityNumber);
      setValue("endorsment", patientDetailsById?.endorsment);
      setValue("height", patientDetailsById?.height);
      setValue("gender", patientDetailsById?.gender);
      setValue("identityRestriction", patientDetailsById?.identityRestriction);
      setValue("identityClass", patientDetailsById?.identityClass);
      setValue("eyeColour", patientDetailsById?.eyeColour);
      setValue("organDonor", patientDetailsById?.organDonor);
      setValue("identityIssueOfAuthority", patientDetailsById?.identityIssueOfAuthority);
      if (patientDetailsById) {
        setDrivingImg(patientDetailsById?.drivingIdProof?.docURL);
        setStateImg(patientDetailsById?.stateIdProof?.docURL);
        setInsuranceImg(patientDetailsById?.insuranceIdProof?.docURL);
      }
    }
  }, [patientDetailsById]);

  useEffect(() => {
    if (fileName === "Driving License") {
      if (identityDocStatus?.docURL && identityDocStatus?.documentId === 2) {
        setDrivingLicense(identityDocStatus);
        const licenseInfo = uploadDrivingLicense(identityDocStatus?.docURL);
        licenseInfo
          .then((resolvedValue) => {
            // Do something with the resolved value
            setOcrData(resolvedValue.fields);
          })
          .catch((error) => {
            // Handle any errors that occurred during the Promise execution
            console.error(error);
          });
      }
    }
    if (fileName === "stateId") {
      if (identityDocStatus?.docURL && identityDocStatus?.documentId === 3) {
        setStateId(identityDocStatus);
        const licenseInfo = uploadDrivingLicense(identityDocStatus?.docURL);
        licenseInfo
          .then((resolvedValue) => {
            // Do something with the resolved value
            setOcrData(resolvedValue.fields);
          })
          .catch((error) => {
            // Handle any errors that occurred during the Promise execution
            console.error(error);
          });
      }
    }
    if (fileName === "Insurance Id") {
      if (identityDocStatus?.docURL && identityDocStatus?.documentId === 4) {
        setInsurance(identityDocStatus);
        const licenseInfo = uploadInsurance(identityDocStatus?.docURL);
        licenseInfo
          .then((resolvedValue) => {
            // Do something with the resolved value
            setOcrInsData(resolvedValue.fields);
          })
          .catch((error) => {
            // Handle any errors that occurred during the Promise execution
            console.error(error);
          });
      }
    }
  }, [identityDocStatus]);
  const keys = Object.keys(errors || {});

  useEffect(() => {
    // if (
    //   // (drivingLicense || stateId) && insurance &&
    //   firstName &&
    //   lastName &&
    //   commAdd &&
    //   keys?.length <= 0
    // ) {
    //   setStep2Complete(true);
    // } else {
    setStep2Complete(true);
    // }
  }, [insurance, ssnId, gender, firstName, lastName, commAdd, keys, ocrData]);

  const [interval, setTimeInterval] = useState(null);

  const handleFileChange = (e, file, fileType) => {
    if (file === "drivingLicense") {
      setFile("DL");
      setDrivingLicense(e.target.files[0]);
      setSuccessPopoup(true);
      setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setDrivingImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    if (file === "stateId") {
      setStateId(e.target.files[0]);
      setFile("State");
      setStatePicture(e.target.files[0]);
      setSuccessPopoup(true);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setStateImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    if (file === "insurance") {
      setInsurance(e.target.files[0]);
      setInsurancePicture(e.target.files[0]);
      setSuccessPopoup(true);
      setFile("Insurance");
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setInsuranceImg(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    if (fileType === "id") {
      const licenseInfo = uploadDrivingLicense(e.target.files[0]);
      licenseInfo
        .then((resolvedValue) => {
          // Do something with the resolved value
          setOcrData(resolvedValue.fields);
          setOcrConfidence(resolvedValue);
        })
        .catch((error) => {
          // Handle any errors that occurred during the Promise execution
          console.error(error);
        });
    } else if (fileType === "ins") {
      const insInfo = uploadInsurance(e.target.files[0]);
      insInfo
        .then((resolvedValue) => {
          // Do something with the resolved value
          setOcrInsData(resolvedValue.fields);
          setOcrInsConfidence(resolvedValue.confidence);
        })
        .catch((error) => {
          // Handle any errors that occurred during the Promise execution
          console.error(error);
        });
    }
  };
  const generateQRCode = (name) => {
    setFileName(name);
    setOpenQrCode(true);
    setStatusId(statusIds.DRAFT);
  };

  useEffect(() => {
    if (fileName === "Driving License") {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const drivingDetails = setInterval(() => {
        dispatch(getIdentityDocs({ docId: patientIdentityDetailsforBE.dL, patientId }));
      }, 20000);
      setTimeInterval(drivingDetails);
    } else if (fileName === "stateId") {
      const stateDetails = setInterval(() => {
        dispatch(getIdentityDocs({ docId: patientIdentityDetailsforBE.stateId, patientId }));
      }, 20000);

      setTimeInterval(stateDetails);
    } else if (fileName === "Insurance Id") {
      const insuranceDetails = setInterval(() => {
        dispatch(getIdentityDocs({ docId: patientIdentityDetailsforBE.insuranceId, patientId }));
      }, 20000);
      console.log(insuranceDetails, "insuranceDetails");

      setTimeInterval(insuranceDetails);
    }
  }, [fileName]);

  useEffect(() => {
    if (Object.keys(identityDocStatus).length > 0 && interval !== null) {
      if (drivingLicense !== null && drivingLicense !== undefined && fileName === "Driving License") {
        clearInterval(interval);
        setTimeInterval(null);
      } else if (insurance !== null && insurance !== undefined && fileName === "Insurance Id") {
        clearInterval(interval);
        setTimeInterval(null);
      } else if (stateId !== null && stateId !== undefined && fileName === "stateId") {
        clearInterval(interval);
        setTimeInterval(null);
      }
    }
  }, [drivingLicense, insurance, stateId]);

  const queryParams = {
    param: fileName
  };

  return (
    <Typography variant="div" component="div" className="createOrder__wrapper--content">
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
        <Typography variant="h6" component="h6" className="w-100">
          Identity Information <br />
          <Typography component="b" variant="b">
            Note: To ensure uniqueness, kindly provide at least one identity detail.
          </Typography>
        </Typography>
        <Grid container spacing={2} className="mt-0">
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="label" component="label" className="add__label position-relative">
              Driving License
              <InfoOutlinedIcon className="error--bright cursor-pointer ms-2 info--note" />
              <Box className="tooltipText">
                <Typography component="p" variant="p">
                  Please upload either your Driver's License or State ID.
                </Typography>
              </Box>
            </Typography>
            <Box className="d-flex flex-row justify-content-between align-items-center">
              <FormControl className="add__input" error={Boolean(errors?.drivingLicense)}>
                <OutlinedInput
                  className="outlined__input"
                  id="driving-license"
                  name={"drivingLicense"}
                  type="text"
                  value={
                    drivingLicense && editParam === "true"
                      ? drivingLicense?.fileName || drivingLicense?.name
                      : drivingLicense === null
                      ? ""
                      : drivingLicense?.name || drivingLicense?.fileName
                  }
                  disabled={stateId}
                  endAdornment={
                    <InputAdornment position="end">
                      {drivingLicense ? (
                        <Button
                          className="downloadBtn-text p-0"
                          aria-label="upload"
                          onClick={() => {
                            drivingLicenseInputRef.current.value = "";
                            setDrivingLicense(null);
                            setDrivingImg("");
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <Typography component="span">Clear</Typography>
                        </Button>
                      ) : (
                        <>
                          <Button
                            className="downloadBtn-text p-0"
                            aria-label="upload"
                            onClick={() => handleClick("drivingLicense")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disabled={stateId}
                          >
                            <Typography component="span">Upload</Typography>
                          </Button>
                        </>
                      )}

                      <input
                        className="browseInput"
                        type="file"
                        id="fileInput"
                        accept=".pdf, .jpeg, .jpg, .png"
                        style={{ display: "none" }}
                        ref={drivingLicenseInputRef} // Use the ref to reference the file input element
                        onChange={(e) => handleFileChange(e, "drivingLicense", "id")}
                      />
                    </InputAdornment>
                  }
                />
                {/* <FormHelperText className="errorInfo">{identityErr}</FormHelperText> */}
                {editParam !== "true" && drivingLicense && ocrData === undefined && ocrConfidence < 0.75 && (
                  <Typography color="error">Please upload a Valid or Clear file</Typography>
                )}
                {/* {!stateId && !drivingLicense && <Typography color="error">This field is required</Typography>} */}
              </FormControl>
              <Button
                className="downloadBtn-text p-0 qrIcon"
                aria-label="upload"
                onClick={() => generateQRCode("Driving License")}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                disabled={stateId}
              >
                <Typography component="span" variant="span" className="ls-qr-code primaryIcon"></Typography>
                {/* <img src={qrIcon} /> */}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="label" component="label" className="add__label position-relative">
              State ID
              <InfoOutlinedIcon className="error--bright cursor-pointer ms-2 info--note" />
              <Box className="tooltipText">
                <Typography component="p" variant="p">
                  Please upload either your Driver's License or State ID.
                </Typography>
              </Box>
            </Typography>
            <Box className="d-flex flex-row justify-content-between align-items-center">
              <FormControl className="w-100 add__input" error={Boolean(errors?.stateId)}>
                <OutlinedInput
                  className="outlined__input"
                  id="driving-license"
                  type="text"
                  value={
                    stateId && editParam === "true"
                      ? stateId?.fileName || stateId?.name
                      : stateId === null
                      ? ""
                      : stateId?.name || stateId?.fileName
                  }
                  disabled={drivingLicense}
                  endAdornment={
                    <InputAdornment position="end">
                      {stateId ? (
                        <Button
                          className="downloadBtn-text p-0"
                          aria-label="upload"
                          onClick={() => {
                            stateIdInputRef.current.value = "";
                            setStateId(null);
                            setStateImg("");
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <Typography component="span">Clear</Typography>
                        </Button>
                      ) : (
                        <>
                          <Button
                            className="downloadBtn-text p-0"
                            aria-label="upload"
                            onClick={() => handleClick("stateId")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            disabled={drivingLicense}
                          >
                            <Typography component="span">Upload</Typography>
                          </Button>
                        </>
                      )}
                      <input
                        className="browseInput"
                        type="file"
                        id="fileInput"
                        accept=".pdf, .jpeg, .jpg, .png"
                        style={{ display: "none" }}
                        ref={stateIdInputRef} // Use the ref to reference the file input element
                        onChange={(e) => handleFileChange(e, "stateId", "id")}
                      />
                    </InputAdornment>
                  }
                />
                {/* <FormHelperText className="errorInfo">{identityErr}</FormHelperText> */}
                {editParam !== "true" && stateId && ocrData === undefined && ocrConfidence < 0.75 && (
                  <Typography color="error">Please upload a Valid or Clear file</Typography>
                )}
                {/* {!drivingLicense && !stateId && <Typography color="error">This field is required</Typography>} */}
              </FormControl>
              <Button
                className="downloadBtn-text p-0 qrIcon"
                aria-label="upload"
                onClick={() => generateQRCode("stateId")}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                disabled={drivingLicense}
              >
                <Typography component="span" variant="span" className="ls-qr-code primaryIcon"></Typography>
                {/* <Typography className="ls-qr-code"></Typography> */}
                {/* <img src={qrIcon} /> */}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Insurance ID
            </Typography>
            <Box className="d-flex flex-row justify-content-between align-items-center">
              <FormControl className="w-100 add__input" error={Boolean(errors?.insurance)}>
                <OutlinedInput
                  className="outlined__input"
                  id="insurance"
                  type="text"
                  value={
                    insurance && editParam === "true"
                      ? insurance?.fileName || insurance?.name
                      : insurance === null
                      ? ""
                      : insurance?.name || insurance?.fileName
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      {insurance ? (
                        <Button
                          className="downloadBtn-text p-0"
                          aria-label="upload"
                          onClick={() => {
                            insuranceInputRef.current.value = "";
                            setInsurance(null);
                            setInsuranceImg("");
                          }}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          <Typography component="span">Clear</Typography>
                        </Button>
                      ) : (
                        <>
                          <Button
                            className="downloadBtn-text p-0"
                            aria-label="upload"
                            onClick={() => handleClick("insurance")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            <Typography component="span">Upload</Typography>
                          </Button>
                        </>
                      )}

                      <input
                        className="browseInput"
                        type="file"
                        id="fileInput"
                        accept=".pdf, .jpeg, .jpg, .png"
                        style={{ display: "none" }}
                        ref={insuranceInputRef} // Use the ref to reference the file input element
                        onChange={(e) => handleFileChange(e, "insurance", "ins")}
                      />
                    </InputAdornment>
                  }
                />
                {/* <FormHelperText className="errorInfo">{insuranceIdErr}</FormHelperText> */}
                {editParam !== "true" && insurance && ocrInsData === undefined && ocrInsConfidence < 0.75 && (
                  <Typography color="error">Please upload a Valid or Clear file</Typography>
                )}
                {/* {!insurance && <Typography color="error">This field is required</Typography>} */}
              </FormControl>
              <Button
                className="downloadBtn-text p-0 qrIcon"
                aria-label="upload"
                onClick={() => generateQRCode("Insurance Id")}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                // disabled={stateId}
              >
                <Typography component="span" variant="span" className="ls-qr-code primaryIcon"></Typography>
                {/* <img src={qrIcon} /> */}
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="label" component="label">
              SSN ID
            </Typography>
            <Controller
              control={control}
              name="ssnId"
              rules={{
                // required: ssnId?.length <= 0 && "This field is required.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: `Invalid SSN ID.`
                }
              }}
              render={({ field }) => (
                <div className="w-100">
                  <TextField
                    {...field}
                    id="ssnId"
                    variant="outlined"
                    className="add__input"
                    placeholder={`Enter SSN ID`}
                    value={ssnId}
                    onChange={(e) => {
                      field.onChange(e);
                      setSsnId(e.target.value);
                    }}
                    margin="normal"
                    error={Boolean(errors?.ssnId)}
                    helperText={errors.ssnId?.message}
                  />
                </div>
              )}
            />
          </Grid>
        </Grid>
        {(drivingLicense || stateId) && (
          <Accordion className="stepper__accordion mt-3">
            <AccordionSummary
              expandIcon={
                <Typography
                  variant="span"
                  component="span"
                  className="ls-rightarrow ls-outlined-down-arrow"
                ></Typography>
              }
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {drivingLicense ? (
                <Typography>Driving License Details</Typography>
              ) : (
                stateId && <Typography>State ID Details</Typography>
              )}
            </AccordionSummary>
            {drivingLicense ? (
              <DrivingLicense
                control={control}
                errors={errors}
                setValue={setValue}
                ocrData={ocrData}
                imgData={drivingImg}
                patientDetailsById={patientDetailsById}
                onSubmit={onSubmit}
                drivingLicense={drivingLicense}
                setFirstName={setFirstName}
                setLastName={setLastName}
                setMiddleName={setMiddleName}
                middleName={middleName}
                firstName={firstName}
                lastName={lastName}
                setGender={setGender}
                gender={gender}
                setCommAdd={setCommAdd}
                commAdd={commAdd}
              />
            ) : (
              stateId && (
                <StateId
                  control={control}
                  errors={errors}
                  setValue={setValue}
                  ocrData={ocrData}
                  stateImg={stateImg}
                  setGender={setGender}
                  gender={gender}
                  setFirstName={setFirstName}
                  setMiddleName={setMiddleName}
                  middleName={middleName}
                  setLastName={setLastName}
                  firstName={firstName}
                  lastName={lastName}
                  setCommAdd={setCommAdd}
                  commAdd={commAdd}
                  stateId={stateId}
                />
              )
            )}
          </Accordion>
        )}
        <Button className="primary-btn next-btn" id = "step2SubmitButton" disabled={!step2Complete} type="submit">
          Save & Continue
        </Button>
      </form>
      {openQRCode && (
        <QRCodeGeneration
          setOpenQrCode={setOpenQrCode}
          openQRCode={openQRCode}
          path={`identity-docs/${getLoggedInUserId()}/${patientId}?${new URLSearchParams(queryParams).toString()}`}
          fileName={fileName}
        />
      )}
    </Typography>
  );
};
