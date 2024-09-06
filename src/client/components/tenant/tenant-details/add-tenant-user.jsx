import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { CALLTYPES, roleIds, statusIds, tenantobj } from "../../../_helpers/constants.js";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createAdmin, setPopupMessage, updateUserDetails } from "../../../redux/slices/usersSlice.js";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common.js";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FailPopup from "../../master-data/failpopup";
import GeoLocationSearch from "../google-location";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Modal from "@mui/material/Modal";
import SuccessPopup from "../../master-data/sucesspopup.jsx";
import dayjs from "dayjs";
import requestSuccess from "@assets/images/svg/requestsentsuccess.svg";
import { useLocation } from "react-router-dom";

function AddTenantUser({
  open,
  setOpen,
  user,
  callType,
  userData,
  title,
  setPhoneVal,
  setEmailVal,
  showSuccessPopup,
  setShowSuccessPopup
}) {
  const handleClose = () => {
    setOpen(false);
    setShowSuccessPopup(false);
    window.location.reload();
  };

  const { usersByEmail, usersByPhone } = useSelector((state) => state.userDetails);

  const {
    control,
    formState: { errors },
    setValue,
    getValues,
    handleSubmit
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhoneNumber: "",
      streetAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      userRole: "",
      joiningDate: dayjs().format("YYYY-MM-DD")
    },
    mode: "onChange"
  });
  const { pathname } = useLocation();
  const tenantId = pathname.split("/")[3];
  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      // setValue("streetAddress", userData?.address);
      setValue("city", userData?.city);
      setValue("country", userData?.country);
      setValue("emailAddress", userData?.email);
      setValue("firstName", userData?.firstName);
      setValue("middleName", userData?.middleName);
      setValue("lastName", userData?.lastName);

      setValue("phoneNumber", userData?.phoneNumber?.split("-")[1]);
      setValue("alternatePhoneNumber", userData?.alternativePhoneNumber);

      setValue("state", userData?.state);
      setValue("zipCode", userData?.zipCode);
      setValue("joiningDate", userData?.joiningDate);

      tenantobj &&
        tenantobj.map((field) => {
          if (field.id === "phoneNumber") return (tenantDetails[field.id] = userData?.phoneNumber?.split("-")[1]);
          else if (field.id === "alternatePhoneNumber")
            return (tenantDetails[field.id] = userData?.alternativePhoneNumber?.split("-")[1]);
          // else if (field.id === "streetAddress") return (tenantDetails[field.id] = userData?.address);
          else if (field.id === "emailAddress") return (tenantDetails[field.id] = userData?.email);
          else return (tenantDetails[field.id] = userData[field.id]);
        });
      fieldObj.map((field) => {
        if (field.id === "phoneNumber") return (tenantDetails[field.id] = userData?.phoneNumber);
        else if (field.id === "alternatePhoneNumber")
          return (tenantDetails[field.id] = userData?.alternativePhoneNumber);
        // else if (field.id === "streetAddress") return (tenantDetails[field.id] = userData?.address);
        else if (field.id === "emailAddress") return (tenantDetails[field.id] = userData?.email);
        else return (tenantDetails[field.id] = userData[field.id]);
      });
      fieldObj.map((field) => (location[field.id] = userData[field.id]));
      setTenantDetails({ ...tenantDetails });
      setLocation({ ...location });
    }
  }, [callType, userData]);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    alternativePhoneNumber: "",
    joiningDate: dayjs().format("YYYY-MM-DD"),
    // streetAddress: "",
    zipCode: "",
    city: "",
    country: "",
    state: ""
  };
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));

  const dispatch = useDispatch();

  const [tenantDetails, setTenantDetails] = useState(initialState);

  const [location, setLocation] = useState({ country: "", state: "", city: "", label: "" });
  const handleInputChange = (e, id, onChangeCallback) => {
    const newValue = e.target.value.slice(0, 10);
    e.target.value = newValue;
    onChangeCallback(newValue);
    handleOnChange(e, id);
  };
  let fieldObj = tenantobj.filter((f) => f.id !== "contractDate");
  fieldObj = user === "user" ? fieldObj : fieldObj.filter((f) => f.id !== "joiningDate");
  const onSubmit = async () => {
    let action;
    if (user === "super admin") {
      if (callType === CALLTYPES.Add) {
        action = await dispatch(
          createAdmin({
            statusId: statusIds.ACTIVE,
            tenantId,
            address: location.label,
            city: location.city,
            country: location.country,
            userEmail: tenantDetails.emailAddress,
            firstName: tenantDetails.firstName,
            middleName: tenantDetails.middleName,
            lastName: tenantDetails.lastName,
            phoneNumber: tenantDetails.phoneNumber,
            alternativePhoneNumber: tenantDetails.alternatePhoneNumber,
            createdBy: userData?.id,
            state: location.state,
            zipCode: tenantDetails.zipCode,
            userId: getLoggedInUserId() || "",

            id: getLoggedInUserId(),

            createdRoleId: roleIds.SUPER_ADMIN,

            email_verified: true,
            roleMasterDTO: {
              roleId: roleIds.SUPER_ADMIN,
              roleName: "Super Admin"
            }
          })
        );

        if (createAdmin.fulfilled.match(action)) {
          setShowSuccessPopup(true);
          setPopupMessage(action.payload.data);
        }
      } else {
        action = await dispatch(
          updateUserDetails({
            statusId: statusIds.ACTIVE,

            id: getLoggedInUserId(),
            address: location.label,
            city: location.city,
            country: location.country,
            userEmail: tenantDetails.emailAddress,
            firstName: tenantDetails.firstName,
            middleName: tenantDetails.middleName,
            lastName: tenantDetails.lastName,
            phoneNumber: tenantDetails.phoneNumber,
            alternativePhoneNumber: tenantDetails.alternatePhoneNumber,
            state: location.state,
            zipCode: tenantDetails.zipCode,
            userId: getLoggedInUserId() || "",
            email_verified: true,
            modifiedBy: userData?.id,
            roleMasterDTO: {
              roleId: getLoggedInUserRoleId(),
              roleName: "Super Admin"
            }
          })
        );
        if (updateUserDetails.fulfilled.match(action)) {
          setShowSuccessPopup(true);
          setPopupMessage(action.payload.data);
        }
      }
    } else if (user === "user") {
      const payload = {
        roleMasterDTO: {
          roleId: roleIds.TENANT_ADMIN,
          roleName: "Tenant Admin"
        },
        statusId: statusIds.ACTIVE,
        createdRoleId: roleIds.SUPER_ADMIN,
        tenantId,
        address: location.label,
        city: location.city,
        country: location.country,
        userEmail: tenantDetails.emailAddress,
        firstName: tenantDetails.firstName,
        middleName: tenantDetails.middleName,
        lastName: tenantDetails.lastName,
        phoneNumber: tenantDetails.phoneNumber,
        alternativePhoneNumber: tenantDetails.alternatePhoneNumber,
        state: location.state,
        zipCode: tenantDetails.zipCode,
        joiningDate: tenantDetails?.joiningDate,
        id: getLoggedInUserId(),
        email_verified: true,
        createdBy: getLoggedInUserId(),
        userId: getLoggedInUserId()
      };
      action = await dispatch(createAdmin(payload));
      if (createAdmin.fulfilled.match(action)) {
        setShowSuccessPopup(true);
        setPopupMessage(action.payload.data);
      }
    }
  };
  const handleOnChange = (e, field) => {
    if (field !== "joiningDate") e.preventDefault();
    if (field === "emailAddress") {
      setEmailVal(e.target.value);
    }
    if (field === "phoneNumber") setPhoneVal(e.target.value);
    if (field === "joiningDate") tenantDetails[field] = dayjs(e).format("YYYY-MM-DD");
    else tenantDetails[field] = e.target.value;
    setTenantDetails({ ...tenantDetails });
  };

  return (
    <>
      <Dialog aria-labelledby="Add Tenants" open={open} enableResize={true} className="commonModal__wrapper">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="commonModal__wrapper--dialog">
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <Box mt={3} className="formcontrol__wrapper">
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
                          required: t.required && "This field is required.",
                          pattern: {
                            value: t.pattern,
                            message: `Invalid ${t.label.toLowerCase()}.`
                          },
                          maxLength: {
                            value: t?.maxLength,
                            message: "Length cannot be more than 30"
                          }
                        }}
                        render={({ field }) => (
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
                            }
                          }}
                          render={({ field }) => (
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
                            />
                          )}
                        />
                      ) : t.type === "select" ? (
                        <Controller
                          key={t.id}
                          control={control}
                          name={t.id}
                          rules={{
                            required: t.required && location.city === "" && "This field is required."
                          }}
                          render={({ field }) => (
                            <div disabled={loggedInUser.roleMasterDTO.roleId === t.role && t.readOnly}>
                              <GeoLocationSearch
                                className="add__select"
                                defaultValue={
                                  userData?.city !== null && callType === CALLTYPES.Edit ? `${userData?.address}` : ""
                                }
                                setLocation={setLocation}
                                location={location}
                                error={Boolean(errors[t.id])}
                                helperText={errors[t.name]?.message}
                              />
                              {!location.city && !location.country && !location.state && (
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
                                    value={dayjs(tenantDetails?.joiningDate)}
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
                <Divider className="w-100 my-2" />
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
                            <>
                              <Controller
                                key={t.id}
                                control={control}
                                name={t.id}
                                rules={{
                                  required:
                                    callType === CALLTYPES.Edit
                                      ? userData?.phoneNumber && getValues("phoneNumber") !== ""
                                        ? false
                                        : t.required && "This field is required ."
                                      : t.required && "This field is required .",
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
                                }}
                                render={({ field }) => (
                                  <div className="w-100 phone__number--input">
                                    <TextField
                                      {...field}
                                      id={t.id}
                                      variant="outlined"
                                      className="add__input"
                                      placeholder={`Enter ${t.label}`}
                                      value={tenantDetails[t.id]}
                                      onChange={(e) => handleInputChange(e, t.id, field.onChange)}
                                      margin="normal"
                                      error={Boolean(errors[t.id])}
                                      helperText={errors[t.id]?.message}
                                      inputProps={{ maxLength: 10 }}
                                    />
                                  </div>
                                )}
                              />
                            </>
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
                              render={({ field, fieldState }) => (
                                <>
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
                                    error={Boolean(fieldState.error)}
                                    helperText={fieldState.error ? fieldState.error.message : ""}
                                    disabled={callType === CALLTYPES.Edit}
                                  />
                                </>
                              )}
                            />
                          )}
                        </>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button autoFocus type="submit" className="primary-btn">
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
            <img src={requestSuccess} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Request Sent Successfully
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              User will receive a mail with a request link .
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
        <SuccessPopup
          onClose={() => {
            setShowSuccessPopup(false);
            setOpen(false);
            window.location.reload();
          }}
        />
      )}
    </>
  );
}

export default AddTenantUser;
