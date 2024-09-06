import { Autocomplete, Box, Button, Checkbox, FormControl, Grid, Modal, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { setPopupMessage, updatePayerCompendium } from "../../redux/slices/compendiumSlice";
import { useDispatch, useSelector } from "react-redux";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import GeoLocationSearch from "../tenant/google-location";
import IconButton from "@mui/material/IconButton";
import Loader from "@utils/Loader";
import { getLoggedInUserRoleId } from "../../utils/common";
import warningDeactivate from "../../assets/images/svg/warningDeactivate.svg";

const CompendiumPayerEdit = ({ setPayerEdit, payerEdit, payerRecord, add, callType }) => {
  const [selectedLabError, setSelectedLabError] = React.useState(false);
  const [selectedMneumonicError, setSelectedMneumonicError] = React.useState(false);
  const [selectedRelationError, setSelectedRelationError] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [selectedLab, setSelectedLab] = React.useState([]);
  const [selectedMneumonic, setSelectedMneumonic] = React.useState(null);
  const [selectedRelation, setSelectedRelation] = React.useState(null);
  const [editedRelation, setEditedRelation] = useState(null)
  const { labList, mneumonicList, relationList, loading } = useSelector((state) => state.compendium);

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleClose = () => {
    setPayerEdit(false);
    setOpen(false);
  };
  const dispatch = useDispatch();
  const handleClosePopup = () => {
    setShowSuccessPopup(false); // Close the popup
    setPopupMessage("");
    handleClose();
  };
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      insuranceCompanyName: "",
      Mnemonics:"",
      code: "",
      payerCode: "",
      primaryAddress: "",
      secondaryAddress: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      subscriberId: "",
      groupId: ""
    },
    mode: "onChange"
  });
  const initialState = {
    insuranceCompanyName: "",
    Mnemonics: "",
    code: "",
    payerCode: "",
    primaryAddress: "",
    secondaryAddress: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    subscriberId: "",
    groupId: ""
  };

  const [compendiumPrayerDetails, setCompendiumPrayerDetails] = useState(initialState);
  const [location, setLocation] = useState({
    country: compendiumPrayerDetails.country,
    state: compendiumPrayerDetails.state,
    city: compendiumPrayerDetails.city,
    label: compendiumPrayerDetails.label
  });
  useEffect(() => {
    setValue("insuranceCompanyName", payerRecord?.insuranceCompanyName);
    setValue("primaryAddress", payerRecord?.primaryAddress);
    setValue("secondaryAddress", payerRecord?.secondaryAddress);
    setValue("city", payerRecord?.city);
    setValue("state", payerRecord?.state);
    setValue("country", payerRecord?.country);
    setValue("zipCode", payerRecord?.zipCode);
    setValue("code", payerRecord?.mneumonicCode);
    setValue("payerCode", payerRecord?.payerCode);
    setValue("subscriberId", payerRecord?.subscriberId);
    setValue("groupId", payerRecord?.groupId);
    setValue("defaultLab", payerRecord?.defaultLab || []);

    compendiumPrayerDetails.insuranceCompanyName = payerRecord?.insuranceCompanyName;
    compendiumPrayerDetails.payerCode = payerRecord?.payerCode;
    compendiumPrayerDetails.code = payerRecord?.mneumonicCode;
    compendiumPrayerDetails.label = payerRecord?.primaryAddress;
    compendiumPrayerDetails.secondaryAddress = payerRecord?.secondaryAddress;
    compendiumPrayerDetails.city = payerRecord?.city;
    compendiumPrayerDetails.state = payerRecord?.state;
    compendiumPrayerDetails.country = payerRecord?.country;
    compendiumPrayerDetails.zipCode = payerRecord?.zipCode;
    compendiumPrayerDetails.subscriberId = payerRecord?.subscriberId;
    compendiumPrayerDetails.groupId = payerRecord?.groupId;
    compendiumPrayerDetails.Mnemonics = payerRecord?.mnemonicId
    setSelectedLab(payerRecord?.defaultLab || []);
    // setSelectedMneumonic(payerRecord?.mnemonicId);
    setSelectedRelation(payerRecord);
    setCompendiumPrayerDetails({ ...compendiumPrayerDetails });
  }, [payerRecord, relationList]);
  const handleOnChange = (e, field) => {
    setCompendiumPrayerDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value
    }));
  };
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleFailPopupClose = async (data) => {
    handleClose(); // Close the first popup
    const labIds = selectedLab?.map((lab) => lab?.labId);
    const payload = {
      payerCompendiumId: payerRecord?.insuranceId,
      payerCode: payerRecord?.payerCode || compendiumPrayerDetails?.payerCode,
      code: payerRecord?.mneumonicCode || compendiumPrayerDetails?.mneumonicCode,
      insuranceCompanyName: compendiumPrayerDetails?.insuranceCompanyName,
      primaryAddress: location?.label || payerRecord?.primaryAddress,
      secondaryAddress: compendiumPrayerDetails?.secondaryAddress,
      city: location?.city || payerRecord?.city ,
      state: location?.state || payerRecord?.state,
      country: location?.country || payerRecord?.country,
      zipCode: compendiumPrayerDetails?.zipCode,
      defaultLabs: labIds || [],
      mneumonicId: compendiumPrayerDetails?.Mnemonics,
      relationship: selectedRelation?.relationship || payerRecord?.relationship,
      subscriberId: compendiumPrayerDetails?.subscriberId,
      groupId: compendiumPrayerDetails?.groupId,
      updatedBy: loggedInUser?.id,
      roleId: getLoggedInUserRoleId(),
      relationId: selectedRelation.relationId || selectedRelation.id,
      misc: ""
    };

    try {
      await dispatch(updatePayerCompendium(payload));
      setTimeout(() => {
        setPayerEdit(false);
        handleClosePopup();
      }, 60000);
      setOpen(false);
    } catch (error) {
      console.error("Error updating compendium list:", error);
      // Handle error here, such as showing an error message
    }
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const onSubmit = () => {
    if (!selectedLab || selectedLab.length === 0) {
      setSelectedLabError(true);
      return;
    }
    if (!selectedRelation) {
      setSelectedRelationError(true);
      return;
    }

    setShowSuccessPopup(true);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Dialog
          aria-labelledby="Edit Test Compendium"
          open={payerEdit}
          enableResize={true}
          className="commonModal__wrapper edit__testcompendium payer__testcompendium"
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box className="commonModal__wrapper--dialog">
              <IconButton aria-label="close" onClick={handleClose} className="modalClose">
                <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
              </IconButton>
              <DialogTitle>Edit Payer Compendium</DialogTitle>

              <DialogContent>
                <Box className="formcontrol__wrapper">
                  <Typography component="h6" variant="h6" className="w-100">
                    Payer Compendium
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Insurance Name
                      </Typography>
                      <Controller
                        control={control}
                        name="insuranceCompanyName"
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            placeholder="Test #1"
                            variant="outlined"
                            value={compendiumPrayerDetails.insuranceCompanyName}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, "insuranceCompanyName");
                            }}
                            error={Boolean(errors.insuranceCompanyName)}
                            helperText={errors.insuranceCompanyName?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Mnemonics
                      </Typography>
                      {/* <Autocomplete
                        className="customAutocomplete__input"
                        id=""
                        options={mneumonicList}
                        getOptionLabel={(option) => option?.mneumonicDescription}
                        value={selectedMneumonic || null}
                        onChange={(event, newValue) => {
                          setSelectedMneumonic(newValue);
                          setSelectedMneumonicError(false); // Clear the error when a value is selected
                        }}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>{option?.mneumonicDescription}</li>
                        )}
                        renderInput={(params) => <TextField {...params} label="" placeholder="" />}
                      /> */}

                        <Controller
                          key={"Mnemonics"}
                          control={control}
                          name={"Mnemonics"}
                          rules={{
                            required: compendiumPrayerDetails?.Mnemonics?.length < 1 && "This field is required."
                          }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              className="add__input"
                              placeholder="Enter Mnemonics code "
                              variant="outlined"
                              value={compendiumPrayerDetails?.Mnemonics}
                              onChange={(e) => {
                                field.onChange(e);
                                handleOnChange(e, "Mnemonics");
                              }}
                              error={Boolean(errors.Mnemonics)}
                              helperText={errors.Mnemonics?.message}
                            />
                          )}
                        />
                      {/* {selectedMneumonicError && ( // Display error when Mneumonics is not selected
                        <Typography color="error">This field is required</Typography>
                      )} */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Code
                      </Typography>
                      <Controller
                        control={control}
                        name="payerCode"
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            placeholder="payerCode"
                            variant="outlined"
                            value={compendiumPrayerDetails?.payerCode}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, "payerCode");
                            }}
                            error={Boolean(errors.payerCode)}
                            helperText={errors.payerCode?.message}
                          />
                        )}
                      />
                    </Grid>

                    {/* <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Address
                      </Typography>
                      <Controller
                        control={control}
                        name="primaryAddress"
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            placeholder="Test #1"
                            variant="outlined"
                            value={compendiumPrayerDetails.primaryAddress}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, "primaryAddress");
                            }}
                            error={Boolean(errors.primaryAddress)}
                            helperText={errors.primaryAddress?.message}
                          />
                        )}
                      />
                    </Grid> */}
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Home address
                      </Typography>
                      <Controller
                        control={control}
                        name="secondaryAddress"
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            placeholder="Home address"
                            variant="outlined"
                            value={compendiumPrayerDetails.secondaryAddress}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, "secondaryAddress");
                            }}
                            error={Boolean(errors.secondaryAddress)}
                            helperText={errors.secondaryAddress?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        City/State/Country
                      </Typography>
                      <Controller
                        control={control}
                        name="secondaryAddress"
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <>
                            {compendiumPrayerDetails?.city !== "" && payerRecord?.primaryAddress ? (
                              <GeoLocationSearch
                                {...field}
                                className="add__input"
                                placeholder=" City/State/Country"
                                variant="outlined"
                                defaultValue={
                                  compendiumPrayerDetails?.city !== "" ? `${compendiumPrayerDetails?.label || payerRecord?.primaryAddress}` : ""
                                }
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleOnChange(e, "country");
                                }}
                                error={Boolean(errors.secondaryAddress)}
                                helperText={errors.secondaryAddress?.message}
                                setLocation={setLocation}
                              />
                            ) : (
                              <GeoLocationSearch
                                {...field}
                                className="add__input"
                                placeholder=" City/State/Country"
                                variant="outlined"
                                defaultValue={
                                  compendiumPrayerDetails?.city !== "" ? `${compendiumPrayerDetails?.label || payerRecord?.primaryAddress}` : ""
                                }
                                onChange={(e) => {
                                  field.onChange(e);
                                  handleOnChange(e, "country");
                                }}
                                error={Boolean(errors.secondaryAddress)}
                                helperText={errors.secondaryAddress?.message}
                                setLocation={setLocation}
                              />
                            )}
                          </>
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Zip Code
                      </Typography>

                      <Controller
                        control={control}
                        name="zipCode"
                        rules={{
                          required: "This field is required.",
                          maxLength: { value: 5, message: "Zip Code should not exceed 5 characters." }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            placeholder="Zip Code"
                            variant="outlined"
                            value={compendiumPrayerDetails.zipCode || ""} // Initialize with an empty string
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, "zipCode");
                            }}
                            error={Boolean(errors.zipCode)}
                            helperText={errors.zipCode?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Default Lab
                      </Typography>
                      <FormControl className="w-100 common_checkbox_selection">
                        <Autocomplete
                          className="permissions--tag"
                          id="permission-tags"
                          multiple
                          limitTags={5}
                          options={labList}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option?.labName}
                          value={selectedLab || []} // Set the selected options
                          onChange={(event, newValue) => {
                            setSelectedLab(newValue);
                            setSelectedLabError(false);
                          }}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ padding: 1, marginRight: 8 }}
                                checked={selected}
                              />
                              {option?.labName}
                            </li>
                          )}
                          renderInput={(params) => <TextField {...params} label="" placeholder="" />}
                        />
                      </FormControl>
                      {selectedLabError && <Typography color="error">This field is required</Typography>}
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Relationship
                      </Typography>
                      <FormControl className="w-100">
                        <Autocomplete
                          className="customAutocomplete__input"
                          id=""
                          options={relationList}
                          getOptionLabel={(option) => option?.description}
                          value={editedRelation ? relationList.find((option) => option.description === editedRelation?.description) : relationList.find((option) => option.description === selectedRelation?.relationship) || null}
                          onChange={(event, newValue) => {
                            setSelectedRelation(newValue);
                            setEditedRelation(newValue);
                            setSelectedRelationError(false); // Clear the error when a value is selected
                          }}
                          renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                          renderInput={(params) => <TextField {...params} label="" placeholder="" />}
                        />
                      </FormControl>

                      {selectedRelationError && <Typography color="error">This field is required</Typography>}
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Subscriber Id
                      </Typography>
                      <Controller
                        control={control}
                        name="subscriberId"
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            placeholder="Subscriber Id"
                            variant="outlined"
                            value={compendiumPrayerDetails?.subscriberId}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, "subscriberId");
                            }}
                            error={Boolean(errors.subscriberId)}
                            helperText={errors.subscriberId?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Group Id
                      </Typography>
                      <Controller
                        control={control}
                        name="groupId"
                        rules={{
                          required: "This field is required."
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            placeholder="Group Id"
                            variant="outlined"
                            value={compendiumPrayerDetails?.groupId}
                            onChange={(e) => {
                              field.onChange(e);
                              handleOnChange(e, "groupId");
                            }}
                            error={Boolean(errors.groupId)}
                            helperText={errors.groupId?.message}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" type="submit" className="primary-btn">
                  Update
                </Button>
              </DialogActions>
            </Box>
          </form>
        </Dialog>
      )}
      {showSuccessPopup && (
        <Modal
          open={showSuccessPopup}
          setOpen={setShowSuccessPopup}
          onClose={() => setShowSuccessPopup(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
              Are You Sure ?
            </Typography>
            <Typography id="modal-modal-description" className="modal-modal-description">
              You sure you want to update the payer compendium?
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button
                autoFocus
                type="submit"
                className="primary-outline-btn"
                onClick={() => {
                  setShowSuccessPopup(false);
                  setIsChecked(false);
                }}
              >
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={() => {
                  handleFailPopupClose();
                  setPayerEdit(false);
                }}
                disabled={!isChecked}
              >
                Update
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CompendiumPayerEdit;
