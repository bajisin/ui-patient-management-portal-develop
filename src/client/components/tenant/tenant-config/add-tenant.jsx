import { Box, Button, Divider, FormControl, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { CALLTYPES, roleIds, statusIds, tenantobj } from "../../../_helpers/constants";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { getTenantUsers, getThemes } from "@redux/slices/tenantsSlice";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddNewTheme from "./addTheme";
import ComboBox from "../../search/Autocomplete";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorIcon from "@mui/icons-material/Error";
import FailPopup from "../../master-data/failpopup";
import GeoLocationSearch from "../../tenant/google-location";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "@mui/material/Modal";
import { TENANT } from "@config/api-config";
import axios from "axios";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import dayjs from "dayjs";
import { getXtenantId } from "@utils/common";
import { imageVaildation } from "@config/app-config";
import requestSuccess from "@assets/images/svg/requestsentsuccess.svg";
import { useLocation } from "react-router-dom";

const AddTenant = ({ setOpen, open, callType, title, setEmailVal, disabled }) => {
  const [startDate, setStartDate] = useState(dayjs().format("MM-DD-YYYY"));
  const [endDate, setEndDate] = useState(dayjs().format("MM-DD-YYYY"));
  const [successMessage, setSuccessMessage] = useState("");
  const [showFailPopup, setShowFailPopup] = useState(false);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      tenantName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhoneNumber: "",
      contractDate: `${startDate} - ${endDate}`,
      streetAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: ""
    },
    mode: "onChange"
  });

  const [filePreview, setFilePreview] = useState();

  const initialState = {
    tenantLogo: filePreview,
    primMain: "",
    scndryMain: "",
    tenantName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    streetAddress: "",
    zipCode: "",
    spocAdmnId: ""
  };

  const dispatch = useDispatch();
  const { themes } = useSelector((state) => state.tenants);

  useEffect(() => {
    dispatch(getThemes());
  }, [dispatch]);

  const [tenantDetails, setTenantDetails] = useState(initialState);
  const [location, setLocation] = useState({ country: "", state: "", city: "", label: "" });
  const [file, setFile] = useState();
  const [selectedFont, setSelectedFont] = useState("1");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#000000");
  const [secondaryColor, setSecondaryColor] = useState("#000000");
  const [localPrimaryColor, setLocalPrimaryColor] = useState(selectedTheme?.primMain || primaryColor);
  const [localSecondaryColor, setLocalSecondaryColor] = useState(selectedTheme?.scndryMain || secondaryColor);
  const [emailVal, setEmail] = useState("");
  const [imgVal, setImgVal] = useState(false);

  const fieldObj = tenantobj.filter((field) => field.id !== "joiningDate");

  const { tenantById } = useSelector((state) => state.tenants);
  useEffect(() => {
    const isFormValid = Object.keys(errors).length === 0;

    setSubmitDisabled(!isFormValid);
  }, [errors]);
  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      setValue("tenantLogo", tenantById?.tenantLogo);
      setValue("tenantName", tenantById?.tenantName);
      setValue("firstName", tenantById?.firstName);
      setValue("middleName", tenantById?.middleName);
      setValue("lastName", tenantById?.lastName);
      setValue("emailAddress", tenantById?.emailAddress);
      setValue("phoneNumber", tenantById?.phoneNumber);
      setValue(
        "alternatePhoneNumber",
        (tenantById?.alternatePhoneNumber !== null && tenantById?.alternatePhoneNumber) || ""
      );
      setValue("streetAddress", tenantById?.label);
      setValue("state", tenantById?.state);
      setValue("city", tenantById?.city);
      setValue("country", tenantById?.country);
      setValue("zipCode", tenantById?.zipCode);
      setValue(
        "contractDate",
        `${dayjs(tenantById?.contractStart).format("MM-DD-YYYY")} - ${dayjs(tenantById?.contractEnd).format(
          "MM-DD-YYYY"
        )}`
      );
      setValue("primMain", tenantById?.primMain);
      setValue("scndryMain", tenantById?.scndryMain);
      setValue("spocAdmnId", tenantById?.spocAdminId);
      tenantDetails.tenantName = tenantById?.tenantName;
      tenantDetails.firstName = tenantById?.firstName;
      tenantDetails.lastName = tenantById?.lastName;
      tenantDetails.middleName = tenantById?.middleName;
      tenantDetails.alternatePhoneNumber = tenantById?.alternatePhoneNumber;
      tenantDetails.phoneNumber = tenantById?.phoneNumber;
      tenantDetails.emailAddress = tenantById?.emailAddress;
      // tenantDetails.streetAddress = tenantById?.label;
      tenantDetails.zipCode = tenantById?.zipCode;
      tenantDetails.primMain = tenantById?.primMain;
      tenantDetails.scndryMain = tenantById?.scndryMain;
      tenantDetails.spocAdmnId = tenantById?.spocAdmnId;
      // location.city = tenantById?.city;
      // location.state = tenantById?.state;
      // location.country = tenantById?.country;
      // location.label = tenantById?.streetAddress;
      setTenantDetails({ ...tenantDetails });
      setStartDate(tenantById?.contractStart);
      setEndDate(tenantById?.contractEnd);
      setFilePreview(tenantById?.tenantLogo);
      setSelectedFont(tenantById?.fontDTO?.fontId);
      setSelectedTheme(tenantById?.themeDTO?.themeId);
      setLocation({country: tenantById?.country, state: tenantById?.state, city: tenantById?.city, label: tenantById?.streetAddress})
    }
  }, [callType, tenantById]);
  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };
  const { usersByEmail, usersByPhone } = useSelector((state) => state.userDetails);
  const handleOnChange = (e, field) => {
    if (field === "emailAddress") {
      setEmail(e?.target?.value);
      setEmailVal(e.target.value);
      setValue(field, e.target.value);
    }

    setTenantDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const allowedTypes = imageVaildation.imageVaildation;
      const maxSize = imageVaildation.imageSize; // 4MB

      if (allowedTypes.includes(selectedFile.type) && selectedFile.size <= maxSize) {
        setFile(selectedFile);
        setFilePreview(URL.createObjectURL(selectedFile));
        e.target.value = "";
      } else {
        setImgVal(true);
        e.target.value = ""; // Clear the input
      }
    }
  };

  const inputRef = useRef(null);

  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const handleClick = (e) => {
    inputRef.current.click();
  };
  const handleClosePopup = () => {
    setShowSuccessPopup((prevState) => !prevState);
    setOpen(false);
  };
  const handleRecordSelection = (record) => {
    setSelectedRecord(record);

    if (record) {
      setValue("firstName", record?.userFirstName || "");
      setValue("middleName", record?.userMiddleName || "");
      setValue("lastName", record?.userLastName || "");
      setValue("emailAddress", record?.userEmail || emailVal || "");
      setValue("phoneNumber", record?.userPhoneNo || "");
      setValue("alternatePhoneNumber", record?.userAltPhoneNo || "");
      setValue("streetAddress", record?.userAddress || "");

      setValue("zipCode", record?.userZipcode || "");
      tenantDetails.firstName = record?.firstName;
      tenantDetails.lastName = record?.lastName;
      tenantDetails.middleName = record?.middleName;
      tenantDetails.alternatePhoneNumber = record?.userAltPhoneNo;
      tenantDetails.phoneNumber = record?.userPhoneNo;
      tenantDetails.emailAddress = record?.emailAddress;
      location.label = record?.streetAddress;
      tenantDetails.zipCode = record?.userAddress;
      location.city = record?.userCity;
      location.state = record?.userState;
      location.country = record?.userCountry;
      setTenantDetails({ ...tenantDetails });
    }
  };
  const onSubmit = async () => {
    const formData = new FormData();
    if (callType === CALLTYPES.Edit) {
      if (selectedRecord) {
        formData.append("primMain", localPrimaryColor);
        formData.append("scndryMain", localSecondaryColor);
        formData.append("fontId", tenantById?.fontDTO?.fontId);
        formData.append("tenantName", tenantById?.tenantName);
        formData.append(
          "firstName",
          selectedRecord?.userFirstName !== "null" ? selectedRecord?.userFirstName : tenantDetails.firstName
        );
        formData.append(
          "middleName",
          selectedRecord?.userMiddleName !== "null" ? selectedRecord.userMiddleName : tenantDetails.middleName
        );
        formData.append(
          "lastName",
          selectedRecord?.userLastName !== "null" ? selectedRecord.userLastName : tenantDetails.lastName
        );
        formData.append(
          "emailAddress",
          selectedRecord?.userEmail !== "null" ? selectedRecord.userEmail : tenantDetails.emailAddress
        );
        if (
          (selectedRecord.userAltPhoneNo === "undefined" || selectedRecord.userAltPhoneNo === "null") &&
          (selectedRecord.userPhoneNo === "null" || selectedRecord.userPhoneNo === "undefined")
        ) {
          formData.append("phoneNumber", tenantDetails.phoneNumber);
          formData.append("alternatePhoneNumber", tenantDetails.alternatePhoneNumber);
        } else {
          formData.append("phoneNumber", selectedRecord.userPhoneNo);
          formData.append("alternatePhoneNumber", selectedRecord.userAltPhoneNo);
        }
        formData.append("streetAddress", selectedRecord.userAddress);
        formData.append("contractStart", dayjs(startDate).format("MM-DD-YYYY"));
        formData.append("contractEnd", dayjs(endDate).format("MM-DD-YYYY"));
        formData.append("city", selectedRecord.userCity);
        formData.append("state", selectedRecord.userState);
        formData.append("country", selectedRecord.userCountry);
        formData.append("zipCode", selectedRecord.userZipcode);
        formData.append("tenantId", tenantById?.tenantId);
        formData.append("spocAdmnId", selectedRecord.userId);
        formData.append("updatedBy", loggedInUser?.id);
        formData.append("role", loggedInUser?.roleMasterDTO?.roleId);
      } else {
        if (file) formData.append("tenantLogo", file);

        formData.append("primMain", localPrimaryColor);
        formData.append("scndryMain", localSecondaryColor);
        formData.append("fontId", tenantById?.fontDTO?.fontId);
        formData.append("tenantName", tenantDetails?.tenantName);
        formData.append("firstName", tenantDetails.firstName);
        formData.append("middleName", tenantDetails.middleName);
        formData.append("lastName", tenantDetails?.lastName);
        formData.append("emailAddress", emailVal || tenantDetails?.emailAddress);
        formData.append("phoneNumber", tenantDetails?.phoneNumber);
        formData.append("alternatePhoneNumber", tenantDetails?.alternatePhoneNumber);
        formData.append("streetAddress", location?.label);
        formData.append("contractStart", dayjs(startDate).format("MM-DD-YYYY"));
        formData.append("contractEnd", dayjs(endDate).format("MM-DD-YYYY"));
        formData.append("city", location?.city);
        formData.append("state", location?.state);
        formData.append("country", location?.country);
        formData.append("zipCode", tenantDetails?.zipCode);
        formData.append("role", loggedInUser?.roleMasterDTO?.roleId);
        formData.append("spocAdmnId", tenantById?.spocAdminId);
        formData.append("updatedBy", loggedInUser?.id);
        formData.append("tenantId", tenantById?.tenantId);
      }
      try {
        const response = await axios.post(TENANT.updateTenant(), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-TenantID": getXtenantId(),
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
          }
        });
        if (response.data.status === 200) {
          // API responded with status 200, show success popup
          setShowSuccessPopup(true);
          const message = response.type.split("/");
          setSuccessMessage(message[0] || "Action completed successfully");
          setTimeout(() => {
            setShowSuccessPopup(false);
            handleClosePopup();
          }, 5000); // Adjust the time as needed
        } else {
          console.error("Unexpected response status:", response.data.status);
          // Handle other response statuses if needed
          setShowFailPopup(true);
          dispatch(setShowFailPopup(true));
        }
      } catch (error) {
        console.error("Error updating tenant:", error);
        setShowFailPopup(true);
        dispatch(setShowFailPopup(true));
      }
    } else {
      formData.append("tenantName", tenantDetails.tenantName);
      if (file) formData.append("tenantLogo", file);
      formData.append("fontId", selectedFont);
      formData.append("primMain", localPrimaryColor);
      formData.append("scndryMain", localSecondaryColor);
      formData.append("firstName", tenantDetails.firstName);
      formData.append("middleName", tenantDetails.middleName);
      formData.append("lastName", tenantDetails.lastName);
      formData.append("emailAddress", tenantDetails.emailAddress || emailVal);
      formData.append("phoneNumber", tenantDetails.phoneNumber);
      formData.append("alternatePhoneNumber", tenantDetails.alternatePhoneNumber);
      formData.append("streetAddress", location.label);
      formData.append("contractStart", dayjs(startDate).format("MM-DD-YYYY"));
      formData.append("contractEnd", dayjs(endDate).format("MM-DD-YYYY"));
      formData.append("city", location.city);
      formData.append("state", location.state);
      formData.append("country", location.country);
      formData.append("zipCode", tenantDetails.zipCode);
      formData.append("role", loggedInUser?.roleMasterDTO?.roleId);
      formData.append("statusId", statusIds.PENDING);
    }

    if (callType === CALLTYPES.Add) {
      try {
        const response = await axios.post(TENANT.saveTenant(), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-TenantID": getXtenantId(),
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
          }
        });
        if (response.data.status === 200) {
          dispatch(setShowSuccessPopup(true));

          setShowSuccessPopup(true);
          const message = response.type.split("/");
          setSuccessMessage(message[0] || "Action completed successfully");
          setTimeout(() => {
            setShowSuccessPopup(false);
            handleClosePopup();
          }, 5000); // Adjust the time as needed
        } else {
          dispatch(setShowFailPopup(true));
          setShowFailPopup(true);

          console.error("Unexpected response status:", response.data.status);
        }
      } catch (error) {
        console.error("Error saving tenant:", error);
        dispatch(setShowFailPopup(true));
        setShowFailPopup(true);
      }
    } else {
      try {
        const response = await axios.post(TENANT.updateTenant(), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "X-TenantID": getXtenantId(),
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("authInfo")).accessToken}`
          }
        });
        if (response.data.status === 200) {
          // API responded with status 200, show success popup
          setShowSuccessPopup(true);
          const message = response.type.split("/");
          setSuccessMessage(message[0] || "Action completed successfully");
          setTimeout(() => {
            setShowSuccessPopup(false);
            handleClosePopup();
          }, 5000); // Adjust the time as needed
        } else {
          console.error("Unexpected response status:", response.data.status);
          dispatch(setShowFailPopup(true));
          setShowFailPopup(true);
          // Handle other response statuses if needed
        }
      } catch (error) {
        console.error("Error updating tenant:", error);
        // Handle error
        dispatch(setShowFailPopup(true));
        setShowFailPopup(true);
      }
    }
    setOpen(false);
  };

  function handleThemeChange(event) {
    const root = document.documentElement;
    setSelectedTheme(event.target.value);
    if (event.target.value === "1") {
      root.style.setProperty("--primary", "#062f6e");
      root.style.setProperty("--primary-op-10", "#062f6e0f");
      root.style.setProperty("--actionWrapper", "#062f6e1a");
    } else if (event.target.value === "2") {
      root.style.setProperty("--primary", "#495ca2");
      root.style.setProperty("--primary-op-10", "#495ca20f");
      root.style.setProperty("--actionWrapper", "#495ca21a");
    } else if (event.target.value === "3") {
      root.style.setProperty("--primary", "#ebeeff");
      root.style.setProperty("--primary-op-10", "#ebeeff0f");
      root.style.setProperty("--actionWrapper", "#ebeeff1a");
    } else if (event.target.value === "4") {
      root.style.setProperty("--primary", "#d0a617");
      root.style.setProperty("--primary-op-10", "#d0a6170f");
      root.style.setProperty("--actionWrapper", "#d0a6171a");
    } else if (event.target.value === "5") {
      root.style.setProperty("--primary", "#9a28a3");
      root.style.setProperty("--primary-op-10", "#9a28a30f");
      root.style.setProperty("--actionWrapper", "#9a28a31a");
    }
  }
  function handleFontChange(event) {
    setSelectedFont(event.target.value);
    const root = document.documentElement;
    if (event.target.value === "5") {
      root.style.setProperty("--primary-font", '"Plus Jakarta Sans", sans-serif');
    } else if (event.target.value === "2") {
      root.style.setProperty("--primary-font", '"PP Mori", sans-serif');
    } else if (event.target.value === "3") {
      root.style.setProperty("--primary-font", '"Poppins", sans-serif');
    } else if (event.target.value === "4") {
      root.style.setProperty("--primary-font", '"Open Sans", sans-serif');
    } else if (event.target.value === "1") {
      root.style.setProperty("--primary-font", '"Aa", sans-serif');
    }
  }
  const [filteredValue, setFilteredValue] = useState("");
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const updateColors = (themeObj) => {
    setPrimaryColor(themeObj.primaryColor);
    setSecondaryColor(themeObj.secondaryColor);
  };

  const handleSearchChange = async (value) => {
    setFilteredValue(value);
    if (value) {
      try {
        await dispatch(
          getTenantUsers({
            pagination: {
              pageIndex: 0,
              pageSize: 99999
            },
            sortKey: "lastModifiedDate",
            sortOrder: "DESC",
            searchValue: value, // Pass the search query 'value' to the API
            tenantId: tenantById?.tenantId,
            statusId: [],

            role: loggedInUser.roleMasterDTO.roleId,
            roleId: [roleIds.TENANT_ADMIN]
          })
        );
      } catch (error) {
        console.error("Error fetching search results:", error);
        // }
      }
    }
  };

  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleCloseImgvaldPopup = () => {
    setImgVal(false);
  };
  return (
    <>
      <Dialog
        aria-labelledby="Add Tenants"
        open={open}
        enableResize={true}
        className="commonModal__wrapper addTenantsModal"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="commonModal__wrapper--dialog">
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Box mt={3} className="formcontrol__wrapper">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography component="div" variant="div" className="upload__logo">
                      {!filePreview ? (
                        <Box className="upload__logo--content">
                          <input type="file" ref={inputRef} onChange={handleFileChange} accept=".jpg, .jpeg, .png" />
                          <Typography
                            variant="span"
                            component="span"
                            onClick={handleClick}
                            className="ls-uploadIcon secondaryIcon"
                          ></Typography>
                          <Typography component="h6" variant="h6">
                            Upload Logo
                          </Typography>
                          <Typography component="p" variant="p">
                            Upload jpg, png format of company logo
                          </Typography>
                        </Box>
                      ) : (
                        <Box className="upload__logo--successful">
                          <img src={filePreview} alt="Upload Logo" />
                          <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: "none" }} />
                          <Button onClick={handleClick} className="bordered-icon edit">
                            <Typography
                              component="span"
                              variant="span"
                              className="ls-edit primaryIcon fs-16"
                            ></Typography>
                          </Button>
                        </Box>
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={8}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant="label" component="label" className="add__label required">
                          Tenant Name
                        </Typography>
                        <Controller
                          control={control}
                          name="tenantName"
                          rules={{
                            required: "This field is required.",
                            pattern: {
                              value: /^[a-zA-Z.,\-[\]() ]*$/,
                              message: "Invalid input format."
                            }
                          }}
                          render={({ field }) => (
                            <>
                              <TextField
                                {...field}
                                // id={t.id}
                                variant="outlined"
                                className="add__input"
                                placeholder="Enter Tenant Name"
                                value={tenantDetails.tenantName}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleOnChange(e, "tenantName");
                                }}
                                margin="normal"
                                error={Boolean(errors.tenantName)}
                                helperText={errors.tenantName?.message}
                                disabled={disabled}
                              />
                            </>
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant="label" component="label" className="add__label required">
                          Font Family
                        </Typography>
                        <FormControl className="w-100">
                          <Select className="add__select" onChange={handleFontChange} value={selectedFont}>
                            {themes[0]?.font?.map(
                              (font, i) =>
                                font?.fontId !== -1 && (
                                  <MenuItem key={i} value={font?.fontId}>
                                    {font?.fontName}
                                  </MenuItem>
                                )
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className="mt-1 mb-3 theme__wrapper">
                      {callType !== CALLTYPES.Edit ? (
                        <Grid item xs={12} sm={6} md={4} lg={4}>
                          <>
                            <Typography variant="label" component="label" className="add__label required">
                              Select Theme
                            </Typography>
                            <FormControl className="w-100">
                              <Select
                                className="add__select"
                                id="theme-selector"
                                value={selectedTheme}
                                onChange={handleThemeChange}
                                label=""
                              >
                                {themes[0]?.theme?.map((t, i) => (
                                  <MenuItem key={i} value={t}>
                                    <Typography
                                      component="span"
                                      variant="span"
                                      className="colorPicker me-3"
                                      style={{
                                        backgroundColor: `${t?.primMain}`,
                                        color: `${t?.primMain}`
                                      }}
                                    >
                                      {t?.primMain}
                                    </Typography>
                                    <Typography
                                      component="span"
                                      variant="span"
                                      className="colorPicker me-3"
                                      style={{
                                        backgroundColor: `${t?.scndryMain}`,
                                        color: `${t?.scndryMain}`
                                      }}
                                    >
                                      {t?.scndryMain}
                                    </Typography>
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </>
                        </Grid>
                      ) : null}
                      <AddNewTheme
                        className="theme__wrapper--add"
                        primaryColor={primaryColor}
                        secondaryColor={secondaryColor}
                        updateColors={updateColors}
                        selectedTheme={selectedTheme}
                        localPrimaryColor={localPrimaryColor}
                        setLocalPrimaryColor={setLocalPrimaryColor}
                        localSecondaryColor={localSecondaryColor}
                        setLocalSecondaryColor={setLocalSecondaryColor}
                        tenantById={tenantById}
                        callType={callType}
                      />
                      {!selectedTheme && (
                        <Typography className="errorInfo">
                          {errors?.radioGroup && errors?.radioGroup?.message}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Divider className="w-100 my-2" />
                <Typography component="h6" variant="h6" className="mb-2">
                  SPOC Details
                </Typography>
                {loggedInUser.roleMasterDTO.roleId === roleIds.SUPER_ADMIN && (
                  <Grid container spacing={2} className="mb-2">
                    <Grid item xs={12} sm={6} md={6} lg={4}>
                      <ComboBox
                        tenantById={tenantById}
                        updateSearch={handleSearchChange}
                        filteredValue={filteredValue}
                        onChange={(value) => handleSearchChange(value)}
                        onClick={(item) => handleRecordSelection(item)}
                      />
                    </Grid>
                  </Grid>
                )}
                <Grid container spacing={2}>
                  {fieldObj.map(
                    (t, i) => (
                      <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                        <Typography
                          variant="label"
                          component="label"
                          className={`add__label ${t.required && "required"}`}
                        >
                          {t.label}
                        </Typography>
                        {t.type === "text" ? (
                          <>
                            {usersByPhone}
                            {t.id === "phoneNumber" || t.id === "alternatePhoneNumber" ? (
                              <Controller
                                key={t.id}
                                control={control}
                                name={t.id}
                                rules={
                                   {
                                        required: t.required && "This field is required.",
                                        pattern: {
                                          value: t.pattern,
                                          message: `Invalid ${t.label.toLowerCase()}.`
                                        },
                                        validate: (value) => {
                                          if (
                                            t.id === "phoneNumber" &&
                                            usersByPhone?.userExist &&
                                            usersByPhone?.usersDTO?.phoneNumber === value
                                          )
                                            return "Phone Number already exists";
                                        }
                                      }
                                    // : {}
                                }
                                render={({ field }) => (
                                  <div className="w-100 phone__number--input">
                                    <TextField
                                      {...field}
                                      id={t.id}
                                      variant="outlined"
                                      className="add__input"
                                      placeholder={`Enter ${t.label}`}
                                      value={tenantDetails[t.id]}
                                      onChange={(e) => {
                                        field.onChange(e);
                                        handleOnChange(e, t.id);
                                      }}
                                      margin="normal"
                                      error={Boolean(errors[t.id])}
                                      helperText={errors[t.id]?.message}
                                      disabled={t.readOnly && disabled}
                                    />{" "}
                                  </div>
                                )}
                              />
                            ) : (
                              <Controller
                                key={t.id}
                                control={control}
                                name={t.id}
                                rules={
                                  // callType !== CALLTYPES.Edit
                                    // ?
                                     {
                                        required: t.required && "This field is required.",
                                        pattern: {
                                          value: t.pattern,
                                          message: `Invalid ${t.label.toLowerCase()}.`
                                        },
                                        validate: (value) => {
                                          if (
                                            t.id === "emailAddress" &&
                                            usersByEmail?.userExist &&
                                            usersByEmail?.usersDTO?.email === value
                                          )
                                            return "Email already exists";
                                        },
                                        maxLength: {
                                          value: t?.maxLength,
                                          message: `Maximum length exceeded (${t?.maxLength} characters).`
                                        }
                                      }
                                    // : {}
                                }
                                render={({ field }) => (
                                  <TextField
                                    {...field}
                                    id={t.id}
                                    variant="outlined"
                                    className="add__input"
                                    placeholder={`Enter ${t.label}`}
                                    onChange={(e) => {
                                      field.onChange(e);
                                      handleOnChange(e, t.id);
                                    }}
                                    margin="normal"
                                    error={Boolean(errors[t.id])}
                                    helperText={errors[t.id]?.message}
                                    disabled={t.readOnly && disabled}
                                  />
                                )}
                              />
                            )}
                          </>
                        ) : t.type === "select" ? (
                          <Controller
                            key={t.id}
                            control={control}
                            name={t.id}
                            rules={{
                              required:
                                callType !== CALLTYPES.Edit &&
                                t.required &&
                                location.city === "" &&
                                "This field is required."
                            }}
                            render={({ field }) => (
                              <div disabled={loggedInUser.roleMasterDTO.roleId === t.role && t.readOnly}>
                                {location?.city !== "" && location?.label !== "" && tenantById?.streetAddress && callType === CALLTYPES.Edit ? (
                                  <GeoLocationSearch
                                    {...field}
                                    defaultValue={callType === CALLTYPES.Edit ? `${tenantById?.streetAddress || location?.label}` : ""}
                                    setLocation={setLocation}
                                    error={Boolean(errors[t.id])}
                                    helperText={errors[t.name]?.message}
                                  />
                                ) : ( location?.label !== undefined &&(tenantById?.streetAddress !=="" || tenantById?.streetAddress !== undefined )&& (
                                  <GeoLocationSearch
                                    {...field}
                                    defaultValue={callType === CALLTYPES.Edit ? `${tenantById?.streetAddress || location?.label}` : ""}
                                    setLocation={setLocation}
                                    error={Boolean(errors[t.id])}
                                    helperText={errors[t.name]?.message}
                                  />
                                )
                                )}
                                {!location.city && (
                                  <Typography className="errorInfo">{errors[t.id]?.message}</Typography>
                                )}
                              </div>
                            )}
                          />
                        ) : (
                          t.type === "date" && (
                            <Controller
                              key={t.id}
                              control={control}
                              name={t.id}
                              rules={{
                                required: t.required && "This field is required.",
                                pattern: {
                                  value: t.pattern,
                                  message: `Invalid ${t.label.toLowerCase()}.`
                                }
                              }}
                              render={({ field }) => (
                                <>
                                  {t.model === "tenant" && (
                                    <Grid container spacing={2}>
                                      <Grid item xs={12} sm={12} md={12} lg={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DatePicker
                                            value={dayjs(startDate)}
                                            className="w-100 datetimepicker-control"
                                            onChange={(newValue) => setStartDate(dayjs(newValue))}
                                            disabled={disabled}
                                          />
                                        </LocalizationProvider>
                                      </Grid>
                                      <Grid item xs={12} sm={12} md={12} lg={6}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                          <DatePicker
                                            value={dayjs(endDate)}
                                            className="w-100 datetimepicker-control"
                                            onChange={(newValue) => setEndDate(dayjs(newValue))}
                                            minDate={dayjs(startDate)}
                                            disabled={disabled}
                                          />
                                        </LocalizationProvider>
                                      </Grid>
                                    </Grid>
                                  )}
                                </>
                              )}
                            />
                          )
                        )}
                      </Grid>
                    )
                    // )
                  )}
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button type="submit" autoFocus className="primary-btn">
                {`${callType === CALLTYPES.Edit ? CALLTYPES.UpdateRequest : CALLTYPES.SendRequest}`}
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}

      {showSuccessPopup && callType === CALLTYPES.Add && (
        <Modal
          open={showSuccessPopup}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="adminsuccess_modal"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Request Sent Successfully
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              New Tenant will be created shortly
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button
                autoFocus
                variant="contained"
                type="submit"
                className="primary-btn float-right mt-3"
                onClick={handleClose}
              >
                Okay
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}
      {showSuccessPopup && callType === CALLTYPES.Edit && (
        <Modal
          open={showSuccessPopup}
          onClose={handleClosePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
              Successfully Updated
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              All the required data is successfully updated
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleClosePopup}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
      {imgVal && (
        <Modal
          open={imgVal}
          onClose={handleCloseImgvaldPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <ErrorIcon className="fs-64 deleteRedIcon" />
            <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
              Failed
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              Please select a valid JPG or PNG image (up to 4MB)
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleCloseImgvaldPopup}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AddTenant;
