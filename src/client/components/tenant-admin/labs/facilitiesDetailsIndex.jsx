import { Box, Breadcrumbs, Button, Grid, Paper, Stack, Typography } from "@mui/material";

import AddUser from "@components/users/addUserModal";
import FacilitiesParentOrderTab from "../facilities/facilitiesparentOrderTab";
import React from "react";
import Tenant from "@assets/images/ls_svg/patient-management/tenant1.png";

export default function FacilitiesUsers() {
  const [open, setOpen] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);

  const handleEditClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box className="content__wrapper">
        <Paper elevation={2} className="header__wrapper--content mb-3">
          <Typography component="div" variant="div" className="header__wrapper--top">
            <Typography component="div" variant="div" className="header__wrapper--title">
              <Typography component="div" variant="div" className="header__wrapper--logo">
                <img src={Tenant} />
              </Typography>
              <Typography component="h5" variant="h5">
                Unilab
                <Stack spacing={2}>
                  <Breadcrumbs aria-label="breadcrumb" className="breadcrumb__wrapper">
                    <Typography key="1">User Details</Typography>
                  </Breadcrumbs>
                </Stack>
              </Typography>
            </Typography>
            <Stack direction="row" gap={2} className="header__wrapper--actions">
              <Button className="bordered-icon-btn edit" onClick={handleEditClickOpen}>
                <Typography component="span" variant="span" className="ls-edit primaryIcon fs-16"></Typography>
              </Button>
              <Button component="button" variant="contained" className="primary-btn" onClick={() => setOpenUser(true)}>
                Add New User
              </Button>
            </Stack>
          </Typography>
        </Paper>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <FacilitiesParentOrderTab />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {openUser && <AddUser setOpen={setOpenUser} open={openUser} user={"tenant"} title="Add New User" />}
      {open && <EditTenant setOpen={setOpen} open={open} user={"tenant"} title="Edit Tenant" />}
    </>
  );
}
