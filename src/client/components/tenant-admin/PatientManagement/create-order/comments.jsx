import React, { useState } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

const Comments = ({ onClose, reasonForReject, setReasonForReject, rSubmit }) => {
  const maxLength = 1500;
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      setReasonForReject(inputValue);
    } else {
      setError(true);
    }
  };
  return (
    <Dialog open onClose={onClose} className="order-reject-reason">
      <h4 class="p-3">
        <label>Reason for Reject:</label>
      </h4>
      <DialogContent className="d-flex flex-column align-items-center p-4">
        <div>
          <textarea
            id="w3review"
            name="w3review"
            rows="4"
            cols="50"
            maxLength={maxLength}
            onChange={handleChange}
            value={reasonForReject}
            className="p-3"
          ></textarea>
          {error && <p style={{ color: "red" }}>Maximum length exceeded</p>}
        </div>
      </DialogContent>
      <DialogActions className="justify-content-center pb-3">
        <Button onClick={onClose} variant="outlined" color="primary">
          Close
        </Button>
        <Button onClick={rSubmit} variant="filled" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Comments;
