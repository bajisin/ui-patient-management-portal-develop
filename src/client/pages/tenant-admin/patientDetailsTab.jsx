import React, { useState } from "react";
import { Box, Button, FormControl, Grid, Typography, Select, MenuItem, TextField } from "@mui/material";
// import OrderReportsTable from "./orderReportsTable";
import AddInsurance from "./addInsuranceModal";

const PatientDetailsTabContent = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Typography variant="h6" component="h6" className="w-100">
        Patient Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Patient ID
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="18MINC" selected>
                18MINC
              </MenuItem>
              <MenuItem value="20MINC">20MINC</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            MRN No.
          </Typography>
          <TextField className="add__input" placeholder="1234567890" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label">
            Facility
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="Facility 1" selected>
                Facility 1
              </MenuItem>
              <MenuItem value="Facility 2">Facility 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            First Name
          </Typography>
          <TextField className="add__input" placeholder="First Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Middle Name
          </Typography>
          <TextField className="add__input" placeholder="Middle Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Last Name
          </Typography>
          <TextField className="add__input" placeholder="Last Name" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            DOB
          </Typography>
          <TextField className="add__input" placeholder="02/26/1984" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Age
          </Typography>
          <TextField className="add__input" placeholder="39" variant="outlined" />
        </Grid>
      </Grid>
      <Typography variant="h6" component="h6" className="w-100 mt-3">
        Communication Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Email Address
          </Typography>
          <TextField className="add__input" placeholder="ethanjames@gmail.com" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Phone No.
          </Typography>
          <Typography variant="div" component="div" className="w-100 phone__number--input">
            <TextField className="add__input" placeholder="1234567890" variant="outlined" />
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" component="h6" className="w-100 mt-3">
        Address Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Permanent Address
          </Typography>
          <TextField className="add__input" placeholder="Address" variant="outlined" />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Communication Address
          </Typography>
          <TextField className="add__input" placeholder="Address" variant="outlined" />
        </Grid>
      </Grid>
      <Typography variant="h6" component="h6" className="w-100 mt-3">
        Other Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Social Security No.
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="1234" selected>
                1234
              </MenuItem>
              <MenuItem value="1234">1234</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Room No.
          </Typography>
          <TextField className="add__input" placeholder="303" variant="outlined" />
        </Grid>
      </Grid>
      <Typography variant="h6" component="h6" className="w-100 mt-3">
        Physician Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            NPI No.
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="Search NPI No" selected>
                Search NPI No.
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Physician
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="Search Physician" selected>
                Search Physician
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Box className="d-flex">
        <Typography variant="h6" component="h6" className="w-100 mt-3">
          Insurance Details
        </Typography>
        <Button variant="text" className="w-100 mt-3 justify-content-end" onClick={handleClickOpen}>
          Add Insurance
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Insurance Company Name
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="Insurance Company 1" selected>
                Insurance Company 1
              </MenuItem>
              <MenuItem value="Insurance Company 2">Insurance Company 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Medicaid No.
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="Medicaid No 1" selected>
                Medicaid No 1
              </MenuItem>
              <MenuItem value="Medicaid No 2">Medicaid No 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Medicare No.
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="Medicare No 1" selected>
                Medicare No 1
              </MenuItem>
              <MenuItem value="Medicare No 2">Medicare No 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            Policy No.
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="Policy No 1" selected>
                Policy No 1
              </MenuItem>
              <MenuItem value="Policy No 2">Policy No 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            INS. Group Name
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="INS. Group Name" selected>
                INS. Group Name
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Typography variant="label" component="label" className="add__label required">
            INS. Group No.
          </Typography>
          <FormControl className="w-100">
            <Select className="add__select">
              <MenuItem value="INS. Group No 1" selected>
                INS. Group No 1
              </MenuItem>
              <MenuItem value="INS. Group No 2">INS. Group No 2</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Typography variant="h6" component="h6" className="w-100 mt-3">
        Order History
      </Typography>
      {/* <OrderReportsTable /> */}
      <AddInsurance setOpen={setOpen} open={open} user={"tenant"} />
    </>
  );
};
export default PatientDetailsTabContent;
