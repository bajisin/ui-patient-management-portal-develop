import { Box, Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";

import LabCilentDetailsTable from "./labCilentDetailsTable";
import PropTypes from "prop-types";
import { statusIds } from "../../../_helpers/constants";
import { useLocation } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`orderConfig-tabpanel-${index}`}
      aria-labelledby={`orderConfig-tab-${index}`}
      {...other}
    >
      {value === index && <Box> {children}</Box>}
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
    id: `orderConfig-${index}`,
    "aria-controls": `orderConfig-tabpanel-${index}`
  };
}

export default function LabChildOrderTab({
  updatePagination,
  updateSort,
  setStatus,
  updateSearch,
  startDate,
  setStartDate,
  endDate,
  setEndDate
}) {
  const [value, setValue] = useState(0);
  const { pathname } = useLocation();
  const id = pathname.split("/")[3];
  // const fetchTabCilentDetails = useCallback(
  //   (id) => {

  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   fetchTabCilentDetails(id);
  // }, [fetchTabCilentDetails, id]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 0) setStatus([statusIds.ACTIVE, statusIds.IN_ACTIVE]);
    if (value === 1) setStatus([statusIds.ACTIVE]);
    if (value === 2) setStatus([statusIds.IN_ACTIVE]);
  }, [value]);

  return (
    <>
      <Box className="tab__wrapper admin-tabs">
        <Tabs value={value} onChange={handleChange} aria-label="Tenant Details Tab" className="tabs_sections">
          <Tab label="All" {...a11yProps(0)} />
          <Tab label="Active" {...a11yProps(1)} />
          <Tab label="Inactive" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <LabCilentDetailsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          value={value}
        />
        {/* <ChildOrderConfigTab /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LabCilentDetailsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          value={value}
        />
        {/* <OrderDetailsTabComponent /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <LabCilentDetailsTable
          updatePagination={updatePagination}
          updateSort={updateSort}
          updateSearch={updateSearch}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          value={value}
        />
      </TabPanel>
    </>
  );
}
