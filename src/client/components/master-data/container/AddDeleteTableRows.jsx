import { Box, Button, Checkbox, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  deleteGroupData,
  getPatientsByGroupId,
  setPopupMessage,
  updateGroupData
} from "@redux/slices/masterData/patientsGroupSlice";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getLoggedInUserRoleId } from "@utils/common";
import { useDispatch } from "react-redux";
import warningDeactivate from "../../../assets/images/svg/warningDeactivate.svg";

export default function ThreeRowsTab(props) {
  const { data, handleChange, apis } = props;
  const { description, id, name, status, setShowSuccessPopup } = data;
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const [nameUpdate, setNameUpdate] = useState("");
  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);

  const editAction = () => {
    setNameUpdate(name);
    setDescriptionUpdate(description);
    setEdit(true);
  };

  const handleClose = () => {
    setTestEdit(false);
  };

  const saveAction = async () => {
    setIsLoading(true);
    if (nameUpdate === "" || descriptionUpdate === "") {
      setError(true);
    } else {
      setEdit(false);
      setTestEdit(true);
    }
  };
  const deleteAction = async () => {
    setIsLoading(true);

    try {
      setTestFailEdit(true);
    } catch (error) {
      setShowFailPopup(true);
    }
  };
  const handleFirstPopupOkay = async () => {
    try {
      await dispatch(
        updateGroupData({
          url: apis[0],
          payload: { id, description: descriptionUpdate, name: nameUpdate, roleId: getLoggedInUserRoleId(), status }
        })
      );
      await dispatch(getPatientsByGroupId(apis[3]));
      handleClose(); // Close the first popup
      await dispatch(setShowSuccessPopup(true));
      await dispatch(setPopupMessage(""));
    } catch (error) {
      setShowFailPopup(true);
    }
  };
  const handleFailPopupClose = async () => {
    try {
      await dispatch(deleteGroupData(`${apis[2]}${id}`));
      dispatch(getPatientsByGroupId(apis[3]));
      handleClose(); // Close the first popup
      dispatch(setShowSuccessPopup(true));
      dispatch(setPopupMessage(""));
    } catch (error) {
      setShowFailPopup(true);
    }
  };
  const handleInputChange = (e) => {
    setNameUpdate(e.target.value);
  };
  const handleDesInputChange = (e) => {
    setDescriptionUpdate(e.target.value);
  };
  const [testEdit, setTestEdit] = useState(false);

  const [testFailEdit, setTestFailEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <TableRow className="action__items">
        <TableCell>
          <Checkbox color="secondary" name={id} onChange={handleChange} checked={status} />
          {!edit && <>{name}</>}
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
                      <IconButton edge="end" aria-label="clear input" onClick={() => saveAction()}></IconButton>
                    </InputAdornment>
                  ) : null
              }}
              error={error}
            />
          )}
        </TableCell>
        <TableCell>
          {!edit && <>{description}</>}
          {edit && (
            <TextField
              variant="outlined"
              className={`add__input ${error ? "error" : ""}`}
              value={descriptionUpdate}
              data-testid="myTextFieldDes"
              onChange={(e) => handleDesInputChange(e)}
              required
              InputProps={{
                classes: {
                  root: error ? "input-error" : "" // Apply the 'input-error' class when there's an error
                },
                endAdornment:
                  descriptionUpdate === "" ? (
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
          {!edit && (
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
