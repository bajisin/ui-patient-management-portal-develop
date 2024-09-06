import { Box, Button, FormControl, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DialogTitle from "@mui/material/DialogTitle";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Popper from "@mui/material/Popper";
import TabComponent from "@components/orders-reports/tab";
import dayjs from "dayjs";

// import { useAuth0 } from "@auth0/auth0-react";
const OrderAndReports = () => {
  // const [filterOpen, setFilterOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleFilter = () => {
  //   setFilterOpen(true);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <>
      <Box className="content__wrapper">
        <Typography component="div" variant="div" className="content__wrapper--header">
          <Typography component="h4" variant="h4">
            Orders & Results
            <Typography component="span" variant="span">
              Get an overview of orders and results
            </Typography>
          </Typography>
        </Typography>
        <Grid container rowSpacing={2} className="content__wrapper--view">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Box className="list__view">
              <TabComponent />
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Popper id={id} open={open} anchorEl={anchorEl} transition className="advance_filter__open">
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
              <DialogTitle className="fs-16 fw-regular p-0 mb-3" component="h4" variant="h4">
                Advanced Search Order Reports
                <IconButton aria-label="close" className="modalClose">
                  <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
                </IconButton>
              </DialogTitle>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography variant="label" component="label" className="add__label">
                    Tenant ID
                  </Typography>
                  <FormControl className="w-100">
                    <Select className="add__select">
                      <MenuItem value="test1">Tenantid1</MenuItem>
                      <MenuItem value="test2">Tenantid2</MenuItem>
                      <MenuItem value="test3">Tenantid3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography variant="label" component="label" className="add__label">
                    Order ID
                  </Typography>
                  <FormControl className="w-100">
                    <Select className="add__select" placeholder="Select the preferred diagnostic code">
                      <MenuItem value="test1">orderID1</MenuItem>
                      <MenuItem value="test2">orderID2</MenuItem>
                      <MenuItem value="test3">orderID3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <Typography variant="label" component="label" className="add__label">
                    Patient ID
                  </Typography>
                  <FormControl className="w-100">
                    <Select className="add__select">
                      <MenuItem value="test1">Patientid1</MenuItem>
                      <MenuItem value="test2">Patientid2</MenuItem>
                      <MenuItem value="test3">Patientid3</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <Typography variant="label" component="label" className="add__label">
                        Start Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          // value={dayjs(startDate)}
                          className="w-100 datetimepicker-control"
                          defaultValue={dayjs("YYYY-MM-DD")}
                          // onChange={(newValue) => setStartDate(dayjs(newValue).format("YYYY-MM-DD"))}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid>
                      <Typography variant="label" component="label" className="add__label">
                        End Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          // value={dayjs(endDate)}
                          className="w-100 datetimepicker-control"
                          // onChange={(newValue) => setEndDate(dayjs(newValue).format("YYYY-MM-DD"))}
                          // minDate={dayjs(startDate)}
                          // maxDate={today.isBefore(dayjs().add(1, "day")) ? today : dayjs().add(1, "day")}
                          defaultValue={dayjs("YYYY-MM-DD")}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </>
                </Grid>
              </Grid>
              <Typography className="title__wrapper--right d-flex gap20">
                <Button className="clear-all primaryTextButton">Clear All</Button>
                <Button type="submit" autoFocus className="primary-btn">
                  Search
                </Button>
              </Typography>
            </Box>
          </Fade>
        )}
      </Popper>
    </>
  );
};
export default OrderAndReports;
