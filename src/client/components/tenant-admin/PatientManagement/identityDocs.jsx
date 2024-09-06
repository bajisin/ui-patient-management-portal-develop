import { AppBar, Box, Button, Container, Link, Stack, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getActiveSession, uploadDoc, uploadIdentityDocs } from "@redux/slices/order-slice";
import { useDispatch, useSelector } from "react-redux";

import LSLogoname from "@assets/images/ls_svg/Lifescan_Logo.svg";
import SuccessPopup from "@components/master-data/sucesspopup";
import { getLoggedInUserRoleId } from "@utils/common";
import { getTenantAssetDetails } from "../../../redux/slices/usersSlice";
import { useLocation } from "react-router-dom";

function IdentityDocs() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const patientId = pathname?.split("/")[3];
  const queryParams = new URLSearchParams(location.search);
  const documentName = queryParams.get("param");
  //   const patientId = pathname?.split("/")[4];
  const tenantId = pathname?.split("/")[2];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [document, setDocument] = useState(null);
  const year = new Date().getFullYear();
  useEffect(() => {
    dispatch(getActiveSession(tenantId));
    dispatch(getTenantAssetDetails());
    // sessionStorage.setItem("tenantId", "lifescan");
    const subDomain = window.location.host.split(".")[0];
    console.log(subDomain);
    console.log(window.location);
    if (subDomain === "localhost:8080") {
      sessionStorage.setItem("tenantId", "lifescan");
    } else {
      sessionStorage.setItem("tenantId", subDomain);
    }
  }, []);
  const tenantLogo = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantLogo;
  const { signaturePreview, session } = useSelector((state) => state.createOrder);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const uploadFile = () => {
    const formData = new FormData();
    if (documentName === "Driving License") {
      formData.append("documentId", "2");
    } else if (documentName === "stateId") {
      formData.append("documentId", "3");
    } else if (documentName === "Insurance Id") {
      formData.append("documentId", "4");
    }
    formData.append("tenantId", tenantId);
    formData.append("patientId", patientId);
    formData.append("document", document);
    formData.append("documentType", document?.type);
    formData.append("roleId", "8");

    let action;
    try {
      action = dispatch(uploadIdentityDocs({ data: formData, token: session?.token }));
      if (uploadDoc.fulfilled) {
        setShowSuccessPopup(true);
        setSuccessMessage("Document uploaded successfully");
      }
    } catch {
      console.log(action);
    }
  };
  const logo = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantLogo;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIsDialogOpen(true);
    setDocument(file);
  };
  const hiddenFileInput = useRef(null);
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };
  return (
    <Box className={`app-container common__layout ${getLoggedInUserRoleId() === 5 ? "patient__management" : ""}`}>
      <Box className="header__wrapper header__wrapper--admin">
        <AppBar position="static">
          <Container maxWidth="false">
            <Toolbar disableGutters>
              <img src={tenantLogo} alt="Logo" className="logo-icon border-end-0" />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Typography component="div" variant="div" className="page__wrapper admin__wrapper">
        <Typography component="div" variant="div" className="content__wrapper">
          <Box className="imageCrop__wrapper">
            <Button className="button-upload primary-outline-btn" variant="outlined" onClick={handleClick}>
              Upload {documentName}
            </Button>
            <Typography component="p" variant="p" className="errorInfo mb-2">
              {!document?.name && " Please select png/jpeg max size 10mb"}
            </Typography>
            <Typography component="p" variant="p" className="mb-2">
              {document?.name}
            </Typography>
            <input
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              accept="image/*"
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              className="primary-outline-btn"
              disabled={!document}
              onClick={() => uploadFile()}
            >
              Upload
            </Button>
          </Box>
        </Typography>
      </Typography>
      <Box className="footer__wrapper">
        <Typography variant="p" component="p">
          Copyright &#169; {year} Qlear Health. All Rights Reserved. Copyright &#169; {year} Qlear Health. All Rights
          Reserved.
        </Typography>
        <Stack direction="row" spacing={2} className="footer-links">
          <Link className="cursor-pointer" underline="none">
            {"Privacy Policy"}
          </Link>
        </Stack>
      </Box>
      {showSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setShowSuccessPopup(false);
            window.location.reload();
          }}
          successMessage={successMessage}
          type="document Upload"
        />
      )}
    </Box>
  );
}

export default IdentityDocs;
