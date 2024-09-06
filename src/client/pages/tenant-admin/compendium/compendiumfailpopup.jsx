import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import ErrorIcon from "@mui/icons-material/Error";
import React from "react";

const Compendiumfailpopup = ({ onClose, errorMessage }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogContent className="d-flex flex-column align-items-center p-4">
        <ErrorIcon className="fs-64 error--bright" />
        <p>{errorMessage} Oops! Something went wrong.</p>
      </DialogContent>
      <DialogActions className="justify-content-center p-3">
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Compendiumfailpopup;
