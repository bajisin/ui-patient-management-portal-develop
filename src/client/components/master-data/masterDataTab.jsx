import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ABN from "./abn";
import Box from "@mui/material/Box";
import CodeMap from "./codeMap";
import ContentManagementTab from "./contentManagementTab";
import FacilitiesTab from "./facilitiesTab";
import { Master } from "../../_helpers/constants";
import OrderTab from "./orderTab";
import PatientTab from "./patientTab";
import PropTypes from "prop-types";
import SettingsTab from "../../pages/admin/masterData/settings";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TestCompendiumTab from "./testCompendiumTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`master-tabpanel-${index}`}
      aria-labelledby={`master-tab-${index}`}
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
    id: `master-tab-${index}`,
    "aria-controls": `master-tabpanel-${index}`
  };
}

export default function MasterDataTab() {
  const tabNameToIndex = {
    0: "content-management",
    1: "patients",
    2: "facilities",
    3: "order",
    4: "test-compendium",
    5: "settings"
  };

  const indexToTabName = {
    "content-management": 0,
    patients: 1,
    facilities: 2,
    order: 3,
    "test-compendium": 4,
    settings: 5
  };
  const routeParams = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(indexToTabName[routeParams.tabName] || 0);
  const handleChange = (event, newValue) => {
    navigate(`/tntAdmin-masterdata/${tabNameToIndex[newValue]}`);
    setValue(newValue);
  };
  useEffect(() => {}, []);

  return (
    <>
      {Master.readInd === true ? (
        <>
          <Box className="tab__wrapper parent-tab">
            <Tabs value={value} onChange={handleChange} aria-label="Master Data Tab" className="tabs_sections">
              <Tab label="Content Management" {...a11yProps(0)} />
              <Tab label="Patients" {...a11yProps(1)} />
              <Tab label="Facilities" {...a11yProps(2)} />
              <Tab label="Order" {...a11yProps(3)} />
              <Tab label="Test Compendium" {...a11yProps(4)} />
              <Tab label="Settings" {...a11yProps(5)} />
              <Tab label="Code Map" {...a11yProps(6)} />
              <Tab label="Abn" {...a11yProps(7)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ContentManagementTab classes="admin-tabs" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <PatientTab />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <FacilitiesTab />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <OrderTab />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <TestCompendiumTab />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <SettingsTab />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <CodeMap />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <ABN />
          </TabPanel>
        </>
      ) : (
        "You dont have access to read the content"
      )}
    </>
  );
}
