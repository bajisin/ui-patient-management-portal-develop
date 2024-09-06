import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Grid,
  Typography,
  Select,
  MenuItem,
  TextField,
  Stack,
  Link,
  Button,
  FormGroup,
  Checkbox,
  Box,
  ToggleButton,
  ToggleButtonGroup
} from "@mui/material";
import UploadIcon from "@assets/images/ls_svg/uploadLg.svg";
import axios from "axios";
const OrderTypeTabContent = () => {
  const [orderTypeOption, setorderTypeOption] = useState("");
  const [orderTemplate, setorderTemplate] = useState("");
  const [labs, setlabs] = useState("");
  const [PriorityCode, setPriorityCode] = useState("");
  const [PatientId, setPatientId] = useState("");
  const [recurring, setrecurring] = useState("");
  const [recurringEventRepeats, setrecurringEventRepeats] = useState("");
  const [recurringEventDate, setrecurringEventDate] = useState("");
  const [recurringEventTime, setrecurringEventTime] = useState("");
  const [RepeatEvery, setRepeatEvery] = useState({
    sunday: false,
    Monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false
  });

  // const handleRadioChange = (event) => {
  //   setRadioValue(event.target.value);
  // };

  // const handleDropdown1Change = (event) => {
  //   setDropdown1Value(event.target.value);
  // };

  // const handleDropdown2Change = (event) => {
  //   setDropdown2Value(event.target.value);
  // };

  // const handleDropdown3Change = (event) => {
  //   setDropdown3Value(event.target.value);
  // };

  // const handleDropdown4Change = (event) => {
  //   setDropdown4Value(event.target.value);
  // };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setRepeatEvery((prevOptions) => ({
      ...prevOptions,
      [name]: checked
    }));
  };
  const handleSubmit = () => {
    const data = {
      orderTypeOption,
      orderTemplate,
      labs,
      PriorityCode,
      PatientId,
      recurring,
      recurringEventRepeats,
      recurringEventDate,
      recurringEventTime,
      RepeatEvery
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

  const [alignment, setAlignment] = React.useState("yes");
  const [stat, setStat] = React.useState("routine");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleStatChange = (event, newStat) => {
    setStat(newStat);
  };
  return (
    <Box className="createOrder__wrapper">
      <Typography variant="div" component="div" className="createOrder__wrapper--header">
        <Typography variant="h6" component="h6">
          <Typography variant="b" component="b">
            Step 1
          </Typography>
          Order Type
        </Typography>
      </Typography>
      <Typography variant="div" component="div" className="createOrder__wrapper--content">
        <FormControl>
          {/* <FormLabel id="orderType"> Order Type</FormLabel> */}
          <RadioGroup
            row
            aria-labelledby="orderType"
            value={orderTypeOption}
            onChange={(e) => setorderTypeOption(e.target.value)}
          >
            <FormControlLabel value="manual" id="orderType" control={<Radio />} label="Manual" />
            <FormControlLabel value="scanorder" id="orderType" control={<Radio />} label="Scan Order" />
          </RadioGroup>
        </FormControl>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography variant="label" component="label" className="add__label mb-2">
              Upload OCR Document
            </Typography>
            <FormControl className="w-100 dotted__upload dotted__upload--content mb-2">
              <img src={UploadIcon} />
              <Typography variant="label" component="label">
                Drag and drop files to uploador you can select file by
                <Link href="#"> Clicking here</Link>
                <br />
                Supported files : AI, PSD, PDF
              </Typography>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Client ID
            </Typography>
            <FormControl className="w-100">
              <Select className="add__select" value="">
                <MenuItem value="ID123" selected>
                  ID123
                </MenuItem>
                <MenuItem value="ID123456">ID123456</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Labs
            </Typography>
            <FormControl className="w-100">
              <Select className="add__select" value={labs} onChange={(e) => setlabs(e.target.value)}>
                <MenuItem value="Labs 1" selected>
                  Labs 1
                </MenuItem>
                <MenuItem value="Labs 2">Labs 2</MenuItem>
              </Select>
            </FormControl>
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
            <Typography variant="label" component="label" className="add__label">
              Recurring
            </Typography>
            <ToggleButtonGroup className="toggleButtonGroup" value={alignment} exclusive onChange={handleChange}>
              <ToggleButton value="yes">Yes</ToggleButton>
              <ToggleButton value="no">No</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Priority Type
            </Typography>
            <ToggleButtonGroup className="toggleButtonGroup" value={stat} exclusive onChange={handleStatChange}>
              <ToggleButton value="stat">Stat</ToggleButton>
              <ToggleButton value="routine">Routine</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Order Template
            </Typography>
            <FormControl className="w-100">
              <Select className="add__select" value={orderTemplate} onChange={(e) => setorderTemplate(e.target.value)}>
                <MenuItem value="Order Template 01" selected>
                  Order Template 01
                </MenuItem>
                <MenuItem value="Order Template 02">Order Template 02</MenuItem>
              </Select>
            </FormControl>
          </Grid> 

          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Priority Code
            </Typography>
            <FormControl className="w-100">
              <Select className="add__select" value={PriorityCode} onChange={(e) => setPriorityCode(e.target.value)}>
                <MenuItem value="Priority Code 1" selected>
                  Priority Code 1
                </MenuItem>
                <MenuItem value="Priority Code 2">Priority Code 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Patient ID
            </Typography>
            <FormControl className="w-100">
              <Select className="add__select" value={PatientId} onChange={(e) => setPatientId(e.target.value)}>
                <MenuItem value="Patient ID 1" selected>
                  Patient ID 1
                </MenuItem>
                <MenuItem value="Patient ID 2">Patient ID 2</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Typography variant="label" component="label" className="add__label">
              Recurring
            </Typography>
            <FormControl className="w-100">
              <Select className="add__select" value={recurring} onChange={(e) => setrecurring(e.target.value)}>
                <MenuItem value="Yes" selected>
                  Yes
                </MenuItem>
                <MenuItem value="No">No</MenuItem>
              </Select>
            </FormControl>
          </Grid> */}
        </Grid>
        <Typography variant="h6" component="h6" className="w-100 mt-3">
          Recurring Event
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="label" component="label" className="add__label">
              Repeats Every
            </Typography>
            <Stack direction={"row"} gap={2}>
              <FormControl sx={{ width: "20%" }}>
                <TextField
                  className="add__input"
                  placeholder="1"
                  variant="outlined"
                  value="1"
                  onChange={(e) => setrecurringEventRepeats(e.target.value)}
                />
              </FormControl>
              <FormControl sx={{ width: "80%" }}>
                <Select
                  className="add__select"
                  value={recurringEventRepeats}
                  onChange={(e) => setrecurringEventRepeats(e.target.value)}
                >
                  <MenuItem value="weekly" selected>
                    Weekly
                  </MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="label" component="label" className="add__label">
              Duration
            </Typography>
            <TextField
              className="add__input"
              placeholder="12/02/2022 - 02/12/2023"
              variant="outlined"
              value={recurringEventDate}
              onChange={(e) => setrecurringEventDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="label" component="label" className="add__label">
              Time
            </Typography>
            <TextField
              className="add__input"
              placeholder="10:00 AM"
              variant="outlined"
              value={recurringEventTime}
              onChange={(e) => setrecurringEventTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Typography variant="label" component="label" className="add__label">
              Repeats On
            </Typography>
            <FormControl className="w-100">
              <Select
                className="add__select"
                value={recurringEventRepeats}
                onChange={(e) => setrecurringEventRepeats(e.target.value)}
              >
                <MenuItem value="Friday" selected>
                  Friday
                </MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Stack className="action__wrapper" direction="row" gap={2}>
          <Button variant="outlined" className="primary-outline-btn">
            Save Drafts
          </Button>
          <Button variant="contained" className="primary-btn" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Typography>
    </Box>
  );
};
export default OrderTypeTabContent;
