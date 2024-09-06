import { AppBar, Box, Button, Container, Link, Stack, Toolbar, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getActiveSession, setSignaturePreview, uploadDoc } from "@redux/slices/order-slice";
import { useDispatch, useSelector } from "react-redux";

import FailPopup from "../../../../master-data/failpopup";
import ImageCrop from "./image-crop";
import LSLogoname from "@assets/images/ls_svg/Lifescan_Logo.svg";
import SuccessPopup from "@components/master-data/sucesspopup";
import auth0 from "auth0-js";
import { docIds } from "../../../../../_helpers/constants";
import { getConfig } from "@utils/config";
import { getLoggedInUserRoleId } from "../../../../../utils/common";
import { getTenantAssetDetails } from "@redux/slices/usersSlice";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";

function ImageUploadPreview() {
  const config = getConfig();
  const [croppedImage, setCroppedImage] = useState(null);
  const dispatch = useDispatch();
  const { signaturePreview, session } = useSelector((state) => state.createOrder);
  const { pathname } = useLocation();
  const docId = pathname?.split("/")[5];
  const loggedInUserId = pathname?.split("/")[3];
  const patientId = pathname?.split("/")[4];
  const orderId = pathname?.split("/")[2];
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [sign, setSign] = useState(null);
  const year = new Date().getFullYear();
  const domain = localStorage.setItem("domainOption", false);
  const domainOption = localStorage.getItem("domainOption");
  const subDomain = window.location.host.split(".")[0];
  const logo = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantLogo;

  const domainResult = JSON.parse(sessionStorage.getItem("domain"));
  const fetchData = async () => {
    await dispatch(getTenantAssetDetails(subDomain));
    localStorage.setItem("domainOption", true);
    await dispatch(getActiveSession(loggedInUserId)).then((y) =>
      sessionStorage.setItem("domain", JSON.stringify(y?.payload))
    );
  };

  if (domainOption == false) {
    dispatch(getTenantAssetDetails(subDomain));
    localStorage.setItem("domainOption", true);
    dispatch(getActiveSession(loggedInUserId));
    if (subDomain === "localhost:8080") {
      sessionStorage.setItem("tenantId", "lifescan");
    } else {
      sessionStorage.setItem("tenantId", subDomain);
    }

    const webAuth = new auth0.WebAuth({
      domain: config.domain,
      clientID: config.clientId,
      audience: config.audience
    });
    const checkLogin = (e) => {
      if (sessionStorage.getItem("authInfo")) {
        const currentTime = new Date().valueOf();
        const authInfo = JSON.parse(sessionStorage.getItem("authInfo"));
        const decodedToken = jwtDecode(authInfo);
        const tokenExpTime = new Date(decodedToken.exp * 1000).valueOf();
        if (tokenExpTime - 600000 <= currentTime) {
          webAuth.checkSession(
            {
              responseType: "token id_token",
              redirectUri: "http://dev.localhost:8080/home",
              audience: config.audience,
              scope: "read:order write:order"
            },
            (err, authResult) => {
              sessionStorage.setItem("authInfo", JSON.stringify(authResult));
              console.log(err, authResult);
            }
          );
        }
      }
    };
    setInterval(() => {
      checkLogin();
    }, 10000);
  } else if (domainResult == null) {
    fetchData();
  }

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showFailPopup, setShowFailPopup] = useState(false);

  const uploadSign = () => {
    const formData = new FormData();
    formData.append("documentId", docId);
    formData.append("orderId", orderId);
    formData.append("tenantId", domainResult?.tenantId);
    formData.append("patientId", patientId);
    formData.append("createdBy", loggedInUserId);
    formData.append("roleId", domainResult?.roleMasterId?.roleId);
    formData.append("document", sign);
    let action;
    try {
      action = dispatch(uploadDoc({ data: formData, token: session?.token }));
      action.then((res) => {
        if (res.type?.split("/")[2] === "fulfilled") {
          setShowSuccessPopup(true);
          setSuccessMessage("Document uploaded successfully");
        } else {
          setShowFailPopup(true);
        }
      });
    } catch {
      console.log(action);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setIsDialogOpen(true);
    setSign(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // setImagePreview(e.target.result);
        dispatch(setSignaturePreview(e.target.result));
      };
      if (croppedImage) reader.readAsDataURL(croppedImage);
      else {
        reader.readAsDataURL(file);
      }
    } else {
      dispatch(setSignaturePreview(null));
    }
  };
  const hiddenFileInput = useRef(null);
  const handleClick = (e) => {
    hiddenFileInput.current.click();
  };
  // const uploadSuccess = () => {
  //   setShowSuccessPopup(true);
  //   setSuccessMessage("Document uploaded successfully");
  // };
  return (
    <Box className={`app-container common__layout  ${getLoggedInUserRoleId() === 5 ? "patient__management" : ""}`}>
      <Box className="header__wrapper header__wrapper--admin">
        <AppBar position="static">
          <Container maxWidth="false">
            <Toolbar disableGutters>
              <img src={logo} alt="Logo" className="logo-icon border-end-0" />
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Typography component="div" variant="div" className="page__wrapper admin__wrapper">
        <Typography component="div" variant="div" className="content__wrapper">
          <Box className="imageCrop__wrapper">
            <Button className="button-upload primary-outline-btn" variant="outlined" onClick={handleClick}>
              Select a file
            </Button>
            <Typography component="p" variant="p" className="errorInfo mb-2">
              Please select png/jpeg max size 10mb
            </Typography>
            <input
              type="file"
              onChange={handleImageChange}
              ref={hiddenFileInput}
              accept=".jpeg, .jpg, .png"
              style={{ display: "none" }}
            />
            {/* <input type="file" onChange={handleImageChange} accept="image/*" /> */}
            {docId === docIds.providerSignDocId ? (
              croppedImage ? (
                <img src={croppedImage} alt="Image Preview" />
              ) : (
                signaturePreview && <img src={signaturePreview} alt="Image Preview" />
              )
            ) : (
              signaturePreview && <iframe src={signaturePreview} width="540" height="450"></iframe>
            )}
            <Button
              variant="outlined"
              disabled={signaturePreview === null}
              className="primary-outline-btn"
              onClick={() => uploadSign()}
            >
              Upload
            </Button>
            {isDialogOpen && docId === docIds.providerSignDocId && (
              <ImageCrop
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
                providerSign={sign}
                setProviderSign={setSignaturePreview}
                setCroppedImage={setCroppedImage}
              />
            )}
            {/* <Button variant="contained" className="primary-btn" onClick={uploadSuccess}>
              Uploaded Successfully
            </Button> */}
          </Box>
        </Typography>
      </Typography>
      <Box className="footer__wrapper">
        <Typography variant="p" component="p">
          Copyright &#169; {year} Qlear Health. All Rights Reserved.
        </Typography>
        <Stack direction="row" spacing={2} className="footer-links">
          <Link className="cursor-pointer" underline="none">
            {"Privacy Policy"}
          </Link>
        </Stack>
      </Box>
      {showFailPopup && <FailPopup onClose={() => setShowFailPopup(false)} />}

      {showSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            window.location.reload();
            setShowSuccessPopup(false);
          }}
          successMessage={successMessage}
          type="Upload"
        />
      )}
    </Box>
  );
}

export default ImageUploadPreview;
