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
import { CALLTYPES, roleIds } from "../../../_helpers/constants";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getUsersByEmail, getUsersByPhone } from "@redux/slices/usersSlice";
import { useDispatch, useSelector } from "react-redux";

import AddTenantUser from "./add-tenant-user";
import EditTenant from "../tenant-config/add-tenant";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SuccessPopup from "@components/master-data/sucesspopup";
import TenantTabComponent from "./parentTab";
import UpdateStatusDialog from "./updateStatusDialog";
import { getTenantsById } from "@redux/slices/tenantsSlice";
import useDebounce from "@utils/useDebounce";

export default function TenantDetails() {
  const [open, setOpen] = useState(false);
  const [openTenantUser, setOpenTenantUser] = useState(false);
  const { pathname } = useLocation();
  const tenantId = pathname.split("/")[3];
  const dispatch = useDispatch();
  const [emailVal, setEmailVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [clientTab, setClientTab] = useState(false);

  const debounceEmailVal = useDebounce(emailVal, 1000);
  const debouncePhnVal = useDebounce(phoneVal, 1000);

  useEffect(() => {
    if (open) {
      if (debounceEmailVal !== "" && debounceEmailVal !== tenantById?.emailAddress)
        dispatch(getUsersByEmail(debounceEmailVal));
      if (debouncePhnVal !== "" && debouncePhnVal !== tenantById?.phoneNumber)
        dispatch(getUsersByPhone(debouncePhnVal));
    } else {
      if (debounceEmailVal !== "") dispatch(getUsersByEmail(debounceEmailVal));
      if (debouncePhnVal !== "") dispatch(getUsersByPhone(debouncePhnVal));
    }
  }, [debounceEmailVal, debouncePhnVal]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const { tenantById } = useSelector((state) => state.tenants);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [isActive, setIsActive] = useState();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [renderParent, setRenderParent] = useState(true);
  const [roles, setRoles] = useState([roleIds.TENANT_ADMIN, roleIds.CLIENT_ADMIN, roleIds.PROVIDER]);
  const [selectedTenant, setSelectedTenant] = useState();
  const [tenantRole, setTenantRole] = useState(true);
  const [showActiveSuccessPopup, setShowActiveSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showFailurePopup, setShowFailurePopup] = useState(false);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const idCheck = JSON.parse(localStorage.getItem("Response"));

    // Iterate over each item in idCheck
    idCheck.forEach((s) => {
      if (s.tenantId === tenantId) {
        if (s.dbExisted === false) {
          setShow(false);
        } else {
          setShow(true);
        }
      }
    });

    dispatch(getTenantsById(tenantId));
  }, [dispatch, tenantId]);

  useEffect(() => {
    if (tenantById.status) {
      setIsActive(tenantById.status.statusId === 1); // Initialize isActive with the correct value
    }
  }, [tenantById.status]);
  const handleToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setTitle(
      `Do you want to ${isActive ? "inactivate" : "activate"} the Tenant ? It will ${
        isActive ? "inactivate" : "activate"
      } all the users connected`
    );
    setOpenLogoutDialog(true);
  };

  const handleDialogConfirm = () => {
    setIsActive(!isActive);
  };

  const handleBreadCrumb = () => {
    setRoles([roleIds.TENANT_ADMIN, roleIds.CLIENT_ADMIN, roleIds.PROVIDER]);
    setRenderParent(true);
    setSelectedTenant();
    setClientTab(false);
  };

  return (
    <>
      <Box className="content__wrapper">
        <Paper elevation={2} className="header__wrapper--content tenant-content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={tenantById?.tenantLogo} />
              </Typography>
              <Typography component="h5" variant="h5">
                {tenantById?.tenantName}
                <Stack spacing={2}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    className="breadcrumb__wrapper"
                  >
                    <Link key="1" to="/tenant-config">
                      Tenant configuration
                    </Link>
                    <Link key="2" onClick={handleBreadCrumb}>
                      Tenant Details
                    </Link>
                    {!renderParent &&
                      (tenantRole ? (
                        <Typography key="3">Tenant Admin</Typography>
                      ) : (
                        <Typography key="3">Client Admin</Typography>
                      ))}
                  </Breadcrumbs>
                </Stack>
              </Typography>
            </Typography>
            <Stack direction="row" gap={2} className="header__wrapper--actions">
              {show ? (
                <Button className="bordered-icon-btn edit" onClick={() => handleClickOpen()}>
                  <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                </Button>
              ) : (
                ""
              )}
              {show ? (
                <Button
                  component="button"
                  variant="contained"
                  className="primary-btn"
                  onClick={() => setOpenTenantUser(true)}
                >
                  Add Tenant Admin
                </Button>
              ) : (
                ""
              )}
            </Stack>
          </Typography>
          <Divider className="w-100" />
          <Typography component="div" variant="div" className="header__wrapper--bottom">
            <List>
              <ListItem>
                <ListItemIcon> Tenant Admin</ListItemIcon>
                <ListItemText>{`${tenantById?.firstName} ${tenantById?.lastName}`}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                  Email
                </ListItemIcon>
                <ListItemText>{tenantById?.emailAddress}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography component="span" variant="span" className="ls-phone secondaryIcon"></Typography>
                  Phone Number
                </ListItemIcon>
                <ListItemText>{tenantById?.phoneNumber === "null" ? "" : tenantById?.phoneNumber}</ListItemText>
              </ListItem>
            </List>
            {tenantById?.status?.statusId !== 3 && (
              <Stack direction="row" spacing={1} alignItems="center" className="switch-status">
                <Typography component="label" className="switch" for="checkbox">
                  <input type="checkbox" id="checkbox" checked={isActive} onClick={handleToggle} />
                  <Typography component="div" className="slider round"></Typography>
                </Typography>
                <Typography>{show ? (isActive ? "Active" : "Inactive") : ""}</Typography>
              </Stack>
            )}
            {openLogoutDialog && (
              <UpdateStatusDialog
                open={openLogoutDialog}
                setOpen={setOpenLogoutDialog}
                handleStatusUpdate={handleDialogConfirm}
                isActive={UpdateStatusDialog}
                title={title}
                onClick={handleToggle}
                status={tenantById?.status?.statusId}
                id={tenantById?.tenantId}
                call="tenantUser"
                setShowActiveSuccessPopup={setShowActiveSuccessPopup}
                setSuccessMessage={setSuccessMessage}
                setShowFailurePopup={setShowFailurePopup}
              />
            )}
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              {show ? (
                <TenantTabComponent
                  renderParent={renderParent}
                  setRenderParent={setRenderParent}
                  roles={roles}
                  setRoles={setRoles}
                  tenantRole={tenantRole}
                  setTenantRole={setTenantRole}
                  selectedTenant={selectedTenant}
                  setSelectedTenant={setSelectedTenant}
                  setClientTab={setClientTab}
                  clientTab={clientTab}
                />
              ) : (
                "Tenant creation under processing, please check here after some time"
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openTenantUser && (
        <AddTenantUser
          open={openTenantUser}
          user={"user"}
          setOpen={setOpenTenantUser}
          callType={CALLTYPES.Add}
          title="Add Tenant Admin"
          setEmailVal={setEmailVal}
          setPhoneVal={setPhoneVal}
          showSuccessPopup={showSuccessPopup}
          setShowSuccessPopup={setShowSuccessPopup}
        />
      )}
      {open && (
        <EditTenant
          setOpen={setOpen}
          open={open}
          tenantId={tenantId}
          callType={CALLTYPES.Edit}
          title="Edit Tenant"
          setEmailVal={setEmailVal}
          setPhoneVal={setPhoneVal}
        />
      )}

      {showActiveSuccessPopup && (
        <SuccessPopup
          onClose={() => {
            setOpenLogoutDialog(false);
            setShowActiveSuccessPopup(false);
            setOpen(false);
            window.location.reload();
          }}
          successMessage={successMessage}
          call="tenantUser"
        />
      )}
    </>
  );
}
