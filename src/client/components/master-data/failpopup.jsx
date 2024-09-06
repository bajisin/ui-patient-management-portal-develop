import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ErrorIcon from "@mui/icons-material/Error";
import React from "react";

const FailPopup = ({ onClose, errorMessage }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogContent className="d-flex flex-column align-items-center p-4">
        <ErrorIcon className="fs-64 deleteRedIcon" />
        <p>{errorMessage || "Oops! Something went wrong."}</p>
        <p>{"Please try again after sometime."}</p>
      </DialogContent>
      <DialogActions className="justify-content-center pb-3">
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default FailPopup;
