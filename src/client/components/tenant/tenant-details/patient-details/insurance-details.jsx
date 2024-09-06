import { Box, Grid, Typography } from "@mui/material";

import React from "react";
import moment from "moment";

const InsuranceDetails = ({ insuranceDetails, guarantorDetails }) => {
  return (
    <>
      <Box className="accordion__wrapper parent--accordion">
        {insuranceDetails?.map((ins, i) => (
          <>
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
                  {ins?.insuranceCompanyName}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Policy Holder name
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.policyHolderName}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Policy No.
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.policyNumber}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  INS Group No
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.groupNumber}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Network Communication
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.networkCommunication}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Issue Date
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.insuranceIssueDate}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Expiry Date
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.insuranceExpiryDate}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Deductible Amount
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.deductableAmount}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Co Paymemt
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.coPayment}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Co Insurance
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.coInsurancePercentage}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Covered Individuals
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.coveredIndividuals}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Plan Type
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.planTypeDesc}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Address
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.patientInsuranceAddress}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Emergency Contact No
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.emergencyContactNumber}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Insurance Eligibility Status
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.insuranceEligibilityStatus}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Insurance Eligibility Status Message
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.insuranceEligibilityStatusMessage}
                </Typography>
              </Grid>
            </Grid>
          </>
        ))}
        {guarantorDetails?.map((ins, i) => (
          <>
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
                  {ins?.firstName} {ins?.middleName} {ins?.lastName}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Relation
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.relation}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Date Of Birth
                </Typography>
                <Typography component="b" variant="b">
                  {moment(ins?.birthDate).format("MM-DD-YYYY")}
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Typography component="p" variant="p">
                  Employer Name
                </Typography>
                <Typography component="b" variant="b">
                  {ins?.employerName}
                </Typography>
              </Grid>
            </Grid>
          </>
        ))}
      </Box>
    </>
  );
};

export default InsuranceDetails;
