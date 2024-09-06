import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { createOrderTemplate as createOrder, getOrderDuplicateCheck } from "@redux/slices/ordertemplateSlice";
import { useDispatch, useSelector } from "react-redux";

import CreateOrderTemplateTable from "./createOrderTemplateTable";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import checkmarkSuccess from "@assets/images/svg/checkmarkSuccess.svg";
import { createTemplatePayload } from "@utils/common";
import { getTenantTemplateDetails } from "@redux/slices/tenantsSlice";

const CreateOrderTemplate = ({ data, setOpen, open, title, templateId }) => {
  const [templateName, setTemplateName] = useState("");
  const [templateNameErr, setTemplateNameErr] = useState("");
  const dispatch = useDispatch();
  const handleCloseOkay = () => {
    setOpen(false);
    setShowSuccessPopup(false);
    setPopupMessage("");
    window.location.reload();
  };
  const handleClose = () => {
    setOpen(false);
    setShowSuccessPopup(false);
    setPopupMessage("");
  };
  const [popupMessage, setPopupMessage] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // const { showSuccessPopup } = useSelector((state) => state.orders);
  const { ordertestTemplate, orderDuplicateCheck } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getTenantTemplateDetails(data));
    if (templateId) setTemplateName(ordertestTemplate.orderTemplateName);
  }, [templateId, ordertestTemplate]);

  const handleSubmit = async () => {
    let action;
    const orderTemplate = data?.map((template) => ({
      panelId: template?.panelId,
      testCompendiumId: template?.testCompendiumId,
      testCategoryName: template?.testCategoryType,
      testCategoryId: template?.testCategoryId
    }));

    try {
      if (templateId)
        action = await dispatch(
          createOrder({
            ...createTemplatePayload(templateName, orderTemplate),
            orderTemplateId: templateId
            // CompendiumId: 2
          })
        );
      else action = await dispatch(createOrder(createTemplatePayload(templateName, orderTemplate)));
      if (createOrder.fulfilled.match(action)) {
        setShowSuccessPopup(true);
        setPopupMessage(action?.payload);
      }
    } catch (error) {
      console.log(error);
    }
    // POST the data to the JSON API URL
  };
  const handleClick = () => {
    if (templateName?.length >= 3) {
      setTemplateNameErr("");
      setDisabled(false);

      dispatch(getOrderDuplicateCheck({ orderTemplateName: templateName }));
    } else if (templateName?.length <= 2 && templateName?.length !== 0) {
      setTemplateNameErr("Please enter min 3 characters");
      setDisabled(true);
    } else if (templateName?.length === 0) {
      setTemplateNameErr("");
      setDisabled(false);
    }
  };
  useEffect(() => {
    if ((templateName?.length > 0 || templateName === "") && title !== "Edit") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [templateName]);

  useEffect(() => {
    if (orderDuplicateCheck.length > 0 && orderDuplicateCheck[0].orderTemplateName === templateName) {
      if (templateId && orderDuplicateCheck[0].orderTemplateName === ordertestTemplate?.orderTemplateName) {
        setTemplateNameErr("");
        setDisabled(false);
      } else {
        setTemplateNameErr("Template name already exists");
        setDisabled(true);
      }
    }
  }, [orderDuplicateCheck]);

  return (
    <>
      <Dialog
        aria-labelledby="Create Order Template"
        open={open}
        enableResize={true}
        className="commonModal__wrapper createOrder__template"
      >
        <form>
          <Box className="commonModal__wrapper--dialog">
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
            <DialogTitle>{title} Order Template</DialogTitle>
            <DialogContent>
              <Box className="formcontrol__wrapper">
                <Typography variant="label" component="label" className="add__label required">
                  Template Name
                </Typography>
                <TextField
                  variant="outlined"
                  className="add__input"
                  placeholder="Template Name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  error={Boolean(templateNameErr)}
                  helperText={templateNameErr}
                  onKeyUp={handleClick}
                />
              </Box>
              <Typography component="h6" variant="h6" className="w-100 mt-2">
                Selected Tests
              </Typography>
              <CreateOrderTemplateTable data={data} />
            </DialogContent>
            <DialogActions>
              <Button
                component="button"
                variant="outlined"
                className="primary-outline-btn"
                onClick={() => setOpen(false)}
              >
                Back
              </Button>
              <Button
                component="button"
                variant="contained"
                className="primary-btn"
                onClick={handleSubmit}
                disabled={disabled}
              >
                Confirm
              </Button>
            </DialogActions>
          </Box>
        </form>
      </Dialog>
      {showSuccessPopup && (
        <Modal
          open={showSuccessPopup}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="success_modal">
            <img src={checkmarkSuccess} className="modal-success-icon" />
            <Typography id="modal-modal-title" className="modal-modal-title" variant="h6" component="h6">
              Successfully {title === "Edit" ? "Updated" : "Created"}
            </Typography>
            <Typography id="modal-modal-description" className="modal-modal-description" variant="p" component="p">
              {popupMessage}
            </Typography>
            <Button
              variant="contained"
              onClick={handleCloseOkay}
              component="Button"
              className="primary-btn float-right mt-3"
            >
              okay
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CreateOrderTemplate;
