import { Autocomplete, Box, Button, Checkbox, Divider, Grid, Modal, TextField, Typography } from "@mui/material";
import { CALLTYPES, Client, Provider, roleIds, statusIds, tenantobj } from "../../../_helpers/constants";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createUser, setPopupMessage, updateUser } from "@redux/slices/usersSlice";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { getNpiDetailsByNumber, getTenantUsers } from "@redux/slices/tenantsSlice";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ClientForm from "./client-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import GeoLocationSearch from "@components/tenant/google-location";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ProviderForm from "./provider-form";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import dayjs from "dayjs";
import { getClientByRoleId } from "../../../redux/slices/order-slice";
import { getFacilitiesDetails } from "@redux/slices/facilitiesSlice";
import { getLabList } from "@redux/slices/compendiumSlice";
import requestSuccess from "@assets/images/svg/requestsentsuccess.svg";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

// import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

// import GeoLocationSearch from "../admin/tenant/google-location";

// import moment from "moment";

function AddUser({ open, setOpen, userId, callType, userData, title, setPhoneVal, setEmailVal, editVal }) {
  const handleClose = () => {
    window.location.reload();
    setOpen(false);
  };

  const { usersByEmail, usersByPhone, success } = useSelector((state) => state.userDetails);
  const { npiArray } = useSelector((state) => state.tenants);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showUpdateSuccessPopup, setUpdateShowSuccessPopup] = useState(false);

  const {
    control,
    formState: { errors },
    clearErrors,
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      alternatePhoneNumber: "",
      joiningDate: dayjs().format("MM-DD-YYYY"),
      address: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      role: "",
      labId: "",
      facilityId: ""
    },

    mode: "onChange"
  });

  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const tenantId = getTenantId();

  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      setValue("firstName", userData?.firstName);
      setValue("middleName", userData?.middleName);
      setValue("lastName", userData?.lastName);
      setValue("emailAddress", userData?.email);
      setValue("phoneNumber", userData?.phoneNumber);
      setValue("alternatePhoneNumber", userData?.alternatePhoneNumber);
      setValue("streetAddress", userData?.address);
      setValue("state", userData?.state);
      setValue("city", userData?.city);
      setValue("country", userData?.country);
      setValue("zipCode", userData?.zipCode);
      setValue("joiningDate", userData?.joiningDate);
      fieldObj.map((field) => {
        if (field.id === "phoneNumber")
          return (userDetails[field.id] =
            userData?.phoneNumber?.split("-")?.length > 0
              ? userData?.phoneNumber
              : userData?.phoneNumber?.split("-")[1]);
        else if (field.id === "alternatePhoneNumber")
          return (userDetails.alternatePhoneNumber =
            userData?.alternatePhoneNumber?.split("-")?.length > 0
              ? userData?.alternatePhoneNumber
              : userData?.alternatePhoneNumber?.split("-")[1]);
        else if (field.id === "streetAddress") return (userDetails[field.id] = userData?.address);
        else if (field.id === "emailAddress") return (userDetails[field.id] = userData?.email);
        else return (userDetails[field.id] = userData[field.id]);
      });
      // fieldObj.map((field) => (userDetails[field.id] = userData[field.id]));
      fieldObj.map((field) => (location[field.id] = userData[field.id]));
      setSelectedRole({ id: userData?.roles[0].roleId, title: userData?.roles[0].roleName });
      setUserDetails({ ...userDetails });
      setLocation({
        city: userData?.city,
        state: userData?.state,
        country: userData?.country,
        label: userData?.address
      });
      setFacilities(userData?.userFacilities);
      setLabs(userData?.userLabs);
      setAssociatedTo(userData?.reportingManagerUserName);
      getNpiDetails(userData?.npiNumber);
    }
  }, [callType]);
  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    joiningDate: dayjs().format("MM-DD-YYYY"),
    streetAddress: "",
    zipCode: ""
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const [labs, setLabs] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [selectedLabErr, setSelectedLabErr] = useState(false);
  const [selectedFacilitiesErr, setSelectedFacilitiesErr] = useState(false);
  const [selectedRole, setSelectedRole] = useState({
    id:
      getLoggedInUserRoleId() !== 3
        ? Client?.createInd === true
          ? roleIds.CLIENT_ADMIN
          : Provider?.createInd === true
          ? roleIds.PROVIDER
          : "" // Set id to empty string if both roles are false
        : Provider?.createInd === true
        ? roleIds.PROVIDER
        : "",
    // Set id to empty string if both roles are false

    // title: Client[0]?.createInd === true ? "Client Admin" : "prav"
    title:
      getLoggedInUserRoleId() !== 3
        ? Client?.createInd === true
          ? "Client Admin"
          : "Provider"
        : Provider?.createInd === true
        ? "Provider"
        : ""
  });
  const [associatedTo, setAssociatedTo] = useState();
  const [npiNo, setNpiNo] = useState({});
  const [disable, setDisable] = useState(false);
  const [npiReadOnly, setNpiReadOnly] = useState(false);
  const dispatch = useDispatch();
  const [warningMessage, showWarnigMessage] = useState("");
  useEffect(() => {
    if (userId && callType === CALLTYPES.Edit && editVal === "Provider") {
      setSelectedRole({ id: roleIds.PROVIDER, title: "Provider" });
      setDisable(true);
    } else if (callType === CALLTYPES.Edit) {
      setSelectedRole({ id: roleIds.CLIENT_ADMIN, title: "Client Admin" });
      setDisable(true);
    }
  }, []);

  const fetchUsers = () => {
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: 0,
          pageSize: 10
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        searchValue: "",
        tenantId,
        roleId: [selectedRole.id],
        role: loggedInUserRole,
        userId: !userId ? [getLoggedInUserId()] : [userId]
      })
    );
  };

  useEffect(() => {
    if (selectedRole?.id === roleIds.CLIENT_ADMIN) {
      dispatch(
        getFacilitiesDetails({
          pageNo: 0,
          pageSize: 99999,
          searchKeys: [],
          searchValue: "",
          sortBy: "facilityName",
          sortKey: "facilityName",
          sortOrder: "ASC",
          tenantId,
          userId: [userId || getLoggedInUserId()],
          roleId: getLoggedInUserRoleId(),
          statusId: [statusIds.ACTIVE]
        })
      );

      dispatch(getLabList());
    } else if (selectedRole?.id === roleIds.PROVIDER) {
      dispatch(
        getClientByRoleId({
          roleId: roleIds.CLIENT_ADMIN,
          userId: getLoggedInUserId()
        })
      );
    }
    if (npiNo && Object.keys(npiNo).length > 0) {
      userDetails.firstName = npiNo?.basic?.firstName;
      userDetails.middleName = npiNo?.basic?.middleName;
      userDetails.lastName = npiNo?.basic?.lastName;
      setValue("firstName", npiNo?.basic?.firstName);
      setValue("middleName", npiNo?.basic?.middleName);
      setValue("lastName", npiNo?.basic?.lastName);
      setNpiReadOnly(true);
    }
  }, [selectedRole, npiNo, callType]);

  const handleClosePopup = () => {
    setShowSuccessPopup(false); // Close the popup
    // dispatch(setPopupMessage(""));
    window.location.reload();
    setOpen(false);
  };
  const handleUpdateClosePopup = () => {
    setUpdateShowSuccessPopup(false); // Close the popup
    dispatch(setPopupMessage(""));
    window.location.reload();
    setOpen(false);
  };
  const [userDetails, setUserDetails] = useState(initialState);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState({ country: "", state: "", city: "", label: "" });
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const fieldObj = tenantobj.filter((f) => f.id !== "contractDate");
  const [selectedRoleError, setSelectedRoleError] = useState(false);
  const [error, setError] = React.useState("Please enter at least 2 characters for FN/LN");   

  const vaildationsForDropdown = () => {
    if (selectedFacilitiesErr === "false" || selectedLabErr === "false") {
      setSelectedFacilitiesErr("");
      setSelectedLabErr("");
    } else {
      setSelectedFacilitiesErr("required");
      setSelectedLabErr("required");
    }
  };
  const onSubmit = () => {
    vaildationsForDropdown();
    const labIds = labs?.map((lab) => lab?.labId);
    const facilityIds = facilities?.map((f) => f?.facilityId);
    const payload = {
      firstName: userDetails?.firstName ? userDetails?.firstName : "",
      middleName: userDetails?.middleName ? userDetails?.middleName : "",
      lastName: userDetails?.lastName ? userDetails?.lastName : "",
      email: userDetails.emailAddress,
      phoneNumber: `${userDetails.phoneNumber}`,
      alternatePhoneNumber: `${userDetails.alternatePhoneNumber}`,
      joiningDate: dayjs(userDetails.joiningDate).format("YYYY-MM-DD"),
      address: location.label,
      roleId: selectedRole.id,
      city: location?.city,
      state: location?.state,
      country: location?.country,
      // ...location,
      zipCode: userDetails.zipCode,
      labId: labIds,
      tenantId,
      loginIndicator,
      notificationFlag: getLoggedInUserId() === roleIds.PROVIDER ? true : notificationAccess,
      npiNumber: npiNo.number,
      reportingManagerUserId:
        selectedRole?.id === roleIds.CLIENT_ADMIN
          ? getLoggedInUserId()
          : associatedTo
          ? associatedTo?.userId
          : getLoggedInUserId(),
      reportingManagerRoleId:
        selectedRole?.id === roleIds.CLIENT_ADMIN ? getLoggedInUserRoleId() : roleIds.CLIENT_ADMIN,
      facilityId: facilityIds,
      createdBy: loggedInUser.id,
      logedInUserRole: loggedInUser.roleMasterDTO.roleId
    };
    if (callType === CALLTYPES.Add) {
      dispatch(createUser(payload));
      if (createUser.fulfilled) {
        // setShowSuccessPopup(true);
        // setPopupMessage(action.payload);
      }
      // setShowSuccessPopup(true);
    } else if (callType === CALLTYPES.Edit) {
      dispatch(updateUser({ userId, ...payload }));
      setUpdateShowSuccessPopup(true);
    }
    // setTimeout(() => {
    //   handleClosePopup();
    // }, 60000);
    fetchUsers();
  };
  useEffect(() => {
    if (success?.message && success?.timeStamp) {
      showWarnigMessage(success?.message);
    } else if (success && callType === CALLTYPES.Add) {
      if (loginIndicator === true || selectedRole?.id === roleIds.CLIENT_ADMIN) {
        setShowSuccessPopup(true);
      } else setUpdateShowSuccessPopup(true);
    } else if (success && callType === CALLTYPES.Edit) {
      setUpdateShowSuccessPopup(true);
    }
  }, [success, selectedRole]);

  const handleCloseWarning = () => {
    showWarnigMessage("");
  };
  const handleOnChange = async (e, field) => {
    if (field === "joiningDate") {
      userDetails[field] = dayjs(e).format("YYYY-MM-DD");
      setValue("joiningDate", userDetails[field]); // Update the form value
    } else {
      userDetails[field] = e.target.value;
    }

    if (field === "emailAddress") {
      setEmailVal(e.target.value);
    }
    if (field === "phoneNumber") setPhoneVal(e.target.value);

    setUserDetails({ ...userDetails });

    // Trigger validation after a brief delay to ensure form state update
    // setTimeout(async () => {
    //   await trigger("joiningDate"); // Trigger validation for the joiningDate field
    // }, 100);
  };

  const getNpiDetails = (value) => {
    const isNumeric = /^\d+$/.test(value);

    const isAlphabetic = /^[A-Za-z\s]+$/.test(value);

    if (isNumeric && (value?.length >= 10 || value)) {
      dispatch(getNpiDetailsByNumber({ searchValue: value, city: city || null })).then((s) => setError(""));
    } else if (isAlphabetic && value?.length >= 2) {
      dispatch(getNpiDetailsByNumber({ searchValue: value, city: city || null })).then((s) => setError(""));
    }
  };

  const opts = [
    { id: roleIds.CLIENT_ADMIN, title: "Client Admin", createInd: Client?.createInd },
    { id: roleIds.PROVIDER, title: "Provider", createInd: Provider?.createInd }
  ];
  const filteredOpts = opts?.filter((op) => op.createInd);
  const [loginIndicator, setLoginIndicator] = useState(false);
  const [notificationAccess, setNotificationAccess] = useState(false);
  return (
    <Dialog aria-labelledby="Add Tenants" open={open} enableResize={true} className="commonModal__wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="commonModal__wrapper--dialog">
          <IconButton aria-label="close" onClick={handleClose} className="modalClose">
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>

          <DialogTitle className="d-flex justify-content-between align-items-center">
            {title}
            <Typography component="label">
              {selectedRole?.id === roleIds.PROVIDER ? (
                <>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 4 }}
                    checked={loginIndicator} // Assuming loginIndicator is a boolean state variable
                    onChange={(e) => {
                      setLoginIndicator(e.target.checked);
                    }}
                  />
                  User would like to login
                </>
              ) : (
                <>
                  {" "}
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 4 }}
                    checked={notificationAccess}
                    onChange={(e) => {
                      setNotificationAccess(e.target.checked);
                    }}
                  />
                  Notification Access
                </>
              )}
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Box mt={3} className="formcontrol__wrapper">
              <Grid container spacing={2}>
                {
                  getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN && Provider[0]?.createInd === true ? (
                    <Grid item xs={12} sm={6} md={4} lg={4} className="common_checkbox_selection">
                      <Typography variant="label" component="label" className="add__label required">
                        Role
                      </Typography>

                      <Autocomplete
                        className="permissions--tag customAutocomplete__input"
                        id="permission-tags"
                        options={filteredOpts}
                        disableCloseOnSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.title}
                        value={selectedRole} // Set the selected options
                        onChange={(event, newValue) => {
                          setSelectedRole(newValue);
                          if (newValue.length === 0) {
                            setSelectedRoleError(true);
                          } else {
                            setSelectedRoleError(false);
                          }
                        }}
                        renderOption={(props, option, { selected }) => <li {...props}>{option.title}</li>}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            placeholder=""
                            className="p-0"
                            error={selectedRoleError} // Set error state
                            helperText={selectedRoleError ? "This field is required" : ""}
                          />
                        )}
                        disabled={disable}
                      />
                    </Grid>
                  ) : (
                    // Client[0]?.createInd === true &&
                    // Provider[0]?.createInd === true && (
                    <Grid item xs={12} sm={6} md={4} lg={4} className="common_checkbox_selection">
                      <Typography variant="label" component="label" className="add__label required">
                        Role
                      </Typography>

                      <Autocomplete
                        className="permissions--tag customAutocomplete__input"
                        id="permission-tags"
                        options={filteredOpts}
                        disableCloseOnSelect
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        getOptionLabel={(option) => option.title}
                        value={selectedRole} // Set the selected options
                        onChange={(event, newValue) => {
                          setSelectedRole(newValue);
                          if (newValue.length === 0) {
                            setSelectedRoleError(true);
                          } else {
                            setSelectedRoleError(false);
                          }
                        }}
                        renderOption={(props, option, { selected }) => <li {...props}>{option.title}</li>}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            placeholder=""
                            className="p-0"
                            error={selectedRoleError} // Set error state
                            helperText={selectedRoleError ? "This field is required" : ""}
                          />
                        )}
                        disabled={disable}
                      />
                    </Grid>
                  )
                  // )
                }

                {selectedRole?.id === roleIds.CLIENT_ADMIN ? (
                  <ClientForm
                    selectedFacilities={facilities}
                    setSelectedFacilities={setFacilities}
                    selectedLab={labs}
                    selectedFacilitiesErr={selectedFacilitiesErr}
                    setSelectedFacilitiesErr={setSelectedFacilitiesErr}
                    setSelectedLab={setLabs}
                    selectedLabErr={selectedLabErr}
                    setSelectedLabErr={setSelectedLabErr}
                    errors={errors}
                    control={control}
                    clearErrors={clearErrors}
                  />
                ) : (
                  selectedRole?.id === roleIds.PROVIDER && (
                    <ProviderForm
                      npiNo={npiNo}
                      setNpiNo={setNpiNo}
                      city={city}
                      setCity={setCity}
                      control={control}
                      getNpiDetails={getNpiDetails}
                      errors={errors}
                      error={error}
                      associatedTo={associatedTo}
                      setAssociatedTo={setAssociatedTo}
                      clearErrors={clearErrors}
                      setNpiReadOnly={setNpiReadOnly}
                      userData={userData}
                      editVal={editVal}
                    />
                  )
                )}
              </Grid>

              <Divider className="w-100 my-2 pt-4" />

              {/* <Grid container spacing={2}> */}

              <Box className="formcontrol__wrapper mt-3">
                <Typography component="h6" variant="h6" className="mb-3 w-100">
                  Personal Information
                </Typography>

                <Grid container spacing={2}>
                  {fieldObj.slice(0, 3).map((t, i) => (
                    <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                      <Typography
                        variant="label"
                        component="label"
                        className={`add__label ${t.required && "required"}`}
                      >
                        {t.label}
                      </Typography>
                      <Controller
                        key={t.id}
                        control={control}
                        name={t.id}
                        rules={{
                          required: npiReadOnly === false && t.required && "This field is required.",
                          pattern: {
                            value: t.pattern,
                            message: `Invalid ${t.label.toLowerCase()}.`
                          },

                          maxLength: {
                            value: t?.maxLength,
                            message:
                              t.id === "zipCode" ? "Zip code cannot be more than 5" : "Length cannot be more than 30"
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id={t.id}
                            // disabled={npiReadOnly}
                            variant="outlined"
                            className="add__input"
                            placeholder={`Enter ${t.label}`}
                            value={userDetails[t.id]}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, t.id);
                            }}
                            margin="normal"
                            error={Boolean(errors[t.id])}
                            helperText={errors[t.id]?.message}
                          />
                        )}
                      />
                    </Grid>
                  ))}

                  {fieldObj.slice(6, 13).map((t, i) => (
                    <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                      <Typography
                        variant="label"
                        component="label"
                        className={`add__label ${t.required && "required"}`}
                      >
                        {t.label}
                      </Typography>

                      {t.type === "text" ? (
                        <Controller
                          key={t.id}
                          control={control}
                          name={t.id}
                          rules={{
                            required: t.required && "This field is required.",
                            pattern: {
                              value: t.pattern,
                              message: `Invalid ${t.label.toLowerCase()}.`
                            },
                            maxLength: {
                              value: t?.maxLength,
                              message:
                                t.id === "zipCode" ? "Length cannot be more than 5" : "Length cannot be more than 30"
                            }
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id={t.id}
                              variant="outlined"
                              className="add__input"
                              placeholder={`Enter ${t.label}`}
                              value={userDetails[t.id]}
                              onChange={(e) => {
                                field.onChange(e);
                                handleOnChange(e, t.id);
                              }}
                              margin="normal"
                              error={Boolean(errors[t.id])}
                              helperText={errors[t.id]?.message}
                            />
                          )}
                        />
                      ) : // <Controller
                      //   key={t.id}
                      //   control={control}
                      //   name={t.id}
                      //   rules={{
                      //     required: t.required && "This field is required.",

                      //     pattern: {
                      //       value: t.pattern,

                      //       message: `Invalid ${t.label.toLowerCase()}.`
                      //     }
                      //   }}
                      //   render={({ field }) => (
                      //     <TextField
                      //       {...field}
                      //       id={t.id}
                      //       variant="outlined"
                      //       className="add__input"
                      //       placeholder={`Enter ${t.label}`}
                      //       value={userDetails[t.id]}
                      //       onChange={(e) => {
                      //         field.onChange(e);

                      //         handleOnChange(e, t.id);
                      //       }}
                      //       margin="normal"
                      //       error={Boolean(errors[t.id])}
                      //       helperText={errors[t.id]?.message}
                      //     />
                      //   )}
                      // />
                      t.type === "select" ? (
                        <Controller
                          key={t.id}
                          control={control}
                          name={t.id}
                          rules={{
                            required: t.required && location.city === "" && "This field is required."
                          }}
                          render={({ field }) => (
                            <div>
                              {userData?.city !== null && (
                                <GeoLocationSearch
                                  {...field}
                                  className="add__select"
                                  defaultValue={
                                    userData?.city !== null && callType === CALLTYPES.Edit ? `${userData?.address}` : ""
                                  }
                                  setLocation={setLocation}
                                  error={Boolean(errors[t.id])}
                                  helperText={errors[t.name]?.message}
                                />
                              )}
                              {location.city === "" && (
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker
                                    value={dayjs(userDetails?.joiningDate)}
                                    className="w-100 datetimepicker-control"
                                    onChange={(newValue) => handleOnChange(newValue, t.id)}
                                    minDate={dayjs()}
                                  />
                                </LocalizationProvider>
                              </>
                            )}
                          />
                        )
                      )}
                    </Grid>
                  ))}
                </Grid>

                <Divider className="w-100 my-2 pt-3" />

                <Typography component="h6" variant="h6" className="mb-3 w-100">
                  Contact Information
                </Typography>

                <Grid container spacing={2}>
                  {fieldObj.slice(3, 6).map((t, i) => (
                    <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                      <Typography
                        variant="label"
                        component="label"
                        className={`add__label ${t.required && "required"}`}
                      >
                        {t.label}
                      </Typography>

                      {t.type === "text" && (
                        <>
                          {t.id === "phoneNumber" || t.id === "alternatePhoneNumber" ? (
                            <Controller
                              key={t.id}
                              control={control}
                              name={t.id}
                              rules={{
                                required: t.required && "This field is required.",
                                pattern: {
                                  value: t.pattern,
                                  message: `Invalid ${t.label.toLowerCase()}.`
                                },
                                validate: (value) => {
                                  if (usersByPhone?.userExist && usersByPhone?.usersDTO?.phoneNumber === value)
                                    return "Phone Number already exists";
                                }
                              }}
                              render={({ field }) => (
                                <div className="w-100 phone__number--input">
                                  <TextField
                                    {...field}
                                    id={t.id}
                                    variant="outlined"
                                    className="add__input"
                                    placeholder={`Enter ${t.label}`}
                                    value={userDetails[t.id]}
                                    onChange={(e) => {
                                      field.onChange(e);

                                      handleOnChange(e, t.id);
                                    }}
                                    margin="normal"
                                    error={Boolean(errors[t.id])}
                                    helperText={errors[t.id]?.message}
                                  />
                                </div>
                              )}
                            />
                          ) : (
                            <Controller
                              key={t.id}
                              control={control}
                              name={t.id}
                              rules={{
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
                                  ) {
                                    return "Email already exists";
                                  }
                                  return undefined; // No error if validation passes
                                }
                              }}
                              render={({ field }) => (
                                <TextField
                                  {...field}
                                  id={t.id}
                                  variant="outlined"
                                  className="add__input"
                                  placeholder={`Enter ${t.label}`}
                                  value={userDetails[t.id]}
                                  onChange={(e) => {
                                    field.onChange(e);

                                    handleOnChange(e, t.id);
                                  }}
                                  margin="normal"
                                  error={Boolean(errors[t.id])}
                                  helperText={errors[t.id]?.message}
                                  disabled={callType === CALLTYPES.Edit}
                                />
                              )}
                            />
                          )}
                        </>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box>

              {/* </Grid> */}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              autoFocus
              type="submit"
              className="primary-btn"
              // disabled={labs.length === 0 || facilities.length === 0}
            >
              {callType === CALLTYPES.Edit ? CALLTYPES.Update : CALLTYPES.SendRequest}
            </Button>
            {showSuccessPopup && (
              <Modal
                open={showSuccessPopup}
                onClose={handleClosePopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="adminsuccess_modal"
              >
                <Box className="success_modal">
                  <img src={requestSuccess} className="modal-success-icon" />
                  <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
                    Request Sent Successfully
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    id="modal-modal-description"
                    className="modal-modal-description"
                  >
                    User will receive a mail with a request link .
                  </Typography>

                  <Typography className="modal-buttons-wrapper">
                    <Button
                      autoFocus
                      variant="contained"
                      type="submit"
                      className="primary-btn float-right mt-3"
                      onClick={(handleClosePopup, handleClose)}
                    >
                      Okay
                    </Button>
                  </Typography>
                </Box>
              </Modal>
            )}
            {showUpdateSuccessPopup && (
              <Modal
                open={showUpdateSuccessPopup}
                onClose={handleUpdateClosePopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="success_modal">
                  <img src={checkmarkSuccess} className="successImg modal-success-icon" />
                  {/* <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
            Successfully Deleted
          </Typography> */}
                  <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
                    Successfully Updated
                  </Typography>
                  <Typography
                    variant="p"
                    component="p"
                    id="modal-modal-description"
                    className="modal-modal-description"
                  >
                    All the required data is successfully updated
                  </Typography>
                  <Button
                    autoFocus
                    type="submit"
                    className="primary-btn"
                    onClick={(handleUpdateClosePopup, handleClose)}
                  >
                    Okay
                  </Button>
                </Box>
              </Modal>
            )}

            {warningMessage && (
              <Modal
                open={warningMessage}
                onClose={handleCloseWarning}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="success_modal">
                  <img src={warningDeactivate} className="successImg modal-success-icon" />
                  <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
                    <b>{warningMessage}</b>
                  </Typography>
                  <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
                    Please Select other Email
                  </Typography>
                  <Button autoFocus type="submit" className="primary-btn" onClick={handleCloseWarning}>
                    Okay
                  </Button>
                </Box>
              </Modal>
            )}
            {/* Deactivate Modal code */}

            {/*

            <Modal

              open={openDeactivate}

              onClose={handleDeactivateClose}

              aria-labelledby="modal-modal-title"

              aria-describedby="modal-modal-description"

            >

              <Box className="success_modal deactivate_modal">

                <img src={warningDeactivate} className="modal-warning-icon" />

                <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">

                  Are You Sure ?

                </Typography>

                <Typography id="modal-modal-description" className="modal-modal-description">

                  Do you really want to delete the test? This process cannot be undone.

                </Typography>

                <FormControlLabel

                  className="agree-statement"

                  control={<Checkbox defaultChecked />}

                  label="Yes, I agree"

                />

                <Box className="modal-buttons-wrapper">

                  <Button component="button" variant="outlined" className="primary-outline-btn">

                    Cancel

                  </Button>

                  <Button autoFocus type="submit" className="primary-btn">

                    Delete

                  </Button>

                </Box>

              </Box>

            </Modal> */}
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
}

export default AddUser;
