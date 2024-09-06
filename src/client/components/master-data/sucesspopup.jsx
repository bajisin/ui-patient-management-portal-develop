import { Button, Typography } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import React from "react";
import SuccessCheckMark from "@assets/images/svg/checkmarkSuccess.svg";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPopup = ({ onClose, successMessage, name, call, type, patientDetailsById }) => {
  const navigate = useNavigate();

  const orderCreate=()=>{
    const queryParams = {
      param: "createOrder"
    };
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/create-order/${patientDetailsById?.patientId}?${queryString}`);
  }
  
  return (
    <Dialog open onClose={onClose} className="logout__wrapper">
      <DialogContent className="d-flex flex-column align-items-center p-4">
        <img src={SuccessCheckMark} className="successImg successCheck" />
        <Typography component="h6" variant="h6" className="mt-4 mb-2">
          {successMessage || "Sucessfully Updated."}
        </Typography>
        {type === "Upload" && (
          <Typography component="p" variant="p">
            All the required data is successfully Uploaded
          </Typography>
        )}
        {!name && !call && !type && (
          <Typography component="p" variant="p">
            All the required data is successfully updated
          </Typography>
        )}
      </DialogContent>
      <DialogActions className="justify-content-center pb-3">
        <Button onClick={onClose} variant="contained" className="primary-btn mx-3">
          Okay
        </Button>
        {patientDetailsById &&
        <Button autoFocus className="primary-outline-btn float-right pb-3" onClick={orderCreate}>
              Create Order
            </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default SuccessPopup;
