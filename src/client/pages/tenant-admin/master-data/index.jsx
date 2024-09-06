import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import MasterDataTab from "../../../components/master-data/masterDataTab";

export default function TenantMasterData() {
  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Master Data
            <Typography component="span" variant="span">
              Get an overview of master data
            </Typography>
          </Typography>
        </Typography>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <MasterDataTab />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
