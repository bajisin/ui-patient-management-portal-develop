import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { SSOKeys, roleIds } from "../../_helpers/constants";
import { emailVerify, updateUser } from "@redux/slices/user";
import { fetchUserDetails, fetchUsers, getTenantAssetDetails } from "@redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

import AboutUs from "./aboutUs";
import CloseAll from "@assets/images/svg/CloseAll.svg";
import CloseIcon from "@mui/icons-material/Close";
import { CreateNewPatient } from "./create-new-user";
import Divider from "@mui/material/Divider";
import FAQ from "./faq";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Loader from "@utils/Loader";
import MobileStepper from "@mui/material/MobileStepper";
import Policy from "./privacypolicy";
import SwipeableViews from "react-swipeable-views";
import TermsConditions from "../login/termsConditions";
import auth0 from "auth0-js";
import { autoPlay } from "react-swipeable-views-utils";
import { getBroadCastPublicList } from "@redux/slices/boardCastSlice";
import { getConfig } from "@utils/config";
import { getFeaturesList } from "../../redux/slices/usersSlice";
import { getLogoname } from "@utils/common";
import googleIcon from "@assets/images/ls_svg/google_svg.svg";
import infoIcon from "@assets/images/ls_svg/info_icon.svg";
import { parseJwt } from "@utils/jwt";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

// import appleIcon from "@assets/images/ls_svg/apple_svg.svg";

// import facebookIcon from "@assets/images/ls_svg/facebook_svg.svg";

// import outlookIcon from "@assets/images/ls_svg/outlook_svg.svg";

// import twitterIcon from "@assets/images/ls_svg/twitter_svg.svg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const lsText = [
  {
    h4: "Test Results",
    p: "All test results & reports will be available for preview"
  },
  {
    h4: "Patient Management",
    p: "View patients profile and medical history"
  }
];

export default function Login() {
  // slider
  // const { loginWithPopup } = useAuth0();
  const [activeStep, setActiveStep] = useState(0);
  const [openTermsCondition, setOpenTermsCondition] = React.useState(false);
  const [openAboutUs, setOpenAboutUs] = React.useState(false);
  const [openPolicy, setOpenPolicy] = React.useState(false);
  const [openFAQ, setOpenFAQ] = React.useState(false);
  const [openUserForm, setOpenUserForm] = React.useState(false);

  // const [logo, setLogo] = useState(logos.lifescan);
  const navigate = useNavigate();
  const theme = useTheme();
  const maxSteps = lsText.length;
  const config = getConfig();
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const { userDetails, tntDetailsLoading } = useSelector((state) => state.userDetails);
  const [closeButton, setCloseButton] = useState(true);
  // const retrieveLogo = () => {
  //   if (window.location.hostname.split(".")[0].toLowerCase() === "lifescan") localStorage.setItem("logo", lifescanLogo);
  //   else if (window.location.hostname.split(".")[0].toLowerCase() === "mtsp") localStorage.setItem("logo", logos.mt);
  // };

  const handleStepChange = (step) => {
    localStorage.setItem("subdomain", "dev");
    // localStorage.setItem("subdomain", window.location.hostname.split(".")[0].toLowerCase());

    setActiveStep(step);
  };
  const handleCloseAllToasts = () => {
    const updatedStates = new Array(publicList.length).fill(false);
    setToastOpenStates(updatedStates);
    setCloseButton(false);
  };

  useEffect(() => {
    if (Object.keys(userDetails || {}).length > 0) {
      verifyIsUserRegistered();
      if (!userDetails?.emailVerified) dispatch(emailVerify());
    }
  }, [userDetails]);
  const tenantId = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;

  useEffect(() => {
    const subDomain = window.location.host.split(".")[0];
    if (subDomain === "localhost:8080") {
      sessionStorage.setItem("tenantId", "dev");
      // sessionStorage.setItem("tenantId", "lifescan");
    } else {
      sessionStorage.setItem("tenantId", subDomain);
    }
    dispatch(getBroadCastPublicList());
    dispatch(getTenantAssetDetails());
    if (publicList.length >= 2) {
      setCloseButton(false);
    }
  }, []);

  const redirectToHome = (role) => {
    if (role === roleIds.PATIENT) navigate("/home");
    else if (role === roleIds.SUPER_ADMIN) navigate("/dashboard");
    else if (role === roleIds.TENANT_ADMIN) navigate("/tenantDashboard");
    else if (role === roleIds.CLIENT_ADMIN) navigate("/tenantDashboard");
    else if (role === roleIds.PROVIDER) navigate("/providerDashboard");
  };
  // const redirectToProfile = () => {
  //   navigate("/profile");
  // };
  const { publicList } = useSelector((state) => state.broadCasts);
  // const { tenantAssetDetails } = useSelector((state) => state.usersSlice);
  const [toastOpenStates, setToastOpenStates] = useState([]);
  useEffect(() => {
    setToastOpenStates(new Array(publicList.length).fill(true));
  }, [publicList]);
  const verifyIsUserRegistered = () => {
    const userExist = userDetails?.userExist;
    if (JSON.stringify(userDetails?.usersDTO)) {
      sessionStorage.setItem("userDetails", JSON.stringify(userDetails?.usersDTO));
    }
    if (userDetails?.userFromOktaFlag) {
      setOpenUserForm(true);
    } else {
      if (userDetails?.termsAccepted === true) {
        if (userExist) {
          redirectToHome(userDetails?.usersDTO?.roleMasterDTO?.roleId);
        } else {
          // since we dont have user registration development yet, for now we are
          // logging out the user if they are not existed
          logout({
            logoutParams: {
              returnTo: window.location.origin
            }
          });
          sessionStorage.removeItem("authInfo");
          sessionStorage.removeItem("userDetails");
          // redirectToProfile();
        }
      } else {
        setOpenTermsCondition(true);
      }
    }

    return false;
  };
  const handleOpenForFAQ = () => {
    setOpenFAQ(true);
  };
  const handleOpenForAboutUs = () => {
    setOpenAboutUs(true);
  };
  const handleOpenForPolicy = () => {
    setOpenPolicy(true);
  };
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;

  const openNonSSO = () => {
    console.log(config);
    const webAuth = new auth0.WebAuth({
      // domain: "lifescan.us.auth0.com",
      // clientID: "ee1IGU262my0UyNrp3zzgnBzw9zB8mgw",
      // audience: "https://lifescan.us.auth0.com/api/v2/"

      domain: config.domain,
      clientID: config.clientId,
      audience: config.audience
    });

    webAuth.popup.authorize(
      {
        responseType: "token id_token",
        owp: true,
        redirectUri: "http://dev.localhost:8080/home"
      },

      function (_err, authResult) {
        console.log(_err);
        console.log(authResult);
        sessionStorage.setItem("authInfo", JSON.stringify(authResult));

        if (authResult) {
          const jwtUser = parseJwt(authResult.idToken);

          // dispatch user details
          dispatch(updateUser(jwtUser));
          dispatch(fetchUserDetails());
          sessionStorage.setItem("isIdle", false);
        }
      }
    );
  };

  const openSSO = (ssoKey) => {
    const webAuth = new auth0.WebAuth({
      // domain: "lifescan.us.auth0.com",
      // clientID: "ee1IGU262my0UyNrp3zzgnBzw9zB8mgw",
      // audience: "https://lifescan.us.auth0.com/api/v2/"

      domain: config.domain,
      clientID: config.clientId,
      audience: config.audience
    });

    webAuth.popup.authorize(
      {
        responseType: "token id_token",
        owp: true,
        redirectUri: "http://dev.localhost:8080/home",
        connection: ssoKey
      },

      function (_err, authResult) {
        console.log(authResult);
        console.log(_err);
        sessionStorage.setItem("authInfo", JSON.stringify(authResult));
        if (authResult) {
          const jwtUser = parseJwt(authResult.idToken);
          sessionStorage.setItem("isIdle", false);

          // dispatch user details
          dispatch(updateUser(jwtUser));
          dispatch(fetchUserDetails());
          setTimeout(() => {
            verifyIsUserRegistered();
          }, 1000);
        }
      }
    );
  };
  useEffect(() => {
    if (publicList.length <= 2) {
      setCloseButton(false);
    }
  }, []);
  return (
    <Box className="main__wrapper p-0">
      {tntDetailsLoading ? (
        <Loader />
      ) : (
        <Grid container className="login__wrapper">
          <Box className="errorMsg__wrapper w-100">
            {publicList.length > 0 &&
              publicList.map((broadCast, i) => {
                return (
                  <React.Fragment key={i}>
                    {broadCast?.catalogBroadcastMasterDTO?.catalogBroadcastId === 1 && toastOpenStates[i] && (
                      <Box className="login__error-msg login__error--toastes">
                        <Typography component="p" variant="p">
                          <img src={infoIcon} alt="info icon" className="info-icon" />
                          <Typography component="b" variant="b">
                            {broadCast.title}
                          </Typography>
                          <Typography component="span" variant="span">
                            {`${broadCast?.description} `}
                            {/* for ${moment(broadCast?.fromDate).format(
                              "MM-DD-YYYY hh:mm A"
                            )} - ${moment(broadCast?.toDate).format("MM-DD-YYYY hh:mm A")}`} */}
                          </Typography>
                          <CloseIcon
                            onClick={() => {
                              const updatedStates = [...toastOpenStates];
                              updatedStates[i] = false;
                              setToastOpenStates(updatedStates);
                            }}
                            className="cursor-pointer ms-2"
                          />
                        </Typography>
                      </Box>
                    )}
                  </React.Fragment>
                );
              })}
            {publicList.length >= 2 && closeButton && (
              <Box className="close-all">
                <Button variant="contained" onClick={handleCloseAllToasts} className="primary-btn">
                  <img src={CloseAll} alt="close all" />
                  Close All Toasts
                </Button>
              </Box>
            )}
          </Box>
          <Grid item xs={12} sm={12} md={7} lg={7} className="login__wrapper--left ">
            <img src={getLogoname()} alt="Logo" className="logo" />
            <Box className="swipeable__wrapper">
              <AutoPlaySwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {lsText.map((step, index) => (
                  <div key={index}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Typography component="h4" variant="h4">
                        {lsText[activeStep].h4}
                        <Typography component="p" variant="p">
                          {lsText[activeStep].p}
                        </Typography>
                      </Typography>
                    ) : null}
                  </div>
                ))}
              </AutoPlaySwipeableViews>
              <MobileStepper
                className="login__stepper justify-content-center bg-transparent"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
              />
            </Box>
          </Grid>

          <Grid item xs={12} sm={12} md={5} lg={5} className="login__wrapper--right">
            <List className="login__nav">
              <ListItem>
                <ListItemButton onClick={handleOpenForAboutUs} data-cy="AboutUs">
                  <ListItemText primary="About Us" data-cy="AboutUs" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleOpenForPolicy} data-cy="Privacypolicy">
                  <ListItemText primary="Privacy policy" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleOpenForFAQ} data-cy="FAQ">
                  <ListItemText primary="FAQ" />
                </ListItemButton>
              </ListItem>
            </List>
            <Box className="login__section">
              <Typography variant="h4" component="h4">
                Welcome To
              </Typography>
              <img src={getLogoname()} alt="Logo" className="logo" />
              <Typography variant="label" component="label">
                Login to the application to embark on a new journey in healthcare.
              </Typography>
              <Button variant="contained" component="button" className="ls__primary--btn" onClick={() => openNonSSO()}>
                Login to Continue
              </Button>
              <Divider>Or</Divider>

              <Stack
                className="icons__wrapper justify-content-center mt-3"
                direction="row"
                alignItems="center"
                spacing={1}
                useFlexGap
                flexWrap="wrap"
              >
                {/* <Button variant="outlined" startIcon={<img src={outlookIcon} />}>
                  Outlook
                </Button> */}
                <Button variant="outlined" startIcon={<img src={googleIcon} />} onClick={() => openSSO(SSOKeys.google)}>
                  Gmail
                </Button>
                {/* <Button
                  variant="outlined"
                  startIcon={<img src={facebookIcon} />}
                  onClick={() => openSSO(SSOKeys.facebook)}
                >
                  Facebook
                </Button> */}
                {/* <Button
                  variant="outlined"
                  startIcon={<img src={twitterIcon} />}
                  onClick={() => openSSO(SSOKeys.twitter)}
                >
                  Twitter
                </Button> */}
                {/* <Button variant="outlined" startIcon={<img src={appleIcon} />} className="w-100">
                  Sign In with Apple
                </Button> */}
                <AboutUs openAboutUs={openAboutUs} setOpenAboutUs={setOpenAboutUs} />
                <FAQ setOpenFAQ={setOpenFAQ} openFAQ={openFAQ} />
                <Policy setOpenPolicy={setOpenPolicy} openPolicy={openPolicy} />
                <TermsConditions setOpenTermsCondition={true} openTermsCondition={openTermsCondition} />
                {openUserForm && <CreateNewPatient open={openUserForm} setOpen={setOpenUserForm} />}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
