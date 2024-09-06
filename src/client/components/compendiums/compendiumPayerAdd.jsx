import { Autocomplete, Box, Button, Checkbox, Grid, Modal, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { setPopupMessage, updatePayerCompendium } from "@redux/slices/compendiumSlice";
import { useDispatch, useSelector } from "react-redux";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import GeoLocationSearch from "../tenant/google-location";
import checkmarkSuccess from "../../assets/images/svg/checkmarkSuccess.svg";
import { getLoggedInUserRoleId } from "@utils/common";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

const CompendiumPayerAdd = ({ setPayerEdit, payerEdit, payerRecord, setOpen }) => {
  const [selectedLabError, setSelectedLabError] = React.useState(false);
  const [selectedMneumonicError, setSelectedMneumonicError] = React.useState(false);
  const [selectedRelationError, setSelectedRelationError] = React.useState(false);
  const [selectedLab, setSelectedLab] = React.useState([]);
  const [selectedMneumonic, setSelectedMneumonic] = React.useState(null);
  const [selectedRelation, setSelectedRelation] = React.useState(null);
  const { labList, mneumonicList, relationList } = useSelector((state) => state.compendium);
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"));
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
    label: ""
  });

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleClose = () => {
    setPayerEdit(false);
  };
  const dispatch = useDispatch();
  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setShowWarningpopup(false); // Close the popup
    setPopupMessage("");
    setOpen(false);
  };
  const {
    control,
    formState: { errors },
    clearErrors,
    handleSubmit
  } = useForm({
    defaultValues: {
      insuranceCompanyName: "",
      payerCode: "",
      Mnemonics: "",
      primaryAddress: "",
      secondaryAddress: "",
      subscriberId: "",
      groupId: "",
      relationId: ""
    },
    mode: "onChange"
  });
  const initialState = {
    insuranceCompanyName: "",
    Mnemonics: "",
    payerCode: "",
    primaryAddress: "",
    secondaryAddress: "",
    subscriberId: "",
    groupId: ""
  };
  const [compendiumPrayerDetails, setCompendiumPrayerDetails] = useState(initialState);

  const handleOnChange = (e, field) => {
    setCompendiumPrayerDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value
    }));
  };
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWarningPopup, setShowWarningpopup] = useState(false);
  const [popupMessage, setShowPopupMessage] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const handleFailPopupClose = async (data) => {
    handleClose(); // Close the first popup
    const labIds = selectedLab?.map((lab) => lab?.labId);
    const payload = {
      payerCompendiumId: 0,
      payerCode: compendiumPrayerDetails?.payerCode,
      insuranceCompanyName: compendiumPrayerDetails?.insuranceCompanyName,
      primaryAddress: location?.label,
      secondaryAddress: compendiumPrayerDetails?.secondaryAddress,
      defaultLabs: labIds || [],
      mneumonicId: compendiumPrayerDetails?.Mnemonics,
      relationId: selectedRelation?.id,
      subscriberId: compendiumPrayerDetails?.subscriberId,
      groupId: compendiumPrayerDetails?.groupId,
      updatedBy: loggedInUserRole?.id,
      roleId: getLoggedInUserRoleId(),
      city: location?.city,
      country: location?.country,
      state: location?.state,
      zipCode: compendiumPrayerDetails?.zipCode
    };
    let action;
    try {
      setShowWarningpopup(false);
      action = await dispatch(updatePayerCompendium(payload)); // Dispatch the action with id and payload
      if (updatePayerCompendium.fulfilled.match(action)) {
        setShowSuccessPopup(true);
        setShowPopupMessage(action?.payload);
      }
      setTimeout(() => {
        setPayerEdit(false);
        handleClosePopup();
      }, 60000);
    } catch (error) {
      console.error("Error updating compendium list:", error);
    }
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const onSubmit = () => {
    if (
      compendiumPrayerDetails?.insuranceCompanyName ||
      compendiumPrayerDetails?.Mnemonics ||
      compendiumPrayerDetails?.payerCode ||
      compendiumPrayerDetails?.primaryAddress ||
      compendiumPrayerDetails?.secondaryAddress ||
      location ||
      compendiumPrayerDetails?.zipCode ||
      selectedLab ||
      selectedRelation ||
      compendiumPrayerDetails?.subscriberId ||
      compendiumPrayerDetails?.groupId
    ) {
      setShowWarningpopup(true);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className="commonModal__wrapper--dialog">
          <DialogContent>
            <Box className="formcontrol__wrapper">
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
                        placeholder="Insurance Name"
                        variant="outlined"
                        value={compendiumPrayerDetails?.insuranceCompanyName}
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
                  {/* <Controller
                    key={"Mnemonics"}
                    control={control}
                    name={"Mnemonics"}
                    rules={{
                      required: selectedMneumonic === null && "This field is required."
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        className="customAutocomplete__input"
                        id=""
                        options={mneumonicList}
                        getOptionLabel={(option) => option?.mneumonicDescription}
                        value={selectedMneumonic || null}
                        onChange={(event, newValue) => {
                          setSelectedMneumonic(newValue);
                          setSelectedMneumonicError(false); // Clear the error when a value is selected
                          clearErrors("Mnemonics");
                        }}
                        renderOption={(props, option, { selected }) => (
                          <li {...props}>{option?.mneumonicDescription}</li>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            error={Boolean(errors?.Mnemonics)}
                            helperText={errors?.Mnemonics?.message}
                          />
                        )}
                      />
                    )}
                  /> */}
                  <Controller
                    key={"Mnemonics"}
                    control={control}
                    name={"Mnemonics"}
                    rules={{
                      required: selectedMneumonic === null && "This field is required."
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="add__input"
                        placeholder="Enter Mnemonics code "
                        variant="outlined"
                        value={selectedMneumonic || null}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange(e, "Mnemonics");
                        }}
                        error={Boolean(errors.Mnemonics)}
                        helperText={errors.Mnemonics?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Code
                  </Typography>
                  <Controller
                    control={control}
                    name="code"
                    rules={{
                      required: "This field is required."
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="add__input"
                        placeholder="Code"
                        variant="outlined"
                        value={compendiumPrayerDetails?.code}
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange(e, "payerCode");
                        }}
                        error={Boolean(errors.code)}
                        helperText={errors.code?.message}
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
                        placeholder="Address"
                        variant="outlined"
                        value={compendiumPrayerDetails?.primaryAddress}
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
                        placeholder="Home Address"
                        variant="outlined"
                        value={compendiumPrayerDetails?.secondaryAddress}
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
                    key={"location"}
                    control={control}
                    name={"location"}
                    rules={{
                      required: location?.city === "" && "This field is required."
                    }}
                    render={({ field }) => (
                      <div>
                        <GeoLocationSearch
                          className="add__select"
                          {...field}
                          setLocation={setLocation}
                          location={location}
                          error={Boolean(errors?.location)}
                          helperText={errors?.location?.message}
                        />
                        {location.city === "" && (
                          <Typography className="errorInfo">{errors?.location?.message}</Typography>
                        )}
                      </div>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Zip Code
                  </Typography>
                  <Controller
                    key={"zipCode"}
                    control={control}
                    name={"zipCode"}
                    rules={{
                      required: "This field is required.",
                      pattern: {
                        value: /^[0-9]{5}(?:[-\s]*[0-9]{4})?$/,
                        message: `Invalid zip code.`
                      },
                      maxLength: {
                        value: 5,
                        message: "Length cannot be more than 5"
                      }
                    }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        id={"zipCode"}
                        className="add__input"
                        placeholder="Zip code"
                        variant="outlined"
                        onChange={(e) => {
                          field.onChange(e);
                          handleOnChange(e, "zipCode");
                        }}
                        margin="normal"
                        error={Boolean(errors?.zipCode)}
                        helperText={errors?.zipCode?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4} className="multiSelect_control">
                  <Typography variant="label" component="label" className="add__label required">
                    Default Lab
                  </Typography>
                  <Controller
                    key={"defaultLab"}
                    control={control}
                    name={"defaultLab"}
                    rules={{
                      required: selectedLab?.length < 1 && "This field is required."
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        className="permissions--tag"
                        id=""
                        multiple
                        limitTags={5}
                        options={labList}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option?.labName}
                        value={selectedLab || []}
                        onChange={(event, newValue) => {
                          setSelectedLab(newValue);
                          setSelectedLabError(false);
                          clearErrors("defaultLab");
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
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            error={Boolean(errors?.defaultLab)}
                            helperText={errors?.defaultLab?.message}
                          />
                        )}
                      />
                    )}
                  />
                  {selectedLabError && <Typography color="error">This field is required</Typography>}
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Relationship
                  </Typography>
                  <Controller
                    key={"relationship"}
                    control={control}
                    name={"relationship"}
                    rules={{
                      required: selectedRelation === null && "This field is required."
                    }}
                    render={({ field }) => (
                      <Autocomplete
                        className="customAutocomplete__input"
                        id=""
                        options={relationList}
                        getOptionLabel={(option) => option?.description}
                        value={selectedRelation || null}
                        onChange={(event, newValue) => {
                          setSelectedRelation(newValue);
                          setSelectedRelationError(false); // Clear the error when a value is selected
                          clearErrors("relationship");
                        }}
                        renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label=""
                            error={Boolean(errors?.relationship)}
                            helperText={errors?.relationship?.message}
                          />
                        )}
                      />
                    )}
                  />
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
              Save
            </Button>
          </DialogActions>
        </Box>
      </form>

      {showWarningPopup && (
        <Modal
          open={showWarningPopup}
          setOpen={setShowWarningpopup}
          onClose={() => setShowWarningpopup(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
              Are You Sure ?
            </Typography>
            <Typography id="modal-modal-description" className="modal-modal-description">
              You sure you want to add the payer compendium?
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
                  setShowWarningpopup(false);
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
                  // setTestFailEdit(false);
                  handleFailPopupClose();
                  setPayerEdit(false);
                }}
                disabled={!isChecked}
              >
                Save
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}

      {showSuccessPopup && (
        <Modal
          open={showSuccessPopup}
          onClose={handleClosePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-description" className="modal-modal-description">
              {popupMessage}
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleClosePopup}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CompendiumPayerAdd;
