import * as React from "react";

import { Box, Card, CardContent, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { DrawerTabLabels } from "../../_helpers/constants";
import PdfDialog from "../drawers/pdfDialog";
import PropTypes from "prop-types";
import SaveAltOutlinedIcon from "@mui/icons-material/SaveAltOutlined";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { getOrderDetailsById } from "@redux/slices/tenantsSlice";
import { getTenantId } from "@utils/common";
import moment from "moment";

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

export default function TabComponent({ listView, orderData }) {
  const [value, setValue] = React.useState(0);
  const orderId = orderData?.orderId;
  const { orderDetailsById: data } = useSelector((state) => state.tenants);
  const [preview, setPreview] = useState(false);
  const url =
    "https://lsdevsa01.blob.core.windows.net/tenant-logos/LIF000001-7557-Resume_15_07_2023_12_12_35_AM.pdf?sv=2023-01-03&spr=https&se=2023-09-22T12%3A22%3A07Z&sr=b&sp=rwl&sig=lGanDfJcEJ9rPaIIulZjbYdSnSq67td1LhMyzFyZgSg%3D ";
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const handleaccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const loggedInUser = JSON.parse(sessionStorage.getItem("userDetails"));
  const tenantId = getTenantId();
  const fetchOrderDetailsData = () => {
    dispatch(
      getOrderDetailsById({
        orderId,
        roleId: loggedInUser?.roleMasterDTO?.roleId,
        tenantId
      })
    );
  };
  const [selectedDocUrl, setSelectedDocUrl] = useState(null);

  useEffect(() => {
    const document = data?.testDetails?.map((test) => test?.docUrl[0]);
    setSelectedDocUrl(document);

    fetchOrderDetailsData();
  }, []);
  const handleFilePreview = () => {
    setPreview(true);
  };
  const handleClose = () => setPreview(false);
  return (
    <>
      <Box className="tab__wrapper rightDrawers-tab mt-4">
        <Tabs value={value} onChange={handleChange} aria-label="order details tabs" className="tabs_sections">
          {DrawerTabLabels.map((l, i) => (
            <Tab key={i} label={l} {...a11yProps(i)} />
          ))}
          <Typography component="h6" variant="h6" className="title">
            Test DATE
            <Typography component="b" variant="b">
              {orderData?.orderDate}
            </Typography>
          </Typography>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Typography component="div" variant="div" className="basic__drawer--header">
          <Box className="test-performed">
            <Typography component="h6" variant="h6" className="underlined-title mt-2">
              TESTS PERFORMED
            </Typography>
            <ol>
              {orderData?.individual?.map((test, i) => {
                return (
                  <li key={i} className="mb-3">
                    {test?.testName}
                  </li>
                );
              })}
            </ol>
          </Box>
          <Box className="test-performed">
            <Typography component="h6" variant="h6" className="title mb-3">
              DESCRIPTION
            </Typography>
            <Typography component="p" variant="p" className="description mb-3">
              {orderData?.orderDescription}
            </Typography>
          </Box>
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
        <Box className="accordion__wrapper">
          <Accordion expanded={expanded === "panel1"} onChange={handleaccordionChange("panel1")}>
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
              <Typography>UDRUG</Typography>
            </AccordionSummary>
            <AccordionDetails className="basic__drawer--header">
              <Box className="test-performed">
                <Typography component="h6" variant="h6" className="underlined-title mt-2">
                  Tests Performed
                </Typography>
                <ol>
                  {data?.testDetails?.map((test, i) => {
                    return (
                      <li key={i} className="mb-3">
                        {test.testDescription}
                      </li>
                    );
                  })}
                </ol>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel2"} onChange={handleaccordionChange("panel2")}>
            <AccordionSummary
              expandIcon={
                <Typography
                  variant="span"
                  component="span"
                  className="ls-rightarrow ls-outlined-down-arrow"
                ></Typography>
              }
              aria-controls="panel2bh-content"
              id="panel2bh-header"
            >
              <Typography>Panel 1</Typography>
            </AccordionSummary>
            <AccordionDetails className="basic__drawer--header">
              <Box className="test-performed">
                <Typography component="h6" variant="h6" className="underlined-title mt-2">
                  Tests Performed
                </Typography>
                <ol>
                  {data?.testDetails?.map((test, i) => {
                    return (
                      <li key={i} className="mb-3">
                        {test.testDescription}
                      </li>
                    );
                  })}
                </ol>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel3"} onChange={handleaccordionChange("panel3")}>
            <AccordionSummary
              expandIcon={
                <Typography
                  variant="span"
                  component="span"
                  className="ls-rightarrow ls-outlined-down-arrow"
                ></Typography>
              }
              aria-controls="panel3bh-content"
              id="panel3bh-header"
            >
              <Typography>Panel 2</Typography>
            </AccordionSummary>
            <AccordionDetails className="basic__drawer--header">
              <Box className="test-performed">
                <Typography component="h6" variant="h6" className="underlined-title mt-2">
                  Tests Performed
                </Typography>
                <ol>
                  {data?.testDetails?.map((test, i) => {
                    return (
                      <li key={i} className="mb-3">
                        {test.testDescription}
                      </li>
                    );
                  })}
                </ol>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === "panel4"} onChange={handleaccordionChange("panel4")}>
            <AccordionSummary
              expandIcon={
                <Typography
                  variant="span"
                  component="span"
                  className="ls-rightarrow ls-outlined-down-arrow"
                ></Typography>
              }
              aria-controls="panel4bh-content"
              id="panel4bh-header"
            >
              <Typography>Individual Test</Typography>
            </AccordionSummary>
            <AccordionDetails className="basic__drawer--header">
              <Box className="test-performed">
                <Typography component="h6" variant="h6" className="underlined-title mt-2">
                  Tests Performed
                </Typography>
                <ol>
                  {data?.testDetails?.map((test, i) => {
                    return (
                      <li key={i} className="mb-3">
                        {test.testDescription}
                      </li>
                    );
                  })}
                </ol>
              </Box>
            </AccordionDetails>
          </Accordion>
          <Grid container rowSpacing={2} columnSpacing={2} className="pdf__wrapper">
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card className="mini__card position-relative">
                <CardContent>
                  <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                  <Typography component="label" variant="label">
                    Iron Blood Test.pdf
                    <br />
                    <Typography component="span" variant="span">
                      Thursday 10/02/2023
                    </Typography>
                  </Typography>
                </CardContent>
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="delete" href={selectedDocUrl}>
                    <VisibilityOutlinedIcon className="viewIcon" />
                  </IconButton>
                  <IconButton aria-label="delete" href={selectedDocUrl}>
                    <SaveAltOutlinedIcon className="downloadIcon" />
                  </IconButton>
                </Stack>
              </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card className="mini__card position-relative">
                <CardContent>
                  <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                  <Typography component="label" variant="label">
                    Comprehensive metabolic....pdf
                    <br />
                    <Typography component="span" variant="span">
                      Thursday 10/02/2023
                    </Typography>
                  </Typography>
                </CardContent>
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="delete" href={selectedDocUrl}>
                    <VisibilityOutlinedIcon className="viewIcon" />
                  </IconButton>
                  <IconButton aria-label="delete" href={selectedDocUrl}>
                    <SaveAltOutlinedIcon className="downloadIcon" />
                  </IconButton>
                </Stack>
              </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card className="mini__card position-relative">
                <CardContent>
                  <Typography variant="span" component="span" className="ls-pdf primaryIcon"></Typography>
                  <Typography component="label" variant="label">
                    Full Blood count.pdf
                    <br />
                    <Typography component="span" variant="span">
                      Thursday 10/02/2023
                    </Typography>
                  </Typography>
                </CardContent>
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="delete">
                    <VisibilityOutlinedIcon className="viewIcon" onClick={handleFilePreview} />
                  </IconButton>
                  <IconButton aria-label="delete">
                    <SaveAltOutlinedIcon className="downloadIcon" href={selectedDocUrl} />
                  </IconButton>
                </Stack>
              </Card>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <Card className="mini__card position-relative">
                <CardContent>
                  <Typography variant="span" componant="span" className="ls-pdf primaryIcon"></Typography>
                  <Typography component="label" variant="label">
                    Liver Function test.pdf
                    <br />
                    <Typography component="span" variant="span">
                      Thursday 10/02/2023
                    </Typography>
                  </Typography>
                </CardContent>
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="delete">
                    <VisibilityOutlinedIcon className="viewIcon" onClick={handleFilePreview} />
                  </IconButton>
                  <IconButton aria-label="delete" href={selectedDocUrl}>
                    <SaveAltOutlinedIcon className="downloadIcon" />
                  </IconButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography component="h6" variant="h6" className="underlined-title mt-3">
          Insurance Details
        </Typography>
        <hr className="w-100 my-1" />
        <Grid container spacing={1} className="name__value--text mt-0">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Insurance Name
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.insuranceCompanyName}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Policy Holder name
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.policyHolderName}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Policy No.
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.policyNumber}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              INS Group No
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.groupNumber}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Contact Details
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.contactNumber}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Network Communication
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.networkCommunication}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Issue Date
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.insuranceIssuedDate}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Expiry Date
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.insuranceExpiryDate}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Deductible Amount
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.deductableAmount}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Co Paymemt
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.copay}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Co Insurance
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.coInsurancePercentage}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Covered Individuals
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.coveredIndividuals}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Plan Type
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.planType}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              address
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.primaryAddress}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Emergency Contact No
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.emergencyContactNumber}
            </Typography>
          </Grid>
        </Grid>

        <Typography component="h6" variant="h6" className="underlined-title mt-3">
          Guarantor Details
        </Typography>
        <hr className="w-100 my-1" />
        <Grid container spacing={1} className="name__value--text mt-0">
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Name
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.guarantorFirstName}
              {data?.insuranceDetailsViewDTO?.guarantorMiddleName}
              {data?.insuranceDetailsViewDTO?.guarantorLastName}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Relation
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.relationDescription}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Date Of Birth
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.birthDate}
            </Typography>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <Typography component="p" variant="p">
              Employer Name
            </Typography>
            <Typography component="b" variant="b">
              {data?.insuranceDetailsViewDTO?.employerName}
            </Typography>
          </Grid>
        </Grid>
      </TabPanel>
      {preview && <PdfDialog open={open} url={url} handleClose={handleClose} />}
    </>
  );
}
