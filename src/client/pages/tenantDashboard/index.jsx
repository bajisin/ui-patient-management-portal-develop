import { Box, Button, Grid, Typography } from "@mui/material";
import { Order, roleIds } from "../../_helpers/constants";
import React, { useEffect, useState } from "react";
import { dashboardReports, dsrReports } from "@redux/slices/dashboardSlice";
import { getFeaturesList, getUsersByEmail, getUsersByPhone } from "@redux/slices/usersSlice";
import { getLoggedInUserId, getLoggedInUserRoleId, getTenantId } from "@utils/common";
import { useDispatch, useSelector } from "react-redux";

import ActivityOverview from "../dashboard/activityOverview";
import ClientSnapShots from "../dashboard/clientSnapshots";
import CloseIcon from "@mui/icons-material/Close";
import DSRReport from "./dsrReport";
import LatestOrders from "../dashboard/latestOrders";
import Loader from "@utils/Loader";
import Notification from "../notifications/index";
import OrderStats from "../dashboard/orderStats";
import OrderStatus from "../dashboard/orderStatus";
import ReportsOverview from "../dashboard/reportsOverview";
import Snackbar from "@mui/material/Snackbar";
import TenantSnapshots from "../dashboard/tenantSnapshots";
import { getBroadCastPublicList } from "@redux/slices/boardCastSlice";
import notificationIcon from "@assets/images/ls_svg/Notificationbell.svg";
import { useNavigate } from "react-router-dom";

export default function DashboardComponent() {
  const [state, setState] = useState({
    open: true,
    vertical: "top",
    horizontal: "right"
  });
  const { vertical, horizontal, open } = state;
  const dispatch = useDispatch();
  const tenantId = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails?.tenantId;
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userDetails"))?.roleMasterDTO?.roleId;
  const [loader, setLoader] = useState(false);
  const reloadForFeaturesAPI = localStorage.getItem("featuresReload");

  useEffect(() => {
    setLoader(true);
    dispatch(getFeaturesList({ userId: tenantId, id: loggedInUserId }))
      .then((s) => {
        sessionStorage.setItem("features", JSON.stringify(s.payload));
      })
      .finally(() => {
        if (reloadForFeaturesAPI === "true") {
          window.location.reload();
          localStorage.setItem("featuresReload", "false");
        }

        setLoader(false);
      });
    dispatch(getBroadCastPublicList());
    const year = new Date().getFullYear();

    const data = {
      roleId: getLoggedInUserRoleId(),
      year,
      userId:
        getLoggedInUserRoleId() === roleIds.PROVIDER || getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN
          ? getLoggedInUserId()
          : ""
    };
    dispatch(dashboardReports(data));
  }, []);

  const [openTenant, setOpenTenant] = useState(false);
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const loggedinId = getLoggedInUserRoleId();
  const navigate = useNavigate();

  const handleClick = () => {
    const queryParams = {
      param: "createOrder"
    };
    navigate(`/patient-search?${new URLSearchParams(queryParams).toString()}`);
    setOpenTenant(true);
  };
  const [openReports, setOpenReports] = useState(false);
  const [reportsRes, setreportsRes] = useState("");
  const dsrReport = () => {
    dispatch(
      dsrReports({
        pageNo: 0,
        pageSize: 99999,
        searchValue: "",
        sortKey: "lastModifiedDate",
        sortOrder: "ASC",
        tenantId: getTenantId(),
        roleId: loggedinId
      })
    ).then((r) => {
      setreportsRes(r.payload.data.data);
    });

    setOpenReports(!openReports);

    navigate(`/dsrReport`);
  };

  const fetchData = () => {
    dispatch(
      dsrReports({
        pageNo: 0,
        pageSize: 99999,
        searchValue: "",
        sortKey: "lastModifiedDate",
        sortOrder: "ASC",
        tenantId: getTenantId(),
        roleId: loggedinId
      })
    );
  };
  useEffect(() => {
    if (emailVal !== "") dispatch(getUsersByEmail(emailVal));
    if (phoneVal !== "") dispatch(getUsersByPhone(`${phoneVal}`));
  }, [emailVal, phoneVal]);
  const { publicList } = useSelector((state) => state.broadCasts);
  return (
    <>
      {loader && <Loader />}
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header mb-0">
          <Typography component="h4" variant="h4">
            Dashboard <br />
            <Typography component="span" variant="span">
              Get an overview of activities
            </Typography>
          </Typography>
          {loggedinId !== 1 ? (
            <>
              <div className="content__wrapper--headerBtns">
                <Button variant="contained" className="primary-btn me-2" onClick={dsrReport}>
                  DSR report
                </Button>
                {Order && Order?.createInd === true ? (
                  <Button variant="contained" className="primary-btn" onClick={handleClick}>
                    Create Order
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </>
          ) : (
            <Button variant="contained" className="primary-btn" onClick={handleClick}>
              Add Tenant
            </Button>
          )}
        </Typography>
        <Box className="toaster__wrapper">
          {publicList.length > 0 &&
            open &&
            publicList.map((broadCast, i) => {
              return (
                <>
                  {broadCast?.catalogBroadcastMasterDTO?.catalogBroadcastId === 2 && (
                    <>
                      <Snackbar
                        anchorOrigin={{ vertical, horizontal }}
                        className="toaster-content"
                        open={open}
                        onClose={() => setState({ ...state, open: false })}
                        message={
                          <Box className="toaster-content">
                            <img src={notificationIcon} alt="notificationIcon" className="notification-icon" />
                            <Box className="toaster-text">
                              <Typography className="maintanence-text"> {broadCast.title}</Typography>
                              <Typography className="maintanence-time">
                                {/* <img src={calendarIcon} alt="calendarIcon" className="calendarIcon" />
                              {`${moment(broadCast?.fromDate).format("MM-DD-YYYY hh:mm A")} - ${moment(
                                broadCast?.toDate
                              ).format("MM-DD-YYYY hh:mm A")}`} */}
                                {broadCast.description}
                              </Typography>
                            </Box>
                            <CloseIcon
                              onClick={() => setState({ ...state, open: false })}
                              className="cross-icon cursor-pointer"
                            />
                          </Box>
                        }
                        key={vertical + horizontal}
                      />
                    </>
                  )}
                </>
              );
            })}
        </Box>
        <Box className="dashboard__wrapper">
          <Grid container className="m-0">
            {openReports && <DSRReport fetchData={fetchData} data={reportsRes} />}

            <Grid item xs={12} sm={12} md={12} lg={8} className="pe-3">
              <ActivityOverview />
              {loggedinId === 3 || loggedinId === 4 ? (
                <OrderStats />
              ) : loggedinId === 2 ? (
                <ClientSnapShots />
              ) : (
                <TenantSnapshots />
              )}
              <ReportsOverview />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4}>
              <OrderStatus />
              <Notification />
              <LatestOrders />
            </Grid>

            {/* <Grid item xs={12} sm={12} md={12} lg={8} className="ps-0">
            {loggedinId === 3 || loggedinId === 4 ? (
              <OrderStats />
            ) : loggedinId === 2 ? (
              <ClientSnapShots />
            ) : (
              <TenantSnapshots />
            )}
          </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12} lg={4} className="media-dashboard-card">
            <Notification />
          </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12} lg={8} className="ps-0">
            <ReportsOverview />
          </Grid> */}
            {/* <Grid item xs={12} sm={12} md={12} lg={4} className="media-dashboard-card">
            <LatestOrders />
          </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12} className="p-0">
              {/* <ColumnBar /> */}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
