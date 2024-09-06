import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { docIds, statusIds } from "../../../../../_helpers/constants";
import { getDoc, priorAuthCheck, providerSignClear, verifyABN } from "@redux/slices/order-slice";
import { useDispatch, useSelector } from "react-redux";

import GroupInsurance from "@assets/images/ls_svg/tenantAdmin/GroupInsurance.svg";
import ImageCrop from "./image-crop";
import OrderReports from "@components/drawers/orderReports";
import PdfDialog from "@components/drawers/pdfDialog";
import QRCodeGeneration from "../../QRCode";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { getLoggedInUserId } from "@utils/common";
import insurancePolicyImage from "@assets/images/ls_svg/tenantAdmin/insurance-policy.svg";
import qrIcon from "@assets/images/qr-code.png";

export const EligibilityDetails = (props) => {
  const {
    res,
    setSelectedFile,
    selectedFile,
    setProviderSign,
    providerSign,
    submisionType,
    setSubmisionType,
    setRequisition,
    requisition,
    // selectedPanels,
    selectedTests,
    selectedDiagnosisCodes,
    preAuthCheck,
    setPreAuthCheck,
    setCroppedImage,
    handleSubmit,
    setStep3Complete,
    setStatusId,
    patientId,
    setAbnValid,
    type
  } = props;
  const { scheduleTimeList, provDocStatus, abnDocStatus } = useSelector((state) => state.createOrder);
  const ABNInputVerify = useRef(null);
  const requisitions = useRef(null);
  const providerSignInputRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openQRCode, setOpenQrCode] = useState(false);
  const [docId, setDocId] = useState();
  const [abnDocStat, setAbnDocStat] = useState("");
  const dispatch = useDispatch();
  const { orderDetailsById } = useSelector((state) => state.tenants);
  const cptCodes = [];
  cptCodes.push(...(selectedTests?.map((test) => test?.cptCodes) || []));
  const abnUrl = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantConfigurationDTO?.abnUrl;
  const downloadFile = () => {
    window.open(abnUrl, "_blank");
    // const link = document.createElement("a");
    // link.href = url;
    // link.download = "ABNEnglish.pdf"; // Set the desired filename for download
    // link.click();
  };
  useEffect(() => {
    if (Object.keys(orderDetailsById)?.length > 0 && type === "edit-order") {
      if (orderDetailsById?.orderDocument?.length > 0) {
        setProviderSign(
          orderDetailsById?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.providerSignDocId)?.docUrl
        );
        setState(
          orderDetailsById?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.providerSignDocId)?.docUrl
        );
        setPatientDocId(
          orderDetailsById?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.providerSignDocId)
            ?.patientDocId
        );
        setSelectedFile(
          orderDetailsById?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.abnDocID) ||
            res?.orderDocument?.find((orderDoc) => orderDoc?.docTypeId === docIds.abnDocID)
        );
      }
    }
  }, [orderDetailsById]);
  const abnPayload =
    cptCodes?.length > 0 &&
    cptCodes.map((cpt, i) => {
      const codes = cpt?.split(",")?.length > 0 ? cpt?.split(",").map((code) => code) : [cpt];
      const diagnosticCode =
        Array.isArray(selectedDiagnosisCodes[i]?.dgnstcCodes) && selectedDiagnosisCodes[i]?.dgnstcCodes?.length > 0
          ? selectedDiagnosisCodes[i]?.dgnstcCodes?.map((code) => code?.diagnosticCode) // Extract the code from each element
          : null;
      const code = diagnosticCode === null ? [] : diagnosticCode;
      return { cptCode: codes, diagnosticCode: code };
    });
  const [file, setFile] = useState("");
  const handleClick = (file) => {
    if (file === "providerSign") {
      // providerSignInputRef.current.click();
      setFile(file);
    } else if (file === "ABNVerify") {
      setFile(file);
      ABNInputVerify.current.click();
    } else if (file === "requisitions") {
      setFile(file);
      // requisitions.current.click();
    }
  };
  const handleFileChange = (event, type) => {
    console.log(event, type, "tet");
    if (type === "providerSign" && file === "providerSign") {
      setProviderSign(event.target.files[0]);
      setIsDialogOpen(true);
    } else if (type === "ABNVerify" || file === "ABNVerify") {
      setSelectedFile(event.target.files[0]);
    } else if (type === "requisitions" || file === "requisitions") {
      setRequisition(event.target.files[0]);
    }
  };
  const pAuthpayload = {
    cptCode: cptCodes
  };
  const [preAuth, setPreAuth] = useState("");
  const [patientDocId, setPatientDocId] = useState("");
  const [ABN, setAbn] = useState("");
  const [preAuthButton, setPreAuthButton] = useState(false);
  const abnVerification = () => dispatch(verifyABN(abnPayload)).then((r) => setAbn(r.payload.respMessage));
  const priorAuthChec = () =>
    dispatch(priorAuthCheck(pAuthpayload)).then((s) => {
      if (s.payload.required === true) {
        setPreAuth("Prior Authorization is Required");
        setPreAuthButton(true);
      } else {
        setPreAuth("Prior Authorization is not Required");
        setPreAuthButton(true);
      }
    });

  const { abn, orderId } = useSelector((state) => state.createOrder);
  const generateQRCode = (docType) => {
    setStatusId(statusIds.DRAFT);
    setOpenQrCode(true);
    if (docType === "sign") {
      setDocId(docIds.providerSignDocId);
      const interval = setInterval(async () => {
        const response = await dispatch(
          getDoc({
            docId: docIds.providerSignDocId,
            orderId: sessionStorage.getItem("orderId"),
            patientId
          })
        );

        if (response.payload.docUrl) {
          clearInterval(interval);
          setPatientDocId(response.payload.patientDocId);
          setOpenQrCode(false);
        }
      }, 3000);

      // if (provDocStatus?.docUrl) {
      //   clearInterval(interval);
      // }
    } else if (docType === "abn") {
      setDocId(docIds.abnDocID);
      // if (abnDocStatus?.docUrl === null || abnDocStatus?.docUrl === undefined) {
      //   alert("1");
      //   setInterval(
      //     async () =>
      //       dispatch(getDoc({ docId: docIds.abnDocID, orderId: sessionStorage.getItem("orderId"), patientId })),
      //     3000
      //   );
      // }
      const interval = setInterval(async () => {
        const response = await dispatch(
          getDoc({
            docId: docIds.abnDocID,
            orderId: sessionStorage.getItem("orderId"),
            patientId
          })
        );

        if (response.payload.docUrl) {
          clearInterval(interval);
          setPatientDocId(response.payload?.patientDocId);
          setOpenQrCode(false);
          setAbnDocStat(response?.payload?.fileName);
        }
      }, 3000);
    }
    handleSubmit(statusIds.DRAFT, "DRAFT", true);
  };

  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const toggleDrawerOrderDetails = (open, row) => (event) => {
    setIsOpenOrderDetails(open);
    // setOrderRecord(row);
  };
  useEffect(() => {
    sessionStorage.setItem("orderId", orderId);
    // dispatch(getDoc({ docId: docIds.providerSignDocId, orderId, patientId }));
  }, [orderId]);
  useEffect(() => {
    if (selectedFile || abn?.abnRequired == false) {
      setAbnValid(false);
      setStep3Complete(true);
    } else {
      setStep3Complete(false);
    }
  }, [abn, selectedFile]);
  const [preview, setPreview] = useState(false);
  const [filePath, setFilePath] = useState();
  const [hide, setHide] = useState(false);
  const [hideIcons, setHideIcons] = useState(false);
  const handleFilePreview = (doc) => {
    setPreview(true);
    setFilePath(filePath);
  };

  const handleDelete = () => {
    setFilePath();
    setSelectedFile("");
    setHide(true);
    setHideIcons(true);
  };
  const handleClose = () => {
    setPreview(false);
  };

  useEffect(() => {
    const document = res?.orderDocument?.find((s) => s.docTypeId === 5);
    if (document) {
      setFilePath(document.docUrl);
    }
  }, [res]);
  const abnIndicator = true;
  useEffect(() => {
    if (openQRCode === true) sessionStorage.setItem("QRcode", true);
    // else sessionStorage.setItem("QRcode", false);
  }, [openQRCode]);
  const [state, setState] = useState("");
  useEffect(() => {
    if (provDocStatus?.docUrl) {
      setState(provDocStatus?.docUrl);
    }
  }, [provDocStatus]);
  const triggerSaveDraft = () => {
    handleSubmit(statusIds.DRAFT, "DRAFT", true);
  };
  return (
    <Typography variant="div" component="div" className="createOrder__wrapper--content py-0">
      <Grid container spacing={3} className="mt-0">
        {isOpenOrderDetails && <OrderReports isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} setIsOpenOrderDetails={setIsOpenOrderDetails}/>}
        {preview && <PdfDialog open={open} url={filePath} handleClose={handleClose} />}

        <Grid item xs={12} sm={12} md={12} lg={12} className="position-relative">
          <Divider orientation="vertical" variant="middle" flexItem className="vertical--divider" />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box className="mini__card text-image h-100 d-flex flex-column justify-content-between">
                <Typography variant="div" component="div" className="d-flex">
                  <Typography variant="h6" component="h6" className="mini__card--title">
                    Pre Authorization <br />
                    <Typography variant="p" component="p" className="fs-12 fw-regular">
                      The pre-authorization is required by patient to ensure
                    </Typography>
                  </Typography>
                  <img src={insurancePolicyImage} alt="Insurance Details" />
                </Typography>
                {/* <FormControlLabel
                  className="w-100 mt-3"
                  control={<Checkbox checked={preAuthCheck} onChange={() => setPreAuthCheck(!preAuthCheck)} />}
                  label="Pre-authorization checked"
                /> */}
                {((!preAuthButton && type === "create-order") || (type === "edit-order" && preAuth === "")) && (
                  <Typography component="div" variant="div" className="d-flex align-items-center mt-3">
                    <Button
                      variant="outlined"
                      className="primary-outline-btn"
                      onClick={priorAuthChec}
                      disabled={selectedTests?.length === 0}
                    >
                      Check Now
                    </Button>
                  </Typography>
                )}
                {preAuth || ""}
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box className="mini__card text-image h-100 d-flex flex-column justify-content-between">
                <Typography variant="div" component="div" className="d-flex">
                  <Typography variant="h6" component="h6" className="mini__card--title">
                    Verify ABN <br />
                    <Typography variant="p" component="p" className="fs-12 fw-regular">
                      Verifying ABN authorization is required by patient to ensure
                      {/* The pre-authorization is required by patient to ensure */}
                    </Typography>
                    <Typography variant="b" component="b" className="fs-14 fw-regular uploaded__file">
                      {selectedFile?.fileName || abnDocStat || selectedFile?.name}
                      {(res?.orderDocument?.find((s) => s.docTypeId === 5) && !hideIcons) ||
                      selectedFile ||
                      abnDocStatus?.docUrl ? (
                        <>
                          {type === "edit-order" && (
                            <VisibilityOutlinedIcon className="viewIcon" onClick={handleFilePreview} />
                          )}
                          <Button
                            className="errorTextButton"
                            variant="text"
                            startIcon={
                              <Typography
                                component="span"
                                variant="span"
                                className="ls-delete deleteRedIcon fs-16"
                              ></Typography>
                            }
                            onClick={() => {
                              if (patientDocId) {
                                dispatch(providerSignClear(patientDocId));
                                setAbnDocStat();
                              }
                              handleDelete();
                            }}
                          ></Button>
                        </>
                      ) : (
                        " "
                      )}
                    </Typography>
                  </Typography>
                  <img src={GroupInsurance} alt="Group Insurance Details" />
                </Typography>
                <Typography component="div" variant="div" className="d-flex flex-column mt-3">
                  {abn?.abnRequired === undefined ? (
                    Object.keys(orderDetailsById)?.length > 0 && type !== "edit-order" ? (
                      orderDetailsById.abnCheck ? (
                        <Typography variant="b" component="b" className="fs-14 fw-regular">
                          {selectedFile?.fileName}
                        </Typography>
                      ) : (
                        <Typography>{ABN}</Typography> /* if abn true this line will render  */
                      )
                    ) : (Object.keys(orderDetailsById)?.length === 0 && abnIndicator === true) ||
                      type === "edit-order" ? (
                      <Button
                        variant="outlined"
                        className="primary-outline-btn whiteSpace-nowrap"
                        onClick={abnVerification}
                        disabled={selectedTests?.length === 0}
                      >
                        Check Now
                      </Button>
                    ) : (
                      ""
                    )
                  ) : abn?.abnRequired || hide || orderDetailsById?.abnCheck ? (
                    <>
                      <Box className="requiredInfo__text">
                        <Typography>{ABN}</Typography> {/* if abn true this line will render  */}
                        <Button
                          variant="outlined"
                          className="primary-outline-btn qrcodeBtn"
                          onClick={() => generateQRCode("abn")}
                          disabled={selectedFile}
                        >
                          <img src={qrIcon} className="" />
                        </Button>
                      </Box>
                      <Box className="requiredInfo__btns">
                        <Button variant="text" className="downloadBtn-text p-0" onClick={downloadFile}>
                          Download Template
                        </Button>
                        <input
                          className="browseInput"
                          type="file"
                          id="fileInput"
                          accept=".pdf, .jpeg, .jpg .png"
                          style={{ display: "none" }}
                          ref={ABNInputVerify} // Use the ref to reference the file input element
                          onChange={(e) => handleFileChange(e, "ABNVerify")}
                        />
                        {selectedFile ? (
                          <Button
                            variant="outlined"
                            className="ms-3 primary-outline-btn w-50"
                            onClick={() => setSelectedFile(null)}
                          >
                            clear
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            className="ms-3 primary-outline-btn w-50"
                            onClick={() => handleClick("ABNVerify")}
                            disabled={abnDocStatus?.docUrl}
                          >
                            Upload
                          </Button>
                        )}
                      </Box>
                    </>
                  ) : (
                    <Typography>{ABN}</Typography> /* if abn false this line will render */
                  )}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Box className="mini__card text-image text-image--qrCode h-100">
                <Typography variant="div" component="div" className="d-flex">
                  {state ? (
                    <Typography variant="div" component="div" className="imageWrapper">
                      <img src={provDocStatus?.docUrl || state} alt="Image Preview" />
                    </Typography>
                  ) : (
                    //  orderDetailsById?.orderDocument?.length > 0 ? (
                    //   <Typography variant="div" component="div" className="imageWrapper">
                    //     <img src={providerSign} alt="Image Preview" />
                    //   </Typography>
                    // ) :
                    <>
                      <Grid container className="mt-0 p-0">
                        <Grid item xs={12} sm={12} md={6} lg={6} className="mini__card--title">
                          <Typography variant="h6" component="h6">
                            Scan QR Code <br />
                            <Typography variant="p" component="p" className="fs-12 fw-regular">
                              Scanning the QR code will open a webpage where you can add your digital sign
                            </Typography>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <Typography
                            variant="div"
                            component="div"
                            className="imageWrapper d-flex align-items-center justify-content-center"
                          >
                            <Button
                              variant="outlined"
                              className="primary-outline-btn qrcodeBtn"
                              onClick={() => generateQRCode("sign")}
                              disabled={providerSign}
                            >
                              <img src={qrIcon} className="" />
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Typography>
                <Grid item xs={12} sm={12} md={12} lg={12} className="mt-2">
                  <Typography variant="label" component="label" className="add__label mb-2">
                    Provider Sign
                  </Typography>
                  <form id="uploadForm" className="fileupload--input add__input">
                    <Typography component="p" variant="p">
                      {providerSign?.name}
                    </Typography>
                    <input
                      type="file"
                      id="sampleFile"
                      accept=".heic, .heif, image/*"
                      style={{ display: "none" }}
                      ref={providerSignInputRef} // Use the ref to reference the file input element
                      onChange={(e) => handleFileChange(e, "providerSign")}
                    />
                    {providerSign || state ? (
                      <Button
                        onClick={() => {
                          setProviderSign(null);
                          setState("");
                          if (patientDocId) {
                            dispatch(providerSignClear(patientDocId));
                          }
                        }}
                      >
                        Clear
                      </Button>
                    ) : (
                      <Button htmlFor="sampleFile" component="label" onClick={() => handleClick("providerSign")}>
                        Upload
                      </Button>
                    )}
                  </form>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={2} className="mb-2">
            <Grid item xs={12} sm={12} md={6} lg={6}>
              {abn?.abnRequired ||
                (orderDetailsById?.abnCheck && (
                  <FormControlLabel
                    className="pt-3"
                    control={<Checkbox defaultChecked />}
                    label="Paid by Patient or Client (no additional verification is required)"
                  />
                ))}
              <Typography variant="label" component="label" className="add__label my-2">
                Upload Requisition form
              </Typography>
              <form id="uploadForm" className="fileupload--input add__input">
                <Typography component="p" variant="p">
                  {requisition?.name}
                </Typography>
                <input
                  type="file"
                  id="sampleFile"
                  accept=".pdf"
                  style={{ display: "none" }}
                  ref={requisitions} // Use the ref to reference the file input element
                  onChange={(e) => handleFileChange(e, "requisitions")}
                />
                {requisition ? (
                  <Button onClick={() => setRequisition(null)}>Clear</Button>
                ) : (
                  <Button htmlFor="sampleFile" component="label" onClick={() => handleClick("requisitions")}>
                    Upload
                  </Button>
                )}
              </form>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isDialogOpen && (
        <ImageCrop
          isDialogOpen={isDialogOpen}
          handleSubmit={triggerSaveDraft}
          setIsDialogOpen={setIsDialogOpen}
          providerSign={providerSign}
          setProviderSign={setProviderSign}
          setCroppedImage={setCroppedImage}
        />
      )}
      {/* && orderId === ""  removed as we dont need id to open QR code */}
      {openQRCode && orderId && (
        <QRCodeGeneration
          setOpenQrCode={setOpenQrCode}
          openQRCode={openQRCode}
          path={`orderdoc-upload/${orderId}/${getLoggedInUserId()}/${patientId}/${docId}`}
        />
      )}
    </Typography>
  );
};

// export default EligibilityDetails;
