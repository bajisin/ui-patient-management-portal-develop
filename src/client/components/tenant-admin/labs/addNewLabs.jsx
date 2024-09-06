import { Autocomplete, Box, Button, Checkbox, Divider, Grid, TextField, Typography } from "@mui/material";
import { CALLTYPES, roleIds } from "../../../_helpers/constants";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createLab, updateLab } from "../../../redux/slices/labs-slice";
import { useDispatch, useSelector } from "react-redux";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FailPopup from "../../master-data/failpopup";
import GeoLocationSearch from "../../tenant/google-location";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import { getTenantUsers } from "../../../redux/slices/tenantsSlice";
import { getTestCompendiumsList } from "../../../redux/slices/compendiumSlice";

const AddNewLabs = ({ setOpen, open, callType, title }) => {
  const [labName, setlabName] = useState("");
  const [address, setaddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState({ city: "", state: "", country: "", label: "" });
  const [clientadmin, setclientadmin] = useState([]);
  const [testsValue, setTestsValue] = useState([]);
  const [zipCode, setZipCode] = useState();
  const [labtitle, setLabTitle] = useState("");
  const [openpopup, setOpenpopup] = React.useState(false);
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const tenant = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  const emailPattern = /^[-a-zA-Z0-9_.*$]{2,64}[@]{1}[a-zA-Z0-9]{2,20}[.]{1}[a-zA-Z.]{2,240}$/;
  const { compendiumList } = useSelector((state) => state.compendium);
  const { tenantUsers } = useSelector((state) => state.tenants);
  const {
    control,
    formState: { errors },
    clearErrors,
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      labName: "",
      email: "",
      phoneNumber: "",
      altPhoneNumber: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zipCode: ""
    },
    mode: "onChange"
  });
  useEffect(() => {
    dispatch(
      getTestCompendiumsList({
        pagination: {
          pageNo: 0,
          pageSize: 99999
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        searchValue: "",
        workGroupId: [],
        specimenTypeId: [],
        departmentId: [],
        orderTypeId: []
      })
    );
    dispatch(
      getTenantUsers({
        pagination: {
          pageNo: 0,
          pageSize: 99999
        },
        sortKey: "lastModifiedDate",
        sortOrder: "DESC",
        searchValue: "",
        tenantId: tenant?.tenantId,
        roleId: [roleIds?.CLIENT_ADMIN],
        role: loggedInUser.roleMasterDTO?.roleId
      })
    );
  }, []);
  const dispatch = useDispatch();
  const { labById } = useSelector((state) => state.labs);

  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      setLabTitle("Edit");
      setValue("labName", labById?.labName);
      // setValue("address", location?.label);
      setValue("email", labById?.emailAddress);
      setValue("zipCode", labById?.zipcode);
      setValue("phoneNumber", labById.phoneNumber);
      setValue("altPhoneNumber", labById?.altPhoneNumber);
      setlabName(labById?.labName);
      // setaddress(labById?.address);
      setEmail(labById?.emailAddress);
      setZipCode(labById?.zipcode);
      setphoneNumber(labById?.phoneNumber);
      setAltPhoneNumber(labById?.altPhoneNumber);
      setTestsValue(labById?.tests);
      const uniqueClientAdmins = labById?.clientAdmins?.reduce((acc, curr) => {
        if (!acc.some((admin) => admin.userId === curr.userId)) {
          acc.push(curr);
        }
        return acc;
      }, []);

      setclientadmin(uniqueClientAdmins);
    } else {
      setLabTitle("Add");
    }
  }, [labById]);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const onSubmit = () => {
    const tests = testsValue?.map((test) => test?.testCompendiumId);
    const clientAdmins = clientadmin?.map((ca) => ({
      id: ca?.userId,
      name: ca?.userEmail
    }));
    const data = {
      labName,
      tests,
      emailAddress: email,
      phoneNumber,
      altPhoneNumber,
      address: location?.label,
      city: location?.city,
      state: location?.state,
      country: location?.country,
      // ...location,
      zipcode: zipCode,
      role: loggedInUser.roleMasterDTO?.roleId,
      onRole: roleIds.CLIENT_ADMIN,
      clientAdmins
    };
    if (callType === CALLTYPES.Add) {
      dispatch(createLab({ ...data, createdBy: loggedInUser?.id }))
        .then((response) => {
          setOpenpopup(true);
        })
        .catch((error) => {
          setShowFailPopup(true);
          console.error("Error:", error);
        });
    } else if (callType === CALLTYPES.Edit) {
      dispatch(updateLab({ labId: labById.labId, ...data, updatedBy: loggedInUser?.id }))
        .then((res) => {
          setOpenpopup(true);
        })
        .catch(() => {
          setShowFailPopup(true);
        });
    }
  };
  const handleClose = () => {
    setOpen(false);
    setOpenpopup(false);
    window.location.reload();
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <>
      <Dialog
        aria-labelledby="Add Tenants"
        open={open}
        enableResize={true}
        className="commonModal__wrapper commonModal__wrapper--md addNew__facility"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="commonModal__wrapper--dialog">
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
            <DialogTitle>{title}</DialogTitle>

            <DialogContent>
              <Box className="formcontrol__wrapper">
                <Typography component="h6" variant="h6" className="w-100">
                  General Information
                </Typography>
                <Grid container spacing={2}>
                  {/* Facilities Inputs */}
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Lab Name
                    </Typography>
                    <Controller
                      control={control}
                      name="labName"
                      rules={{
                        required: "This field is required.",
                        pattern: {
                          value: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
                          message: "Invalid input format."
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="labName"
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter Lab Name`}
                          value={labName}
                          onChange={(e) => {
                            field.onChange(e);
                            setlabName(e.target.value);
                          }}
                          margin="normal"
                          error={Boolean(errors.labName)}
                          helperText={errors.labName?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} className="multiSelect_control">
                    <Typography variant="label" component="label" className="add__label required">
                      Tests
                    </Typography>
                    <Controller
                      key={"tests"}
                      control={control}
                      name={"tests"}
                      rules={{
                        required: testsValue?.length === 0 ? "This field is required." : ""
                      }}
                      render={({ field }) => (
                        <Autocomplete
                          className="permissions--tag "
                          multiple
                          limitTags={5}
                          id=""
                          options={compendiumList}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.testName || option.testMasterDTO.testDescription}
                          value={testsValue}
                          onChange={(e, newVal) => {
                            // eslint-disable-next-line no-unused-expressions
                            setTestsValue(newVal);
                            clearErrors("tests");
                          }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ padding: 1, marginRight: 8 }}
                                checked={selected}
                              />
                              {option.testName}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              // value={selectedFacilities}
                              error={Boolean(errors?.tests)}
                              helperText={errors?.tests?.message}
                            />
                          )}
                        />
                      )}
                    />
                    {/* <Autocomplete
                      className="customAutocomplete__input customized--chips permissions--tag "
                      multiple
                      limitTags={1}
                      id="permission-tags"
                      options={compendiumList}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.testName || option.testDescription}
                      value={testsValue}
                      onChange={(e, newVal) => setTestsValue(newVal)}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ padding: 1, marginRight: 8 }}
                            checked={selected}
                          />
                          {option.testName}
                        </li>
                      )}
                      renderInput={(params) => <TextField {...params} label="" placeholder="" />}
                    /> */}
                  </Grid>
                </Grid>
                {/* Lab Inputs */}

                <Divider className="w-100 mt-4" />
                <Typography component="h6" variant="h6" className="w-100 my-2">
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Email Address
                    </Typography>
                    <Controller
                      control={control}
                      name="email"
                      rules={{
                        required: "This field is required.",
                        pattern: {
                          value: emailPattern,
                          message: "Invalid input format."
                        }
                      }}
                      render={({ field }) => (
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
                          }}
                          margin="normal"
                          error={Boolean(errors.email)}
                          helperText={errors.email?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Phone Number
                    </Typography>
                    <Controller
                      control={control}
                      name="phoneNumber"
                      rules={{
                        required: "This field is required.",
                        pattern: {
                          value: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
                          message: "Invalid input format."
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="phone"
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter Phone Number`}
                          value={phoneNumber}
                          onChange={(e) => {
                            field.onChange(e);
                            setphoneNumber(e.target.value);
                          }}
                          margin="normal"
                          error={Boolean(errors.phoneNumber)}
                          helperText={errors.phoneNumber?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label ">
                      Home Phone Number
                    </Typography>
                    <Controller
                      control={control}
                      name="altPhoneNumber"
                      // rules={{
                      //   required: "This field is required.",
                      //   pattern: {
                      //     value: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
                      //     message: "Invalid input format."
                      //   }
                      // }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="altPhoneNumber"
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter Phone Number`}
                          value={altPhoneNumber}
                          onChange={(e) => {
                            field.onChange(e);
                            setAltPhoneNumber(e.target.value);
                          }}
                          margin="normal"
                          error={Boolean(errors.altPhoneNumber)}
                          helperText={errors.altPhoneNumber?.message}
                        />
                      )}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Address
                    </Typography>
                    <Controller
                      control={control}
                      name="address"
                      rules={{
                        required: "This field is required."
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="address"
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter Address`}
                          value={address}
                          onChange={(e) => {
                            field.onChange(e);
                            setaddress(e.target.value);
                          }}
                          margin="normal"
                          error={Boolean(errors.address)}
                          helperText={errors.address?.message}
                        />
                      )}
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      City/State/Country
                    </Typography>
                    <Controller
                      key={"location"}
                      control={control}
                      name={"location"}
                      rules={{
                        required: location?.city === "" && "This field is required."
                      }}
                      render={({ field }) => (
                        <div>
                          {labById?.city !== null && (
                            <GeoLocationSearch
                              className="add__select"
                              {...field}
                              defaultValue={
                                labById?.city !== null && callType === CALLTYPES.Edit ? `${labById?.address}` : ""
                              }
                              setLocation={setLocation}
                              location={location}
                              error={Boolean(errors?.location)}
                              helperText={errors?.location?.message}
                            />
                          )}
                          {location.city === "" && (
                            <Typography className="errorInfo">{errors.location?.message}</Typography>
                          )}
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Zip Code
                    </Typography>
                    <Controller
                      control={control}
                      name="zipCode"
                      rules={{
                        required: "This field is required.",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Invalid input format."
                        },
                        maxLength: {
                          value: 5,
                          message: "Zip code cannot be more than 5"
                        },
                        minLength: {
                          value: 5,
                          message: "Zip code cannot be less than 5"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id="zipCode"
                          variant="outlined"
                          className="add__input"
                          placeholder={`Enter ZipCode`}
                          value={zipCode}
                          onChange={(e) => {
                            field.onChange(e);
                            setZipCode(e.target.value);
                          }}
                          margin="normal"
                          error={Boolean(errors.zipCode)}
                          helperText={errors.zipCode?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Divider className="w-100 mt-2" />
                <Typography component="h6" variant="h6" className="w-100 my-2">
                  Client Associated
                </Typography>
                <Grid mt={2} mb={2} container spacing={2} className="mt-0">
                  <Grid item xs={12} sm={12} md={6} lg={6} className="pt-0 multiSelect_control">
                    <Typography variant="label" component="label" className="add__label required">
                      Client Admin
                    </Typography>
                    <Controller
                      key={"clientAdmin"}
                      control={control}
                      name={"clientAdmin"}
                      rules={{
                        required: clientadmin?.length === 0 ? "This field is required." : ""
                      }}
                      render={({ field }) => (
                        <Autocomplete
                          className="permissions--tag"
                          multiple
                          limitTags={5}
                          id="permission-tags"
                          options={tenantUsers}
                          disableCloseOnSelect
                          getOptionLabel={(option) => `${option.userEmail} `}
                          value={clientadmin}
                          onChange={(e, newValue) => {
                            setclientadmin(newValue);
                            clearErrors("clientAdmin");
                          }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ padding: 1, marginRight: 8 }}
                                checked={selected}
                              />
                              {`${option.userEmail} `}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              error={Boolean(errors?.clientAdmin)}
                              helperText={errors?.clientAdmin?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button component="button" variant="contained" className="primary-btn" type="submit">
                {callType === CALLTYPES.Add ? CALLTYPES.Save : CALLTYPES.Update}
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}

      {openpopup && (
        <Modal
          open={openpopup}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Successfully {callType === CALLTYPES.Add ? CALLTYPES.Created : CALLTYPES.Updated}
            </Typography>
            <Typography id="modal-modal-description" className="modal-modal-description" variant="p" component="p">
              {/* {labtitle} Lab has been successfully {callType === "add" ? "created" : "updated"} */}
              {callType === CALLTYPES.Add
                ? "New Lab has been successfully created"
                : "Lab details has been updated successfully"}
            </Typography>
            <Button
              variant="contained"
              onClick={handleClose}
              component="Button"
              className="primary-btn float-right mt-3"
            >
              okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default AddNewLabs;
