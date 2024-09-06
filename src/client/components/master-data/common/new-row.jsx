import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  getPatientsByGroupId,
  saveGroupData,
  setPopupMessage,
  setShowSuccessPopup
} from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch, useSelector } from "react-redux";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import checkmarkSuccess from "../../../assets/images/svg/checkmarkSuccess.svg";

export default function NewRow(props) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState(false);
  const { showSuccessPopup, popupMessage } = useSelector((state) => state.patientsByGroupData);
  const { deleteRow, saveRowUpdate, apis, setAddRow, relationType } = props;

  const handleSecondPopupClose = () => {
    dispatch(setShowSuccessPopup(false));
    dispatch(setPopupMessage(""));
  };
  const saveGroup = async (e) => {
    if (groupName === "") {
      setError(true);
    } else {
      try {
        if (relationType) {
          await dispatch(
            saveGroupData({ url: apis[0], payload: { description: groupName, roleId: 2, status: true, relationType } })
          );
        } else {
          await dispatch(saveGroupData({ url: apis[0], payload: { description: groupName, roleId: 2, status: true } }));
        }
        await dispatch(getPatientsByGroupId(apis[3]));
        await dispatch(setShowSuccessPopup(true));

        saveRowUpdate();
        setError(false);
      } catch (error) {
        console.log("data is not saved properly");
      }
    }
  };

  const handleInputChange = (e) => {
    const GroupNameRegex = /^[A-Za-z !@/{}[#\$%\^\&*\)\(+=._-]{1}[A-Za-z !@?/{}[#\$%\^\&*\)\(+=._-]{0,}$/;
    const inputValue = e.target.value;
    setGroupName(inputValue);

    if (!GroupNameRegex.test(inputValue)) {
      e.target.setCustomValidity("Invalid input. Please follow the pattern.");
    } else {
      e.target.setCustomValidity("");
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <TextField
            variant="outlined"
            className={`add__input ${error ? "error" : ""}`}
            value={groupName}
            onChange={(e) => handleInputChange(e)}
            data-testid="myTextField"
            required
            InputProps={{
              classes: {
                root: error ? "input-error" : "" // Apply the 'input-error' class when there's an error
              },
              endAdornment:
                groupName === "" ? ( // Render the ClearIcon conditionally
                  <InputAdornment position="end">
                    <IconButton edge="end" aria-label="clear input" onClick={() => setAddRow(false)}>
                      <Typography component="span" variant="span" className="ls-close secondaryIcon"></Typography>
                    </IconButton>
                  </InputAdornment>
                ) : null
            }}
            error={error}
          />
        </TableCell>
        <TableCell className="action__items">
          <Button className="primaryTextButton" variant="text" startIcon={<SaveIcon />} onClick={(e) => saveGroup(e)}>
            Save
          </Button>
          <Button
            className="errorTextButton"
            variant="text"
            startIcon={
              <Typography component="span" variant="span" className="ls-delete deleteRedIcon fs-16"></Typography>
            }
            onClick={() => deleteRow()}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      {showSuccessPopup && (
        <Modal
          open={showSuccessPopup}
          onClose={handleSecondPopupClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="successImg modal-success-icon" />
            <Typography id="modal-modal-description" className="modal-modal-description">
              {popupMessage}
            </Typography>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleSecondPopupClose}>
              Okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
