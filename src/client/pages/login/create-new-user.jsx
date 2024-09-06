import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../utils/useDebounce";
import { fetchUserDetails, getUsersByEmail } from "../../redux/slices/usersSlice";
import { getEthinicList, getGenderList, getRaceList } from "../../redux/slices/order-slice";
import { getLoggedInUserRoleId } from "../../utils/common";
import { createUser } from "../../redux/slices/user";
/**
 * @author
 * @function CreateNewPatient
 **/
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const CreateNewPatient = ({ open, setOpen }) => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  // const [firstName, setFirstName] = useState("");
  // const [middleName, setMiddleName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [race, setRace] = useState(null);
  const [gender, setGender] = useState(null);
  const [ethnic, setEthnic] = useState(null);
  // const [dateOfBirth, setDateOfBirth] = useState(dayjs());
  // const [perAdd, setPerAdd] = useState("");
  // const [commAdd, setCommAdd] = useState("");
  // const [loginIndicator, setLoginIndicator] = useState(false);
  const [email, setEmail] = useState("");
  const { raceList, genderList, ethinicList } = useSelector((state) => state.createOrder);
  const debounceEmailVal = useDebounce(email, 1000);
  const dispatch = useDispatch();
  const emailPattern = /^[-a-zA-Z0-9_.*$]{2,64}[@]{1}[a-zA-Z0-9]{2,20}[.]{1}[a-zA-Z.]{2,240}$/;

  useEffect(() => {
    dispatch(getRaceList());
    dispatch(getGenderList());
    dispatch(getEthinicList());
  }, []);

  useEffect(() => {
    if (debounceEmailVal !== "") dispatch(getUsersByEmail(debounceEmailVal));
  }, [debounceEmailVal]);

  const onSubmit = (data) => {
    const payload = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      race: {
        id: race?.id
      },
      gender: {
        id: gender?.id,
        description: gender?.description
      },
      ethenicGroup: {
        id: ethnic?.id
      },
      birthDate: data?.birthDate,
      roleId: getLoggedInUserRoleId(),
      permanentAdress: data?.permanentAddr,
      secondaryAddrs: data?.communicationAddr,
      loginIndicator: true,
      email: loggedInUser?.email
    };

    const action = dispatch(createUser(payload));
    if (createUser.fulfilled) {
      dispatch(fetchUserDetails());
      setOpen(false);
      // verifyIsUserRegistered();
    }
  };

  const { usersByEmail } = useSelector((state) => state.userDetails);
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      birthDate: dayjs().format("YYYY-MM-DD").trim(),
      permanentAddr: "",
      communicationAddr: ""
    }
  });
  return (
    <Dialog
      aria-labelledby="Terms Conditions"
      open={open}
      enableResize={true}
      className="commonModal__wrapper terms-conditions-dailog"
    >
      <Box className="commonModal__wrapper--dialog terms-conditions-dailog-box">
        <DialogTitle>
          <p>Please fill your details to Login</p>
        </DialogTitle>

        <DialogContent>
          <Typography variant="div" component="div" className="createOrder__wrapper--content">
            {/* <Box className="w-100 dflex align-items-start">
              <Typography component="label" variant="label" className="checked--label">
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 4 }}
                  checked={loginIndicator}
                  onChange={(e) => setLoginIndicator(e.target.checked)}
                />
                Patient would like to Login
              </Typography>
            </Box> */}
            <Grid container spacing={2} className="mt-0">
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  First Name
                </Typography>
                <Controller
                  control={control}
                  name="firstName"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <div className="w-100">
                      <TextField
                        {...field}
                        id="firstName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter First Name`}
                        onChange={(e) => {
                          field.onChange(e);
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
                  render={({ field }) => (
                    <div className="w-100">
                      <TextField
                        {...field}
                        id="middleName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter Middle Name`}
                        onChange={(e) => {
                          field.onChange(e);
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
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <div className="w-100">
                      <TextField
                        {...field}
                        id="lastName"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter Last Name`}
                        onChange={(e) => {
                          field.onChange(e);
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
                <Typography variant="label" component="label" className="add__label required">
                  Race
                </Typography>
                <Controller
                  key={"race"}
                  control={control}
                  name={"race"}
                  rules={{
                    required: (race === null || race?.length <= 0) && "This field is required."
                  }}
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

                          clearErrors("race");
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Biological Gender
                </Typography>
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

                          clearErrors("gender");
                        }
                      }}
                    />
                  )}
                />
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
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          {...field}
                          className="w-100 datetimepicker-control"
                          onChange={(newValue) => {
                            if (newValue) {
                              field.onChange(dayjs(newValue).format("YYYY/MM/DD").trim());
                            }
                          }}
                          maxDate={dayjs()}
                        />
                      </LocalizationProvider>
                    </>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Ethnic Group
                </Typography>
                <Controller
                  key={"ethnic"}
                  control={control}
                  name={"ethnic"}
                  rules={{
                    required: (ethnic === null || ethnic?.length < 0) && "This field is required."
                  }}
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
                          clearErrors("ethnic");
                        }
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Typography variant="label" component="label" className="add__label">
                  Permanent Address
                </Typography>
                <Controller
                  control={control}
                  name="permanentAddr"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <div className="w-100">
                      <TextField
                        {...field}
                        id="permanentAddr"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter Permanent Address`}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        margin="normal"
                        error={Boolean(errors.permanentAddr)}
                        helperText={errors.permanentAddr?.message}
                      />
                      {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Communication Address
                </Typography>
                <Controller
                  control={control}
                  name="communicationAddr"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <div className="w-100">
                      <TextField
                        {...field}
                        id="communicationAddr"
                        variant="outlined"
                        className="add__input"
                        placeholder={`Enter Communication Address  `}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                        margin="normal"
                        error={Boolean(errors.communicationAddr)}
                        helperText={errors.communicationAddr?.message}
                      />
                      {/* <p style={{ color: "red", fontSize: 8 }}>{t.id === "phone" && phoneErrMes}</p> */}
                    </div>
                  )}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={4} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Email Address
                </Typography>

                <Controller
                  control={control}
                  name="email"
                  rules={{
                    required: "This field is required.",
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
                        placeholder={`Enter First Name`}
                        value={email}
                        onChange={(e) => {
                          field.onChange(e);
                          setEmail(e.target.value);
                        }}
                        margin="normal"
                        error={Boolean(errors?.email)}
                        helperText={errors.email?.message}
                      />
                    </div>
                  )}
                />
              </Grid> */}
            </Grid>
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button autoFocus type="submit" className="primary-btn" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
