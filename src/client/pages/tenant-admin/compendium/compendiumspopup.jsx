import { Box, Button, Checkbox, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import {
  fetchOrderableTypes,
  fetchWorkGroup,
  getContainerTypes,
  getInstrumentList,
  getPerformingDept,
  getSpecimentTypes
} from "@redux/slices/commonAdminApiSlice";
import {
  getLabList,
  getMneumonicList,
  getRelationList,
  uploadExcelFile,
  uploadPayercompendiumExcelFile
} from "@redux/slices/compendiumSlice";
import { useDispatch, useSelector } from "react-redux";

import CompendiumPayerAdd from "@components/compendiums/compendiumPayerAdd";
import CompendiumTablepopup from "./CompendiumTablepopup";
import CompendiumTestAdd from "@components/compendiums/compendiumTestAdd";
import Compendiumsucesspopup from "./compendiumsucesspopup";
import CreatePanelToggle from "../../../components/tenant-admin/order-config/createPanelToggle";
import Uploadconfirmation from "./uploadconfirmation";
import { fileVaildation } from "@config/app-config";
import { getTenantId } from "@utils/common";
import { roleIds } from "../../../_helpers/constants";
import { useLocation } from "react-router-dom";

export const CompendiumPopUp = ({ open, setOpen, currentTab, title }) => {
  const { pathname } = useLocation();
  const saTenantId = pathname.split("/")[2];
  const taTenantId = getTenantId();
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const tenantId = loggedInUserRole === roleIds.SUPER_ADMIN ? saTenantId : taTenantId;
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileSize, setSelectedFileSize] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [error, setError] = useState("");
  const [saveFile, setSaveFile] = useState(false);
  const [testResponse, setTestResponse] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const [showUploadConfirmation, setShowUploadConfirmation] = useState(false);
  const [formState, setFormState] = useState("upload");
  const [testEdit, setTestEdit] = useState(false);
  const [payerEdit, setPayerEdit] = React.useState(false);
  const { orderableTypes, workGroupData, performingData, specimentData, continerTypeData, instrumentList } =
    useSelector((state) => state.commonAdmin);
  const { labList, mneumonicList, relationList } = useSelector((state) => state.compendium);
  const handleFileChange = (e) => {
    const selectedFile = event.target.files && event.target.files[0];
    const allowedFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const fileSizeLimit = 10 * 1024 * 1024 * 1024; // 10MB in bytes
    if (selectedFile && selectedFile.size <= fileSizeLimit && selectedFile.type === allowedFileType) {
      setSelectedFileName(selectedFile.name);
      setSelectedFileSize(selectedFile.size / 1024);
      setError("");
      setSaveFile(true);
      setSelectedFile(selectedFile);
    } else {
      setSelectedFileName("");
      setError("Invalid file. Please select a xlsx file within 10MB.");
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
    const fileSizeLimit = fileVaildation.fileSize; // 10MB in kilobytes

    const allowedFileType = fileVaildation.fileVaildation;

    if (selectedFile && selectedFile.size <= fileSizeLimit && selectedFile.type === allowedFileType) {
      setSelectedFileName(selectedFile.name);
      setSelectedFileSize(selectedFile.size * 1024 * 1024);
      setSelectedFile(selectedFile);
      setError("");
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
  const handleUploadConfirmationClose = () => {
    setShowUploadConfirmation(false);
  };

  const handleUploadConfirmationSave = () => {
    setShowUploadConfirmation(false);
    setShowSuccessPopup(true);
  };
  const updateFile = async () => {
    const formData = new FormData();
    formData.append("tenantId", tenantId);
    formData.append("file", selectedFile);

    if (currentTab === 0) {
      dispatch(uploadExcelFile(formData));
      try {
        const response = await dispatch(uploadExcelFile(formData));

        const testError = response.payload.data.data.filter((e) =>
          e.includes("Contains null values excel data related to given order code")
        );

        if (response.payload.data.data.length > 0 && response.payload.status === 200 && selectedFileSize > 0) {
          if (testError) {
            setTestResponse(testError);
            setShowUploadConfirmation(true);
            setShowSuccessPopup(false);
            setShowFailurePopup(true);
          } else {
            setShowUploadConfirmation(true);
            setShowFailurePopup(false);
            setShowSuccessPopup(true);
          }
        }
      } catch (error) {}
    } else {
      dispatch(uploadPayercompendiumExcelFile(formData));
      try {
        const Payerresponse = await dispatch(uploadPayercompendiumExcelFile(formData));
        const payerError = Payerresponse.payload.data.data.filter((e) =>
          e.includes("Contains null values in excel data related to payer code")
        );
        if (
          Payerresponse.payload.data.data.length > 0 &&
          Payerresponse.payload.status === 200 &&
          selectedFileSize > 0
        ) {
          if (payerError) {
            setTestResponse(payerError);
            setShowUploadConfirmation(true);
            setShowSuccessPopup(false);
            setShowFailurePopup(true);
          } else {
            setShowUploadConfirmation(true);
            setShowFailurePopup(false);
            setShowSuccessPopup(true);
          }
        }
      } catch (error) {}
    }
  };
  const uploadFile = () => {
    if (selectedFileName.length > 0) {
      setShowUploadConfirmation(true);
    } else {
      setShowUploadConfirmation(false);
    }
  };
  const handleFormView = (value) => {
    setFormState(value);
    if (title === "Test Compendium") {
      setTestEdit(true);
      if (orderableTypes.length === 0) {
        dispatch(fetchOrderableTypes());
      }
      if (workGroupData.length === 0) {
        dispatch(fetchWorkGroup());
      }
      if (performingData.length === 0) {
        dispatch(getPerformingDept());
      }
      if (specimentData.length === 0) {
        dispatch(getSpecimentTypes());
      }
      if (continerTypeData.length === 0) {
        dispatch(getContainerTypes());
      }
      if (instrumentList.length === 0) {
        dispatch(getInstrumentList());
      }
    } else {
      setPayerEdit(true);
      if (labList.length === 0) {
        dispatch(getLabList());
      }
      if (mneumonicList.length === 0) {
        dispatch(getMneumonicList());
      }
      if (relationList.length === 0) {
        dispatch(getRelationList(2));
      }
    }
  };
  return (
    <>
      <Dialog
        aria-labelledby="add compendium modal"
        open={open}
        enableResize={true}
        className="commonModal__wrapper mt-0"
      >
        <Box className="commonModal__wrapper--dialog">
          <IconButton aria-label="close" onClick={() => setOpen(false)} className="modalClose">
            <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
          </IconButton>

          <Box className="test-modal-button">
            <DialogTitle className="p-0"> Add {title} </DialogTitle>

            <CreatePanelToggle currentTab={currentTab} title={title} setOpen={setOpen} />
          </Box>
          {/* <Box className="mb-3">
            <Button
              component="button"
              variant="outlined"
              className="primary-btn"
              onClick={() => handleFormView("Manual")}
            >
              Manual
            </Button>
            <Button
              component="button"
              variant="outlined"
              className="primary-btn ms-2"
              onClick={() => handleFormView("upload")}
            >
              Upload
            </Button>
          </Box> */}

          {/* {formState === "upload" && (
            <DialogContent sx={{ padding: "0" }}>
              <Box className="formcontrol__wrapper">
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
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      onChange={handleFileChange}
                    />
                  </Typography>
                </Typography>
                {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
                {selectedFileName ? (
                  <Typography component="div" variant="div" className="new__document mt-3">
                    <Typography component="label" variant="label">
                      {selectedFileName}
                      <CloseIcon onClick={handleClearFile} className="cursor-pointer" />
                    </Typography>
                    <br />
                    <Typography component="span" variant="span">
                      {selectedFileSize} KB
                    </Typography>
                  </Typography>
                ) : (
                  <Typography component="span" variant="span">
                    {/* please select a file     *
                  </Typography>
                )}
              </Box>
              <Button autoFocus className="primary-btn justify-content-start mt-3" type="submit" onClick={uploadFile}>
                Upload
              </Button>
            </DialogContent>
          )}
          {formState === "Manual" && (
            <>
              <>{title === "Test Compendium" && <CompendiumTestAdd setOpen={setTestEdit} open={testEdit} />}</>
              <>
                {title === "Payer Compendium" && (
                  <CompendiumPayerAdd payerEdit={payerEdit} setPayerEdit={setPayerEdit} />
                )}
              </>
            </>
          )} */}
        </Box>
      </Dialog>
      {showUploadConfirmation && (
        <Uploadconfirmation
          open={showUploadConfirmation}
          onClose={handleUploadConfirmationClose}
          onSave={handleUploadConfirmationSave}
          saveFile={updateFile}
        />
      )}
      {showSuccessPopup && (
        <Compendiumsucesspopup
          onClose={() => {
            setShowSuccessPopup(false);
            setOpen(false);
          }}
        />
      )}
      {showFailurePopup && (
        <CompendiumTablepopup
          testresponse={testResponse}
          isOpen={showFailurePopup}
          onClose={() => {
            setShowFailurePopup(false);
            setOpen(false);
          }}
        />
      )}
    </>
  );
};
