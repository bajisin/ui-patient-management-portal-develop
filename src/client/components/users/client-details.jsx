import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { CALLTYPES, Provider, roleIds } from "../../_helpers/constants";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getTenantUserById, getUsersByEmail, getUsersByPhone } from "@redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

import AddClientUser from "./add-user/addUserModal";
import ClientDetailsTab from "./tab";
import Details from "../drawers/client-details";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SuccessPopup from "@components/master-data/sucesspopup";
import UpdateStatusDialog from "../tenant/tenant-details/updateStatusDialog";
import ViewDetailsArrow from "@assets/images/svg/viewDetails-arrow.svg";
import { getLoggedInUserRoleId } from "@utils/common";
import useDebounce from "@utils/useDebounce";

export default function ClientDetails() {
  const [open, setOpen] = useState(false);
  const [callType, setCallType] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const userId = pathname.split("/")[3];
  const clientUserId = pathname.split("/")[2];
  const tenant = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const loggedinId = getLoggedInUserRoleId() === 3;
  const [showActiveSuccessPopup, setShowActiveSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const debounceEmailVal = useDebounce(emailVal, 1000);
  const debouncePhnVal = useDebounce(phoneVal, 1000);

  useEffect(() => {
    if (callType === CALLTYPES.Edit) {
      if (debounceEmailVal !== "" && debounceEmailVal !== tenantUserById?.email)
        dispatch(getUsersByEmail(debounceEmailVal));
      if (debouncePhnVal !== "" && debouncePhnVal !== tenantUserById?.phoneNumber)
        dispatch(getUsersByPhone(debouncePhnVal));
    } else {
      if (debounceEmailVal !== "") dispatch(getUsersByEmail(debounceEmailVal));
      if (debouncePhnVal !== "") dispatch(getUsersByPhone(debouncePhnVal));
    }
  }, [debounceEmailVal, debouncePhnVal]);

  const handleClickOpen = () => {
    setOpen(true);
    setCallType(CALLTYPES.Edit);
    setTitle("Edit Client Admin");
  };

  useEffect(() => {
    if (getLoggedInUserRoleId() === roleIds.CLIENT_ADMIN) {
      dispatch(getTenantUserById(clientUserId));
    } else {
      dispatch(getTenantUserById(userId));
    }
  }, []);

  const [openDialog, setOpenDialog] = useState(false);
  const [statusTitle, setStatusTitle] = useState("");
  const { tenantUserById } = useSelector((state) => state.userDetails);

  useEffect(() => {
    if (tenantUserById.status) {
      setIsActive(tenantUserById?.status.statusId === 1); // Initialize isActive with the correct value
    }
  }, [tenantUserById.status]);

  const handleToggle = async () => {
    setStatusTitle(`Do you want to update the status to ${!isActive ? "Active" : "Inactive"}`);
    setOpenDialog(true);
  };

  const handleDialogConfirm = () => {
    // Close the dialog
    setIsActive(!isActive);
    setOpenDialog(false);
  };
  const [isActive, setIsActive] = useState(false);
  // const tenantDetails = JSON.parse(sessionStorage.getItem("tntAssetDetails")).tenantDetails;
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const toggleDrawerDetails = (open) => (event) => {
    setIsOpenDetails(open);
  };
  return (
    <>
      <Box className="content__wrapper content__wrapper--clientDetails">
        {isOpenDetails && (
          <Details
            isOpen={isOpenDetails}
            toggleDrawer={toggleDrawerDetails}
            loggedinId={loggedinId}
            setIsOpenDetails={setIsOpenDetails}
          />
        )}
        <Paper elevation={2} className="header__wrapper--content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={tenant?.tenantLogo} />
              </Typography>
              <Typography component="h5" variant="h5">
                {tenant?.tenantName}
                <Stack spacing={2}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    className="breadcrumb__wrapper"
                  >
                    <Link
                      key="1"
                      to={
                        getLoggedInUserRoleId() !== roleIds?.CLIENT_ADMIN
                          ? "/tenant-admin-users/client-admin"
                          : "/client-admin-users"
                      }
                    >
                      User Details
                    </Link>
                    <Typography key="2">
                      {getLoggedInUserRoleId() === roleIds?.CLIENT_ADMIN ? "Provider Details" : "Client Admin Details"}
                    </Typography>
                  </Breadcrumbs>
                </Stack>
              </Typography>
            </Typography>
            <Stack direction="row" gap={2} className="header__wrapper--actions">
              {Provider && Provider?.updateInd === true && (
                <Button className="bordered-icon-btn edit" onClick={() => handleClickOpen()}>
                  <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                </Button>
              )}
              {/* <Button
                component="button"
                variant="contained"
                className="primary-btn"
                onClick={() => {
                  setOpen(true);
                  setCallType("add");
                  setTitle("Add User");
                }}
              >
                Add New User
              </Button> */}
            </Stack>
          </Typography>
          <Divider className="w-100" />
          <Typography component="div" variant="div" className="header__wrapper--bottom">
            <List>
              <ListItem>
                <ListItemIcon>
                  {getLoggedInUserRoleId() === roleIds?.CLIENT_ADMIN ? "Provider" : "Client Admin"}
                </ListItemIcon>
                <ListItemText>{`${tenantUserById?.firstName} ${tenantUserById?.lastName}`}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                  Email
                </ListItemIcon>
                <ListItemText>{tenantUserById?.email}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                  Phone Number
                </ListItemIcon>
                {tenantUserById?.alternativePhoneNumber ? (
                  <ListItemText>{`${tenantUserById?.phoneNumber} | ${tenantUserById?.alternativePhoneNumber}`}</ListItemText>
                ) : (
                  <ListItemText>{`${tenantUserById?.phoneNumber}`}</ListItemText>
                )}
              </ListItem>
              <ListItem>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                  className="breadcrumb__wrapper"
                >
                  {loggedinId && Provider && Provider?.readInd === true && (
                    <Link key="1" onClick={() => setIsOpenDetails(true)} className="view-details__right-drawer">
                      {loggedinId ? "View General Details" : "View Details"}
                      <img src={ViewDetailsArrow} className="ms-1" />
                    </Link>
                  )}
                </Breadcrumbs>
              </ListItem>
            </List>
            <Stack direction="row" spacing={1} alignItems="center" className="switch-status">
              <Typography component="label" className="switch theme-switch" for="checkbox">
                <input type="checkbox" id="checkbox" checked={isActive} onClick={handleToggle} />
                <Typography component="div" className="slider round"></Typography>
              </Typography>
              <Typography>{isActive ? "Active" : "Inactive"}</Typography>
            </Stack>
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <ClientDetailsTab />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <AddClientUser
          open={open}
          userData={tenantUserById}
          setOpen={setOpen}
          callType={callType}
          title={title}
          userId={userId}
          setEmailVal={setEmailVal}
          setPhoneVal={setPhoneVal}
        />
      )}
      {openDialog && (
        <UpdateStatusDialog
          open={openDialog}
          setOpen={setOpenDialog}
          handleStatusUpdate={handleDialogConfirm}
          isActive={UpdateStatusDialog}
          title={statusTitle}
          onClick={handleToggle}
          status={tenantUserById?.status?.statusId}
          id={tenantUserById?.userId}
          call="clientUser"
          setShowActiveSuccessPopup={setShowActiveSuccessPopup}
          showActiveSuccessPopup={showActiveSuccessPopup}
          setSuccessMessage={setSuccessMessage}
        />
      )}
      {showActiveSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setOpenDialog(false);
            setShowActiveSuccessPopup(false);
            window.location.reload();
          }}
          successMessage={successMessage}
          call="clientUser"
        />
      )}
    </>
  );
}
