import { Box, Button, Grid, Typography } from "@mui/material";

import { CompendiumPopUp } from "../../tenant-admin/compendium/compendiumspopup";
import CreatePanel from "@components/tenant-admin/order-config/createPanel";
import CreateTest from "../../../components/tenant-admin/order-config/createTest";
import ParentOrderTab from "@components/tenant-admin/order-config/parentOrderTab";
import React from "react";

export const OrderConfiguration = (props) => {
  const [open, setOpen] = React.useState(false);
  const [test, setTest] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenCreateTest = () => {
    setTest(true);
  };

  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Order Configuration
            <Typography component="span" variant="span">
              Creating test and viewing different tests
            </Typography>
          </Typography>
          <Typography>
            <Button component="button" variant="outlined" className="primary-outline-btn" onClick={handleClickOpen}>
              Create Panel
            </Button>
            <Button component="button" variant="contained" className="primary-btn ms-4" onClick={handleOpenCreateTest}>
              Create Test
            </Button>
          </Typography>
        </Typography>
        <Box className="order-config-section">
          <Grid container rowSpacing={2} className="content__wrapper--view">
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box className="list__view">
                <ParentOrderTab />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {open && <CreatePanel setOpen={setOpen} open={open} />}
      {test && <CompendiumPopUp currentTab={0} open={test} title={"Test Compendium"} setOpen={setTest} />}
    </>
  );
};
