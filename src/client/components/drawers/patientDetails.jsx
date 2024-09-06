import { Box, Button, Chip, IconButton, Stack, Typography } from "@mui/material";
import { Patient, orderStatus } from "../../_helpers/constants";

import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import PatientTabComponent from "./patientTabs";
import React from "react";
import { getLoggedInUserRoleId } from "@utils/common";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PatientDetails = ({ isOpen, toggleDrawer }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    toggleDrawer(false)();
  };

  const { patientDetailsById } = useSelector((state) => state.tenants);
  const handleEditClick = () => {
    navigate(`/addPatient?edit=true&id=${patientDetailsById?.patientId}`);
  };

  const orderCreate=()=>{
    const queryParams = {
      param: "createOrder"
    };
    const queryString = new URLSearchParams(queryParams).toString();
    navigate(`/create-order/${patientDetailsById?.patientId}?${queryString}`);
  }

  return (
    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
      <Box className="basic__drawer">
        <IconButton className="close-drawer">
          <CloseIcon onClick={handleBack}></CloseIcon>
        </IconButton>
        <Typography component="div" variant="div" className="common__layout--drawer">
          <Typography component="div" variant="div" className="basic__drawer--header">
            <Box className="drawer--title">
              <Typography component="div" variant="div" className="profilePic">
                <Typography component="h6" variant="h6">
                  {patientDetailsById?.firstName && patientDetailsById?.lastName
                    ? `${patientDetailsById.firstName[0]}${patientDetailsById.lastName[0]}`
                    : ""}
                </Typography>
              </Typography>
              <Typography component="div" variant="div" className="profileData profileDataPatient">
                <Box className="d-flex align-items-center justify-content-between mb-2">
                  <Typography component="h5" variant="h5">
                    {patientDetailsById?.firstName} {patientDetailsById?.lastName}
                  </Typography>
                  <Stack direction="row" spacing={1} className="mt-0">
                    {(getLoggedInUserRoleId() === 2 ||
                      getLoggedInUserRoleId() === 3 ||
                      getLoggedInUserRoleId() === 4) &&
                    Patient.updateInd === true ? (
                      <>
                      <Button
                        component="button"
                        variant="outlined"
                        className="primary-outline-btn edit-button"
                        onClick={orderCreate}
                      >
                        Create Order
                      </Button>

                      <Button
                        component="button"
                        variant="outlined"
                        className="primary-outline-btn edit-button"
                        onClick={handleEditClick}
                      >
                        Edit Patient
                      </Button>
                      </>
                    ) : (
                      ""
                    )}
                    {/* {patientDetailsById?.orderStatusDto?.id === orderStatus.COMPLETED ? (
                      <Chip className="chip__btn chip__btn--green float-end" label="Completed" />
                    ) : (
                      <Chip className="chip__btn chip__btn--yellow float-end" label="In Progress" />
                    )} */}
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Typography component="p" variant="p">
                    <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                    Email
                    <Typography component="span" variant="span">
                      {patientDetailsById?.email}
                    </Typography>
                  </Typography>
                  <Typography component="p" variant="p">
                    <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                    Phone Number
                    <Typography component="span" variant="span">
                      {patientDetailsById?.phoneNumber}
                    </Typography>
                  </Typography>
                </Stack>
              </Typography>
            </Box>
          </Typography>
          <PatientTabComponent />
        </Typography>
      </Box>
    </Drawer>
  );
};

export default PatientDetails;
