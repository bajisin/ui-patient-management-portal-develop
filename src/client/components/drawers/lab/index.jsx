import { Box, Chip, Drawer, IconButton, Stack, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import TabComponent from "./general-details";
import { useSelector } from "react-redux";

const LabDetailsDrawer = ({ isOpen, toggleDrawer, type, facilitiesById }) => {
  const { labById } = useSelector((state) => state.labs);

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
                  {type !== "facility" ? (
                    <>
                      {labById?.labName.charAt(0).toUpperCase()}
                      {labById?.labName.charAt(labById?.labName.length - 1).toUpperCase()}
                    </>
                  ) : (
                    <>
                      {facilitiesById?.facilityName.charAt(0).toUpperCase()}
                      {facilitiesById?.facilityName.charAt(facilitiesById?.facilityName.length - 1).toUpperCase()}
                    </>
                  )}
                </Typography>
              </Typography>
              <Typography component="div" variant="div" className="profileData profileDataPatient">
                <Box className="d-flex align-items-center justify-content-between mb-2">
                  <Typography component="h5" variant="h5">
                    {type !== "facility" ? <>{labById?.labName}</> : <>{facilitiesById.facilityName}</>}
                  </Typography>
                  <Stack direction="row" spacing={1} className="mt-0">
                    {type == "facility" ? (
                      facilitiesById?.status?.statusId === 1 ? (
                        <Chip className="chip__btn chip__btn--green float-end" label="Active" />
                      ) : (
                        <Chip className="chip__btn chip__btn--red float-end" label="In Active" />
                      )
                    ) : labById?.statusDTO?.statusId == 1 ? (
                      <Chip className="chip__btn chip__btn--green float-end" label="Active" />
                    ) : (
                      <Chip className="chip__btn chip__btn--red float-end" label="In Active" />
                    )}
                  </Stack>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Typography component="p" variant="p">
                    <Typography variant="span" component="span" className="ls-mail secondaryIcon"></Typography>
                    Email
                    <Typography component="span" variant="span">
                      {type !== "facility" ? <>{labById?.emailAddress}</> : <>{facilitiesById.emailAddress}</>}
                    </Typography>
                  </Typography>
                  <Typography component="p" variant="p">
                    <Typography component="span" variant="span" className="ls-phone secondaryIcon me-1"></Typography>
                    Phone Number
                    <Typography component="span" variant="span">
                      {type !== "facility" ? <>{labById?.phoneNumber}</> : <>{facilitiesById.phoneNumber}</>}
                    </Typography>
                  </Typography>
                </Stack>
              </Typography>
            </Box>
            <TabComponent type={type} facilitiesById={facilitiesById} />
          </Typography>
        </Typography>
      </Box>
    </Drawer>
  );
};

export default LabDetailsDrawer;
