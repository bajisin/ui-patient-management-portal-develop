import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MyStatefulEditor from "./rte.test";

export default function AboutUs() {
  return (
    <Box className="formcontrol__wrapper">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="label" component="label" className="add__label required">
            Add Title
          </Typography>
          {/* <TextField className="add__input" placeholder="About Us" variant="outlined" /> */}
          <MyStatefulEditor markup="" />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="label" component="label" className="add__label">
            Description
          </Typography>
          <Typography variant="div" component="div" className="description__wrapper">
            <MyStatefulEditor markup="" />
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
