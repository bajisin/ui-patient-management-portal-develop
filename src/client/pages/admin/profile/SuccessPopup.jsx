import { Button, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import SuccessCheckMark from "@assets/images/svg/checkmarkSuccess.svg";

const SuccessPopup = ({ onClose }) => {
  return (
    <Dialog open onClose={onClose} className="logout__wrapper">
      <DialogContent className="d-flex flex-column align-items-center p-4">
        <img src={SuccessCheckMark} className="successImg successCheck" />
        <Typography component="h6" variant="h6" className="mt-4 mb-2">
          {"Sucessfully link shared."}
        </Typography>

        {/* <Typography component="p" variant="p">
          All the required data is successfully Uploaded
        </Typography> */}
      </DialogContent>
      <DialogActions className="justify-content-center pb-3">
        <Button onClick={onClose} variant="contained" className="primary-btn">
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;
