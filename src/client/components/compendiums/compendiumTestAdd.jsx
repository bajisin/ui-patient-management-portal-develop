import { Autocomplete, Box, Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Modal from "@mui/material/Modal";
import { Speciemen } from "../../../client/_helpers/constants";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import { updateCompendiumlist } from "@redux/slices/compendiumSlice";
import warningDeactivate from "../../assets/images/svg/warningDeactivate.svg";

const CompendiumTestAdd = ({ open, setOpen, orderRecord, updateId, setOrderRecord }) => {
  const [selectedSpecimenError, setSelectedSpecimenError] = useState(false);
  const [selectedContainerError, setSelectedContainerError] = useState(false);
  const [selectedcontinerTypeDataError, setSelectedcontinerTypeDataError] = useState(false);
  const [selectedorderableTypesError, setSelectedorderableTypesError] = useState(false);
  const [selectedperformingDataError, setSelectedperformingDataError] = useState(false);
  const [selectedworkGroupDataError, setSelectedworkGroupDataError] = useState(false);
  const [selectedinstrumentListError, setSelectedinstrumentListError] = useState(false);
  const [popupMessage, setPopupMessage] = useState();
  const dispatch = useDispatch();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleClosePopup = () => {
    setShowSuccessPopup(false); // Close the popup
    setPopupMessage("");
    // handleClose();
  };

  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      testName: "",
      testDescription: "",
      orderCode: "",
      moValue: null,
      labCorpSendOut: "",
      labCorpAlias: "",
      specimenType: "",
      containerType: "",
      description: "",
      alternativeContainerType: "",
      descriptionType: "",
      orderableType: "",
      performingDept: "",
      workGroup: "",
      loincCode: "",
      loincDescription: "",
      minValue: "",
      instrument: "",
      tat: "",
      cost: "",
      cptCodes: ""
    },
    mode: "onChange"
  });
  const initialState = {
    testName: "",
    testDescription: "",
    orderCode: "",
    moValue: "",
    labCorpSendOut: "",
    labCorpAlias: "",
    specimenType: "",
    containerType: "",
    description: "",
    alternativeContainerType: "",
    descriptionType: "",
    orderableType: "",
    performingDept: "",
    workGroup: "",
    loincCode: "",
    loincDescription: "",
    minValue: "",
    instrument: "",
    tat: "",
    cost: "",
    cptCodes: ""
  };
  const [compendiumDetails, setCompendiumDetails] = useState(initialState);

  const { orderableTypes, workGroupData, performingData, specimentData, continerTypeData, instrumentList,specimenFrozenType } =
    useSelector((state) => state.commonAdmin);
  const [selectedOrderableType, setSelectedOrderableType] = useState(null);
  const [showCompendiumSuccessPopup, setCompendiumShowSuccessPopup] = useState(false);

  const [selectedWorkGroupData, setSelectedWorkGroupData] = useState(null);
  const [selectedPerformingData, setSelectedPerformingData] = useState(null);
  const [selectedSpecimentData, setSelectedSpecimentData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedContainerType, setSelectedContainerType] = useState(null);
  const [selectedAlternateContainerType, setSelectedAlternateContainerType] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [testEdit, setTestEdit] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleClose = async () => {
    setTestEdit(false);

    setIsChecked(false);

    setOpen(false);
  };
  const handleCloseModal = async () => {
    let action;
    const payload = {
      alternateContainerTypeId: selectedAlternateContainerType?.id,
      containerTypeId: selectedContainerType?.id,
      cptCodes: compendiumDetails?.cptCodes,
      deptId: selectedPerformingData?.id || 1,
      instrumentId: selectedInstrument?.id,
      loincCode: compendiumDetails?.loincCode,
      loincDescription: compendiumDetails?.loincDescription,
      orderableTypeId: selectedOrderableType?.id,
      specimenTypeId: selectedSpecimentData?.id,
      testCode: setOrderRecord?.testId,
      workGroupId: selectedWorkGroupData?.id,
      labCorpLabSendOut: compendiumDetails?.labCorpSendOut,
      labCorpAlias: compendiumDetails?.labCorpAlias,
      tat: compendiumDetails?.tat,
      val15mo: compendiumDetails?.moValue || null, // Use null if the field is empty
      minVol: compendiumDetails?.minValue || null,
      cost: compendiumDetails?.cost,
      testCode: compendiumDetails?.orderCode,
      testName: compendiumDetails?.testName,
      updatedBy: getTenantId(),
      specimenFrozenId: frozen,
      createdBy: getLoggedInUserId(),
      roleId: getLoggedInUserRoleId()
    };

    try {
      action = await dispatch(updateCompendiumlist(payload));
      if (updateCompendiumlist.fulfilled.match(action)) {
        setCompendiumShowSuccessPopup(true);
        setPopupMessage(action.payload);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const successPopup = () => {
    setCompendiumShowSuccessPopup(false);
    setOpen(false);
    setTestEdit(false);
  };
  const handleOnChange = (e, field) => {
    setCompendiumDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e?.target?.value
    }));
  };

  useEffect(() => {}, [selectedSpecimentData]);
  const onSubmit = async () => {
    if (!selectedSpecimentData || selectedSpecimentData.length === 0) {
      setSelectedSpecimenError(true);
      return;
    }
    if (!selectedContainerType) {
      setSelectedContainerError(true);
      return;
    }
    if (!selectedAlternateContainerType) {
      setSelectedcontinerTypeDataError(true);
      return;
    }
    if (!selectedOrderableType) {
      setSelectedorderableTypesError(true);
      return;
    }
    if (!selectedPerformingData) {
      setSelectedperformingDataError(true);
      return;
    }
    if (!selectedWorkGroupData) {
      setSelectedworkGroupDataError(true);
      return;
    }
    if (!selectedInstrument) {
      setSelectedinstrumentListError(true);
      return;
    }
    setShowSuccessPopup(true);
  };
  const [frozen, setFrozen] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="compendium-inputs p-0">
          <Box className="formcontrol__wrapper">
            <Grid container spacing={2} className="mb-4">
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Test Name
                </Typography>
                <Controller
                  control={control}
                  name="testName"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="Test Name"
                      variant="outlined"
                      value={compendiumDetails.testName}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "testName");
                      }}
                      error={Boolean(errors.testName)}
                      helperText={errors.testName?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Test Code
                </Typography>
                <Controller
                  control={control}
                  name="orderCode"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="Code"
                      variant="outlined"
                      value={compendiumDetails.orderCode}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "orderCode");
                      }}
                      error={Boolean(errors.orderCode)}
                      helperText={errors.orderCode?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  15 mo Value
                </Typography>
                <Controller
                  control={control}
                  name="moValue"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="15 mo Value"
                      variant="outlined"
                      value={compendiumDetails?.moValue}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "moValue");
                      }}
                      error={Boolean(errors.moValue)}
                      helperText={errors.moValue?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Lab Corp Send Out
                </Typography>
                <Controller
                  control={control}
                  name="labCorpSendOut"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="Lab Corp Send Out"
                      variant="outlined"
                      value={compendiumDetails.labCorpSendOut}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "labCorpSendOut");
                      }}
                      error={Boolean(errors.labCorpSendOut)}
                      helperText={errors.labCorpSendOut?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Lab Corp Alias
                </Typography>
                <Controller
                  control={control}
                  name="labCorpAlias"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="Lab Corp Alias"
                      variant="outlined"
                      value={compendiumDetails.labCorpAlias}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "labCorpAlias");
                      }}
                      error={Boolean(errors.labCorpAlias)}
                      helperText={errors.labCorpAlias?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Specimen Type
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id=""
                  options={specimentData}
                  getOptionLabel={(option) => option.description}
                  value={selectedSpecimentData || null} // Set the selected options
                  onChange={(event, newValue) => {
                    setSelectedSpecimentData(newValue);
                    setSelectedSpecimenError(!newValue);
                  }} // Update selectedPermissions
                  renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Specimen Type" />}
                />{" "}
                {selectedSpecimenError && <Typography color="error">This field is required</Typography>}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Container Type
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id="container-tags"
                  options={continerTypeData}
                  getOptionLabel={(option) => option.name}
                  value={selectedContainerType || null} // Set the selected options
                  onChange={(e, newValue) => {
                    setSelectedContainerType(newValue);
                    setSelectedContainerError(!newValue);
                  }}
                  renderOption={(props, option, { selected }) => <li {...props}>{option.name}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Container Type" />}
                />
                {selectedContainerError && <Typography color="error">This field is required</Typography>}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label">
                  Description
                </Typography>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      disabled
                      className="add__input"
                      placeholder="Description"
                      variant="outlined"
                      value={selectedContainerType?.description}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "description");
                      }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Preferred Container Type
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id="container-tags"
                  options={continerTypeData}
                  getOptionLabel={(option) => option.name}
                  value={selectedAlternateContainerType} // Set the selected options
                  onChange={(event, newValue) => {
                    setSelectedAlternateContainerType(newValue);
                    setSelectedcontinerTypeDataError(!newValue);
                  }}
                  renderOption={(props, option, { selected }) => <li {...props}>{option.name}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Preferred Container Type" />}
                />
                {selectedcontinerTypeDataError && <Typography color="error">This field is required</Typography>}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label">
                  Description
                </Typography>
                <Controller
                  control={control}
                  name="descriptionType"
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="Description"
                      variant="outlined"
                      value={selectedAlternateContainerType?.description}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "descriptionType");
                      }}
                      disabled
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Orderable Type
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id="container-tags"
                  options={orderableTypes}
                  getOptionLabel={(option) => option.description}
                  value={selectedOrderableType} // Set the selected options
                  onChange={(event, newValue) => {
                    setSelectedOrderableType(newValue);
                    setSelectedorderableTypesError(!newValue);
                  }}
                  renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Orderable Type" />}
                />
                {selectedorderableTypesError && <Typography color="error">This field is required</Typography>}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Performing Dept
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id="container-tags"
                  options={performingData}
                  getOptionLabel={(option) => option.description}
                  value={selectedPerformingData} // Set the selected options
                  onChange={(e, newValue) => {
                    setSelectedPerformingData(newValue);
                    setSelectedperformingDataError(!newValue);
                  }}
                  renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Performing Dept" />}
                />
                {selectedperformingDataError && <Typography color="error">This field is required</Typography>}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Work Group
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id="container-tags"
                  options={workGroupData}
                  getOptionLabel={(option) => option.description}
                  value={selectedWorkGroupData} // Set the selected options
                  onChange={(e, newValue) => {
                    setSelectedWorkGroupData(newValue);
                    setSelectedworkGroupDataError(!newValue);
                  }}
                  renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Work Group" />}
                />
                {selectedworkGroupDataError && <Typography color="error">This field is required</Typography>}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Instrument
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id="container-tags"
                  options={instrumentList}
                  getOptionLabel={(option) => option.description}
                  value={selectedInstrument} // Set the selected options
                  onChange={(e, newValue) => {
                    setSelectedInstrument(newValue);
                    setSelectedinstrumentListError(!newValue);
                  }}
                  renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Instrument" />}
                />
                {selectedinstrumentListError && <Typography color="error">This field is required</Typography>}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  TAT
                </Typography>
                <Controller
                  control={control}
                  name="tat"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="TAT"
                      variant="outlined"
                      value={compendiumDetails.tat}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "tat");
                      }}
                      error={Boolean(errors.tat)}
                      helperText={errors.tat?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Cost
                </Typography>
                <Controller
                  control={control}
                  name="cost"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="$123"
                      variant="outlined"
                      value={compendiumDetails.cost}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "cost");
                      }}
                      error={Boolean(errors.cost)}
                      helperText={errors.cost?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label">
                  CPT Codes
                </Typography>
                <Controller
                  control={control}
                  name="cptCodes"
                  // rules={{
                  //   required: "This field is required."
                  // }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="CPT Codes"
                      variant="outlined"
                      value={compendiumDetails.cptCodes}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "cptCodes");
                      }}
                      error={Boolean(errors.cptCodes)}
                      helperText={errors.cptCodes?.message}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  LOINC Code
                </Typography>
                <Controller
                  control={control}
                  name="loincCode"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="LOINC Code"
                      variant="outlined"
                      value={compendiumDetails.loincCode}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "loincCode");
                      }}
                      error={Boolean(errors.loincCode)}
                      helperText={errors.loincCode?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  LOINC Description
                </Typography>
                <Controller
                  control={control}
                  name="loincDescription"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="LONIC Description"
                      variant="outlined"
                      value={compendiumDetails.loincDescription}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "loincDescription");
                      }}
                      error={Boolean(errors.loincDescription)}
                      helperText={errors.loincDescription?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <Typography variant="label" component="label" className="add__label required">
                  Min Vol
                </Typography>
                <Controller
                  control={control}
                  name="minValue"
                  rules={{
                    required: "This field is required."
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="add__input"
                      placeholder="Min Vol"
                      variant="outlined"
                      value={compendiumDetails.minValue}
                      onChange={(e) => {
                        field.onChange(e);
                        handleOnChange(e, "minValue");
                      }}
                      error={Boolean(errors.minValue)}
                      helperText={errors.minValue?.message}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} className="">
                <Typography component="label" variant="label" className="checked--label">
                  Specimen Frozen
                </Typography>
                <Autocomplete
                  className="customAutocomplete__input"
                  id="container-tags"
                  options={specimenFrozenType}
                  getOptionLabel={(option) => option.description}
                  // value={selectedWorkGroupData} // Set the selected options
                  onChange={(e, newValue) => {
                    setFrozen(newValue?.id);
                  }}
                  renderOption={(props, option, { selected }) => <li {...props}>{option.description}</li>}
                  renderInput={(params) => <TextField {...params} label="" placeholder="Specimen Frozen" />}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions className="px-2">
          <Button
            type="submit"
            autoFocus
            className="primary-btn"
            disabled={
              !selectedSpecimentData ||
              !selectedContainerType ||
              !selectedAlternateContainerType ||
              !selectedOrderableType ||
              !selectedPerformingData ||
              !selectedWorkGroupData ||
              !selectedInstrument
            }
          >
            Save
          </Button>
        </DialogActions>
      </form>

      {testEdit && (
        <Modal
          open={setTestEdit}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Are You Sure ?
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              You sure you want to update the test compendium
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button autoFocus type="submit" className="primary-btn" disabled={!isChecked}>
                Update
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
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Are You Sure ?
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              You want to add the test compendium
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClosePopup}>
                Cancel
              </Button>

              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={() => {
                  handleCloseModal();
                }}
                disabled={!isChecked}
              >
                Save
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}
      {showCompendiumSuccessPopup && (
        <Modal
          open={showCompendiumSuccessPopup}
          onClose={successPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            {popupMessage.includes("Given Test") ? (
              <img src={warningDeactivate} className="successImg modal-success-icon" />
            ) : (
              <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            )}
            {popupMessage.includes("Given Test") ? (
              ""
            ) : (
              <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
                Successfully Created
              </Typography>
            )}

            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              {popupMessage}
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={successPopup}>
              OKAY
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CompendiumTestAdd;
