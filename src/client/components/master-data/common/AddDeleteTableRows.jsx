import { Box, Button, Checkbox, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  deleteGroupData,
  getPatientsByGroupId,
  setPopupMessage,
  updateGroupData
} from "@redux/slices/masterData/patientsGroupSlice";

import { COMMON_MASTER_DATA_APIS } from "@config/api-config";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Master } from "../../../_helpers/constants";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getLoggedInUserRoleId } from "@utils/common";
import { useDispatch } from "react-redux";
import warningDeactivate from "@assets/images/svg/warningDeactivate.svg";

export default function RowTab(props) {
  const { data, handleChange, apis, relationType, title } = props;
  const { description, id, name, status, setShowSuccessPopup } = data;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [nameUpdate, setNameUpdate] = useState(name);
  const editAction = () => {
    setNameUpdate(description);
    setEdit(true);
  };

  const handleClose = () => {
    setIsChecked(false);
    setTestEdit(false);
    setTestFailEdit(false);
  };

  const saveAction = async () => {
    if (nameUpdate === "") {
      setError(true);
    } else {
      try {
        setEdit(false);
        setTestEdit(true);
      } catch (error) {}
    }
    setShowSuccessPopup(true);
  };

  const deleteAction = async () => {
    setTestFailEdit(true);
  };
  const apiss = [
    { key: "Race", api: COMMON_MASTER_DATA_APIS.raceList() },
    { key: "Ethnic Group", api: COMMON_MASTER_DATA_APIS.ethinicList() },
    { key: "Gender", api: COMMON_MASTER_DATA_APIS.genderList() },
    { key: "Guarantor", api: COMMON_MASTER_DATA_APIS.guarantorList() },
    { key: "Race", api: COMMON_MASTER_DATA_APIS.relationList() },
    { key: "CareGiver", api: COMMON_MASTER_DATA_APIS.careGiverList() },
    { key: "Facility Type", api: COMMON_MASTER_DATA_APIS.facilityList() },
    { key: "Services", api: COMMON_MASTER_DATA_APIS.serviceList() },
    { key: "Management Group", api: COMMON_MASTER_DATA_APIS.ManagementgroupList() },
    { key: "Order Type", api: COMMON_MASTER_DATA_APIS.orderList() },
    { key: "Specimen Type", api: COMMON_MASTER_DATA_APIS.specimenList() },
    { key: "Container Type", api: COMMON_MASTER_DATA_APIS.containerlistAll() },
    { key: "Orderable Type", api: COMMON_MASTER_DATA_APIS.OrderableList() },
    { key: "Performing Department", api: COMMON_MASTER_DATA_APIS.departmentList() },
    { key: "Work Group", api: COMMON_MASTER_DATA_APIS.workList() },
    { key: "Instrument", api: COMMON_MASTER_DATA_APIS.InstrumentList() }
  ];
  const handleFirstPopupOkay = async () => {
    try {
      if (relationType) {
        await dispatch(
          updateGroupData({
            url: apis[0],
            payload: { id, description: nameUpdate, roleId: getLoggedInUserRoleId(), relationType, status }
          })
        );
        const api = apiss.find((ele) => ele.key === title).api;
        dispatch(getPatientsByGroupId(api));
      } else {
        await dispatch(
          updateGroupData({
            url: apis[0],
            payload: { id, description: nameUpdate, roleId: getLoggedInUserRoleId(), status }
          })
        );
      }
      await dispatch(getPatientsByGroupId(apis[3]));
      handleClose(); // Close the first popup
      await dispatch(setShowSuccessPopup(true));
      await dispatch(setPopupMessage(""));
    } catch (error) {}
  };

  const handleFailPopupClose = async () => {
    try {
      await dispatch(deleteGroupData(`${apis[2]}${id}`));
      await dispatch(getPatientsByGroupId(apis[3]));

      handleClose();

      await dispatch(setShowSuccessPopup(true));
      await dispatch(setPopupMessage(""));
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleInputChange = (e) => {
    const GroupNameRegex = /^[A-Za-z !@/{}[#\$%\^\&*\)\(+=._-]{1}[A-Za-z !@?/{}[#\$%\^\&*\)\(+=._-]{0,}$/;
    const inputValue = e.target.value;

    if (inputValue?.length > 0 && !GroupNameRegex.test(inputValue)) {
      e.target.setCustomValidity("Invalid input. Please follow the pattern.");
    } else {
      e.target.setCustomValidity("");
      setNameUpdate(inputValue);
    }
  };
  const [testEdit, setTestEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [testFailEdit, setTestFailEdit] = useState(false);

  const [error, setError] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <TableRow className="action__items">
        <TableCell>
          {!edit && <Checkbox color="secondary" name={id} onChange={handleChange} checked={status} />}
          {!edit && <>{description}</>}
          {edit && (
            <TextField
              variant="outlined"
              className={`add__input ${error ? "error" : ""}`}
              value={nameUpdate}
              data-testid="myTextField"
              onChange={(e) => handleInputChange(e)}
              required
              InputProps={{
                classes: {
                  root: error ? "input-error" : "" // Apply the 'input-error' class when there's an error
                },
                endAdornment:
                  nameUpdate === "" ? (
                    <InputAdornment position="end">
                      <IconButton edge="end" aria-label="clear input" onClick={() => saveAction()}>
                        <Typography component="span" variant="span" className="ls-close secondaryIcon"></Typography>
                      </IconButton>
                    </InputAdornment>
                  ) : null
              }}
              error={error}
            />
          )}
        </TableCell>
        <TableCell>
          {edit && (
            <Button className="primaryTextButton" variant="text" startIcon={<SaveIcon />} onClick={() => saveAction()}>
              Save
            </Button>
          )}
          {!edit && Master && Master?.updateInd === true && (
            <Button
              className="primaryTextButton"
              variant="text"
              startIcon={
                <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
              }
              onClick={() => editAction()}
            >
              Edit
            </Button>
          )}
          {Master?.deleteInd === true && (
            <Button
              className="errorTextButton"
              variant="text"
              startIcon={
                <Typography component="span" variant="span" className="ls-delete deleteRedIcon fs-16"></Typography>
              }
              onClick={() => deleteAction()}
            >
              Delete
            </Button>
          )}
        </TableCell>
      </TableRow>
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
              Do you really want to update the data?
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={handleFirstPopupOkay}
                disabled={!isChecked}
              >
                Update
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}

      {testFailEdit && (
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
              Do you really want to delete the data?
            </Typography>
            <Typography variant="div" component="div" className="agree-section">
              <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
              <Typography className="agree-statement">Yes, I agree</Typography>
            </Typography>

            <Typography className="modal-buttons-wrapper">
              <Button autoFocus type="submit" className="primary-outline-btn" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                autoFocus
                type="submit"
                className="primary-btn"
                onClick={() => {
                  handleFailPopupClose();
                }}
                disabled={!isChecked}
              >
                Delete
              </Button>
            </Typography>
          </Box>
        </Modal>
      )}
    </>
  );
}
