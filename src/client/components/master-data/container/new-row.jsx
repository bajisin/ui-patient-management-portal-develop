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

// import ClearIcon from "@mui/icons-material/Clear";

// import DeleteIcon from "@mui/icons-material/DeleteForeverOutlined";

export default function NewRow(props) {
  const dispatch = useDispatch();
  const [nameUpdate, setNameUpdate] = useState("");

  const [descriptionUpdate, setDescriptionUpdate] = useState("");
  const { showSuccessPopup, popupMessage } = useSelector((state) => state.patientsByGroupData);
  const [error, setError] = useState(false);

  const { deleteRow, saveRowUpdate, apis, setAddRow } = props;

  const handleSecondPopupClose = () => {
    dispatch(setShowSuccessPopup(false));
    dispatch(setPopupMessage(""));
  };

  const saveGroup = async (e) => {
    if (nameUpdate === "" || descriptionUpdate === "") {
      setError(true);
    } else {
      try {
        await dispatch(
          saveGroupData({
            url: apis[0],
            payload: { name: nameUpdate, description: descriptionUpdate, roleId: 2, status: true }
          })
        );
        await dispatch(getPatientsByGroupId(apis[3]));
        await dispatch(setShowSuccessPopup(true));
        saveRowUpdate();
        setError(false);
        setNameUpdate("");
        setDescriptionUpdate("");
      } catch (error) {
        console.log("working or not");
      }
    }
  };

  const handleInputChange = (e) => {
    setNameUpdate(e.target.value);
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <TextField
            data-testid="myTextField"
            variant="outlined"
            className={`add__input ${error ? "error" : ""}`}
            value={nameUpdate}
            onChange={(e) => handleInputChange(e)}
            required
            InputProps={{
              classes: {
                root: error ? "input-error" : "" // Apply the 'input-error' class when there's an error
              },
              endAdornment:
                nameUpdate === "" ? ( // Render the ClearIcon conditionally
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
        <TableCell>
          <TextField
            variant="outlined"
            data-testid="myTextFieldDes"
            className={`add__input ${error ? "error" : ""}`}
            value={descriptionUpdate}
            onChange={(e) => setDescriptionUpdate(e.target.value)}
            required
            InputProps={{
              classes: {
                root: error ? "input-error" : "" // Apply the 'input-error' class when there's an error
              },
              endAdornment:
                descriptionUpdate === "" ? (
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
            <img src={checkmarkSuccess} className="modal-success-icon" />
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
