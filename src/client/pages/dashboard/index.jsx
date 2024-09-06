import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { CALLTYPES, roleIds } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { getFeaturesList, getUsersByEmail, getUsersByPhone } from "../../redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

import ActivityOverview from "./activityOverview";
import AddTenant from "@components/tenant/tenant-config/add-tenant";
import CloseAll from "@assets/images/svg/CloseAll.svg";
import CloseIcon from "@mui/icons-material/Close";
import LatestOrders from "./latestOrders";
import Notification from "../notifications";
import OrderStatus from "./orderStatus";
import ReportsOverview from "./reportsOverview";
import TenantSnapshots from "./tenantSnapshots";
import TermsConditions from "../login/termsConditions";
import { dashboardReports } from "@redux/slices/dashboardSlice";
import { getBroadCastPublicList } from "@redux/slices/boardCastSlice";
import { getLoggedInUserRoleId } from "../../utils/common";
import moment from "moment";
import notificationIcon from "@assets/images/ls_svg/Notificationbell.svg";

// import Snackbar from "@mui/material/Snackbar";

// import calendarIcon from "@assets/images/ls_svg/calendarIcon.svg";

export default function DashboardComponent() {
  const [openTermsCondition, setOpenTermsCondition] = useState(false);

  const [openTenant, setOpenTenant] = useState(false);
  const dispatch = useDispatch();
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const tenantId = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const reloadForFeaturesAPI = localStorage.getItem("featuresReload");

  useEffect(() => {
    const year = new Date().getFullYear();
    dispatch(getFeaturesList({ userId: tenantId, id: loggedInUserId }))
      .then((s) => {
        sessionStorage.setItem("features", JSON.stringify(s.payload));
      })
      .finally(() => {
        if (reloadForFeaturesAPI === "true") {
          window.location.reload();
          localStorage.setItem("featuresReload", "false");
        }
      });
    // dispatch(getFeaturesList({ userId: tenantId, id: loggedInUserId })).then((s) => {
    //   sessionStorage.setItem("features", JSON.stringify(s.payload));
    // });
    dispatch(getBroadCastPublicList());
    const data = {
      roleId: loggedInUser.roleMasterDTO.roleId,
      year
    };

    dispatch(dashboardReports(data));
  }, []);

  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");

  const handleClick = () => {
    setOpenTenant(true);
  };
  const [toastOpenStates, setToastOpenStates] = useState([]);
  const { publicList } = useSelector((state) => state.broadCasts);
  const [showButton, setShowButton] = useState(false);

  const handleCloseAllToasts = () => {
    const updatedStates = new Array(publicList.length).fill(false);
    setToastOpenStates(updatedStates);
    setShowButton(false);
  };
  useEffect(() => {
    if (emailVal !== "") dispatch(getUsersByEmail(emailVal));
    if (phoneVal !== "") dispatch(getUsersByPhone(`${phoneVal}`));
    setToastOpenStates(new Array(publicList.length).fill(true));
  }, [emailVal, phoneVal, publicList]);
  // const handleClose = () => {
  //   setState({ ...state, open: false });
  // };
  // const toasterbuttons = (
  //   <>

  //     <Box sx={{ display: "flex", justifyContent: "center" }}>
  //       <Grid item xs={6} textAlign="right">
  //         <Button onClick={handleClick({ vertical: "top", horizontal: "right" })}>Top-Right</Button>
  //       </Grid>
  //     </Box>

  //   </>
  // );

  // const { publicList } = useSelector((state) => state.broadCasts);

  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Dashboard <br />
            <Typography component="span" variant="span">
              Get an overview of activities
            </Typography>
          </Typography>
          <Button variant="contained" className="primary-btn" onClick={handleClick}>
            Add Tenant
          </Button>
        </Typography>
        <Box className="toaster__wrapper">
          {/* {publicList.length > 0 &&
          publicList.map((broadCast, i) => {
            const toastKey = `${broadCast.title}-${vertical}-${horizontal}`; // Create a unique key for each toast
            const closed = toastStates[toastKey];
            return (
              <>
                {broadCast?.catalogBroadcastMasterDTO?.catalogBroadcastId === 2 && (
                  <>
                    <Snackbar
                      anchorOrigin={{ vertical, horizontal }}
                      className="toaster-content"
                      open={open}
                      onClose={() => {
                        setState({ ...state, open: false });
                      }}
                      message={
                        <Box className="toaster-content">
                          <img src={notificationIcon} alt="notificationIcon" className="notification-icon" />
                          <Box className="toaster-text">
                            <Typography className="maintanence-text"> {broadCast.title}</Typography>
                            <Typography className="maintanence-time">
                              <img src={calendarIcon} alt="calendarIcon" className="calendarIcon" />
                              {`${moment(broadCast?.fromDate).format("MM-DD-YYYY hh:mm A")} - ${moment(
                                broadCast?.toDate
                              ).format("MM-DD-YYYY hh:mm A")}`}
                            </Typography>
                          </Box>
                          <CloseIcon
                            onClick={() => {
                              setState({ ...state, open: false });
                            }}
                            className="cross-icon cursor-pointer"
                          />
                        </Box>
                      }
                      key={vertical + horizontal}
                    />
                    <Snackbar
                      anchorOrigin={{ vertical, horizontal }}
                      className="toaster-content"
                      open={closed}
                      onClose={() => handleCloseToast(toastKey)}
                      message={
                        <Box className="toaster-content">
                          <img src={notificationIcon} alt="notificationIcon" className="notification-icon" />
                          <Box className="toaster-text">
                            <Typography className="maintanence-text"> {broadCast.title}</Typography>
                            <Typography className="maintanence-time">
                              <img src={calendarIcon} alt="calendarIcon" className="calendarIcon" />
                              {`${moment(broadCast?.fromDate).format("MM-DD-YYYY hh:mm A")} - ${moment(
                                broadCast?.toDate
                              ).format("MM-DD-YYYY hh:mm A")}`}
                            </Typography>
                          </Box>
                          <CloseIcon onClick={() => handleCloseToast(toastKey)} className="cross-icon cursor-pointer" />
                        </Box>
                      }
                    />
                  </>
                )}
              </>
            );
          })} */}
          {publicList.length > 0 && (
            <>
              {publicList.map((broadCast, i) => {
                return (
                  <React.Fragment key={i}>
                    {broadCast?.catalogBroadcastMasterDTO?.catalogBroadcastId === 3 && toastOpenStates[i] && (
                      <Box className="login__error-msg">
                        <Box className="toaster-content">
                          <img src={notificationIcon} alt="notificationIcon" className="notification-icon" />
                          <Box className="toaster-text">
                            <Typography className="maintanence-text"> {broadCast.title}</Typography>
                            <Typography className="maintanence-time">
                              {`${broadCast?.description}`}
                              {/* for ${moment(broadCast?.fromDate).format(
                                "MM-DD-YYYY hh:mm A"
                              )} - ${moment(broadCast?.toDate).format("MM-DD-YYYY hh:mm A")}`} */}
                            </Typography>
                          </Box>
                          <CloseIcon
                            onClick={() => {
                              const updatedStates = [...toastOpenStates];
                              updatedStates[i] = false;
                              setToastOpenStates(updatedStates);
                            }}
                            className="cross-icon cursor-pointer"
                          />
                        </Box>
                        <Button variant="contained" onClick={handleCloseAllToasts} className="primary-btn closeToasts">
                          <img src={CloseAll} alt="close all" />
                          Close All Toasts
                        </Button>
                      </Box>
                    )}
                  </React.Fragment>
                );
              })}
            </>
          )}

          {/* {publicList.length > 0 &&
            publicList.map((broadCast, i) => {
              return (
                <React.Fragment key={i}>
                  {broadCast?.catalogBroadcastMasterDTO?.catalogBroadcastId === 3 && toastOpenStates[i] && (
                    <Box className="login__error-msg">
                      <Box className="toaster-content">
                        <img src={notificationIcon} alt="notificationIcon" className="notification-icon" />
                        <Box className="toaster-text">
                          <Typography className="maintanence-text"> {broadCast.title}</Typography>
                          <Typography className="maintanence-time">
                            {`${broadCast?.description} for ${moment(broadCast?.fromDate).format(
                              "MM-DD-YYYY hh:mm A"
                            )} - ${moment(broadCast?.toDate).format("MM-DD-YYYY hh:mm A")}`}
                          </Typography>
                        </Box>
                        <CloseIcon
                          onClick={() => {
                            const updatedStates = [...toastOpenStates];
                            updatedStates[i] = false;
                            setToastOpenStates(updatedStates);
                          }}
                          className="cross-icon cursor-pointer"
                        />
                      </Box>
                      {/* <Typography component="div" variant="div" className="toaster-content">
                        <img src={notificationIcon} alt="info icon" className="info-icon" />
                        {broadCast.title}
                        <Typography component="span" variant="span">
                          {`${broadCast?.description} for ${moment(broadCast?.fromDate).format(
                            "MM-DD-YYYY hh:mm A"
                          )} - ${moment(broadCast?.toDate).format("MM-DD-YYYY hh:mm A")}`}
                          <CloseIcon
                            onClick={() => {
                              const updatedStates = [...toastOpenStates];
                              updatedStates[i] = false;
                              setToastOpenStates(updatedStates);
                            }}
                            className="cursor-pointer ms-2"
                          />
                        </Typography>
                          </Typography> *}
                    </Box>
                  )}
                </React.Fragment>
              );
            })}  */}
          {/* {publicList.length > 0 &&
            publicList.some((broadCast) => broadCast?.catalogBroadcastMasterDTO?.catalogBroadcastId === 2) && (
              <>
                {publicList.map((broadCast, i) => {
                  return (
                    <React.Fragment key={i}>
                      {broadCast?.catalogBroadcastMasterDTO?.catalogBroadcastId === 2 && toastOpenStates[i] && (
                        <Box className="login__error-msg">
                          <Box className="toaster-content">
                            <img src={notificationIcon} alt="notificationIcon" className="notification-icon" />
                            <Box className="toaster-text">
                              <Typography className="maintanence-text"> {broadCast.title}</Typography>
                              <Typography className="maintanence-time">
                                {`${broadCast?.description} for ${moment(broadCast?.fromDate).format(
                                  "MM-DD-YYYY hh:mm A"
                                )} - ${moment(broadCast?.toDate).format("MM-DD-YYYY hh:mm A")}`}
                              </Typography>
                            </Box>
                            <CloseIcon
                              onClick={() => {
                                const updatedStates = [...toastOpenStates];
                                updatedStates[i] = false;
                                setToastOpenStates(updatedStates);
                              }}
                              className="cross-icon cursor-pointer"
                            />
                          </Box>
                        </Box>
                      )}
                    </React.Fragment>
                  );
                })}
                <Button variant="contained" onClick={handleCloseAllToasts} className="primary-btn closeToasts">
                  <img src={CloseAll} alt="close all" />
                  Close All Toasts
                </Button>
              </>
            )} */}
        </Box>

        {/* <Box className="toaster__wrapper">
        {publicList.length > 0 &&
          publicList.map((broadCast) => {
            const toastKey = `${broadCast.title}-${vertical}-${horizontal}`; // Create a unique key for each toast
            const isOpen = toastStates[toastKey]; // Get the state for this toast
            return (
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                className="toaster-content"
                open={isOpen} // Use the state for open/close
                onClose={() => handleCloseToast(toastKey)} // Call the handler with toastKey
                message={
                  <Box className="toaster-content">
                    <img src={notificationIcon} alt="notificationIcon" className="notification-icon" />
                    <Box className="toaster-text">
                      <Typography className="maintanence-text"> {broadCast.title}</Typography>
                      <Typography className="maintanence-time">
                        <img src={calendarIcon} alt="calendarIcon" className="calendarIcon" />
                        {`${moment(broadCast?.fromDate).format("MM-DD-YYYY hh:mm A")} - ${moment(
                          broadCast?.toDate
                        ).format("MM-DD-YYYY hh:mm A")}`}
                      </Typography>
                    </Box>
                    <CloseIcon
                      onClick={() => handleCloseToast(toastKey)} // Call the handler with toastKey
                      className="cross-icon cursor-pointer"
                    />
                  </Box>
                }
                key={toastKey}
              />
            );
          })}
      </Box> */}
        <Box className="dashboard__wrapper">
          <Grid container className="m-0">
            <Grid item xs={12} sm={12} md={12} lg={8} className="pe-3">
              <ActivityOverview />
              <TenantSnapshots />
              <ReportsOverview />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <OrderStatus />
              <Notification />
              {getLoggedInUserRoleId() !== 1 && <LatestOrders />}
            </Grid>
            {/* <Grid item xs={12} sm={12} md={12} lg={8}>
              <TenantSnapshots />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <Notification />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8} className="pb-4">
              <ReportsOverview />
            </Grid>
            {getLoggedInUserRoleId() !== 1 && (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <LatestOrders />
              </Grid>
            )} */}
          </Grid>
        </Box>
        {/* </Grid> */}
        <AddTenant open={openTenant} user={"tenant"} callType={CALLTYPES.Add} title="Add Tenant" />
        {/* <Button
        variant="contained"
        className="primary-btn terms_conditions_wrapper"
        onClick={() => setOpenTermsCondition(true)}
      >
        Terms and Conditions
      </Button> */}
        <TermsConditions setOpenTermsCondition={true} openTermsCondition={openTermsCondition} />
        {openTenant && (
          <AddTenant
            open={openTenant}
            setOpen={setOpenTenant}
            user={"tenant"}
            callType={CALLTYPES.Add}
            title="Add Tenant"
          />
        )}
      </Box>
      {/* {showButton && (
        <Button variant="contained" onClick={handleCloseAllToasts} className="primary-btn closeToasts">
          <img src={CloseAll} alt="close all" />
          Close All Toasts
        </Button>
      )} */}
    </>
  );
}
