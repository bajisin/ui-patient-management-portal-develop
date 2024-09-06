import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React, { useRef } from "react";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId } from "@utils/common";

import FailPopup from "./failpopup";
import Loader from "../../utils/Loader";
import SuccessPopup from "./sucesspopup";
import { fileVaildation } from "@config/app-config";
import { roleIds } from "../../_helpers/constants";
import { updateAboutUs } from "../../redux/slices/masterDataSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export const TermsAndCondFileUpload = ({ open, setOpen }) => {
  const { pathname } = useLocation();
  const saTenantId = pathname.split("/")[3];
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const tenantId = loggedInUserRole === roleIds.SUPER_ADMIN ? saTenantId : getTenantId();
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFileSize, setSelectedFileSize] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [error, setError] = React.useState("");
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(false);
  const [showFailurePopup, setShowFailurePopup] = React.useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files && e.target.files[0];
    const allowedFileType = "application/pdf";
    const fileSizeLimit = 10 * 1024 * 1024;
    if (selectedFile && selectedFile.size <= fileSizeLimit && selectedFile.type === allowedFileType) {
      setSelectedFileName(selectedFile.name);
      setSelectedFileSize(selectedFile.size / 1024);
      setError("");
      setSelectedFile(selectedFile);
    } else {
      setSelectedFileName("");
      setError("Invalid file. Please select a PDF file within 10MB.");
      setSelectedFileSize(0);
    }
  };

  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };
  const dispatch = useDispatch();

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const selectedFile = event.dataTransfer.files[0];
    const fileSizeLimit = fileVaildation.fileSize;

    const allowedFileType = fileVaildation.fileVaildation;

    if (selectedFile && selectedFile.size <= fileSizeLimit && selectedFile.type === allowedFileType) {
      setSelectedFileName(selectedFile.name);
      setSelectedFileSize(selectedFile.size * 1024 * 1024);
      setSelectedFile(selectedFile);
      setError("");
      console.log("Dropped File:", selectedFile.name);
    } else {
      setSelectedFileName("");
      setSelectedFile(null);
      setSelectedFileSize(selectedFile.name);
      setError("Invalid file. Please drop a PDF file within 10MB.");
    }
  };
  const handleClearFile = () => {
    setSelectedFile(null);
    setSelectedFileName("");
    setError("");
    setSelectedFileSize("");
  };

  const updateFile = async () => {
    const formData = new FormData();
    formData.append("tenantId", tenantId);
    formData.append("termsAndCondsFile", selectedFile);
    formData.append("titleKey", 3);
    formData.append("createdBy", getLoggedInUserId());
    formData.append("role", getLoggedInUserRoleId());
    dispatch(updateAboutUs(formData));

    setIsLoading(true);

    try {
      const response = await dispatch(updateAboutUs(formData));

      setIsLoading(true);

      if (response.payload.status === 200) {
        console.log("API call succeeded");
        setShowSuccessPopup(true);
        console.log(showSuccessPopup, "API call succeeded");
      } else {
        setShowFailurePopup(true);
      }
    } catch (error) {
      console.log(error);
      // Handle API error if needed
    }
  };

  return (
    <>
      <Dialog
        aria-labelledby="Edit Terms and Conditions"
        open={open}
        enableResize={true}
        className="commonModal__wrapper"
      >
        <Box className="commonModal__wrapper--dialog">
          <IconButton
            aria-label="close"
            onClick={() => {
              setOpen(false);
            }}
            className="modalClose"
          >
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>
          <DialogTitle> Add Terms & Conditions </DialogTitle>
          <DialogContent className="p-0">
            <Box className="formcontrol__wrapper browseBtn__wrapper">
              <Typography
                component="div"
                variant="div"
                className={`customised__browse ${isDraggingOver ? "dragging-over" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <Typography variant="label" component="label" htmlFor="fileInput">
                  Drag & Drop files here or
                  <Button component="button" variant="contained" className="primary-btn" onClick={handleClick}>
                    Browse Device
                  </Button>
                  <input
                    className="browseInput"
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    ref={inputRef} // Use the ref to reference the file input element
                    accept=".pdf" // Specify the allowed file types
                    onChange={handleFileChange}
                  />
                </Typography>
              </Typography>
              {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
              {selectedFileName ? (
                <Typography component="div" variant="div" className="new__document mt-3">
                  <Typography component="label" variant="label">
                    {selectedFileName}
                    <Typography
                      variant="span"
                      component="span"
                      className="ls-close secondaryIcon"
                      onClick={handleClearFile}
                    ></Typography>
                  </Typography>
                  <br />
                  <Typography component="span" variant="span">
                    {selectedFileSize} KB
                  </Typography>
                </Typography>
              ) : (
                <Typography component="span" variant="span" className="mt-1">
                  please select a file
                </Typography>
              )}
            </Box>
            {error === "" && (
              <Button
                autoFocus
                className="primary-btn justify-content-start mt-3 float-end "
                component="outlined"
                type="submit"
                disabled={!selectedFile}
                onClick={updateFile}
                disabled={!selectedFile}
              >
                Upload
              </Button>
            )}
          </DialogContent>
        </Box>
        {isLoading && <Loader />}
      </Dialog>
      {showSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setShowSuccessPopup(false);
            setIsLoading(false);
            setOpen(false);
            window.location.reload();
          }}
        />
      )}
      {showFailurePopup && (
        <FailPopup
          onClose={() => {
            setShowFailurePopup(false);
            setIsLoading(false);
            setOpen(false);
          }}
        />
      )}
    </>
  );
};
