import { Box, Grid, Typography } from "@mui/material";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import React from "react";
import moment from "moment";

/**
 * @author
 * @function InsuranceDetails
 **/

const InsuranceDetails = ({ insuranceDetails }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleaccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Typography component="h6" variant="h6" className="underlined-title mt-3">
        Insurance Details
      </Typography>
      <hr className="w-100 my-1" />
      <Box className="accordion__wrapper">
        <Accordion expanded={expanded === "panel1"} onChange={handleaccordionChange("panel1")}>
          <AccordionSummary
            expandIcon={
              <Typography variant="span" component="span" className="ls-rightarrow ls-outlined-down-arrow"></Typography>
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Insurence Details 1</Typography>
          </AccordionSummary>
          <AccordionDetails className="basic__drawer--header">
            <Grid container spacing={1} className="name__value--text mt-0">
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Insurance Name
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.insuranceCompanyName}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Policy Holder name
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.policyHolderName}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Policy No.
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.policyNumber}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  INS Group No
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.groupNumber}
                </Typography>
              </Grid>
              {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Contact Details
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.contactNumber}
                </Typography>
              </Grid> */}
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Network Communication
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.networkCommunication}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Issue Date
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.insuranceIssuedDate}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Expiry Date
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.insuranceExpiryDate}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Deductible Amount
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.deductableAmount}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Co Paymemt
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.copay}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Co Insurance
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.coInsurancePercentage}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Covered Individuals
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.coveredIndividuals}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Plan Type
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.planType}
                </Typography>
              </Grid>
              {/* <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Address
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.primaryAddress}
                </Typography>
              </Grid> */}
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Emergency Contact No
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.emergencyContactNumber}
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
                  {insuranceDetails?.guarantorFirstName} {insuranceDetails?.guarantorLastName}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Relation
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.relationType}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Date Of Birth
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.birthDate === null ? "" : moment(insuranceDetails?.birthDate).format("MM-DD-YYYY")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Employer Name
                </Typography>
                <Typography component="b" variant="b">
                  {insuranceDetails?.employerName}
                </Typography>
              </Grid>
            </Grid>
            {/* </Box> */}
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default InsuranceDetails;
