import {
  Box,
  Button,
  Checkbox,
  DialogContent,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from "@mui/material";
import { PayerCompendium, TestCompendium } from "../../../../../config/api-config";
import React, { useRef, useState } from "react";
import {
  fetchOrderableTypes,
  fetchWorkGroup,
  getContainerTypes,
  getInstrumentList,
  getPerformingDept,
  getSpecimentTypes,
  getSpecimenFrozen
} from "@redux/slices/commonAdminApiSlice";
import {
  getLabList,
  getMneumonicList,
  getRelationList,
  uploadExcelFile,
  uploadPayercompendiumExcelFile
} from "@redux/slices/compendiumSlice";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import CompendiumPayerAdd from "@components/compendiums/compendiumPayerAdd";
import CompendiumTablepopup from "../../../pages/tenant-admin/compendium/CompendiumTablepopup";
import CompendiumTestAdd from "@components/compendiums/compendiumTestAdd";
import Compendiumsucesspopup from "../../../pages/tenant-admin/compendium/compendiumsucesspopup";
import PayerCompendiumTable from "../../../pages/tenant-admin/compendium/payerCompendiumTable";
import Uploadconfirmation from "../../../pages/tenant-admin/compendium/uploadconfirmation";
import { fileVaildation } from "@config/app-config";
import { getTenantId } from "@utils/common";
import { roleIds } from "../../../_helpers/constants";
import { useLocation } from "react-router-dom";
import Loader from "../../../utils/Loader";

export default function CreatePanelToggle({ title, currentTab, setOpen }) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [alignment, setAlignment] = React.useState("left");
  const [formState, setFormState] = useState("upload");
  const [testEdit, setTestEdit] = useState(false);
  const [payerEdit, setPayerEdit] = React.useState(false);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [error, setError] = useState("");
  const [saveFile, setSaveFile] = useState(false);
  const [showUploadConfirmation, setShowUploadConfirmation] = useState(false);
  const [testResponse, setTestResponse] = useState([]);
  const loggedInUserRole = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const { pathname } = useLocation();

  const saTenantId = pathname.split("/")[2];
  const taTenantId = getTenantId();
  const tenantId = loggedInUserRole === roleIds.SUPER_ADMIN ? saTenantId : taTenantId;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const [payerTablePopup, setPayerTablePopup] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileSize, setSelectedFileSize] = useState(0);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [loader, setLoader] = useState(false);
  const { orderableTypes, workGroupData, performingData, specimentData, continerTypeData, instrumentList,specimenFrozenType } =
    useSelector((state) => state.commonAdmin);
  const { labList, mneumonicList, relationList } = useSelector((state) => state.compendium);
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const updateFile = async () => {
    setLoader(true)
    const formData = new FormData();
    formData.append("tenantId", tenantId);
    formData.append("file", selectedFile);

    if (currentTab === 0) {
      dispatch(uploadExcelFile(formData));
      try {
        const response = await dispatch(uploadExcelFile(formData));
        const testError = response?.payload?.data?.data;
        if (response?.payload?.data?.error === true) {
          setLoader(false);
          setError(response?.payload?.data?.data?.message);
        }
        if (testError?.length > 0 && selectedFile) {
          if (testError) {
            setLoader(false)
            setTestResponse(testError);
            setShowFailurePopup(true);
          }
        }
      } catch (error) {}
    } else {
      dispatch(uploadPayercompendiumExcelFile(formData));
      try {
        const payerResponse = await dispatch(uploadPayercompendiumExcelFile(formData));
        const responseValue = payerResponse?.payload?.data?.data;
        if (payerResponse?.payload?.data?.error === true) {
          setError(payerResponse?.payload?.data?.data?.message);
        }
        if (payerResponse.payload.data.data.length > 0 && payerResponse.payload.status === 200 && selectedFileSize) {
          if (responseValue) {
            setTestResponse(responseValue);
            setPayerTablePopup(true);
          }
        }
      } catch (error) {}
    }
    setLoader(false)
  };
  const dispatch = useDispatch();
  const handleDrop = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);

    const selectedFile = event.dataTransfer.files[0];
    const fileSizeLimit = fileVaildation.fileSize; // 10MB in kilobytes

    const allowedFileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

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
  const handleFileChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files && e.target.files[0];
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
  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDraggingOver(true);
  };
  const uploadFile = () => {
    if (selectedFileName.length > 0) {
      // setShowUploadConfirmation(true);
      updateFile();
    }
  };
  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDraggingOver(false);
  };
  const inputRef = useRef(null);

  const handleClick = (event) => {
    // event.preventDefault();
    event.stopPropagation();
    // inputRef.current.click();
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
      if(specimenFrozenType.length === 0){
        dispatch(getSpecimenFrozen());
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
        dispatch(getRelationList(1));
      }
    }
  };
  const handleUploadConfirmationClose = () => {
    setShowUploadConfirmation(false);
  };

  const handleUploadConfirmationSave = () => {
    setShowUploadConfirmation(false);
    setShowSuccessPopup(true);
  };
  const downloadFile = () => {
    // Replace 'path/to/your/file.txt' with the actual path to your file
    const url = title !== "Test Compendium" ? PayerCompendium : TestCompendium; // Replace with the actual file URL
    const link = document.createElement("a");
    link.href = url;
    link.download = "ABNEnglish.pdf"; // Set the desired filename for download
    link.click();
  };
  return (
    <>
      <Box className="toggle-buttons-compendium">
      {loader && <Loader />}
        <ToggleButtonGroup
          className="toggle__buttons p-0"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            className="toggle__buttons--left"
            onClick={() => handleFormView("Manual")}
            value="justified"
            aria-label="left aligned"
          >
            <Typography className="list_name">Manual</Typography>
          </ToggleButton>

          <ToggleButton
            className="toggle__buttons--right"
            onClick={() => handleFormView("upload")}
            value="left"
            aria-label="justified"
          >
            <Typography className="grid_name">Upload</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box>
        {formState === "upload" && (
          <Typography component="div" variant="div" className="subtitle-compendium">
            Upload {title} Document
          </Typography>
        )}
        {formState === "Manual" && (
          <Typography component="div" variant="div" className="subtitle-compendium">
            {title} Information
          </Typography>
        )}
        {formState === "upload" && (
          <DialogContent className="p-0">
            {}
            <Box className="formcontrol__wrapper compendium__uploadModal">
              <Typography
                component="div"
                variant="div"
                className={`customised__browse ${isDraggingOver ? "dragging-over" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
              >
                <Box className="addCompendium__uplaodSection" onClick={(event) => handleClick(event)}>
                  <IconButton>
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-upload-icon upload-icon-compendium"
                    ></Typography>
                  </IconButton>
                  <Typography className="upload-titles">
                    <Typography variant="label" component="label" className="drag-drop-title" htmlFor="fileInput">
                      Drag and drop files to upload or you can select file by
                      <Typography component="span" variant="contained" className="ms-1 click-here">
                        Clicking here
                      </Typography>
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

                    <Typography variant="label" component="label" className="supported-file">
                      Supported files : XLXS
                    </Typography>
                  </Typography>
                </Box>
              </Typography>
              <Button onClick={downloadFile}>Download Sample Template</Button>
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
                  {/* please select a file     */}
                </Typography>
              )}
            </Box>
            <Button autoFocus className="primary-btn upload-compendium btn" type="submit" onClick={uploadFile}>
              Next
            </Button>
          </DialogContent>
        )}
        {formState === "Manual" && (
          <>
            {}
            <>{title === "Test Compendium" && <CompendiumTestAdd setOpen={setOpen} />}</>
            <>
              {title === "Payer Compendium" && (
                <CompendiumPayerAdd payerEdit={payerEdit} setPayerEdit={setPayerEdit} setOpen={setOpen} />
              )}
            </>
          </>
        )}
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
            testResponse={testResponse}
            isOpen={showFailurePopup}
            setShowFailurePopup={setShowFailurePopup}
            setOpen={setOpen}
            onClose={() => {
              setShowFailurePopup(false);
              setOpen(false);
            }}
          />
        )}
        {payerTablePopup && (
          <PayerCompendiumTable
            testResponse={testResponse}
            isOpen={payerTablePopup}
            setPayerTablePopup={setPayerTablePopup}
            setOpen={setOpen}
            onClose={() => {
              setPayerTablePopup(false);
              setOpen(false);
            }}
          />
        )}
      </Box>
    </>
  );
}
