import Box from "@mui/material/Box";
import FacilityTypeTab from "./facilityTypeTab";
import ManagementgroupTab from "./ManagementgroupTab";
import PropTypes from "prop-types";
import React from "react";
import ServicesTab from "./servicesTab";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`facility-tabpanel-${index}`}
      aria-labelledby={`facility-tab-${index}`}
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
    id: `facility-tab-${index}`,
    "aria-controls": `facility-tabpanel-${index}`
  };
}

export default function FacilitiesTab() {
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="Facility Data Tab" className="tabs_sections">
          <Tab label="Facility Type" {...a11yProps(0)} />
          <Tab label="Services" {...a11yProps(1)} />
          <Tab label="Management Group" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <FacilityTypeTab tabName="=Facility" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ServicesTab tabName="Services" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ManagementgroupTab tabName="Management Group" />
      </TabPanel>
    </>
  );
}
