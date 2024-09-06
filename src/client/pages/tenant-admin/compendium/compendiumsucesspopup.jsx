import React from "react";

import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const Compendiumsucesspopup = ({ onClose }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogContent className="d-flex flex-column align-items-center p-4">
        <CheckCircleIcon className="fs-64 success--medium" />
        <p>File Uploaded successfully</p>
      </DialogContent>
      <DialogActions className="justify-content-center pb-3">
        <Button onClick={onClose} variant="outlined" color="primary">
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Compendiumsucesspopup;
