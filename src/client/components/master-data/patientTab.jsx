import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RaceTab from "./raceTab";
import EthnicTab from "./ethnicTab";
import GenderTab from "./genderTab";
import GuarantorTab from "./guarantorTab";
import CareGiverRelationsTab from "./caregiverTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
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
    id: `patient-tab-${index}`,
    "aria-controls": `patient-tabpanel-${index}`
  };
}

export default function PatientTab() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="Patient Data Tab" className="tabs_sections">
          <Tab label="Race" {...a11yProps(0)} />
          <Tab label="Ethnic Group" {...a11yProps(1)} />
          <Tab label="Gender" {...a11yProps(2)} />
          <Tab label="Guarantor Relations" {...a11yProps(3)} />
          <Tab label="Caregiver Relations" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RaceTab tabName="Race" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EthnicTab tabName="Ethnic" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GenderTab tabName="Gender" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <GuarantorTab tabName="Guarantor" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <CareGiverRelationsTab tabName="CareGiver" />
      </TabPanel>
    </>
  );
}
