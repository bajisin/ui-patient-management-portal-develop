import { Autocomplete, Box, Button, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { CALLTYPES, Speciemen } from "../../_helpers/constants";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { setPopupMessage, updateCompendiumlist } from "@redux/slices/compendiumSlice";
import { useDispatch, useSelector } from "react-redux";
import { getTestCompendiumsList } from "@redux/slices/compendiumSlice";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

const CompendiumTestEdit = ({ open, setOpen, setOrderRecord, callType }) => {
  const [selectedSpecimenError, setSelectedSpecimenError] = React.useState(false);
  const [selectedContainerError, setSelectedContainerError] = React.useState(false);
  const [selectedcontinerTypeDataError, setSelectedcontinerTypeDataError] = React.useState(false);
  const [selectedorderableTypesError, setSelectedorderableTypesError] = React.useState(false);
  const [selectedperformingDataError, setSelectedperformingDataError] = React.useState(false);
  const [selectedworkGroupDataError, setSelectedworkGroupDataError] = React.useState(false);
  const [selectedinstrumentListError, setSelectedinstrumentListError] = React.useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const dispatch = useDispatch();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleClosePopup = () => {
    setShowSuccessPopup(false); // Close the popup
    setPopupMessage("");
    handleClose();
  };
  const handleClose1 = async () => {
    // window.location.reload();
     try {
      setShowPopup(false);
              setOpen(false);

        await dispatch(
          getTestCompendiumsList({
            pagination: {
              pageNo: 0,
              pageSize: 10
            },
            //         // Other parameters for fetching the list
            status: "all",
            searchValue: "",
            sortBy: "",
            sortKey: "lastModifiedDate",
            sortOrder: "DESC"
          })
        );
    } catch (error) {
      // Handle error
      console.error("Error deleting:", error);
    }
  };
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      testName: "",
      testDescription: "",
      testCode: "",
      moValue: null,
      labCorpSendOut: "",
      labCorpAlias: "",
      specimenType: "",
      containerType: "",
      description: "",
      alternativeContainerType: "",
      descriptionType: "",
      orderableType: "",
      department: "",
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
    testCode: "",
    moValue: "",
    labCorpSendOut: "",
    labCorpAlias: "",
    specimenType: "",
    containerType: "",
    description: "",
    alternativeContainerType: "",
    descriptionType: "",
    orderableType: "",
    department: "",
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

  const {
    orderableTypes,
    workGroupData,
    performingData,
    specimentData,
    continerTypeData,
    instrumentList,
    popupMessage,
    specimenFrozenType
  } = useSelector((state) => state.commonAdmin);
  const [selectedOrderableType, setSelectedOrderableType] = useState(null);
  const [successMessage, setSuccessMessage] = useState("")
  const [selectedWorkGroupData, setSelectedWorkGroupData] = useState(null);
  const [selectedPerformingData, setSelectedPerformingData] = useState(null);
  const [selectedSpecimentData, setSelectedSpecimentData] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedContainerType, setSelectedContainerType] = useState(null);
  const [selectedAlternateContainerType, setSelectedAlternateContainerType] = useState(null);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [testEdit, setTestEdit] = useState(false);
  const [frozen, setFrozen] = useState(null);

  useEffect(() => {
    setValue("testName", setOrderRecord?.testName);
    setValue("testCode", setOrderRecord?.testCode);
    setValue("labCorpSendOut", setOrderRecord?.labCorpSendOut);
    setValue("labCorpAlias", setOrderRecord?.labCorpAlias);
    setValue("specimenType", setOrderRecord?.specimenType);
    setValue("containerType", setOrderRecord?.containerType);
    setValue("description", setOrderRecord?.description);
    setValue("alternativeContainerType", setOrderRecord?.alternativeContainerType);
    setValue("descriptionType", setOrderRecord?.descriptionType);
    setValue("orderableType", setOrderRecord?.orderableType);
    setValue("department", setOrderRecord?.department);
    setValue("workGroup", setOrderRecord?.workGroup);
    setValue("loincCode", setOrderRecord?.loincCode);
    setValue("loincDescription", setOrderRecord?.loincDescription);
    setValue("moValue", setOrderRecord?.value15mo || null);
    setValue("minValue", setOrderRecord?.minVol);
    setValue("instrument", setOrderRecord?.instrument);
    setValue("tat", setOrderRecord?.tat);
    setValue("cost", setOrderRecord?.cost);
    setValue("cptCodes", setOrderRecord?.cptCodes);
    compendiumDetails.testName = setOrderRecord?.testName;
    compendiumDetails.testDescription = setOrderRecord?.testDescription;
    compendiumDetails.testCode = setOrderRecord?.testCode;
    compendiumDetails.moValue = setOrderRecord?.value15mo;
    compendiumDetails.labCorpSendOut = setOrderRecord?.labCorpSendOut;
    compendiumDetails.labCorpAlias = setOrderRecord?.labCorpAlias;
    compendiumDetails.specimenType = setOrderRecord?.specimenType;
    compendiumDetails.containerType = setOrderRecord?.containerType;
    compendiumDetails.description = setOrderRecord?.description;
    compendiumDetails.alternativeContainerType = setOrderRecord?.alternativeContainerType;
    compendiumDetails.descriptionType = setOrderRecord?.descriptionType;
    compendiumDetails.orderableType = setOrderRecord?.orderableType;
    compendiumDetails.department = setOrderRecord?.department;
    compendiumDetails.workGroup = setOrderRecord?.workGroup;
    compendiumDetails.loincCode = setOrderRecord?.loincCode;
    compendiumDetails.loincDescription = setOrderRecord?.loincDescription;
    compendiumDetails.minValue = setOrderRecord?.minVol;
    compendiumDetails.instrument = setOrderRecord?.instrument;
    compendiumDetails.tat = setOrderRecord?.tat;
    compendiumDetails.cost = setOrderRecord?.cost;
    compendiumDetails.cptCodes = setOrderRecord?.cptCodes;

    setCompendiumDetails({ ...compendiumDetails });

    if (continerTypeData?.length > 0) {
      setSelectedContainerType(continerTypeData?.find((c) => c.id === setOrderRecord?.containerTypeId));
      setSelectedAlternateContainerType(continerTypeData?.find((c) => c.id === setOrderRecord?.alternateTypeId));
    }
    setFrozen(setOrderRecord?.specimenId);

    if (instrumentList.length > 0) {
      setSelectedInstrument(instrumentList.find((i) => i.id === setOrderRecord?.instrumentId));
    }
    if (orderableTypes.length > 0) {
      setSelectedOrderableType(orderableTypes.find((o) => o.id === setOrderRecord?.ordertypeId));
    }
    if (workGroupData.length > 0) {
      setSelectedWorkGroupData(workGroupData.find((w) => w.id === setOrderRecord?.workGroupId));
    }
    if (performingData.length > 0) {
      setSelectedPerformingData(performingData.find((p) => p.id === setOrderRecord?.departmentId));
    }
    if (specimentData.length > 0) {
      setSelectedSpecimentData(specimentData.find((s) => s.id === setOrderRecord?.specimenId));
    }
  }, [setOrderRecord, continerTypeData, specimentData, workGroupData, performingData, orderableTypes, instrumentList]);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleClose = async () => {
    setTestEdit(false);

    setIsChecked(false);
    setTestEdit(false);

    setOpen(false);
  };

  const handleCloseModal = async () => {
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
      testCode: compendiumDetails?.testCode,
      testCompendiumId: setOrderRecord?.testCompendiumId,
      workGroupId: selectedWorkGroupData?.id,
      labCorpLabSendOut: compendiumDetails?.labCorpSendOut,
      labCorpAlias: compendiumDetails?.labCorpAlias,
      tat: compendiumDetails?.tat,
      specimenFrozenId: frozen,
      val15mo: compendiumDetails?.moValue || null, // Use null if the field is empty
      minVol: compendiumDetails?.minValue || null,
      cost: compendiumDetails?.cost,
      testName: compendiumDetails?.testName,
      updatedBy: getLoggedInUserId(),
      roleId: getLoggedInUserRoleId()
    };

    try {
      const response = await dispatch(updateCompendiumlist(payload));
      console.log(response, "re");
      if (response?.payload) {
        setSuccessMessage(response.payload);
        setShowPopup(true);
        setShowSuccessPopup(false);

      } else {
        // setShowPopupMessage('No payload in response.');
        setShowPopup(true);
      }
    } catch (error) {
      // Handle error here, such as showing an error message
      console.log(error);
    }
  };
  const handleOnChange = (e, field) => {
    setCompendiumDetails((prevDetails) => ({
      ...prevDetails,
      [field]: e.target.value
    }));
  };
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
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

  return (
    <>
      <Dialog
        aria-labelledby="Edit Test Compendium"
        open={open}
        enableResize={true}
        className="commonModal__wrapper edit__testcompendium"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="commonModal__wrapper--dialog">
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
            <DialogTitle>Edit Test Compendium</DialogTitle>
            <DialogContent>
              <Box className="formcontrol__wrapper">
                <Typography component="h6" variant="h6" className="w-100">
                  Test Compendium Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label required">
                      Test Name
                    </Typography>
                    <Controller
                      control={control}
                      name="testName"
                      rules={callType === CALLTYPES.Edit ? {} : { required: "This field is required." }}
                      render={({ field }) => (
                        <TextField
                          // disabled={callType === CALLTYPES.Edit}
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
                      name="testCode"
                      rules={callType === CALLTYPES.Edit ? {} : { required: "This field is required." }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          disabled={callType === CALLTYPES.Edit}
                          className="add__input"
                          placeholder="Test Code"
                          variant="outlined"
                          value={compendiumDetails.testCode}
                          onChange={(e) => {
                            field.onChange(e);
                            handleOnChange(e, "testCode");
                          }}
                          error={Boolean(errors.testCode)}
                          helperText={errors.testCode?.message}
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
                      onChange={(e, newValue) => {
                        console.log(newValue, "val");
                        setSelectedSpecimentData(newValue);
                        setSelectedSpecimenError(!newValue);
                      }} // Update selectedPermissions
                      renderOption={(props, option) => <li {...props}>{option.description}</li>}
                      renderInput={(params) => <TextField {...params} label="" placeholder="Specimen Type" />}
                    />
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
                      renderOption={(props, option) => <li {...props}>{option.name}</li>}
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
                      Alternative Container Type
                    </Typography>
                    <Autocomplete
                      className="customAutocomplete__input"
                      id="container-tags"
                      options={continerTypeData}
                      getOptionLabel={(option) => option.name}
                      value={selectedAlternateContainerType} // Set the selected options
                      onChange={(e, newValue) => {
                        setSelectedAlternateContainerType(newValue);
                        setSelectedcontinerTypeDataError(!newValue);
                      }}
                      renderOption={(props, option) => <li {...props}>{option.name}</li>}
                      renderInput={(params) => (
                        <TextField {...params} label="" placeholder="Alternative Container Type" />
                      )}
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
                      onChange={(e, newValue) => {
                        setSelectedOrderableType(newValue);
                        setSelectedorderableTypesError(!newValue);
                      }}
                      renderOption={(props, option) => <li {...props}>{option.description}</li>}
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
                      renderOption={(props, option) => <li {...props}>{option.description}</li>}
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
                      renderOption={(props, option) => <li {...props}>{option.description}</li>}
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
                      renderOption={(props, option) => <li {...props}>{option.description}</li>}
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
                          placeholder="TAT 1"
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
                    <Typography variant="label" component="label" className="add__label required">
                      CPT Codes
                    </Typography>
                    <Controller
                      control={control}
                      name="cptCodes"
                      rules={{
                        required: "This field is required."
                      }}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="add__input"
                          placeholder="Cpt Code"
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
                          placeholder="LOINC Description"
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
                      Min Value
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
                          placeholder="Min Value"
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
                      value={frozen === 1 ? Speciemen[0] : frozen === 2 ? Speciemen[1] : Speciemen[2]} // Set the selected options
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
              <Button type="submit" autoFocus className="primary-btn">
                Update
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
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
              Do you really want to Update the data?
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
              Do you really want to update the data?
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
                Update
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}

      {showPopup && (
        <Modal
          open={showPopup}
          onClose={handleClose1}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-description" className="modal-modal-description">
              {successMessage}
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleClose1}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CompendiumTestEdit;
