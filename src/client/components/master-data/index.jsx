import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MasterTenantTabComponent from "./masterTenantTab";
import { getTenants } from "@redux/slices/tenantsSlice";

const MasterData = () => {
  const { data } = useSelector((state) => state.tenants);
  const dispatch = useDispatch();
  const fetchData = (data) => {
    dispatch(getTenants(data));
  };
  useEffect(() => {
    if (data.length === 0) {
      fetchData("all");
    }
  }, []);

  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Manage Master Data <br />
            <Typography component="span" variant="span">
              Get an overview of master data
            </Typography>
          </Typography>
        </Typography>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <MasterTenantTabComponent />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MasterData;
