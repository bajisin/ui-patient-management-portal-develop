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
import { CALLTYPES, Lab } from "../../../_helpers/constants";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import EditLab from "./addNewLabs";
import LabDetailsDrawer from "../../drawers/lab";
import LabParentOrderTab from "./labparentOrderTab";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SuccessPopup from "@components/master-data/sucesspopup";
import UpdateStatusDialog from "../../tenant/tenant-details/updateStatusDialog";
import ViewDetailsArrow from "@assets/images/svg/viewDetails-arrow.svg";
import { getLabById } from "@redux/slices/labs-slice";

export default function LabUsers() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const labId = pathname.split("/")[3];
  const { labById } = useSelector((state) => state.labs);
  const tenant = JSON.parse(sessionStorage.getItem("tntAssetDetails"))?.tenantDetails;
  const [statusTitle, setStatusTitle] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [showActiveSuccessPopup, setShowActiveSuccessPopup] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  useEffect(() => {
    dispatch(getLabById(labId));
  }, []);
  const handleEditClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (labById?.statusDTO?.statusId === 2) setIsActive(true);
    else setIsActive(false);
  }, [labById]);
  const handleToggle = async () => {
    setStatusTitle(`Do you want to update the status to ${isActive ? "Active" : "Inactive"}`);
    setOpenDialog(true);
  };

  const handleDialogConfirm = () => {
    // Close the dialog
    setIsActive(!isActive);
    setOpenDialog(false);
  };

  const toggleDrawer = (open) => (event) => {
    setOpenDrawer(open);
  };

  return (
    <>
      <Box className="content__wrapper">
        {openDrawer && <LabDetailsDrawer isOpen={openDrawer} toggleDrawer={toggleDrawer} />}
        <Paper elevation={2} className="header__wrapper--content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={tenant?.tenantLogo} />
              </Typography>
              <Typography component="h5" variant="h5">
                {/* {tenant?.tenantName} */}
                <ListItemIcon>Lab</ListItemIcon>
                <ListItemText>{labById?.labName}</ListItemText>
                <Stack spacing={2}>
                  <Breadcrumbs
                    separator={<NavigateNextIcon fontSize="small" />}
                    aria-label="breadcrumb"
                    className="breadcrumb__wrapper"
                  >
                    <Link key="1" to="/labs">
                      Labs
                    </Link>
                    <Typography key="2">Lab Details</Typography>
                  </Breadcrumbs>
                </Stack>
              </Typography>
            </Typography>
            <Stack direction="row" gap={2} className="header__wrapper--actions">
              {Lab.updateInd === true && (
                <Button className="bordered-icon-btn edit" onClick={handleEditClickOpen}>
                  <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
                </Button>
              )}
            </Stack>
          </Typography>
          <Divider className="w-100" />
          <Typography component="div" variant="div" className="header__wrapper--bottom">
            <List>
              {/* <ListItem>
                <ListItemIcon>Lab</ListItemIcon>
                <ListItemText>{labById?.labName}</ListItemText>
              </ListItem> */}
              <ListItem>
                <ListItemIcon>
                  <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                  Email
                </ListItemIcon>
                <ListItemText>{labById?.emailAddress}</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                  Phone Number
                </ListItemIcon>
                {labById?.alternativePhoneNumber ? (
                  <ListItemText>
                    {labById?.phoneNumber} | {labById?.alternativePhoneNumber}
                  </ListItemText>
                ) : (
                  <ListItemText>{labById?.phoneNumber}</ListItemText>
                )}
              </ListItem>
              <ListItem>
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                  className="breadcrumb__wrapper"
                >
                  <Link key="1" onClick={() => setOpenDrawer(true)} className="view-details__right-drawer">
                    View Details
                    <img src={ViewDetailsArrow} className="ms-1" />
                  </Link>
                </Breadcrumbs>
              </ListItem>
            </List>
            <Stack direction="row" spacing={1} alignItems="center" className="switch-status">
              <Typography component="label" className="switch theme-switch" for="checkbox">
                <input type="checkbox" id="checkbox" checked={!isActive} onClick={handleToggle} />
                <Typography component="div" className="slider round"></Typography>
              </Typography>
              <Typography>{!isActive ? "Active" : "Inactive"}</Typography>
            </Stack>
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <LabParentOrderTab />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {open && <EditLab setOpen={setOpen} open={open} callType={CALLTYPES.Edit} title="Edit Lab" />}
      {openDialog && (
        <UpdateStatusDialog
          open={openDialog}
          setOpen={setOpenDialog}
          handleStatusUpdate={handleDialogConfirm}
          isActive={UpdateStatusDialog}
          title={statusTitle}
          onClick={handleToggle}
          status={labById?.statusDTO?.statusId}
          id={labById?.labId}
          call="lab"
          setSuccessMessage={setSuccessMessage}
          setShowActiveSuccessPopup={setShowActiveSuccessPopup}
          showActiveSuccessPopup={showActiveSuccessPopup}
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
          call="lab"
        />
      )}
    </>
  );
}
