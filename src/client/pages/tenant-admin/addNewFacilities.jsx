import { Autocomplete, Box, Button, Checkbox, Divider, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { CALLTYPES, roleIds } from "../../_helpers/constants";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FailPopup from "../../components/master-data/failpopup";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import { createFacility } from "@redux/slices/facilitiesSlice";
import infoIcon from "@assets/images/ls_svg/info-purple-sign.svg";
import { setShowFailPopup } from "../../redux/slices/facilitiesSlice";

const AddNewFacilities = ({ setOpen, open, updateFormValue, callType, isEditing, facilitiesById }) => {
  const [facilityName, setFacilityName] = useState("");
  const [services, setServices] = useState([]);
  const [clientInfo, setClientInfo] = useState([]);
  const [clientInfoFlag, setClientInfoFlag] = useState([]);
  const [title, setTitle] = useState("");
  const [labDays, setLabDays] = useState([]);
  const [managementGroup, setManagementGroup] = useState();
  const [facilityType, setFacilityType] = useState();
  const [address, setaddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [openpopup, setOpenpopup] = React.useState(false);
  const { labsData, managementGrpData, serviceList, facilityList } = useSelector((state) => state.commonAdmin);
  const { tenantUsers } = useSelector((state) => state.tenants);
  const { facilitiesOverviewOrder, showFailPopup } = useSelector((state) => state.facilities);
  const dispatch = useDispatch();

  const {
    control,
    formState: { errors },
    setValue,
    clearErrors,
    handleSubmit
  } = useForm({
    defaultValues: {
      labName: "",
      email: "",
      phoneNumber: "",
      address: "",
      country: "",
      state: "",
      city: "",
      zipCode: ""
    },
    mode: "onChange"
  });
  useEffect(() => {
    if (updateFormValue && managementGrpData.length > 0) {
      const mgnmtdata = managementGrpData.find((m) => m.id === updateFormValue?.managementGroupId);
      setManagementGroup(mgnmtdata);
    }
    if (updateFormValue && serviceList.length > 0) {
      const facilityService = facilitiesById?.services;
      const servicedata = serviceList.filter((s) => facilityService?.find((k) => k?.serviceId === s.id));
      setServices(servicedata);
    }
    if (updateFormValue && facilityList.length > 0) {
      const facilityTypedata = facilityList.find((m) => m.id === updateFormValue?.facilityTypeId);
      setFacilityType(facilityTypedata);
    }
    if (updateFormValue && labsData.length > 0) {
      const labdata = labsData.filter((day) =>
        facilitiesById?.labDays?.find((labDay) => labDay?.labDayId === day?.dayId)
      );
      setLabDays(labdata);
    }
    if (updateFormValue && tenantUsers.length > 0) {
      const clientdata = tenantUsers?.filter((d) =>
        facilitiesById?.clientAdmins?.find((s) => s?.users?.id === d?.userId)
      );
    }

    // if (facilitiesById && tenantUsers.length > 0) {
    //   const data = tenantUsers.filter((d) =>
    //     facilitiesById.clientAdmins.find((s) => s.viewOrdersFlag === d.viewOrdersFlag)
    //   );
    //   setClientInfoFlag(data);

    // }
  }, [updateFormValue, managementGrpData, serviceList, facilityList, labsData, facilitiesById, tenantUsers]);
  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      setTitle("Edit");
    } else {
      setTitle("Add New");
    }
    if (isEditing) {
      setTitle("Edit");
      setFacilityName(updateFormValue?.facilityName);
      setaddress(updateFormValue?.address);
      setphoneNumber(updateFormValue?.phoneNumber);
      setEmailAddress(updateFormValue?.emailAddress);
      setServices(serviceList.filter((item) => updateFormValue?.services?.some((i) => i?.serviceId === item.id)));

      setLabDays(labsData.filter((item) => updateFormValue?.labDays?.some((i) => i?.labDayId === item.dayId)));
      const clientdata = tenantUsers?.filter((d) =>
        d?.userFacilities?.find((s) => s?.facilityId === updateFormValue?.facilityId)
      );
      setClientInfo(
        clientdata.map((d) => {
          const tenantUserObj = { ...d };
          tenantUserObj.viewOrdersFlag = true;
          return tenantUserObj;
        })
      );
    } else if (callType === CALLTYPES.Add) {
      setManagementGroup();
      // setFacilityType();
    } else setTitle("Add New");
  }, [isEditing, managementGrpData, tenantUsers]);
  const onSubmit = async () => {
    const data = {
      facilityName,

      services,

      labDays: labDays.map((s) => {
        return {
          name: s?.dayCode,
          id: s?.dayId
        };
      }),

      managementGroupId: managementGroup?.id,

      address,
      roleId: getLoggedInUserRoleId(),
      userId: getLoggedInUserId(),
      phoneNumber,
      facilityTypeId: facilityType?.id,
      clientAdmins: clientInfo.map((s) => {
        return {
          id: s.userId,
          viewOrdersFlag: s?.viewOrdersFlag,
          roleId: roleIds.CLIENT_ADMIN
        };
      }),
      emailAddress
    };
    if (callType === CALLTYPES.Edit) {
      data.facilityId = updateFormValue?.facilityId;
    }
    try {
      const rs = await dispatch(createFacility(data));

      if (rs.type.includes("fulfilled")) {
        setOpenpopup(true);
      } else {
        setShowFailPopup(true);
      }
    } catch (error) {
      setShowFailPopup(true);
      console.error("An error occurred:", error);
      // Handle error here, if needed
    }

    // dispatch(createFacility(data)).then((res) => {
    //   const response = res.type.split("/");
    //   console.log(response, "res");
    //   if (response.includes("fulfilled")) {
    //     alert(openpopup);
    //     setOpenpopup(true);
    //   } else {
    //     setShowFailPopup(true);
    //   }
    // });

    // dispatch(setShowFailPopup(true));
    // setOpenpopup(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenpopup(false);
    window.location.reload();
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const updateProvideData = (userId) => {
    const updatedClientState = clientInfo.map((info) => {
      if (info.userId === userId) {
        if (info.viewOrdersFlag === undefined) {
          return { ...info, viewOrdersFlag: true };
        } else {
          return { ...info, viewOrdersFlag: !info.viewOrdersFlag };
        }
      }
      return info;
    });
    setClientInfo(updatedClientState);
  };
  // const [title, setTitle] = useState("");
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
            <DialogTitle> {title} Facility</DialogTitle>
            <DialogContent>
              <Box className="formcontrol__wrapper">
                <Typography component="h6" variant="h6" className="w-100">
                  General Information
                </Typography>
                <Grid container spacing={2}>
                  {/* Facilities Inputs */}
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Facility Name
                    </Typography>
                    {/* <TextField
                      className="add__input"
                      placeholder="Facility Name"
                      variant="outlined"
                      value={facilityName}
                      error={Boolean(errors.facilityName)}
                      helperText={errors.facilityName?.message}
                      onChange={(e) => setFacilityName(e.target.value)}
                      // onChange={(e) => handleInputChange("facilityName", e.target.value)}
                    /> */}
                    <Controller
                      key={"facilityName"}
                      control={control}
                      name={"facilityName"}
                      rules={{
                        required: facilityName?.length === 0 ? "Facility Name is required." : "",
                        pattern: {
                          value: /^[A-Za-z ]+$/,
                          message: `Invalid facility name`
                        },
                        maxLength: {
                          value: 30,
                          message: "Length cannot be more than 30"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          id={"facilityName"}
                          variant="outlined"
                          className="add__input"
                          placeholder={`Facility Name`}
                          value={facilityName}
                          onChange={(e) => {
                            setFacilityName(e.target.value);
                            field.onChange(e);
                          }}
                          margin="normal"
                          error={Boolean(errors?.facilityName)}
                          helperText={errors?.facilityName?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Management Group
                    </Typography>

                    <Controller
                      name="managementGroup"
                      control={control}
                      rules={{
                        required:
                          managementGroup?.length === 0 ||
                          (managementGroup === undefined && "Management Group is required.")
                      }}
                      render={({ field }) => (
                        <Autocomplete
                          className="customAutocomplete__input"
                          id="management-group"
                          options={managementGrpData}
                          getOptionLabel={(option) => option.description}
                          value={managementGroup || null}
                          onChange={(event, newValue) => {
                            // return
                            setManagementGroup(newValue);
                            clearErrors("managementGroup");
                          }} // Update selectedPermissions
                          renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // label="Management Group"
                              placeholder="Management Group"
                              error={Boolean(errors.managementGroup)}
                              helperText={errors.managementGroup?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} className="common_checkbox_selection">
                    <Typography variant="label" component="label" className="add__label required">
                      Services
                    </Typography>

                    <Controller
                      className="w-100"
                      name="services"
                      control={control}
                      rules={{
                        required:
                          (services?.length === 0 || services === undefined) && "Please select at least one service"
                      }}
                      // rules={{
                      //   validate: (value) => value?.length === 0 || "Please select at least one service" // Custom validation rule
                      // }}
                      render={({ field }) => (
                        <Autocomplete
                          className="permissions--tag"
                          multiple
                          limitTags={5}
                          id=""
                          options={serviceList}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.description || option.id}
                          value={services || []} // Set the selected options
                          onChange={(_, newValue) => {
                            field.onChange(newValue);
                            setServices(newValue);
                            clearErrors("services");
                          }} // Update selectedPermissions
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ padding: 1, marginRight: 8 }}
                                checked={selected}
                              />
                              {option.description}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder={services?.length > 0 ? "" : "Services"} // Conditional placeholder
                              // value={selectedFacilities}
                              error={Boolean(errors?.services)}
                              helperText={errors?.services?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} className="common_checkbox_selection">
                    <Typography variant="label" component="label" className="add__label required">
                      Facility Type
                    </Typography>

                    <Controller
                      className="w-100"
                      name="facilitytype"
                      control={control}
                      rules={{
                        required:
                          facilityType?.length === 0 || (facilityType === undefined && "facilitytype is required")
                      }}
                      // rules={{ required: "facilitytype is required" }}
                      render={({ field }) => (
                        <Autocomplete
                          className="permissions--tag"
                          id="permission-tags"
                          options={facilityList}
                          getOptionLabel={(option) => option.description}
                          value={facilityType || null}
                          onChange={(event, newValue) => {
                            setFacilityType(newValue);
                            clearErrors("facilitytype");
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              // label="Management Group"
                              placeholder="Facility type"
                              error={Boolean(errors.facilitytype)}
                              helperText={errors.facilitytype?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} className="common_checkbox_selection">
                    <Typography variant="label" component="label" className="add__label required">
                      Lab Days
                    </Typography>
                    {/* <Autocomplete
                      className="permissions--tag"
                      multiple
                      limitTags={3}
                      id="permission-tags"
                      options={labsData}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.dayCode}
                      value={labDays || []}
                      onChange={(event, newValue) => setLabDays(newValue)} // Update selectedPermissions
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ padding: 1, marginRight: 8 }}
                            checked={selected}
                          />
                          {option.dayCode}
                        </li>
                      )}
                      renderInput={(params) => <TextField {...params} label="" placeholder="Lab Days" />}
                    /> */}
                    <Controller
                      className="w-100"
                      name="labDays" // Name of the field
                      control={control}
                      rules={{
                        required: (labDays?.length === 0 || labDays == undefined) && "Lab Days is required"

                        // validate: (value) => value?.length > 0 || "Please select at least one lab day" // Custom validation rule
                      }}
                      render={({ field }) => (
                        <Autocomplete
                          className="permissions--tag"
                          multiple
                          limitTags={5}
                          id="lab-days-tags"
                          options={labsData}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.dayCode}
                          value={labDays || []} // Set the selected options
                          onChange={(_, newValue) => {
                            field.onChange(newValue);
                            setLabDays(newValue);
                            clearErrors("labDays");
                          }} // Update selectedPermissions
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ padding: 1, marginRight: 8 }}
                                checked={selected}
                              />
                              {option.dayCode}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder={labDays.length > 0 ? "" : "Lab Days"} // Conditional placeholder
                              // value={selectedFacilities}
                              error={Boolean(errors?.labDays)}
                              helperText={errors?.labDays?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

                <Divider className="w-100 mt-4" />
                <Typography component="h6" variant="h6" className="w-100 my-2">
                  Contact Information
                </Typography>
                <Grid container spacing={2}>
                  {/* Show Email only for lab */}

                  <Grid item xs={12} sm={12} md={6} lg={6} className="">
                    <Typography variant="label" component="label" className="add__label required">
                      Address
                    </Typography>
                    {/* <TextField
                      className="add__input"
                      placeholder="Address"
                      variant="outlined"
                      value={address}
                      monChange={(e) => setaddress(e.target.value)}
                    /> */}
                    <Controller
                      name="Address"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: address?.length === 0 ? "Address is required" : "",
                        // required: "Address is required",
                        pattern: {
                          value: /^[A-Za-z0-9@#,\-/ ]+$/,
                          message: "Invalid characters in address"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="add__input"
                          placeholder="Address Name"
                          value={address}
                          onChange={(e) => {
                            field.onChange(e); // This will update the value in the Controller
                            setaddress(e.target.value);
                          }}
                          variant="outlined"
                          error={Boolean(errors.Address)}
                          helperText={errors.Address?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      Phone Number
                    </Typography>
                    <Controller
                      name="PhoneNumber"
                      control={control}
                      defaultValue=""
                      rules={{
                        // required: "Phone Number is required",
                        required: phoneNumber.length === 0 ? "Phone Number is required" : null,
                        pattern: {
                          value: /^[1-9]{1}[0-9]{2}[0-9]{3}[0-9]{4}$/,
                          message: "Invalid phone Number"
                        },
                        // validate: (value) => (value.length === 0 ? "Phone Number is required" : null),
                        maxLength: {
                          value: 10,
                          message: "Phone Number should not exceed 10 characters"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="add__input"
                          placeholder="Phone Number"
                          value={phoneNumber || []}
                          onChange={(e) => {
                            field.onChange(e);
                            setphoneNumber(e.target.value);
                            clearErrors("PhoneNumber");
                          }}
                          variant="outlined"
                          error={Boolean(errors.PhoneNumber)}
                          helperText={errors.PhoneNumber?.message}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6} className="">
                    <Typography variant="label" component="label" className="add__label required">
                      Email Address
                    </Typography>
                    {/* <TextField
                      className="add__input"
                      placeholder="Email Address"
                      variant="outlined"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    /> */}
                    <Controller
                      name="EmailAddress" // Name of the field
                      control={control}
                      defaultValue="" // Initial value
                      rules={{
                        // required: "Email Address is required", // Validation rules
                        required: emailAddress?.length === 0 ? "Email Address is required" : "",

                        pattern: {
                          value: /^[-a-zA-Z0-9_.*$]{2,64}[@]{1}[a-zA-Z0-9]{2,20}[.]{1}[a-zA-Z.]{2,240}$/,
                          message: "Invalid  Email Address"
                        }
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="add__input"
                          placeholder="Email Address"
                          variant="outlined"
                          value={emailAddress}
                          // onChange={(e) => setEmailAddress(e.target.value)}
                          onChange={(e) => {
                            field.onChange(e); // This will update the value in the Controller
                            setEmailAddress(e.target.value);
                            clearErrors("EmailAddress");
                          }}
                          error={Boolean(errors.EmailAddress)}
                          helperText={errors.EmailAddress?.message}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Divider className="w-100 mt-4" />
                <Typography component="h6" variant="h6" className="w-100 my-2">
                  Client Associated
                </Typography>
                <Grid mt={2} mb={2} container spacing={2} className="mt-0">
                  <Grid item xs={12} sm={12} md={6} lg={6} className="pt-0 common_checkbox_selection">
                    <Typography variant="label" component="label" className="add__label required">
                      Client Admin
                    </Typography>

                    <Controller
                      name="clientAdmin" // Name of the field
                      control={control}
                      // rules={{
                      //   validate: (value) => value?.length > 0 || "Please select at least one lab day" // Custom validation rule
                      // }}
                      rules={{
                        required: clientInfo?.length === 0 ? "Please select at least one client admin" : ""
                      }}
                      render={({ field }) => (
                        <Autocomplete
                          className="permissions--tag"
                          multiple
                          limitTags={5}
                          id="lab-days-tags"
                          options={tenantUsers}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.userEmail}
                          value={clientInfo || []} // Set the selected options
                          onChange={(_, newValue) => {
                            field.onChange(newValue);
                            setClientInfo(newValue);
                            clearErrors("clientAdmin");
                          }} // Update selectedPermissions
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ padding: 1, marginRight: 8 }}
                                checked={selected || clientInfo.some((client) => client.userId === option.userId)}
                              />
                              {option.userEmail}
                            </li>
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label=""
                              placeholder={clientInfo.length > 0 ? "" : "ClientAdmins"} // Conditional placeholder
                              // value={selectedFacilities}
                              error={Boolean(errors?.clientAdmin)}
                              helperText={errors?.clientAdmin?.message}
                            />
                          )}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
                <Box className="provide-permissions-title">
                  <Typography component="h6" variant="h6" className="w-100">
                    Provide Permissions
                  </Typography>
                  <Box className="view_orderReports">
                    <Tooltip
                      className="tooltip_wrapper"
                      title={"Client Admin will be able to view all reports of other client admin as well"}
                      placement="bottom-end"
                    >
                      <img src={infoIcon} alt="info icon" className="info-icon" />
                    </Tooltip>
                    <Typography component="p" className="ps-1">
                      View all Orders & Results
                    </Typography>
                  </Box>
                </Box>
                <Divider className="provide_divider w-100 mt-2" />
                <Box className="provider_lists">
                  {clientInfo &&
                    clientInfo.map((info, index) => (
                      <Grid container spacing={1} className="provide_permission_list" key={index}>
                        <Grid item xs={12} sm={10} md={10} lg={10}>
                          <Typography component="p" variant="p" className="provider-name">
                            {info.userFirstName} {info.userLastName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={2} md={2} lg={2}>
                          <Typography component="p" variant="p" className="toggleButtons text-center">
                            <Typography component="label" className="switch" for={`checkbox${index}`}>
                              <input
                                checked={info?.viewOrdersFlag === true}
                                type="checkbox"
                                id={`checkbox${index}`}
                                onClick={() => updateProvideData(info.userId)}
                              />
                              <Typography component="div" className="slider round"></Typography>
                            </Typography>
                            <Typography component="span" className="yes-no">
                              {info?.viewOrdersFlag === true ? "Yes" : "No"}
                            </Typography>
                          </Typography>
                        </Grid>
                        {/* <Grid item xs={12} sm={5} md={5} lg={5}>
                          <Typography component="p" variant="p" className="text-end pe-4">
                            {/* checkbox${index} /}
                          </Typography>
                        </Grid> */}
                      </Grid>
                      // <Stack
                      //   direction="row"
                      //   spacing={1}
                      //   alignItems="center"
                      //   className="provide_permission_list"
                      //   key={index}
                      // >

                      // </Stack>
                    ))}
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button component="button" variant="contained" className="primary-btn" type="submit">
                {callType === CALLTYPES.Add ? CALLTYPES.Create : CALLTYPES.Update}
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}

      <Modal
        open={openpopup}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="success_modal">
          <img src={checkmarkSuccess} className="successImg modal-success-icon" />
          <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
            {callType === CALLTYPES.Add ? "successfully Created" : "successfully Updated"}
          </Typography>
          <Typography id="modal-modal-description" className="modal-modal-description" variant="p" component="p">
            {title} Facility has been successfully {callType === CALLTYPES.Add ? CALLTYPES.Created : CALLTYPES.Updated}
          </Typography>
          <Button variant="contained" onClick={handleClose} component="Button" className="primary-btn float-right mt-3">
            okay
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default AddNewFacilities;
