import { Box, Card, Grid, Typography } from "@mui/material";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import DateCalendarServerRequest from "./calender";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React from "react";

/**
 * @author
 * @function OrderHistory
 **/

export const OrderHistory = (props) => {
  return (
    <>
      <Card className="basic__card calendar_wrapper mb-3">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendarServerRequest />
        </LocalizationProvider>
      </Card>
      <Grid container spacing={2} className="mt-0 d-none">
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box className="secondary__card">
            <Typography variant="p" component="p">
              Frequently Ordered Tests
            </Typography>
            <Grid container className="m-0 w-100">
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  013508:
                  <Typography variant="span" component="span">
                    Urean Nitrogen U
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  007260:
                  <Typography variant="span" component="span">
                    Valproic Acid, Serum or Plasma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  013508:
                  <Typography variant="span" component="span">
                    Urean Nitrogen U
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  007260:
                  <Typography variant="span" component="span">
                    Valproic Acid, Serum or Plasma
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Box className="secondary__card">
            <Typography variant="p" component="p">
              Frequently Used Diagnosis Code
            </Typography>
            <Grid container className="m-0 w-100">
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  GTT:
                  <Typography variant="span" component="span">
                    Glutamyl Transferase Gamma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  013508:
                  <Typography variant="span" component="span">
                    Urean Nitrogen U
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  007260:
                  <Typography variant="span" component="span">
                    Valproic Acid, Serum or Plasma
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  013508:
                  <Typography variant="span" component="span">
                    Urean Nitrogen U
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} className="chip__wrapper">
                <Typography variant="label" component="label">
                  007260:
                  <Typography variant="span" component="span">
                    Valproic Acid, Serum or Plasma
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
