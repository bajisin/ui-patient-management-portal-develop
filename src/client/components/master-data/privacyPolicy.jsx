import "react-quill/dist/quill.snow.css";

import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { Master, formats, modules, roleIds } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId } from "../../utils/common";
import { useDispatch, useSelector } from "react-redux";

import FailPopup from "./failpopup";
import Loader from "../../utils/Loader";
import ReactQuill from "react-quill";
import SuccessPopup from "./sucesspopup";
import { updateAboutUs } from "@redux/slices/masterDataSlice";
import { useLocation } from "react-router-dom";

export default function PrivacyPolicy() {
  const { aboutUsData: data, status } = useSelector((state) => state.masterData);
  const dispatch = useDispatch();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailPopup, setShowFailPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [ErrorMessageforDescription, setErrorMessageforDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [edit, setEdit] = useState(true);
  const { pathname } = useLocation();
  const saTenantId = pathname.split("/")[3];
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const tenantId = loggedInUserRole === roleIds.SUPER_ADMIN ? saTenantId : getTenantId();

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateDescription = (value) => {
    setDescription(value);
  };
  useEffect(() => {
    if (status === "loaded") {
      setTitle(data?.pvtPlcy);
      setDescription(data?.pvtPlcydiscription);
    }
  }, [status]);
  const update = async () => {
    if (!title.trim()) {
      setErrorMessage("Title is required");
    } else if (!description.replace(/<p>|<\/p>|<br>/g, (match, p1) => (p1 === "<br>" ? match : "")).trim()) {
      setErrorMessageforDescription("Description is required");
    } else {
      setErrorMessage("");
      setErrorMessageforDescription("");

      const formData = new FormData();
      formData.append("tenantId", tenantId);
      formData.append("title", title);
      formData.append("createdBy", getLoggedInUserId());
      formData.append("role", getLoggedInUserRoleId());
      formData.append("description", description.toString("html"));
      formData.append("titleKey", 2);
      setIsLoading(true);

      try {
        const response = await dispatch(updateAboutUs(formData));

        setEdit(true);
        setIsLoading(false);
        if (response.payload.status === 200) {
          setShowSuccessPopup(true); // Show the success popup
        } else {
          setShowFailPopup(true);
        }
        setSuccessMessage(response.payload.data.data?.title || "Action completed successfully");
      } catch (error) {
        console.error("Error updating About Us:", error);
        setIsLoading(false);
        setErrorMessage(error.response?.data?.message || "An error occurred");
      }
    }
  };

  const editButton = () => {
    setEdit(false);
  };

  return (
    <>
      <Box className="list__header p-3">
        <Typography component="h5" variant="h5">
          Update Privacy Policy
        </Typography>
        <Stack direction="row" gap={2} className="header__wrapper--actions">
          {edit && Master && Master?.updateInd === true && getLoggedInUserRoleId() !== 1 ? (
            <Button className="bordered-icon-btn edit" onClick={() => editButton()}>
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
          ) : (
            <Button className="bordered-icon-btn edit" onClick={() => editButton()}>
              <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
            </Button>
          )}
          {!edit && (
            <Button
              component="button"
              variant="contained"
              className="primary-btn"
              onClick={() => update()}
              disabled={(title && title?.length > 50) || (description && description?.length > 1500)}
            >
              Update
            </Button>
          )}
        </Stack>
      </Box>
      <Box className="list__view px-3 pb-3">
        <Box className="formcontrol__wrapper">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="label" component="label" className="add__label required">
                Add Title
              </Typography>

              <TextField
                className="add__input"
                placeholder="enter title"
                data-testid="myElement"
                value={title}
                fullWidth
                onChange={updateTitle}
                disabled={edit}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography variant="label" component="label" className="add__label">
                Description
              </Typography>
              <Typography variant="div" component="div">
                <ReactQuill
                  value={description}
                  onChange={updateDescription}
                  modules={modules}
                  placeholder={"description"}
                  formats={formats}
                  readOnly={edit}
                />
                {ErrorMessageforDescription && <p className="error-message">{ErrorMessageforDescription}</p>}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {isLoading && <Loader />}
      {showSuccessPopup && <SuccessPopup onClose={() => setShowSuccessPopup(false)} successMessage={successMessage} />}
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} errorMessage={errorMessage} />}
    </>
  );
}
