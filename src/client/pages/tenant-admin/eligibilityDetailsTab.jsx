import React from "react";
import { Typography, Grid, Button, FormControlLabel, Checkbox } from "@mui/material";
import insurancePolicyImage from "@assets/images/ls_svg/tenantAdmin/insurance-policy.svg";
import healthInsuranceImage from "@assets/images/ls_svg/tenantAdmin/health-insurance.svg";
import groupInsuranceImage from "@assets/images/ls_svg/tenantAdmin/GroupInsurance.svg";

const EligibilityDetailsTabContent = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="primary-card d-flex align-items-center justify-content-between"
        >
          <Typography variant="div" component="div">
            <Typography variant="h6" component="h6">
              Eligibility
            </Typography>
            <Typography variant="p" component="p">
              The pre-authorization is required by patient to ensure
            </Typography>
            <Button variant="outlined" className="primary-outline-btn">
              Checked
            </Button>
          </Typography>
          <img src={insurancePolicyImage} alt="Insurance Details" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          className="primary-card d-flex align-items-center justify-content-between"
        >
          <Typography variant="div" component="div">
            <Typography variant="h6" component="h6">
              Pre Authorization
            </Typography>
            <Typography variant="p" component="p">
              The pre-authorization is required by patient to ensure
            </Typography>
            <Button variant="outlined" className="primary-outline-btn">
              Check Now
            </Button>
          </Typography>
          <img src={healthInsuranceImage} alt="Insurance Details" />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="mt-4 primary-card d-flex align-items-center justify-content-between"
        >
          <Typography variant="div" component="div">
            <Typography variant="h6" component="h6">
              Verify ABN
            </Typography>
            <Typography variant="p" component="p">
              The pre-authorization is required by patient to ensure.
            </Typography>
            <Button variant="outlined" className="primary-outline-btn">
              Upload
            </Button>
            <Button variant="test" className="ms-3">
              Download Template
            </Button>
          </Typography>
          <img src={groupInsuranceImage} alt="Insurance Details" />
        </Grid>
      </Grid>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Paid by Patient or Client (no additional verification is required)"
      />
    </>
  );
};
export default EligibilityDetailsTabContent;
