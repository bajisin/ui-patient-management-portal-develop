import { Button, Checkbox, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";

import React from "react";
import warningIcon from "@assets/images/svg/warningDeactivate.svg";

const DeleteConfirmationDialog = ({ open, setOpen, handleDelete, isChecked, handleCheckboxChange, setIsChecked }) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="logout" className="logout__wrapper">
      <DialogContent>
        <img className="warningImg" src={warningIcon} />
        <Typography component="p" variant="p">
          Are you sure you want to Delete?
        </Typography>
        <Typography variant="div" component="div" className="agree-section">
          <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
          <Typography className="agree-statement">Yes, I agree</Typography>
        </Typography>
      </DialogContent>
      <DialogActions>
        <Stack direction="row" gap={2}>
          <Button
            className="primary-btn"
            component="button"
            variant="contained"
            autoFocus
            onClick={() => handleDelete()}
            disabled={!isChecked}
          >
            Yes
          </Button>
          <Button
            className="primary-outline-btn"
            component="button"
            variant="outlined"
            onClick={() => {
              setOpen(false);
              setIsChecked(false);
            }}
            autoFocus
          >
            No
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
