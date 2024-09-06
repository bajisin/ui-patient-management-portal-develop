import { Autocomplete, Button, Checkbox, FormHelperText, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  createBroadCast,
  setPopupMessage,
  setShowSuccessPopup,
  updateTenantBroadCast
} from "@redux/slices/boardCastSlice";
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
import Loader from "@utils/Loader";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import { CALLTYPES, ROLE_OPTIONS } from "../../../_helpers/constants";
import Select from "@mui/material/Select";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import dayjs from "dayjs";
import warningDeactivate from "../../../assets/images/svg/warningDeactivate.svg";

const CreateTenantBroadcast = ({ open, handleClose, callType, setOpenTenant }) => {
  const [title, setTitle] = useState("");
  const [titleErr, setTitleErr] = useState("");
  const [description, setDescription] = useState("");
  const [broadCastType, setBroadCastType] = useState("");
  const [broadCastId, setBroadCastId] = useState("");
  const [broadCastTypeErr, setBroadCastTypeErr] = useState("");
  const [selectedRole, setSelectedRole] = useState([ROLE_OPTIONS[0]]);
  const [selectedRoleErr, setSelectedRoleErr] = useState("");
  const pickupTimeLatest = dayjs().endOf("day").format();
  const [startDate, setStartDate] = useState(dayjs().format("MM-DD-YYYY"));
  const [endDate, setEndDate] = useState(dayjs().format("MM-DD-YYYY"));
  const [startTime, setStartTime] = useState(dayjs()); // Set initial value to the current time
  const [minTime, setMinTime] = useState(dayjs());
  const [autoPopulateRole, setAutoPopulateRole] = useState([]);
  // const [startTime, setStartTime] = useState(pickupTimeEarliest);
  const [minEndTime, setMinEndTime] = useState(pickupTimeLatest);
  const [endTime, setEndTime] = useState(dayjs());

  const [disableRole, setDisableRole] = useState(false);
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;
  const dispatch = useDispatch();
  const { broadcastById, loading, popupMessage, showSuccessPopUp } = useSelector((state) => state.broadCasts);
  const [broadCastTypeId, setBroadCastTypeId] = useState("");
  const [isBroadcastTypeChanged, setIsBroadcastTypeChanged] = useState(false);
  const [titleforUpdate, setTitleforUpdate] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [agreeBroadcast, setAgreeBroadcast] = useState(false);
  const [isStartTimeChanged, setIsStartTimeChanged] = useState(false);
  const [isEndTimeChanged, setIsEndTimeChanged] = useState(false);
  const [isStartDateChanged, setIsStartDateChanged] = useState(false);
  const [isEndDateChanged, setIsEndDateChanged] = useState(false);
  useEffect(() => {
    if (broadcastById?.catalogBroadcastMasterDTO?.catalogBroadcastId) {
      setBroadCastTypeId(broadcastById?.catalogBroadcastMasterDTO?.catalogBroadcastId);
    }
  }, [broadcastById]);
  useEffect(() => {
    // Check if startTime is a valid date
    if (dayjs(startTime).isValid()) {
      // Update minTime based on the current time
      const currentHour = dayjs().hour();
      const currentMinute = dayjs().minute();
      const newMinTime = dayjs()
        .set("hour", currentHour)
        .set("minute", currentMinute + 1);
      setMinTime(newMinTime);
    }
  }, [startTime]);
  useEffect(() => {
    if (dayjs(startTime).isValid()) {
      setMinEndTime(dayjs(startTime).add(1, "minute"));
    }
  }, [startTime, minEndTime]);
  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      const fortime = dayjs(broadcastById?.fromDate);
      const totime = dayjs(broadcastById?.toDate);
      setStartDate(broadcastById?.fromDate?.split(" ")[0]);
      setStartTime(fortime);
      setEndDate(broadcastById?.toDate?.split(" ")[0]);
      setEndTime(totime);
      setDisableRole(false);
      setTitle(broadcastById?.title);
      setDescription(broadcastById?.description);
      setBroadCastId(broadcastById?.broadCastId);
      setSelectedRole([]);
      broadcastById?.assignedRole?.map((a, i) => {
        const assignedRole = ROLE_OPTIONS.find((role) => role.id === a?.assignedRole.roleId?.toString());
        if (assignedRole) {
          setSelectedRole((prevState) => [...prevState, assignedRole]);
        } else {
          setAutoPopulateRole(selectedRole);
        }
      });
    }

    if (callType === CALLTYPES.Add) {
      setBroadCastType();
      setStartDate();
      setStartTime();
      setEndDate();
      setEndTime();
      setTitle();
      setDescription();
      setBroadCastId();

      setSelectedRole([]);
    }
    handleBroadCastType();
  }, [broadcastById]);
  const validateForm = () => {
    let isValid = true;

    if (title?.trim() === "") {
      isValid = false;
      setTitleErr("This field is required");
    } else {
      setTitleErr("");
    }
    if (broadCastType === "") {
      isValid = false;
      setBroadCastTypeErr("This field is required");
    } else setBroadCastTypeErr("");
    if (selectedRole?.length === 0) {
      isValid = false;
      setSelectedRoleErr("This field is required");
    } else setSelectedRoleErr("");

    return isValid;
  };
  const handleBroadCastType = (selectBroadcast) => {
    if (callType === CALLTYPES.Edit) {
      if (selectBroadcast === 1) {
        setSelectedRole(ROLE_OPTIONS);
        setDisableRole(true);
      } else {
        setDisableRole(false);
      }
      setBroadCastType(selectBroadcast);
      setIsBroadcastTypeChanged(true);
    } else {
      if (selectBroadcast === 1) {
        setSelectedRole(ROLE_OPTIONS);
        setDisableRole(true);
      } else {
        setSelectedRole([ROLE_OPTIONS[0]]);
        setDisableRole(false);
      }
    }

    setBroadCastType(selectBroadcast);
  };

  const handleRoleChange = (newValue) => {
    setSelectedRole(newValue);
    if (callType === CALLTYPES.Edit) {
      setAutoPopulateRole(newValue);
    }
  };

  const handleStartDateChange = (newValue) => {
    setStartDate(dayjs(newValue));
    setIsStartDateChanged(true);
  };
  const handleCloseAgreePopUp = () => {
    setAgreeBroadcast(false);
  };
  const handleEndDateChange = (newValue) => {
    setEndDate(dayjs(newValue));
    setIsEndDateChanged(true);
  };

  const handleStartTimeChange = (newVal) => {
    setStartTime(newVal);
    setIsStartTimeChanged(true);
  };

  const handleEndTimeChange = (newVal) => {
    setEndTime(newVal);
    setIsEndTimeChanged(true);
  };
  const handleSubmit = async (e) => {
    if (broadCastType === 1) {
      setSelectedRole(ROLE_OPTIONS);
      setDisableRole(true);
    } else {
      setSelectedRole(selectedRole);
    }
    e.preventDefault();
    if (isStartTimeChanged && isEndTimeChanged && isStartDateChanged && isEndDateChanged) {
      setAgreeBroadcast(true);
    }
  };

  const handleSubmits = () => {
    setAgreeBroadcast(true);
  };
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const selectedRoleIds = Array.isArray(selectedRole) ? selectedRole.map((opt) => opt?.id) : [];
  const handleFirstPopupOkay = async (e) => {
    const tenantAdminPayload = {
      broadCastType,
      fromDate: `${dayjs(startDate).format("YYYY-MM-DD")} ${dayjs(startTime).format("HH:mm:ss")}`,
      toDate: `${dayjs(endDate).format("YYYY-MM-DD")} ${dayjs(endTime).format("HH:mm:ss")}`,
      title,
      description,
      roleId: getLoggedInUserRoleId(),
      statusId: 1,
      createdBy: getLoggedInUserId(),
      assignedRoleId: selectedRoleIds
    };

    if (validateForm()) {
      try {
        if (callType === CALLTYPES.Edit) {
          await dispatch(updateTenantBroadCast({ tenantAdminPayload, id: broadCastId }));
          await dispatch(setShowSuccessPopup(true));
        } else if (callType === CALLTYPES.Add) {
          await dispatch(createBroadCast(tenantAdminPayload));
          await dispatch(setShowSuccessPopup(true));
        }

        dispatch(setShowSuccessPopup(true));
      } catch (error) {
        console.log(error);
      }
    }
    setShowSuccessPopup(true);
    dispatch(setShowSuccessPopup(true));
  };
  useEffect(() => {
    if (callType === CALLTYPES.Add) {
      setDisableRole(true);

      setTitleforUpdate(CALLTYPES.Publish);
    } else {
      setTitleforUpdate(CALLTYPES.Update);
    }
  }, []);
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleClosePopup = () => {
    dispatch(setShowSuccessPopup(false)); // Close the popup
    dispatch(setPopupMessage(""));
    setOpenTenant();
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Dialog aria-labelledby="Add Tenants" open={open} enableResize={true} className="commonModal__wrapper">
          <form onSubmit={handleSubmit}>
            <Box className="commonModal__wrapper--dialog">
              <IconButton aria-label="close" onClick={handleClose} className="modalClose">
                <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
              </IconButton>
              <DialogTitle>{`${
                callType === CALLTYPES.Edit ? CALLTYPES.UpdateBroadcast : CALLTYPES.CreateBroadcast
              }`}</DialogTitle>
              <DialogContent>
                <Box mt={3} className="formcontrol__wrapper">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <Typography variant="label" component="label" className="add__label required">
                        Broadcast Type
                      </Typography>
                      <FormControl className="w-100" error={Boolean(broadCastTypeErr)}>
                        <Select
                          value={callType === CALLTYPES.Edit ? broadCastTypeId : broadCastType}
                          onChange={(e) => {
                            handleBroadCastType(e.target.value);
                            setBroadCastTypeId(e.target.value);
                          }}
                          className="add__select"
                        >
                          <MenuItem value={1}>Pre Login</MenuItem>
                          <MenuItem value={2}>Post Login</MenuItem>
                        </Select>
                        <FormHelperText>{broadCastTypeErr}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} className="multiSelect_control">
                      <Typography variant="label" component="label" className="add__label required">
                        Role
                      </Typography>
                      <FormControl className="w-100 common_checkbox_selection" error={Boolean(selectedRoleErr)}>
                        <Autocomplete
                          className="permissions--tag"
                          multiple
                          limitTags={5}
                          id="permission-tags"
                          options={ROLE_OPTIONS}
                          disableCloseOnSelect
                          getOptionLabel={(option) => option.title}
                          value={selectedRole || []} // Set the selected options
                          onChange={(event, newValue) => handleRoleChange(newValue)} // Update selectedPermissions
                          disabled={disableRole}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={icon}
                                checkedIcon={checkedIcon}
                                style={{ padding: 1, marginRight: 8 }}
                                checked={selected || selectedRole.some((client) => client.id === option.id)}
                              />
                              {option.title}
                            </li>
                          )}
                          renderInput={(params) => <TextField {...params} label="" placeholder="" />}
                        />
                        <FormHelperText>{selectedRoleErr}</FormHelperText>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} className="position-relative">
                      <Typography variant="label" component="label" className="add__label required">
                        Date From
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs} className="w-100">
                        <DatePicker
                          value={dayjs(startDate)}
                          className="datetimepicker-control w-100"
                          onChange={handleStartDateChange}
                          minDate={dayjs(startDate)}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <Typography variant="label" component="label" className="add__label required">
                        Time From
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs} className="w-100">
                        <TimePicker
                          value={startTime}
                          defaultValue={dayjs(startTime)}
                          onChange={handleStartTimeChange}
                          className="datetimepicker-control timePickerIcon w-100"
                          minTime={startDate === dayjs().format("MM-DD-YYYY") && dayjs()}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3} className="position-relative">
                      <Typography variant="label" component="label" className="add__label required">
                        Date To
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs} className="w-100">
                        <DatePicker
                          value={dayjs(endDate)}
                          defaultValue={dayjs(endDate)}
                          className="w-100 datetimepicker-control"
                          onChange={handleEndDateChange}
                          minDate={dayjs(startDate)}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={3}>
                      <Typography variant="label" component="label" className="add__label required">
                        Time To
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs} className="w-100">
                        <TimePicker
                          value={endTime}
                          defaultValue={dayjs(endTime)}
                          onChange={handleEndTimeChange}
                          className="datetimepicker-control timePickerIcon w-100"
                          minTime={endDate === startDate && dayjs(startTime).isAfter(dayjs()) ? startTime : undefined}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="label" component="label" className="add__label required">
                        Add Title
                      </Typography>
                      <TextField
                        className="add__input w-100"
                        onChange={handleTitleChange}
                        value={title}
                        placeholder="Title"
                        variant="outlined"
                        error={title?.length > 50} // Error if title exceeds 50 characters
                        helperText={title?.length > 50 ? "Title should not exceed 50 characters" : ""}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Typography variant="label" component="label" className="add__label">
                        Description
                      </Typography>
                      <Typography
                        variant="textarea"
                        component="textarea"
                        className="description__wrapper"
                        rows={5}
                        value={description}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                      >
                        {description}
                      </Typography>
                      {description?.length > 150 ? (
                        <Typography variant="p" className="error--bright">
                          Description should not exceed more than 150 characters
                        </Typography>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  type="submit"
                  color="primary"
                  onClick={handleSubmits}
                  disabled={
                    callType === CALLTYPES.Edit
                      ? !title || title.length > 50 || !description || description.length > 150 || !broadCastTypeId // Add your original conditions here
                      : !title || title.length > 50 || description?.length > 150 || !broadCastType
                  }
                  className="primary-btn"
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
        >
          <Box className="success_modal">
            <img src={warningDeactivate} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Are You Sure ?
            </Typography>
            <Typography variant="p" component="p" id="modal-modal-description" className="modal-modal-description">
              Sure you want to {titleforUpdate} the broadcast.
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleCloseAgreePopUp}>
                Maybe Later
              </Button>
              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={handleFirstPopupOkay}
                disabled={!isChecked}
              >
                Yes, I Agree
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}
      {showSuccessPopUp && (
        <Modal
          open={showSuccessPopUp}
          onClose={handleClosePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
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

export default CreateTenantBroadcast;
