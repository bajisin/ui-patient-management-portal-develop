import { Box, Button, Divider, FormControl, Grid, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { CALLTYPES, tenantobj, userDropDowns } from "../../_helpers/constants";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useRef, useState } from "react";
import { createUser, updateUser } from "../../redux/slices/usersSlice";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import GeoLocationSearch from "../admin/tenant/google-location";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TenantLarge from "@assets/images/ls_svg/TenantLarge.png";
import UploadIcon from "@assets/images/ls_svg/uploadIcon.svg";
import dayjs from "dayjs";
import moment from "moment";
import { useDispatch } from "react-redux";

// import { Calendar } from "react-date-range";

// import DateRangePicker from "../../components/formcontrols/date-range-picker";

// import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";

const EditUser = ({ setOpen, open, user, userData, callType }) => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().toDate(),
    endDate: moment().toDate(),
    key: "selection"
  });

  const [startDate, setStartDate] = useState(moment(dateRange?.startDate).format("MM-DD-YYYY"));
  const [endDate, setEndDate] = useState(moment(dateRange.endDate).format("MM-DD-YYYY"));

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
      // streetAddress: "",
      country: "",
      state: "",
      city: "",
      zipCode: "",
      userRole: "",
      associatedTo: {
        roleId: "",
        userId: ""
      }
    }
  });

  useEffect(() => {
    if (callType === CALLTYPES.Edit && user !== "user") {
      setValue("tenantName", userData?.tenantName);
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
      setValue("contractDate", `${userData?.contractStart} - ${userData?.contractEnd}`);

      tenantobj.map((field) => (tenantDetails[field.id] = userData[field.id]));
      fieldObj.map((field) => (tenantDetails[field.id] = userData[field.id]));
      fieldObj.map((field) => (location[field.id] = userData[field.id]));
      setTenantDetails({ ...tenantDetails });
      setLocation({ ...location });
    }
  }, [callType]);

  const initialState = {
    tenantName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    alternatePhoneNumber: "",
    contractStart: startDate,
    contractEnd: endDate,
    joiningDate: moment().format("MM-DD-YYYY"),
    // streetAddress: "",
    zipCode: ""
  };

  const initialUserState = {
    userRole: "",
    associatedTo: "",
    associatedTenant: "",
    clientAdmin: ""
  };

  const dispatch = useDispatch();

  const [tenantDetails, setTenantDetails] = useState(initialState);
  const [dropDownDetails, setDropDownDetails] = useState(initialUserState);
  const [location, setLocation] = useState({ country: "", state: "", city: "", label: "" });
  const [file, setFile] = useState([]);

  let fieldObj =
    user.toLowerCase() !== "tenant"
      ? tenantobj.filter((t) => t.model !== "tenant")
      : tenantobj.slice(4, 12).filter((t) => t.model !== "user");

  fieldObj = user === "super admin" ? fieldObj.filter((field) => field.id !== "joiningDate") : fieldObj;

  const onSubmit = () => {
    if (user === "super admin") {
      const exclude = new Set(["tenantName", "contractStart", "contractEnd", "joiningDate"]);
      const newObj = Object.fromEntries(Object.entries(tenantDetails).filter((e) => !exclude.has(e[0])));
      if (callType === CALLTYPES.Add) {
        dispatch(
          createUser({
            ...newObj,
            streetAddress: location?.label,
            city: location?.city,
            state: location?.state,
            country: location?.country,
            role: user
          })
        );
      } else {
        dispatch(
          updateUser(
            {
              ...newObj,
              streetAddress: location?.label,
              city: location?.city,
              state: location?.state,
              country: location?.country,
              id: userData.id,
              role: user
            },
            userData.id
          )
        );
      }
    } else if (user === "user") {
      const exclude = new Set(["tenantName", "contractStart", "contractEnd"]);
      const newObj = Object.fromEntries(Object.entries(tenantDetails).filter((e) => !exclude.has(e[0])));
      const payload = {
        userRoleId: dropDownDetails.userRole,
        associatedTo: {
          roleId: dropDownDetails.associatedTo,
          userId: dropDownDetails.associatedTenant
        },
        ...newObj,
        streetAddress: location?.label,
        city: location?.city,
        state: location?.state,
        country: location?.country
        // ...location
      };
      dispatch(createUser(payload));
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = (e, field) => {
    if (field === "joiningDate") tenantDetails[field] = moment(e).toDate();
    else tenantDetails[field] = e.target.value;
    setTenantDetails({ ...tenantDetails });
  };

  const handleFileChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleChange = (e, field) => {
    dropDownDetails[field] = e.target.value;
    setDropDownDetails({ ...dropDownDetails });
  };

  // const [isOpenCalender, setIsOpenCalender] = useState(false);

  // const toggleCalendar = () => {
  //   setIsOpenCalender(!isOpenCalender);
  // };

  // const AntSwitch = styled(Switch)(({ theme }) => ({
  //   width: 28,
  //   height: 16,
  //   padding: 0,
  //   display: "flex",
  //   "&:active": {
  //     "& .MuiSwitch-thumb": {
  //       width: 15
  //     },
  //     "& .MuiSwitch-switchBase.Mui-checked": {
  //       transform: "translateX(9px)"
  //     }
  //   },
  //   "& .MuiSwitch-switchBase": {
  //     padding: 2,
  //     "&.Mui-checked": {
  //       transform: "translateX(12px)",
  //       color: "#fff",
  //       "& + .MuiSwitch-track": {
  //         opacity: 1,
  //         backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff"
  //       }
  //     }
  //   },
  //   "& .MuiSwitch-thumb": {
  //     boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
  //     width: 12,
  //     height: 12,
  //     borderRadius: 6,
  //     transition: theme.transitions.create(["width"], {
  //       duration: 200
  //     })
  //   },
  //   "& .MuiSwitch-track": {
  //     borderRadius: 16 / 2,
  //     opacity: 1,
  //     backgroundColor: theme.palette.mode === "dark" ? "rgba(255,255,255,.35)" : "rgba(0,0,0,.25)",
  //     boxSizing: "border-box"
  //   }
  // }));
  return (
    <Dialog aria-labelledby="Add Tenants" open={open} enableResize={true} className="commonModal__wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="commonModal__wrapper--dialog">
          <IconButton aria-label="close" onClick={handleClose} className="modalClose">
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>
          <DialogTitle>Add New {user}</DialogTitle>
          <DialogContent>
            <Box mt={3} className="formcontrol__wrapper">
              {user === "user" && (
                <>
                  <Grid container spacing={2}>
                    {userDropDowns.map((dropDown, i) => (
                      <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
                        <Typography
                          variant="label"
                          component="label"
                          className={`add__label ${dropDown.required && "required"}`}
                        >
                          {dropDown.label}
                        </Typography>
                        <Controller
                          className="w-100"
                          key={dropDown.id}
                          control={control}
                          name={dropDown.id}
                          rules={{
                            required: dropDown.required && "This field is required.",
                            pattern: {
                              value: dropDown.pattern,
                              message: `Invalid ${dropDown.label.toLowerCase()}.`
                            }
                          }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="add__select"
                              // defaultValue={selectedRole}
                              onChange={(e) => {
                                field.onChange(e);
                                handleChange(e, dropDown.id);
                              }}
                              disabled={
                                (dropDownDetails.userRole === 2 || dropDownDetails.associatedTo === 1) &&
                                dropDown.disable
                              }
                              InputProps={{
                                sx: {
                                  height: "38px"
                                }
                              }}
                              errors={Boolean(errors[dropDown.id])}
                              helperText={errors[dropDown.id]?.message}
                            >
                              {dropDown.options(dropDownDetails.userRole)?.map((option, i) => (
                                <MenuItem value={option?.id} key={i}>
                                  {option?.name}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <Divider className="w-100 my-2" />
                </>
              )}
              <Grid container spacing={2}>
                {user === "tenant" && (
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography component="div" variant="div" className="upload__logo">
                      {file.length <= 0 ? (
                        <Box className="upload__logo--content">
                          <input type="file" ref={inputRef} onChange={handleFileChange} style={{ display: "none" }} />
                          <img onClick={handleClick} src={UploadIcon} alt="Upload Logo" />
                          <Typography component="h6" variant="h6">
                            Upload Logo
                          </Typography>
                          <Typography component="p" variant="p">
                            Upload jpg, png format of company logo
                          </Typography>
                        </Box>
                      ) : (
                        <Box className="upload__logo--successful">
                          <img src={TenantLarge} alt="Upload Logo" />
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
                )}
                <Grid item xs={12} sm={12} md={6} lg={8}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography variant="label" component="label" className="add__label required">
                        Tenant Name
                      </Typography>
                      <TextField className="add__input" placeholder="Enter Tenant Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography variant="label" component="label" className="add__label required">
                        Font Family
                      </Typography>
                      <FormControl className="w-100">
                        <Select className="add__select">
                          <MenuItem value="PP Mouri">PP Mouri</MenuItem>
                          <MenuItem value="Arial">Arial</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography variant="label" component="label" className="add__label">
                        Color Theme
                      </Typography>
                      <Stack direction="row" spacing={2} className="theme__wrapper">
                        <Typography
                          variant="span"
                          component="span"
                          className="theme__wrapper--btn theme-one"
                        ></Typography>
                        <Typography
                          variant="span"
                          component="span"
                          className="theme__wrapper--btn theme-two"
                        ></Typography>
                        <Typography
                          variant="span"
                          component="span"
                          className="theme__wrapper--btn theme-three"
                        ></Typography>
                        <Typography
                          variant="span"
                          component="span"
                          className="theme__wrapper--btn theme-four"
                        ></Typography>
                        <Typography variant="span" component="span" className="theme__wrapper--btn add">
                          <AddIcon />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography variant="label" component="label" className="add__label">
                        UI Contrast
                      </Typography>
                      <Stack direction="row" spacing={1} alignItems="center" className="me-3">
                        <Typography>Light</Typography>
                        {/* <AntSwitch defaultChecked inputProps={{ "aria-label": "ant design" }} /> */}
                        <Typography component="label" className="switch" for="checkbox">
                          <input type="checkbox" id="checkbox" />
                          <Typography component="div" className="slider round"></Typography>
                        </Typography>
                        <Typography>Dark</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider className="w-100 mt-3 mb-3" />
              <Typography component="h3" varient="h3">
                SPOC Details
              </Typography>
              <Grid container spacing={2}>
                {user === "tenant" && (
                  <>
                    {tenantobj.slice(0, 4).map((t, i) => (
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
                                value={tenantDetails[t.id]}
                                // InputProps={{
                                //   readOnly: newUser && f?.readOnly
                                // }}
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleOnChange(e, t.id);
                                }}
                                margin="normal"
                                error={Boolean(errors[t.id])}
                                helperText={errors[t.id]?.message}
                              />
                              {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
                            </>
                          )}
                        />
                      </Grid>
                    ))}
                  </>
                )}
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
                              required: t.required && tenantDetails[t.id]?.length < 0 && "This field is required.",
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
                                  value={tenantDetails[t.id]}
                                  // InputProps={{
                                  //   readOnly: newUser && f?.readOnly
                                  // }}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleOnChange(e, t.id);
                                  }}
                                  margin="normal"
                                  error={Boolean(errors[t.id])}
                                  helperText={errors[t.id]?.message}
                                />
                                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
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
                                  value={tenantDetails[t.id]}
                                  // InputProps={{
                                  //   readOnly: newUser && f?.readOnly
                                  // }}
                                  onChange={(e) => {
                                    field.onChange(e);
                                    handleOnChange(e, t.id);
                                  }}
                                  margin="normal"
                                  error={Boolean(errors[t.id])}
                                  helperText={errors[t.id]?.message}
                                />
                                {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
                              </>
                            )}
                          />
                        )}
                      </>
                    ) : t.type === "select" ? (
                      <GeoLocationSearch
                        className="add__select"
                        defaultValue={userData?.city !== "" && userData?.streetAddress}
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
                              {t.model === "tenant" ? (
                                <Grid container spacing={2}>
                                  <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        defaultValue={dayjs("YYYY-MM-DD")}
                                        className="datetimepicker-control"
                                      />
                                    </LocalizationProvider>
                                  </Grid>
                                  <Grid item xs={12} sm={12} md={12} lg={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                      <DatePicker
                                        defaultValue={dayjs("YYYY-MM-DD")}
                                        className="datetimepicker-control"
                                      />
                                    </LocalizationProvider>
                                  </Grid>
                                </Grid>
                              ) : (
                                // <DateRangePicker
                                //   dateRange={dateRange}
                                //   setDateRange={setDateRange}
                                //   startDate={startDate}
                                //   endDate={endDate}
                                //   setStartDate={setStartDate}
                                //   setEndDate={setEndDate}
                                // />
                                t.model === "user" && (
                                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                      defaultValue={dayjs("YYYY-MM-DD")}
                                      className="w-100 datetimepicker-control"
                                    />
                                  </LocalizationProvider>
                                  // <Box position="relative">
                                  //   <TextField
                                  //     {...field}
                                  //     value={moment(tenantDetails.joiningDate).format("MM-DD-YYYY")}
                                  //     className="add__input"
                                  //     onClick={toggleCalendar}
                                  //   />
                                  //   {isOpenCalender && (
                                  //     <React.Fragment>
                                  //       <Calendar
                                  //         className="custome__calendar--wrapper"
                                  //         {...field}
                                  //         date={tenantDetails.joiningDate}
                                  //         onChange={(date) => {
                                  //           field.onChange(date);
                                  //           handleOnChange(date, t.id);
                                  //         }}
                                  //       />
                                  //       <span onClick={toggleCalendar}>&nbsp;</span>
                                  //     </React.Fragment>
                                  //   )}
                                  // </Box>
                                )
                              )}
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
            <Button type="submit" autoFocus className="primary-btn">
              Send Request
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
};

export default EditUser;
