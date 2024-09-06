import { Autocomplete, Button, Checkbox, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { createBroadCast, setPopupMessage, setShowSuccessPopup, updateBroadCast } from "@redux/slices/boardCastSlice";
import { getLoggedInUserId, getLoggedInUserRoleId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/system";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Loader from "../../utils/Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import dayjs from "dayjs";
import warningDeactivate from "../../assets/images/svg/warningDeactivate.svg";
import { CALLTYPES } from "../../_helpers/constants";

const CreateBroadcast = ({ open, handleClose, callType }) => {
  const [multiSelected, setMultiSelected] = useState([]);
  const [multiSelectedErr, setMultiSelectedErr] = useState("");
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [description, setDescription] = useState("");
  const [broadCastType, setBroadCastType] = useState("");
  const [broadCastId, setBroadCastId] = useState("");
  const [broadCastTypeErr, setBroadCastTypeErr] = useState("");
  const pickupTimeEarliest = dayjs().startOf("day").add(15, "minutes").format();
  const pickupTimeLatest = dayjs().endOf("day").subtract(15, "minutes").format();
  const [startDate, setStartDate] = useState(dayjs().format("MM-DD-YYYY"));
  const [endDate, setEndDate] = useState(dayjs().format("MM-DD-YYYY"));
  const [agreeBroadcast, setAgreeBroadcast] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const [isChecked, setIsChecked] = useState(false);

  const [startTime, setStartTime] = useState(pickupTimeEarliest);
  const [endTime, setEndTime] = useState(pickupTimeLatest);
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      broadCastType: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      title: "",
      description: "",
      multiSelected: ""
    },
    mode: "onChange"
  });
  const dispatch = useDispatch();
  const { broadcastById, showSuccessPopup, loading } = useSelector((state) => state.broadCasts);

  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      setTimeout(() => {
        setTitles("update");

        setBroadCastType(broadcastById.catalogBroadcastMasterDTO?.catalogBroadcastId);
        setStartDate(broadcastById?.fromDate?.split(" ")[0]);
        setStartTime(broadcastById?.fromDate);
        setEndDate(broadcastById?.toDate?.split(" ")[0]);
        setEndTime(broadcastById?.toDate);
        setTitle(broadcastById?.title);
        setDescription(broadcastById?.description);
        const tenants = [];
        broadcastById?.tenantDTO?.forEach((t) => {
          // Using the spread operator to create a new array instead of modifying the existing one
          tenants.push(t);
          // setMultiSelected((prevMultiSelected) => [...prevMultiSelected, t]);
          setMultiSelected(tenants);
        });
        setBroadCastId(broadcastById?.broadCastId);
      }, 1500);

      // setMultiSelected([...broadcastById?.tenantDTO]);
    } else setTitles("create");
  }, [broadcastById]);
  const validateForm = () => {
    let isValid = true;

    if (title.trim() === "") {
      isValid = false;
      setTitleErr("This field is required");
    } else {
      setTitleErr("");
    }
    if (broadCastType === "" || multiSelected.length === 0) {
      isValid = false;
      setBroadCastTypeErr("This field is required");
      setMultiSelectedErr("This field is required");
    } else {
      setBroadCastTypeErr("");
      setMultiSelectedErr("");
      setAgreeBroadcast(true);
    }
    return isValid;
  };
  const { tenantList } = useSelector((state) => state.tenants);
  const [titles, setTitles] = useState("");
  // const [open, setOpen] = useState(false);
  const handleClosePopup = () => {
    dispatch(setShowSuccessPopup(false)); // Close the popup
    dispatch(setPopupMessage(""));
    handleClose();
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const handleFirstPopupOkay = async (e) => {
    e.preventDefault();
    validateForm();
  };
  const ids = multiSelected?.map((opt) => opt?.tenantId);
  const onSubmit = async (e) => {
    e.preventDefault();

    // data?.filter(opt => opt.tenantName === )
    let superAdminPayload = {};

    if (validateForm()) {
      let action;
      superAdminPayload = {
        tenant: ids.join(","),
        broadCastType,
        fromDate: `${dayjs(startDate).format("YYYY-MM-DD")} ${dayjs(startTime, "HH:mm:ss").format("HH:mm:ss")}`,
        toDate: `${dayjs(endDate).format("YYYY-MM-DD")} ${dayjs(endTime, "HH:mm:ss").format("HH:mm:ss")}`,
        title,
        description,
        roleId: getLoggedInUserRoleId(),
        statusId: 1,
        createdBy: getLoggedInUserId()
      };

      try {
        if (callType === CALLTYPES.Edit) {
          action = await dispatch(updateBroadCast({ superAdminPayload, id: broadCastId }));
          if (updateBroadCast.fulfilled.match(action)) {
            setShowSuccessPopup(true);
            setPopupMessage(action.payload.data);
          }
        } else if (callType === CALLTYPES.Add) {
          action = await dispatch(createBroadCast(superAdminPayload));
          if (createBroadCast.fulfilled.match(action)) {
            setShowSuccessPopup(true);
            setPopupMessage(action.payload.data);
          }
        }
      } catch (error) {
        // Handle error and show error popup
        dispatch(setPopupMessage("Error occurred")); // Set your error message
        setShowSuccessPopup(true);
      }
    }
    handleClose();
    // fetchBroadCastData();
  };
  const vaildations = async () => {
    let superAdminPayload;
    if (validateForm()) {
      let action;
      superAdminPayload = {
        // tenant: ids.join(","),
        broadCastType,
        fromDate: `${dayjs(startDate).format("YYYY-MM-DD")} ${dayjs(startTime).format("HH:mm:ss")}`,
        toDate: `${dayjs(endDate).format("YYYY-MM-DD")} ${dayjs(endTime).format("HH:mm:ss")}`,
        title,
        description,
        roleId: getLoggedInUserRoleId(),
        statusId: 1,
        createdBy: getLoggedInUserId()
      };
      try {
        if (callType === CALLTYPES.Edit) {
          action = await dispatch(updateBroadCast({ superAdminPayload, id: broadCastId }));

          if (updateBroadCast.fulfilled.match(action)) {
            setShowSuccessPopup(true);
            setPopupMessage(action.payload.data);
          }
        } else if (callType === CALLTYPES.Edit) {
          action = await dispatch(createBroadCast(superAdminPayload));
          if (createBroadCast.fulfilled.match(action)) {
            setShowSuccessPopup(true);
            setPopupMessage(action.payload.data);
          }
        }
      } catch (error) {
        // Handle error and show error popup
        dispatch(setPopupMessage("Error occurred")); // Set your error message
        setShowSuccessPopup(true);
      }
    }
  };
  // useEffect(() => {
  //   if (broadcastById?.catalogBroadcastMasterDTO?.catalogBroadcastId) {
  //     console.log(broadcastById?.catalogBroadcastMasterDTO?.catalogBroadcastId);
  //     setBroadCastType(broadcastById?.catalogBroadcastMasterDTO?.catalogBroadcastId);
  //   }
  // }, [broadcastById]);
  return (
    <>
      {loading && callType === CALLTYPES.Edit ? (
        <Loader />
      ) : (
        <Dialog
          aria-labelledby="Add Tenants"
          open={open}
          enableResize={true}
          className="commonModal__wrapper createBroadcastModal"
        >
          <form onSubmit={handleSubmit(vaildations)}>
            <Box className="commonModal__wrapper--dialog">
              <IconButton aria-label="close" onClick={handleClose} className="modalClose">
                <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
              </IconButton>
              <DialogTitle>
                {`${callType === CALLTYPES.Edit ? CALLTYPES.UpdateBroadcast : CALLTYPES.CreateBroadcast}`}
                <Typography className="description mt-2">
                  Note: Selecting a particular Tenant will broadcast to all Tenant Admins
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Box mt={3} className="formcontrol__wrapper">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6} className="multiSelect_control">
                      {/* <MultiSelect
                        multiSelectedErr={multiSelectedErr}
                        selected={multiSelected}
                        setSelected={setMultiSelected}
                        broadCastOptions={tenantList}
                        className="multiSelect_controlInput"
                      /> */}
                      <Typography variant="label" component="label" className="add__label required">
                        Tenants
                      </Typography>

                      <Controller
                        name="clientAdmin" // Name of the field
                        control={control}
                        rules={{
                          validate: (value) => value?.length > 0 || "Please select at least one Tenant" // Custom validation rule
                        }}
                        defaultValue={multiSelected}
                        render={({ field }) => (
                          <Autocomplete
                            {...field}
                            className="permissions--tag"
                            multiple
                            limitTags={5}
                            options={tenantList}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.tenantName}
                            value={multiSelected} // Set the selected options
                            onChange={(event, newValue) => {
                              setMultiSelected(newValue);
                              field.onChange(newValue);
                            }} // Update selectedPermissions
                            renderOption={(props, option, { selected }) => (
                              <li {...props}>
                                <Checkbox
                                  icon={icon}
                                  checkedIcon={checkedIcon}
                                  style={{ padding: 1, marginRight: 8 }}
                                  checked={ids.includes(option.tenantId)}
                                />
                                {option.tenantName}
                              </li>
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label=""
                                // placeholder={multiSelected.length > 0 ? "" : "Client Admin"} // Conditional placeholder
                                // value={multiSelected}
                                error={Boolean(errors?.clientAdmin)}
                                helperText={errors?.clientAdmin?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography variant="label" component="label" className="add__label required">
                        Broadcast Type
                      </Typography>
                      <FormControl className="w-100" error={Boolean(broadCastTypeErr)}>
                        <Select
                          // value={broadCastType}
                          value={callType === CALLTYPES.Edit ? broadCastType : broadCastType}
                          onChange={(e) => setBroadCastType(e.target.value)}
                          className="add__select"
                        >
                          <MenuItem value={1}>Pre Login</MenuItem>
                          <MenuItem value={2}>Post Login</MenuItem>
                        </Select>
                        <FormHelperText>{broadCastTypeErr}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} className="position-relative">
                      <Typography variant="label" component="label" className="add__label required">
                        Date From
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dayjs(startDate) || dayjs()}
                          className="w-100 datetimepicker-control"
                          onChange={(newValue) => setStartDate(dayjs(newValue))}
                          minDate={dayjs(startDate)}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <Typography variant="label" component="label" className="add__label required">
                        Time From
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          value={dayjs(startTime) || dayjs()}
                          onChange={(newVal) => setStartTime(newVal)}
                          className="datetimepicker-control timePickerIcon w-100"
                          minTime={startDate === dayjs().format("MM-DD-YYYY") && dayjs()}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} className="position-relative">
                      <Typography variant="label" component="label" className="add__label required">
                        Date To
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          value={dayjs(endDate) || dayjs()}
                          className="w-100 datetimepicker-control"
                          onChange={(newValue) => setEndDate(dayjs(newValue))}
                          minDate={dayjs(startDate)}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <Typography variant="label" component="label" className="add__label required">
                        Time To
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimePicker
                          value={dayjs(endTime) || dayjs()}
                          onChange={(newVal) => setEndTime(newVal)}
                          className="datetimepicker-control timePickerIcon w-100"
                          minTime={endDate === startDate && dayjs(startTime).isAfter(dayjs()) ? startTime : undefined}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="label" component="label" className="add__label required">
                        Title
                      </Typography>
                      <Controller
                        control={control}
                        name="title"
                        rules={{
                          required: "This field is required.",
                          pattern: {
                            value: /^[A-Za-z]{1}[A-Za-z ]{0,}$/,
                            message: "Invalid input format."
                          },
                          maxLength: {
                            value: 50,
                            message: "Length cannot be more than 50"
                          }
                        }}
                        render={({ field }) => (
                          <TextField
                            {...field}
                            className="add__input"
                            onChange={(e) => {
                              setTitle(e.target.value);
                              field.onChange(e);
                            }}
                            // maxLength={10}
                            value={title}
                            placeholder="Title"
                            variant="outlined"
                            margin="normal"
                            error={Boolean(errors?.title)}
                            helperText={errors?.title?.message}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="label" component="label" className="add__label">
                        Description
                      </Typography>

                      <TextField
                        className="description__wrapper"
                        multiline
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        placeholder="Description"
                        variant="outlined"
                        error={title?.length > 150} // Error if title exceeds 50 characters
                        helperText={title?.length > 150}
                      />
                      {description?.length > 150 && (
                        <Typography variant="p" color="error">
                          Description should not exceed 150 characters
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  type="button"
                  onClose={handleClosePopup}
                  color="primary"
                  onClick={handleFirstPopupOkay}
                  // onClick={() => setAgreeBroadcast(true)}
                  className="primary-btn"
                  disabled={
                    !title ||
                    errors?.title?.message?.length > 0 ||
                    description?.length > 150 ||
                    multiSelected?.length <= 0 ||
                    !broadCastType
                  } // Disable the button if title or description is empty
                >
                  {`${callType === CALLTYPES.Edit ? CALLTYPES.Update : CALLTYPES.Publish}`}
                </Button>
              </DialogActions>
            </Box>
          </form>
        </Dialog>
      )}
      {agreeBroadcast && (
        <Modal
          open={agreeBroadcast}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="create-broadcast-publish-modal"
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title mb-0" variant="h6" component="h6">
              Are You Sure ?
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description mb-0" className="modal-modal-description">
              Sure you want to {titles} the broadcast.
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper mt-4">
              <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClose}>
                Maybe Later
              </Button>
              {/* {isChecked && (
                <Button autoFocus type="submit" className="primary-btn" onClick={handleFirstPopupOkay}>
                  Update
                </Button>
              )} */}
              <Button autoFocus type="submit" className="primary-btn" onClick={onSubmit} disabled={!isChecked}>
                Yes, I agree
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
            {/* <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h2">
            Successfully Deleted
          </Typography> */}
            <Typography variant="h2" id="modal-modal-description" className="modal-modal-description">
              Successfully Created
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              All the Required data is Successfully Updated
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleClosePopup}>
              OKAY
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CreateBroadcast;
