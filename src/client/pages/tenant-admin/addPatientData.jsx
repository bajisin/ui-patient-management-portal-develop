import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddNewPatient from "./addNewPatient";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import OrderDetails from "../../components/drawers/orderDetails";
import OutlinedInput from "@mui/material/OutlinedInput";
import PreviewContent from "./previewDataModal";
import PropTypes from "prop-types";
import axios from "axios";
import dayjs from "dayjs";
import { getPatientsByGroupId } from "@redux/slices/masterData/patientsGroupSlice";
import { useDispatch } from "react-redux";

// import CommonGroupTable from "../../components/master-data/common/common-table-component";

// import insurancePolicyImage from "@assets/images/ls_svg/tenantAdmin/insurance-policy.svg";
// import healthInsuranceImage from "@assets/images/ls_svg/tenantAdmin/health-insurance.svg";
// import groupInsuranceImage from "@assets/images/ls_svg/tenantAdmin/GroupInsurance.svg";

// import ScrollSpy from "react-ui-scrollspy";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
function Tabpanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`guarentor-tabpanel-${index}`}
      aria-labelledby={`guarentor-tab-${index}`}
      {...other}
    >
      {value === index && <Box> {children}</Box>}
    </div>
  );
}

Tabpanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `guarentor-tab-${index}`,
    "aria-controls": `guarentor-tabpanel-${index}`
  };
}
const AddPatientData = ({ classes }) => {
  const dispatch = useDispatch();
  const boxRef = useRef(null);
  useEffect(() => {
    dispatch(getPatientsByGroupId("Race"));
  }, []);
  // const [orderTypeOption, setorderTypeOption] = useState("");
  // const [orderTemplate, setorderTemplate] = useState("");
  // const [labs, setlabs] = useState("");
  // const [PriorityCode, setPriorityCode] = useState("");
  // const [PatientId, setPatientId] = useState("");
  // const [recurring, setrecurring] = useState("");
  // const [recurringEventRepeats, setrecurringEventRepeats] = useState("");
  // const [recurringEventDate, setrecurringEventDate] = useState("");
  // const [recurringEventTime, setrecurringEventTime] = useState("");

  const handleSubmit = () => {
    const data = {
      // orderTypeOption,
      // orderTemplate,
      // labs,
      // PriorityCode,
      // PatientId,
      // recurring,
      // recurringEventRepeats,
      // recurringEventDate,
      // recurringEventTime
      // RepeatEvery
    };

    // POST the data to the JSON API URL
    axios
      .post(" http://localhost:3030/patientManagmentFormData", data)
      .then((response) => {
        console.log("Data successfully saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
  };

  // const [alignment, setAlignment] = React.useState("yes");
  // const [stat, setStat] = React.useState("routine");
  // const handleChange = (event, newAlignment) => {
  //   setAlignment(newAlignment);
  // };
  // const handleStatChange = (event, newStat) => {
  //   setStat(newStat);
  // };

  // const testDetails = [
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Urea Nitrogen U" },
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Glutamyl Transferase Gamma" },
  //   { test: "GTT: Glutamyl Transferase Gamma" }
  // ];
  // const diagnosisDetails = [
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Urea Nitrogen U" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" },
  //   { diagnosis: "GTT: Glutamyl Transferase Gamma" }
  // ];

  const [open, setOpen] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  // const handleClickNewPatientOpen = () => {
  //   setOpen(true);
  // };

  const [isOpenOrderDetails, setIsOpenOrderDetails] = useState(false);
  const toggleDrawerOrderDetails = (open) => (event) => {
    setIsOpenOrderDetails(open);
  };

  const [showButton, setShowButton] = React.useState(false);

  const handleClickShowPassword = () => setShowButton((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box className="content__wrapper bottom-space patientMngmt--stepper" ref={boxRef}>
        <OrderDetails isOpen={isOpenOrderDetails} toggleDrawer={toggleDrawerOrderDetails} />
        <ScrollSpy parentScrollContainerRef={boxRef}>
          <Box className="createOrder__wrapper" id="step1">
            <Typography variant="div" component="div" className="createOrder__wrapper--header">
              <Typography variant="h6" component="h6">
                <Typography variant="b" component="b">
                  Step 1
                </Typography>
                Personal Details
              </Typography>
            </Typography>
            <Typography variant="div" component="div" className="createOrder__wrapper--content">
              <Box className="w-100 dflex align-items-start">
                <Typography variant="h6" component="h6">
                  Personal Information <br />
                  <Typography component="b" variant="b">
                    Note: The portal allows login for patients marked as online
                  </Typography>
                </Typography>
                <Typography component="label" variant="label" className="checked--label">
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 4 }} />
                  Patient would like to Login
                </Typography>
              </Box>
              <Grid container spacing={2} className="mt-0">
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    First Name
                  </Typography>
                  <TextField className="add__input" type="text" placeholder="First Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label">
                    Middle Name
                  </Typography>
                  <TextField className="add__input" type="text" placeholder="Middle Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Last Name
                  </Typography>
                  <TextField className="add__input" type="text" placeholder="Last Name" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Race
                  </Typography>
                  <FormControl className="w-100">
                    <Select className="add__select">
                      <MenuItem value="Black" selected>
                        Black
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Biological Gender
                  </Typography>
                  <FormControl className="w-100">
                    <Select className="add__select">
                      <MenuItem value="Male" selected>
                        Male
                      </MenuItem>
                      <MenuItem value="Male" selected>
                        Female
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Ethnic Group
                  </Typography>
                  <FormControl className="w-100">
                    <Select className="add__select">
                      <MenuItem value="Unknown" selected>
                        Unknown
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label">
                    Permanent Address
                  </Typography>
                  <TextField className="add__input" type="text" placeholder="California, USA" variant="outlined" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Communication Address
                  </Typography>
                  <TextField className="add__input" type="text" placeholder="California, USA" variant="outlined" />
                </Grid>
              </Grid>
            </Typography>
          </Box>
          <Box className="createOrder__wrapper mt-3" id="step2">
            <Typography variant="div" component="div" className="createOrder__wrapper--header">
              <Typography variant="h6" component="h6">
                <Typography variant="b" component="b" id="step2">
                  Step 2
                </Typography>
                Insurance Details
              </Typography>
            </Typography>
            <Typography variant="div" component="div" className="createOrder__wrapper--content">
              <Typography variant="h6" component="h6" className="w-100">
                Identity Information <br />
                <Typography component="b" variant="b">
                  Note: To ensure uniqueness, kindly provide at least one identity detail.
                </Typography>
              </Typography>
              <Grid container spacing={2} className="mt-0">
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label position-relative">
                    Driving License
                    <InfoOutlinedIcon className="error--bright cursor-pointer ms-2 info--note" />
                    <Box className="tooltipText">
                      <Typography component="p" variant="p">
                        Please upload either your Driver's License or State ID.
                      </Typography>
                    </Box>
                  </Typography>
                  <FormControl className="w-100 add__input">
                    <OutlinedInput
                      className="outlined__input"
                      id="driving-license"
                      type="text"
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            className="downloadBtn-text p-0"
                            aria-label="upload"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showButton ? (
                              <Typography component="span">Clear</Typography>
                            ) : (
                              <Typography component="span">Upload</Typography>
                            )}
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label position-relative">
                    State ID
                    <InfoOutlinedIcon className="error--bright cursor-pointer ms-2 info--note" />
                    <Box className="tooltipText">
                      <Typography component="p" variant="p">
                        Please upload either your Driver's License or State ID.
                      </Typography>
                    </Box>
                  </Typography>
                  <FormControl className="w-100 add__input">
                    <OutlinedInput
                      className="outlined__input"
                      id="state-id"
                      type="text"
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            className="downloadBtn-text p-0"
                            aria-label="upload"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showButton ? (
                              <Typography component="span">Clear</Typography>
                            ) : (
                              <Typography component="span">Upload</Typography>
                            )}
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Insurance ID
                  </Typography>
                  <FormControl className="w-100 add__input">
                    <OutlinedInput
                      className="outlined__input"
                      id="outlined-adornment-password"
                      type="text"
                      endAdornment={
                        <InputAdornment position="end">
                          <Button
                            className="downloadBtn-text p-0"
                            aria-label="upload"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showButton ? (
                              <Typography component="span">Clear</Typography>
                            ) : (
                              <Typography component="span">Upload</Typography>
                            )}
                          </Button>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label">
                    SSN ID
                  </Typography>
                  <TextField type="password" placeholder="***-****-1234" className="add__input" />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={4}>
                  <Typography variant="label" component="label" className="add__label required">
                    Email Address
                  </Typography>
                  <TextField type="text" placeholder="test@gmail.com" className="add__input" />
                </Grid>
              </Grid>
              <Accordion className="stepper__accordion mt-3">
                <AccordionSummary
                  expandIcon={
                    <Typography
                      variant="span"
                      component="span"
                      className="ls-rightarrow ls-outlined-down-arrow"
                    ></Typography>
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Driving License Details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2} className="mt-0">
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        First Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Ethan" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Middle Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Roger" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Last Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="James" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        DLN NO.
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="123456789" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Date Of Birth
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Permanent Address
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="California, USA" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Issue Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Expiry Date
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Class
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Class 1" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Restrictions
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="None" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Endorsement
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="None" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Height
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="6 feet 2 inch" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Eye Color
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Brown" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Biological Gender
                      </Typography>
                      <FormControl className="w-100">
                        <Select className="add__select">
                          <MenuItem value="Male" selected>
                            Male
                          </MenuItem>
                          <MenuItem value="Male" selected>
                            Female
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Organ Donar
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="James" variant="outlined" />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Typography>
          </Box>
          <Box className="createOrder__wrapper mt-3" id="step3">
            <Typography variant="div" component="div" className="createOrder__wrapper--header">
              <Typography variant="h6" component="h6">
                <Typography variant="b" component="b" id="step3">
                  Step 3
                </Typography>
                Insurance And Guarantor Details
              </Typography>
            </Typography>
            <Typography variant="div" component="div" className="createOrder__wrapper--content">
              <Box className="w-100">
                <Box className="tab__wrapper admin-tabs ps-0">
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="Guarentor Details"
                    className="tabs_sections"
                  >
                    <Tab label="Insurance and Guarantor 1" {...a11yProps(0)} />
                    <Tab label="Insurance and Guarantor 2" {...a11yProps(1)} />
                    <Button variant="text" className="downloadBtn-text p-0 positioned--text">
                      View Test History
                    </Button>
                  </Tabs>
                </Box>
                <Tabpanel value={value} index={0}>
                  <Box className="w-100 dflex align-items-start mt-3">
                    <Typography variant="h6" component="h6">
                      Identity Information
                    </Typography>
                    <Typography component="label" variant="label" className="checked--label">
                      <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 4 }} />
                      Mark as default
                    </Typography>
                  </Box>
                  <Grid container spacing={2} className="mt-0">
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Insurance Name
                      </Typography>
                      <TextField
                        className="add__input"
                        type="text"
                        placeholder="Blue cross Clue Field"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Policy Holder Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="David Marques" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Policy Number
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="123456789" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Group No.
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="123456789" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Contact Details
                      </Typography>
                      <div className="w-100 phone__number--input">
                        <TextField className="add__input" variant="outlined" placeholder="2233445566" margin="normal" />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Network Communication
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Network" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Issue Date
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="12/02/2023" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Expiry Date
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="12/02/2024" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Deductible Amount
                      </Typography>
                      <FormControl variant="standard" className="w-100 add__input">
                        <OutlinedInput
                          className="outlined__input"
                          id="amount"
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          placeholder="120"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Co Payment
                      </Typography>
                      <FormControl variant="standard" className="w-100 add__input">
                        <OutlinedInput
                          className="outlined__input"
                          id="amount"
                          startAdornment={<InputAdornment position="start">$</InputAdornment>}
                          placeholder="1100"
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Co Insurance
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="10 %" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Covered Individuals
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="2" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Plan Type
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Plan 1" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Address
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="California, USA" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Emergency Contact
                      </Typography>
                      <div className="w-100 phone__number--input">
                        <TextField className="add__input" variant="outlined" placeholder="123456789" margin="normal" />
                      </div>
                    </Grid>
                  </Grid>
                  <Divider className="fullWidthDivider" />
                  <Box className="w-100 dflex align-items-start">
                    <Typography variant="h6" component="h6">
                      Guarantor Information
                    </Typography>
                  </Box>
                  <Grid container spacing={2} className="mt-0">
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        First Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="North" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Middle Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Kanya" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Last Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Kardashians" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Relation
                      </Typography>
                      <FormControl className="w-100">
                        <Select className="add__select">
                          <MenuItem value="Caregiver" selected>
                            Caregiver
                          </MenuItem>
                          <MenuItem value="Guarantor">Guarantor</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Date of Birth
                      </Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker defaultValue={dayjs("YYYY-MM-DD")} className="w-100 datetimepicker-control" />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Employer Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Network 1" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Address
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="California, USA" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Home Phone No
                      </Typography>
                      <div className="w-100 phone__number--input">
                        <TextField className="add__input" variant="outlined" placeholder="2233445566" margin="normal" />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Mobile Phone No
                      </Typography>
                      <div className="w-100 phone__number--input">
                        <TextField className="add__input" variant="outlined" placeholder="2233445566" margin="normal" />
                      </div>
                    </Grid>
                  </Grid>
                  <Typography component="label" variant="label" className="checked--label">
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 4 }} />
                    Mark same as patient address
                  </Typography>
                </Tabpanel>
                <Tabpanel value={value} index={1}>
                  Insurance and Guarantor 2
                </Tabpanel>
              </Box>
            </Typography>
          </Box>
          <Box className="createOrder__wrapper mt-3" id="step4">
            <Typography variant="div" component="div" className="createOrder__wrapper--header">
              <Typography variant="h6" component="h6">
                <Typography variant="b" component="b" id="step4">
                  Step 4
                </Typography>
                Caregiver Details
              </Typography>
            </Typography>
            <Typography variant="div" component="div" className="createOrder__wrapper--content">
              <Box className="w-100">
                <Box className="tab__wrapper admin-tabs ps-0">
                  <Tabs
                    value={value}
                    onChange={handleChangeTab}
                    aria-label="Guarentor Details"
                    className="tabs_sections"
                  >
                    <Tab label="Caregiver 1" {...a11yProps(0)} />
                    <Tab label="Caregiver 2" {...a11yProps(1)} />
                    <Button variant="text" className="downloadBtn-text p-0 positioned--text">
                      Add Caregiver
                    </Button>
                  </Tabs>
                </Box>
                <Tabpanel value={value} index={0}>
                  <Typography variant="h6" component="h6" className="mt-3">
                    Caregiver Information
                  </Typography>
                  <Grid container spacing={2} className="mt-0">
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Relation to Patient
                      </Typography>
                      <FormControl className="w-100">
                        <Select className="add__select">
                          <MenuItem value="Healthcare Proxy" selected>
                            Healthcare Proxy
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        First Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="North" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Middle Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Kanya" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Last Name
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="Kardashians" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label">
                        Email Address
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="test@gmail.com" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Phone No
                      </Typography>
                      <div className="w-100 phone__number--input">
                        <TextField className="add__input" variant="outlined" placeholder="2233445566" margin="normal" />
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={4}>
                      <Typography variant="label" component="label" className="add__label required">
                        Permanent Address
                      </Typography>
                      <TextField className="add__input" type="text" placeholder="California, USA" variant="outlined" />
                    </Grid>
                  </Grid>
                  <Box className="w-100 dflex mt-2">
                    {/* <Typography component="label" variant="label" className="checked--label">
                      <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 4 }} />I give my consent
                    </Typography> */}
                    <Typography className="action__items positioned-text ">
                      <Button variant="text" className="p-0 errorTextButton">
                        Delete Caregiver
                      </Button>
                    </Typography>
                  </Box>
                </Tabpanel>
                <Tabpanel value={value} index={1}>
                  Caregiver 2
                </Tabpanel>
              </Box>
            </Typography>
          </Box>
        </ScrollSpy>
        <Stack className="action__wrapper p-3" direction="row">
          <Button variant="contained" className="primary-btn" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Box>
      <PreviewContent setOpen={setOpen} open={open} title="Preview Order" />
      <AddNewPatient setOpen={setOpen} open={open} title="New Patient" />
    </>
  );
};

export default AddPatientData;
