import { Box, Button, Checkbox, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  deleteOrdersGroupData,
  getPatientsByGroupId,
  setPopupMessage,
  updateGroupData
} from "@redux/slices/masterData/patientsGroupSlice";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { Master } from "../../../_helpers/constants";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { getLoggedInUserRoleId } from "@utils/common";
import { useDispatch } from "react-redux";
import warningDeactivate from "../../../assets/images/svg/warningDeactivate.svg";

export default function ThreeRowsTab(props) {
  const { data, handleChange, apis, handleChangeForDefault, saveAll } = props;
  const { orderTypeDTO, ordPrtyDesc, schdlTime, ordTypToPrtyId, status, setShowSuccessPopup, defaultOrderType } = data;
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const [nameUpdate, setNameUpdate] = useState(name);
  const [orderUpdate, setOrderUpdate] = useState(name);
  const [scltimeUpdate, setSclTimeUpdate] = useState(name);
  const [isLoading, setIsLoading] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(true);
  const [error, setError] = useState(false);

  const editAction = () => {
    setNameUpdate(orderTypeDTO?.ordTypDesc);
    setOrderUpdate(ordPrtyDesc);
    setSclTimeUpdate(schdlTime);
    setEdit(true);
  };

  const handleClose = () => {
    setTestFailEdit(false);
    setTestEdit(false);
    setIsChecked(false);
  };

  const saveAction = async () => {
    if (nameUpdate === "") {
      setError(true);
    } else {
      try {
        setEdit(false);
        setTestEdit(true);
        setShowSuccessPopup(true);
      } catch (error) {
        setShowFailPopup(true);
      }
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
          payload: {
            orderTypeDTO: {
              ordTypId: data?.orderTypeDTO?.ordTypId,
              ordTypDesc: nameUpdate
            },
            ordPrtyId: data?.ordPrtyId,
            schdlTime: scltimeUpdate,
            ordPrtyDesc: orderUpdate,
            roleId: getLoggedInUserRoleId(),
            status: true,
            ordTypToPrtyId: data?.ordTypToPrtyId,
            defaultOrderType: data?.defaultOrderType
          }
        })
      );
      saveAll();
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
      await dispatch(deleteOrdersGroupData(ordTypToPrtyId));
      await dispatch(getPatientsByGroupId(apis[3]));
      handleClose(); // Close the first popup
      await dispatch(setShowSuccessPopup(true));
      dispatch(setPopupMessage(""));
    } catch (error) {
      setShowFailPopup(true);
    }
  };

  const handleInputChange = (e) => {
    setNameUpdate(e.target.value);
  };
  const handleOrderChange = (e) => {
    setOrderUpdate(e.target.value);
  };
  const handleTimeChange = (e) => {
    setSclTimeUpdate(e.target.value);
  };
  const [testEdit, setTestEdit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [testFailEdit, setTestFailEdit] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <TableRow className="order_edit--inputs">
        <TableCell>
          {showCheckbox && !edit && (
            <Checkbox color="secondary" name={ordTypToPrtyId} onChange={handleChange} checked={status} />
          )}

          {!edit && <>{orderTypeDTO?.ordTypDesc}</>}
          {edit && (
            <TextField
              variant="outlined"
              className="add__input"
              type="text"
              value={nameUpdate}
              onChange={(e) => handleInputChange(e)}
              InputProps={{
                classes: {
                  root: error ? "input-error" : "" // Apply the 'input-error' class when there's an error
                },
                endAdornment:
                  nameUpdate === "" ? (
                    <InputAdornment position="end">
                      <IconButton edge="end" aria-label="clear input" onClick={() => saveAction()}>
                        <Typography component="span" variant="span" className="ls-close primaryIcon"></Typography>
                      </IconButton>
                    </InputAdornment>
                  ) : null
              }}
              error={error}
              disabled={edit}
            />
          )}
        </TableCell>
        <TableCell>
          {showCheckbox && (
            <Checkbox
              color="secondary"
              name={ordTypToPrtyId}
              onChange={handleChangeForDefault}
              checked={defaultOrderType}
            />
          )}
        </TableCell>
        <TableCell>
          {!edit && <>{ordPrtyDesc}</>}
          {edit && (
            <TextField
              variant="outlined"
              className="add__input"
              type="text"
              value={orderUpdate}
              onChange={(e) => handleOrderChange(e)}
              disabled={edit}
            />
          )}
        </TableCell>
        <TableCell>
          {!edit && <>{schdlTime}</>}
          {edit && (
            <TextField
              variant="outlined"
              className="add__input"
              type="text"
              value={scltimeUpdate}
              onChange={(e) => handleTimeChange(e)}
            />
          )}
        </TableCell>
        <TableCell className="action__items">
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
          {Master && Master?.deleteInd === true && (
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
                  setTestFailEdit(false);
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
