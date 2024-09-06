import Box from "@mui/material/Box";
import ContainerTypeTab from "./containerTypeTab";
import InstrumentTab from "./instrumentTab";
import OrderableTypeTab from "./orderableTypeTab";
import PerformingDepartmentTab from "./performingDepartmentTab";
import PropTypes from "prop-types";
import React from "react";
import SpecimenTab from "./specimenTab";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import WorkGroupTab from "./workGroupTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`testcomp-tabpanel-${index}`}
      aria-labelledby={`testcomp-tab-${index}`}
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
    id: `testcomp-tab-${index}`,
    "aria-controls": `order-tabpanel-${index}`
  };
}

export default function TestCompendiumTab() {
  const [value, setValue] = React.useState(0);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="testcomp Data Tab" className="tabs_sections">
          <Tab label="Specimen Type" {...a11yProps(0)} />
          <Tab label="Container Type" {...a11yProps(1)} />
          <Tab label="Orderable Type" {...a11yProps(2)} />
          <Tab label="Performing Department" {...a11yProps(3)} />
          <Tab label="Work Group" {...a11yProps(4)} />
          <Tab label="Instrument" {...a11yProps(5)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <SpecimenTab tabName="Specimen" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ContainerTypeTab tabName="ContainerType" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <OrderableTypeTab tabName="OrderableType" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PerformingDepartmentTab tabName="PerformingDepartment" />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <WorkGroupTab tabName="WorkGroup" />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <InstrumentTab tabName="Instrument" />
      </TabPanel>
    </>
  );
}
