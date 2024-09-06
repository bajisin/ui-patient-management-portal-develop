import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import React from "react";
import TabComponent from "./tabs";
import { orderStatus } from "../../_helpers/constants";

const OrderDetails = ({ isOpen, toggleDrawer, orderData }) => {
  const handleBack = () => {
    toggleDrawer(false)();
  };
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
                  JP
                </Typography>
              </Typography>
              <Typography component="div" variant="div" className="profileData profileDataPatient">
                <Box className="d-flex align-items-center justify-content-between mb-2">
                  <Typography component="h5" variant="h5">
                    {orderData?.tenantName}
                  </Typography>
                  <Stack direction="row" spacing={1} className="mt-0">
                    {orderData?.orderStatusDto?.id === orderStatus.COMPLETED ? (
                      <Chip className="chip__btn chip__btn--green float-end" label="Completed" />
                    ) : (
                      <Chip className="chip__btn chip__btn--yellow float-end" label="In Progress" />
                    )}
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Typography component="p" variant="p">
                    <Typography
                      variant="span"
                      component="span"
                      className="ls-mail secondaryIcon fs-16 me-1"
                    ></Typography>
                    Email
                    <Typography component="span" variant="span">
                      {orderData?.tenantEmail}
                    </Typography>
                  </Typography>
                  <Typography component="p" variant="p">
                    <Typography
                      component="span"
                      variant="span"
                      className="ls-edit secondaryIcon me-1 fs-16"
                    ></Typography>
                    Phone Number
                    <Typography component="span" variant="span">
                      {orderData?.tenantPhoneNumber}
                    </Typography>
                  </Typography>
                </Stack>
              </Typography>
            </Box>
          </Typography>
          <TabComponent orderData={orderData} />
        </Typography>
      </Box>
    </Drawer>
  );
};

export default OrderDetails;
