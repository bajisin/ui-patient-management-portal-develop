import * as React from "react";

import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import InsuranceDetails from "../tenant/tenant-details/patient-details/insurance-details";
import { PatientTabLabels } from "../../_helpers/constants";
import PropTypes from "prop-types";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import SubAccordion from "./subAccordion";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import moment from "moment";
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

export default function PatientTabComponent({ listView, orderData }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState(false);
  const { patientDetailsById } = useSelector((state) => state.tenants);
  const panel1 = patientDetailsById?.orderDetailsDTO?.map((order) => order?.panel?.filter((panl) => panl?.panelId));
  const indTest = patientDetailsById?.orderDetailsDTO?.map((order) => order.individualTest);
  const handleaccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const guranterDetails = patientDetailsById?.insuranceDetails?.map((gura) => gura?.gurantorDetails);
  return (
    <>
      <Box className="tab__wrapper rightDrawers-tab mt-4">
        <Tabs value={value} onChange={handleChange} aria-label="order details tabs" className="tabs_sections">
          {PatientTabLabels.map((l, i) => (
            <Tab key={i} label={l} {...a11yProps(i)} />
          ))}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography component="h6" variant="h6" className="underlined-title mt-3">
          Personal Details
        </Typography>
        <hr className="w-100 my-1" />
        <Grid container spacing={1} className="name__value--text mt-0">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Race
            </Typography>
            <Typography component="b" variant="b">
              {patientDetailsById?.race?.description}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Biological Gender
            </Typography>
            <Typography component="b" variant="b">
              {patientDetailsById?.gender?.description}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Ethnic Group
            </Typography>
            <Typography component="b" variant="b">
              {patientDetailsById?.ethenicGroup?.description}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              MRN No.
            </Typography>
            <Typography component="b" variant="b">
              {patientDetailsById?.mrn}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Permanent Address
            </Typography>
            <Typography component="b" variant="b">
              {patientDetailsById?.primaryAddrs}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Communication Address
            </Typography>
            <Typography component="b" variant="b">
              {patientDetailsById?.secondaryAddrs}
            </Typography>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InsuranceDetails insuranceDetails={patientDetailsById?.insuranceDetails} guarantorDetails={guranterDetails} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {patientDetailsById?.careGiverDTO?.map((caregiver) => (
          <>
            <Typography component="h6" variant="h6" className="underlined-title mt-3">
              Caregiver Details
            </Typography>
            <hr className="w-100 my-1" />
            <Grid container spacing={1} className="name__value--text mt-0">
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Name
                </Typography>
                <Typography component="b" variant="b">
                  {caregiver?.firstName}
                  {caregiver?.middleName === null || undefined ? "" : caregiver?.middleName || ""}
                  {caregiver?.lastName}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Email
                </Typography>
                <Typography component="b" variant="b">
                  {caregiver?.email}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Phone No.
                </Typography>
                <Typography component="b" variant="b">
                  {caregiver?.userPhoneNo}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Permanent Address
                </Typography>
                <Typography component="b" variant="b">
                  {caregiver?.careGiverAddress}
                </Typography>
              </Grid>
            </Grid>
          </>
        ))}
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography component="div" variant="div" className="basic__drawer--header">
          <Grid container spacing={1} className="pdf__wrapper">
            {orderData?.reports?.length > 0 &&
              orderData?.reports?.map((report, i) => (
                <Grid key={i} item lg={6} md={6} sm={12} xs={12}>
                  <Card className="mini__card position-relative">
                    <CardContent>
                      <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                      <Typography component="label" variant="label">
                        {report.fileName}
                        <br />
                        <Typography component="span" variant="span">
                          {moment(report.createdAt).format("MM/DD/YYYY")}
                        </Typography>
                      </Typography>
                    </CardContent>
                    <Stack direction="row" spacing={1}>
                      <IconButton aria-label="delete">
                        <VisibilityOutlinedIcon />
                      </IconButton>
                      <IconButton aria-label="delete">
                        <SaveAltOutlinedIcon />
                      </IconButton>
                    </Stack>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Typography>
        <Box className="accordion__wrapper parent--accordion">
          <Accordion expanded={expanded === "panel1"} onChange={handleaccordionChange("panel1")}>
            {patientDetailsById?.orderDetailsDTO?.map((order) => (
              <>
                <AccordionSummary
                  expandIcon={
                    <Typography
                      variant="span"
                      component="span"
                      className="ls-rightarrow ls-outlined-down-arrow"
                    ></Typography>
                  }
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography>{order?.createdDate} </Typography>
                </AccordionSummary>
              </>
            ))}
            <SubAccordion panel1={panel1} indTest={indTest} orderDocs={patientDetailsById} />
          </Accordion>
        </Box>
      </TabPanel>
    </>
  );
}
