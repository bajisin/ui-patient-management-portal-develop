import * as React from "react";

import { Box, Grid, Typography } from "@mui/material";

import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TestDetails from "./test-details";
import { useSelector } from "react-redux";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orderDetails-tabpanel-${index}`}
      aria-labelledby={`orderDetails-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `orderDetails-tab-${index}`,
    "aria-controls": `orderDetails-tabpanel-${index}`
  };
}

export default function TabComponent({ listView, orderData, type, facilitiesById }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { labById } = useSelector((state) => state.labs);
  const labDays = () => {
    const dayDescArray = facilitiesById?.labDays.map((item) => item.daysLab.dayDesc);
    return dayDescArray.join(", ");
  };
  return (
    <>
      <Box className="tab__wrapper rightDrawers-tab mt-4">
        <Tabs value={value} onChange={handleChange} aria-label="order details tabs" className="tabs_sections">
          <Tab label={type === "facility" ? "other Details" : "General Details"} {...a11yProps(0)} />
        </Tabs>
      </Box>
      {type !== "facility" ? (
        <TabPanel value={value} index={0}>
          <Typography component="h6" variant="h6" className="underlined-title mt-3">
            Lab Details
          </Typography>
          {labById?.labName}
          <hr className="w-100 my-1" />
          <Grid container spacing={1} className="name__value--text mt-0">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                Location
              </Typography>
              <Typography component="b" variant="b">
                {`${labById?.city}, ${labById?.state}, ${labById?.country}, ${labById?.zipcode}`}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                Address
              </Typography>
              <Typography component="b" variant="b">
                {labById?.address}
              </Typography>
            </Grid>
          </Grid>
        </TabPanel>
      ) : (
        <TabPanel value={value} index={0}>
          <Grid container spacing={1} className="name__value--text mt-0">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                MANAGEMENT GROUP
              </Typography>
              <Typography component="b" variant="b">
                {`${facilitiesById?.managementGroupName}`}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                FACILITY TYPE
              </Typography>
              <Typography component="b" variant="b">
                {`${facilitiesById?.facilityName}`}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                ADDRESS
              </Typography>
              <Typography component="b" variant="b">
                {facilitiesById?.address}
              </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Typography component="p" variant="p">
                LAB DAYS
              </Typography>
              <Typography component="b" variant="b">
                {labDays()}
              </Typography>
            </Grid>
          </Grid>

          <Typography component="h6" variant="h6" className="underlined-title mt-3">
            Service Details
          </Typography>
          <hr className="w-100 my-1" />
          <Grid container spacing={1} className="name__value--text mt-0">
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Typography component="p" variant="p">
                Services assigned:
                {type === "facility" ? facilitiesById?.services?.length : facilitiesById?.userFacilities?.length}
              </Typography>
            </Grid>
            {type !== "facility"
              ? facilitiesById?.userFacilities?.map((facility, i) => (
                  <Grid key={i} item lg={6} md={6} sm={12} xs={12}>
                    <Typography component="b" variant="b">
                      {`${i + 1}. ${facility?.facilityName}`}
                    </Typography>
                  </Grid>
                ))
              : facilitiesById?.services?.map((facility, i) => (
                  <Grid key={i} item lg={6} md={6} sm={12} xs={12}>
                    <Typography component="b" variant="b">
                      {`${i + 1}. ${facility?.serviceMaster?.description}`}
                    </Typography>
                  </Grid>
                ))}
          </Grid>
        </TabPanel>
      )}
      <TabPanel value={value} index={1}>
        <TestDetails testDetails={labById?.tests} />
      </TabPanel>
    </>
  );
}
