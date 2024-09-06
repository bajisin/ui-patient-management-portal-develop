import { Button, Dialog, DialogActions, DialogContent, Stack, Typography, Box, Checkbox } from "@mui/material";
import React, { useState } from "react";
import warningIcon from "@assets/images/svg/warningDeactivate.svg";

const Uploadconfirmation = ({ open, onClose, onSave, saveFile }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  return (
    <Dialog open onClose={onClose} className="logout__wrapper">
      <DialogContent className="d-flex flex-column align-items-center p-4">
        <img className="warningImg" src={warningIcon} />
        <Typography component="p" variant="p">
          Are you sure you want to Upload the compendium
        </Typography>
        <Typography variant="div" component="div" className="agree-section">
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          <Typography className="agree-statement">Yes, I agree</Typography>
        </Typography>
      </DialogContent>
      <DialogActions className="justify-content-center pb-3">
        <Stack direction="row" gap={2}>
          <Button className="primary-outline-btn" component="button" variant="contained" autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button className="primary-btn" component="button" variant="outlined" onClick={saveFile} autoFocus>
            Save
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default Uploadconfirmation;
