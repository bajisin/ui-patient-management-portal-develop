import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  Divider,
  TextField,
  Typography,
  Button,
  Grid,
  MenuItem,
  Modal,
  FormControlLabel,
  Checkbox
} from "@mui/material";
import GeoLocationSearch from "../admin/tenant/google-location";
import { Controller, useForm } from "react-hook-form";
import { Calendar } from "react-date-range";
import moment from "moment";
import { useDispatch } from "react-redux";
import { CALLTYPES, profiles, tenantobj } from "../../_helpers/constants";
import { createUser } from "../../redux/slices/usersSlice";
import checkmarkSuccess from "../../assets/images/svg/checkmarkSuccess.svg";
import warningDeactivate from "../../assets/images/svg/warningDeactivate.svg";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function AddUser({ open, setOpen, user, callType, userData, title }) {
  const handleClose = () => {
    setOpen(false);
  };
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      emailAddress: "",
      phoneNumber: "",
      alternatePhoneNumber: "",
      joiningDate: moment().format("MM-DD-YYYY"),
      // streetAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: ""
    },
    mode: "onChange"
  });
  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      setValue("firstName", userData?.firstName);
      setValue("middleName", userData?.middleName);
      setValue("lastName", userData?.lastName);
      setValue("emailAddress", userData?.emailAddress);
      setValue("phoneNumber", userData?.phoneNumber);
      setValue("alternatePhoneNumber", userData?.alternatePhoneNumber);
      // setValue("streetAddress", userData?.streetAddress);
      setValue("state", userData?.state);
      setValue("city", userData?.city);
      setValue("country", userData?.country);
      setValue("zipCode", userData?.zipCode);
      setValue("joiningDate", userData?.joining);

      tenantobj.map((field) => (userDetails[field.id] = userData[field.id]));
      fieldObj.map((field) => (userDetails[field.id] = userData[field.id]));
      fieldObj.map((field) => (location[field.id] = userData[field.id]));
      setUserDetails({ ...userDetails });
      setLocation({ ...location });
    }
  }, [callType]);

  const initialState = {
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    joiningDate: moment().format("MM-DD-YYYY"),
    // streetAddress: "",
    zipCode: ""
  };

  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [labId, setLabId] = useState("");
  const [facilityId, setFacilityId] = useState("");
  const [facilityIdErr, setFacilityIdErr] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedRoleErr, setSelectedRoleErr] = useState("");
  const [associatedTo, setAssociatedTo] = useState("");
  const [associatedToErr, setAssociatedToErr] = useState("");
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const handleSuccessOpen = () => setOpenSuccess(true);
  const handleSuccessClose = () => setOpenSuccess(false);
  const [openDeactivate, setOpenDeactivate] = React.useState(false);
  const handleDeactivateOpen = () => setOpenDeactivate(true);
  const handleDeactivateClose = () => setOpenDeactivate(false);

  const toggleCalendar = () => {
    setIsOpenCalender(!isOpenCalender);
  };

  const dispatch = useDispatch();

  const [userDetails, setUserDetails] = useState(initialState);
  const [location, setLocation] = useState({ country: "", state: "", city: "", label: "" });

  const fieldObj = tenantobj.filter((f) => f.id !== "contractDate");

  // const validateForm = () => {
  //   let isValid = true;
  //   console.log(selectedRole);
  //   if (selectedRole === "") {
  //     isValid = false;
  //     setSelectedRoleErr("This field is required");
  //   }
  //   if (facilityId === "") {
  //     isValid = false;
  //     setFacilityIdErr("This field is required");
  //   }
  //   if (associatedTo === "") {
  //     isValid = false;
  //     setAssociatedToErr("This field is required");
  //   }

  //   return isValid;
  // };

  const onSubmit = () => {
    const payload =
      selectedRole.toLowerCase() === profiles.CLIENT_ADMIN
        ? {
            role: selectedRole,
            labId,
            facilityId,
            ...userDetails,
            streetAddress: location?.label,
            city: location?.city,
            state: location?.state,
            country: location?.country
            // ...location
          }
        : selectedRole.toLowerCase() === profiles.PROVIDER && {
            role: selectedRole,
            associatedTo,
            ...userDetails,
            streetAddress: location?.label,
            city: location?.city,
            state: location?.state,
            country: location?.country
            // ...location
          };
    // console.log(validateForm());
    // if (validateForm()) {
    dispatch(createUser(payload));
    setOpen(false);
    // }
  };

  const handleOnChange = (e, field) => {
    if (field === "joiningDate") userDetails[field] = moment(e).format("MM-DD-YYYY");
    else userDetails[field] = e.target.value;
    setUserDetails({ ...userDetails });
  };

  return (
    <Dialog aria-labelledby="Add Tenants" open={open} enableResize={true} className="commonModal__wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="commonModal__wrapper--dialog">
          <DialogTitle>
            {title}
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box mt={3} className="formcontrol__wrapper">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Role
                  </Typography>
                  <Controller
                    className="add_select"
                    name="role"
                    control={control}
                    rules={{
                      required: "This field is required."
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id="role"
                        select
                        fullWidth
                        placeholder="Select Role"
                        variant="outlined"
                        disableCloseOnSelect
                        value={selectedRole}
                        error={Boolean(errors.role)}
                        helperText={errors.role?.message}
                        onChange={(e) => {
                          field.onChange(e);
                          setSelectedRole(e.target.value);
                        }}
                      >
                        <MenuItem value="Provider">Provider</MenuItem>
                        <MenuItem value="Client Admin">Client Admin</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
                {selectedRole.toLowerCase() === profiles.CLIENT_ADMIN ? (
                  <>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Facility
                      </Typography>
                      <Controller
                        className="add_select"
                        name="facilityId"
                        control={control}
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="facilityId"
                            select
                            fullWidth
                            placeholder="Select FacilityId"
                            variant="outlined"
                            value={facilityId}
                            error={Boolean(errors.facilityId)}
                            helperText={errors.facilityId?.message}
                            onChange={(e) => {
                              field.onChange(e);
                              setFacilityId(e.target.value);
                            }}
                          >
                            <MenuItem value="Facility 1">Facility 1</MenuItem>
                            <MenuItem value="Facility 2">Facility 2</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Lab ID
                      </Typography>
                      <Controller
                        className="add_select"
                        name="labId"
                        control={control}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="labId"
                            select
                            fullWidth
                            placeholder="Select LabId"
                            variant="outlined"
                            value={labId}
                            onChange={(e) => {
                              field.onChange(e);
                              setLabId(e.target.value);
                            }}
                          >
                            <MenuItem value="Lab 1">Lab 1</MenuItem>
                            <MenuItem value="Lab 2">Lab 2</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                  </>
                ) : (
                  selectedRole.toLowerCase() === profiles.PROVIDER && (
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        AssociatedTo
                      </Typography>
                      <Controller
                        className="add_select"
                        name="associatedTo"
                        control={control}
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            id="associatedTo"
                            select
                            fullWidth
                            placeholder="Select AssociatedTo"
                            variant="outlined"
                            value={associatedTo}
                            error={Boolean(errors.associatedTo)}
                            helperText={errors.associatedTo?.message}
                            onChange={(e) => {
                              field.onChange(e);
                              setAssociatedTo(e.target.value);
                            }}
                          >
                            <MenuItem value="Client Admin 1">Client Admin 1</MenuItem>
                            <MenuItem value="Client Admin 2">Client Admin 2</MenuItem>
                          </TextField>
                        )}
                      />
                    </Grid>
                  )
                )}
              </Grid>
              <Divider className="w-100 my-2" />
              <Grid container spacing={2}>
                {fieldObj.map((t, i) => (
                  <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                    <Typography variant="label" component="label" className={`add__label ${t.required && "required"}`}>
                      {t.label}
                    </Typography>
                    {t.type === "text" ? (
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
                              }
                            }}
                            render={({ field }) => (
                              <>
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
                              </>
                            )}
                          />
                        )}
                      </>
                    ) : t.type === "select" ? (
                      <GeoLocationSearch
                        className="add__select"
                        defaultValue={userData?.city !== undefined ? `${userData?.streetAddress}` : ""}
                        setLocation={setLocation}
                        location={location}
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
                                <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="datetimepicker-control" />
                              </LocalizationProvider>
                              {/* <Box position="relative">
                                <TextField
                                  {...field}
                                  value={moment(userDetails.joiningDate).format("MM-DD-YYYY")}
                                  className="add__input"
                                  onClick={toggleCalendar}
                                />
                                {isOpenCalender && (
                                  <React.Fragment>
                                    <Calendar
                                      className="custome__calendar--wrapper"
                                      {...field}
                                      minDate={moment().toDate()}
                                      date={moment(userDetails.joiningDate).toDate()}
                                      onChange={(date) => {
                                        field.onChange(date);
                                        handleOnChange(date, t.id);
                                      }}
                                    />
                                    <span onClick={toggleCalendar}>&nbsp;</span>
                                  </React.Fragment>
                                )}
                              </Box> */}
                            </>
                          )}
                        />
                      )
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit" className="primary-btn">
              Send Request
            </Button>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleSuccessOpen}>
              Success
            </Button>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleDeactivateOpen}>
              Deactivate
            </Button>
            {/* Success Modal code */}
            <Modal
              open={openSuccess}
              onClose={handleSuccessClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="success_modal">
                <img src={checkmarkSuccess} className="successImg modal-success-icon" />
                <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
                  Successfully Deleted
                </Typography>
                <Typography id="modal-modal-description" className="modal-modal-description" variant="p" component="p">
                  Test has been successfully deleted
                </Typography>
                <Button autoFocus type="submit" className="primary-btn float-right mt-3">
                  Okay
                </Button>
              </Box>
            </Modal>

            {/* Deactivate Modal code */}

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
            </Modal>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
}

export default AddUser;
