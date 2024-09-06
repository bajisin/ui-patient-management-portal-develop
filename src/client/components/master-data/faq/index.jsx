import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddFAQ from "./add-faq";
import FAQ from "./faq";
import FailPopup from "../failpopup";
import { Master } from "../../../_helpers/constants";
import SuccessPopup from "../sucesspopup";
import { getLoggedInUserRoleId } from "../../../utils/common";
import { updateFAQs } from "../../../redux/slices/masterDataSlice";

export default function FAQS() {
  const { faqData } = useSelector((state) => state.masterData);
  const [faqState, setFaqState] = useState([]);
  const [edit, setEdit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [open, setOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleQsnChange = (index, newQsn) => {
    const updatedFAQs = [...faqState];
    updatedFAQs[index] = {
      ...updatedFAQs[index],
      faqQuestion: newQsn
    };
    setFaqState(updatedFAQs);
  };

  const handleAnsChange = (index, newAns) => {
    const updatedFAQs = [...faqState];
    updatedFAQs[index] = {
      ...updatedFAQs[index],
      faqAnswer: newAns
    };
    setFaqState(updatedFAQs);
  };

  const updatedFaq = async () => {
    const action = await dispatch(updateFAQs(faqState));
    if (updateFAQs.rejected.match(action)) {
      setShowFailPopup(true);
    } else {
      // Action was successful
      setShowSuccessPopup(true);
      setSuccessMessage("Successfully Updated");
    }
  };
  useEffect(() => {
    setFaqState([...faqData]);
  }, [faqData]);

  return (
    <>
      <Box className="list__header p-3">
        <Typography component="h5" variant="h5">
          Update FAQ
        </Typography>
        <Stack direction="row" gap={2} className="header__wrapper--actions">
          {edit ? (
            Master?.createInd === true && getLoggedInUserRoleId() !== 1 ? (
              <Button onClick={handleClickOpen} component="button" variant="outlined" className="primary-outline-btn">
                Add FAQ
              </Button>
            ) : (
              <Button onClick={handleClickOpen} component="button" variant="outlined" className="primary-outline-btn">
                Add FAQ
              </Button>
            )
          ) : (
            <Button className="bordered-icon-btn edit" onClick={() => setEdit(true)}>
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
          )}

          <Button
            component="button"
            variant="contained"
            className="primary-btn"
            disabled={!edit && Master && Master?.createInd === false}
            onClick={updatedFaq}
          >
            Update
          </Button>
        </Stack>
      </Box>
      <Box className="list__view px-3 pb-3">
        {faqState?.map((faq, index) => {
          return (
            <FAQ
              key={index}
              faq={faq}
              questionIndex={index + 1}
              setQsn={(newQsn) => handleQsnChange(index, newQsn)}
              setAns={(newAns) => handleAnsChange(index, newAns)}
              edit={edit}
            />
          );
        })}
      </Box>
      {open && <AddFAQ open={open} setOpen={setOpen} setEdit={setEdit} />}
      {showSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setShowSuccessPopup(false);
            setOpen(false);
            window.location.reload();
          }}
          successMessage={successMessage}
        />
      )}
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}
    </>
  );
}
