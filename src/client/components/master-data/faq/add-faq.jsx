import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import React, { useState } from "react";

import FAQ from "./faq";
import SuccessPopup from "../sucesspopup";
import { createFAQs } from "@redux/slices/masterDataSlice";
import { getLoggedInUserRoleId } from "@utils/common";
import { useDispatch } from "react-redux";

const AddFAQ = ({ open, setOpen }) => {
  const [qsn, setQsn] = useState("");
  const [ans, setAns] = useState("");
  const dispatch = useDispatch();
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userDetails")).id;
  const tenantId = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;
  const [showSuccessPopup, setShowSuccessPopUp] = useState(false);

  const createFaq = () => {
    dispatch(
      createFAQs({
        faqQuestion: qsn,
        faqAnswer: ans,
        createdBy: loggedInUserId,
        role: getLoggedInUserRoleId(),
        tenantId
      })
    )
      .then(() => {
        setShowSuccessPopUp(true);
      })
      .catch((error) => {
        // Handle any errors that occurred during dispatch
        console.error("Error dispatching createFAQs:", error);
      });
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="faqs" className="commonModal__wrapper">
        <Box className="commonModal__wrapper--dialog">
          <IconButton aria-label="close" onClick={() => setOpen(false)} className="modalClose">
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>

          <DialogTitle>Add FAQ</DialogTitle>
          <DialogContent className="text-start p-0">
            <FAQ edit={true} setAns={setAns} setQsn={setQsn} />
          </DialogContent>
          <DialogActions>
            <Stack direction="row" gap={2}>
              <Button
                className="primary-btn"
                component="button"
                variant="contained"
                onClick={createFaq}
                disabled={
                  ans.toString("html") === "<p><br></p>" ||
                  qsn === "" ||
                  qsn.length > 50 ||
                  ans.toString("html").length > 1500
                }
              >
                Save
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
      {showSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setShowSuccessPopUp(false);
            setOpen(false);
            window.location.reload();
          }}
          successMessage={"Sucessfully Created"}
        />
      )}
    </>
  );
};

export default AddFAQ;
