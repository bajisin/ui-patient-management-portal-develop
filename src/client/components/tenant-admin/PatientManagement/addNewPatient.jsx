import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import { Typography, Grid, Divider, Box, Button, TextField, FormControl, Select, MenuItem } from "@mui/material";
const AddNewPatient = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog aria-labelledby="New Patient" open={open} enableResize={true} className="commonModal__wrapper">
      <form>
        <Box className="commonModal__wrapper--dialog">
          <DialogTitle>
            Add Patient Details
            <IconButton aria-label="close" onClick={handleClose} className="modalClose">
              <Typography variant="span" component="span" className="ls-close secondaryIcon"></Typography>
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box className="orderPreview__wrapper">
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      First Name
                    </Typography>
                    <TextField className="add__input" placeholder="First Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Middle Name
                    </Typography>
                    <TextField className="add__input" placeholder="Middle Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Last Name
                    </Typography>
                    <TextField className="add__input" placeholder="Last Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Race
                    </Typography>
                    <TextField className="add__input" placeholder="Race" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Biological Gender
                    </Typography>
                    <FormControl className="w-100">
                      <Select className="add__select">
                        <MenuItem value="Male" selected>
                          Male
                        </MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Ethinic Group
                    </Typography>
                    <FormControl className="w-100">
                      <Select className="add__select">
                        <MenuItem value="Marques" selected>
                          Marques
                        </MenuItem>
                        <MenuItem value="Marques 1">Marques 1</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      permanent address
                    </Typography>
                    <TextField className="add__input" placeholder="Michigan, USA" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      communication address
                    </Typography>
                    <TextField className="add__input" placeholder="Michigan, USA" variant="outlined" />
                  </Grid>
                </Grid>
              </Box>

              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Idenetity Details
                </Typography>
                <Typography variant="p" component="p" className="w-100">
                  Note: To ensure uniqueness, kindly provide at least one identity detail.
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Driving Licenece
                    </Typography>
                    <TextField className="add__input" placeholder="Driving Licenece" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      State ID
                    </Typography>
                    <TextField className="add__input" placeholder="State ID" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Insurance ID
                    </Typography>
                    <TextField className="add__input" placeholder="Insurance ID" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      SSN ID
                    </Typography>
                    <TextField className="add__input" placeholder="SSN ID" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={4}>
                    <Typography variant="label" component="label" className="add__label">
                      Email Address
                    </Typography>
                    <TextField className="add__input" placeholder="Email Address" variant="outlined" />
                  </Grid>
                </Grid>
              </Box>
              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Insurance Details
                  <Button variant="text" className="downloadBtn-text p-0 float-end">
                    Add Insurance
                  </Button>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Name
                    </Typography>
                    <TextField className="add__input" placeholder="Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Medicaid No.
                    </Typography>
                    <TextField className="add__input" placeholder="Medicaid No." variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Medicare No.
                    </Typography>
                    <TextField className="add__input" placeholder="Medicare No." variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Policy No.
                    </Typography>
                    <TextField className="add__input" placeholder="Policy No." variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Ins Group No.
                    </Typography>
                    <FormControl className="w-100">
                      <Select className="add__select">
                        <MenuItem value="Ins Group No 1" selected>
                          Ins Group No 1
                        </MenuItem>
                        <MenuItem value="Ins Group No 2">Ins Group No 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Ins Group Name
                    </Typography>
                    <FormControl className="w-100">
                      <Select className="add__select">
                        <MenuItem value="Ins Group Name 1" selected>
                          Ins Group Name 1
                        </MenuItem>
                        <MenuItem value="Ins Group Name 2">Ins Group Name 2</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Box>
              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Guarantor Details
                  <Button variant="text" className="downloadBtn-text p-0 float-end">
                    Add Guarantor
                  </Button>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      First Name
                    </Typography>
                    <TextField className="add__input" placeholder="First Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Middle Name
                    </Typography>
                    <TextField className="add__input" placeholder="Middle Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Last Name
                    </Typography>
                    <TextField className="add__input" placeholder="Last Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Race
                    </Typography>
                    <TextField className="add__input" placeholder="Race" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Biological Gender
                    </Typography>
                    <FormControl className="w-100">
                      <Select className="add__select">
                        <MenuItem value="Male" selected>
                          Male
                        </MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Ethinic Group
                    </Typography>
                    <FormControl className="w-100">
                      <Select className="add__select">
                        <MenuItem value="Marques" selected>
                          Marques
                        </MenuItem>
                        <MenuItem value="Marques 1">Marques 1</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      permanent address
                    </Typography>
                    <TextField className="add__input" placeholder="Michigan, USA" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      communication address
                    </Typography>
                    <TextField className="add__input" placeholder="Michigan, USA" variant="outlined" />
                  </Grid>
                </Grid>
              </Box>
              <Divider className="w-100" />
              <Box>
                <Typography variant="h6" component="h6" className="w-100">
                  Care Giver Details
                  <Button variant="text" className="downloadBtn-text p-0 float-end">
                    Add Care Giver
                  </Button>
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      First Name
                    </Typography>
                    <TextField className="add__input" placeholder="First Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Middle Name
                    </Typography>
                    <TextField className="add__input" placeholder="Middle Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Last Name
                    </Typography>
                    <TextField className="add__input" placeholder="Last Name" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Email Address
                    </Typography>
                    <TextField className="add__input" placeholder="Race" variant="outlined" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={3}>
                    <Typography variant="label" component="label" className="add__label required">
                      Phone Number
                    </Typography>
                    <div className="w-100 phone__number--input">
                      <TextField variant="outlined" className="add__input" placeholder="1234567890" />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Typography variant="label" component="label" className="add__label required">
                      permanent address
                    </Typography>
                    <TextField className="add__input" placeholder="Michigan, USA" variant="outlined" />
                  </Grid>
                </Grid>
              </Box>
              <Divider className="w-100" />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button autoFocus type="submit" className="primary-btn" onClick={handleClose}>
              Submit
            </Button>
          </DialogActions>
        </Box>
      </form>
    </Dialog>
  );
};
export default AddNewPatient;
